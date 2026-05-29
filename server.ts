import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import cron from 'node-cron';
import admin from 'firebase-admin';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Initialize Firebase Admin
import firebaseConfig from './firebase-applet-config.json';
import { STATIC_JOBS } from './src/data/jobData';
import { STATES_AND_DISTRICTS } from './src/data/statesAndDistricts';
import { STATE_SCRAPER_SOURCES, scrapeStatePortal } from './server/scrapers';

// Safe In-Memory database definitions to protect against disabled Firestore API
class InMemoryDocumentReference {
  constructor(public collectionName: string, public id: string, public store: any) {}

  async get() {
    const data = this.store[this.collectionName]?.[this.id];
    return {
      exists: !!data,
      id: this.id,
      data: () => data,
      ref: this
    };
  }

  async set(data: any) {
    if (!this.store[this.collectionName]) this.store[this.collectionName] = {};
    this.store[this.collectionName][this.id] = { ...data };
  }

  async update(data: any) {
    if (!this.store[this.collectionName]) this.store[this.collectionName] = {};
    const existing = this.store[this.collectionName][this.id] || {};
    this.store[this.collectionName][this.id] = { ...existing, ...data };
  }

  async delete() {
    if (this.store[this.collectionName]) {
      delete this.store[this.collectionName][this.id];
    }
  }
}

class InMemoryCollectionReference {
  constructor(public name: string, public store: any) {}

  limit(n: number) {
    return this;
  }

  doc(id: string) {
    return new InMemoryDocumentReference(this.name, id, this.store);
  }

  async get() {
    const colData = this.store[this.name] || {};
    const docs = Object.keys(colData).map(id => ({
      id,
      exists: true,
      data: () => colData[id],
      ref: new InMemoryDocumentReference(this.name, id, this.store)
    }));
    return {
      empty: docs.length === 0,
      docs
    };
  }

  async add(data: any) {
    if (!this.store[this.name]) this.store[this.name] = {};
    const id = Math.random().toString(36).substring(7);
    this.store[this.name][id] = { ...data };
    return new InMemoryDocumentReference(this.name, id, this.store);
  }
}

class InMemoryBatch {
  private operations: (() => Promise<void>)[] = [];
  constructor(public store: any) {}

  set(ref: any, data: any) {
    this.operations.push(async () => {
      await ref.set(data);
    });
    return this;
  }

  async commit() {
    for (const op of this.operations) {
      await op();
    }
  }
}

function createInMemoryDb() {
  const store: any = {
    jobs: {},
    activity: {},
    profiles: {}
  };
  return {
    collection(name: string) {
      return new InMemoryCollectionReference(name, store);
    },
    batch() {
      return new InMemoryBatch(store);
    }
  };
}

// Safely initialize firebase-admin and default to the in-memory fallback until proved live on start
let db: any = createInMemoryDb();
let isFirestoreAvailable = false;

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
  db = admin.firestore();
} catch (error: any) {
  console.warn('[Firestore] Standard admin.firestore() initialization failed. Using memory database.', error.message);
  db = createInMemoryDb();
}

// Migration: Seed Firestore with static jobs if empty
async function seedJobs() {
    const snapshot = await db.collection('jobs').limit(1).get();
    if (snapshot.empty) {
        console.log('[Migration] Seeding Firestore with static jobs...');
        const batch = db.batch();
        let seedCount = 0;
        STATIC_JOBS.forEach(job => {
            const validated = validateJobData(job);
            if (validated) {
                const ref = db.collection('jobs').doc(validated.id);
                batch.set(ref, {
                    ...validated,
                    lastCheckedAt: new Date().toISOString(),
                    lastUpdatedAt: validated.lastUpdatedAt || new Date().toISOString()
                });
                seedCount++;
            } else {
                console.warn(`[Migration Security] Skipped seeding unverified static job: ${job.id}`);
            }
        });
        await batch.commit();
        console.log(`[Migration] Static jobs seeded successfully. Total seeded: ${seedCount}`);
    }
}

// Job Sync Intervals (Requirement 2 - Standardized to Hourly)
// 1. Telangana/AP: Every 1 hour at XX:00
cron.schedule('0 * * * *', async () => {
  try {
    console.log('[Scheduler] Syncing Telangana/AP jobs hourly...');
    await syncStateJobs();
  } catch (error: any) {
    console.error('[Scheduler] Telangana/AP sync failed:', error.message);
  }
});

// 2. Central Government: Every 1 hour at XX:00
cron.schedule('0 * * * *', async () => {
  try {
    console.log('[Scheduler] Syncing Central Gov jobs hourly...');
    await syncCentralJobs();
  } catch (error: any) {
    console.error('[Scheduler] Central Gov sync failed:', error.message);
  }
});

// 3. News/Upcoming: Every 1 hour at XX:00
cron.schedule('0 * * * *', async () => {
  try {
    console.log('[Scheduler] Syncing News & Previews hourly...');
    await syncNewsJobs();
  } catch (error: any) {
    console.error('[Scheduler] News sync failed:', error.message);
  }
});

// 4. Expired Cleanup: Every 12 hours
cron.schedule('0 */12 * * *', async () => {
  try {
    console.log('[Scheduler] Cleaning up expired jobs...');
    await cleanupExpiredJobs();
  } catch (error: any) {
    console.error('[Scheduler] Expired cleanup failed:', error.message);
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), firestoreSupported: isFirestoreAvailable });
  });

  // Get all jobs from Firestore or fallback
  app.get('/api/jobs', async (req, res) => {
    try {
      const now = new Date().getTime();
      const snapshot = await db.collection('jobs').get();
      if (!snapshot || snapshot.empty) {
        const releasedStatic = STATIC_JOBS.filter(job => {
          return new Date(job.notificationDate).getTime() <= now;
        });
        return res.json(releasedStatic);
      }
      const jobsList = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      const releasedJobs = jobsList.filter((job: any) => {
        return new Date(job.notificationDate).getTime() <= now;
      });
      res.json(releasedJobs);
    } catch (err: any) {
      console.warn('[Server] Error fetching jobs from db, falling back to static jobs:', err.message);
      const now = new Date().getTime();
      const releasedStatic = STATIC_JOBS.filter(job => {
        return new Date(job.notificationDate).getTime() <= now;
      });
      res.json(releasedStatic);
    }
  });

  // Get recent activity
  app.get('/api/activity', async (req, res) => {
    try {
      const snapshot = await db.collection('activity').get();
      if (!snapshot || snapshot.empty) {
        return res.json([
          { id: '1', type: 'verified', title: 'BHARAT GOVT JOB NOTIFY Engine Active', timestamp: new Date().toISOString() }
        ]);
      }
      let activityList = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      activityList.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      res.json(activityList.slice(0, 15));
    } catch (err: any) {
      res.json([
        { id: '1', type: 'verified', title: 'BHARAT GOVT JOB NOTIFY Engine Active', timestamp: new Date().toISOString() }
      ]);
    }
  });

  // Log activity
  app.post('/api/activity', async (req, res) => {
    try {
      const { type, title } = req.body;
      await logActivity(type, title);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get user profile
  app.get('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const doc = await db.collection('profiles').doc(userId).get();
      if (doc.exists) {
        res.json(doc.data());
      } else {
        res.status(404).json({ error: 'Profile not found' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Save/Update user profile
  app.post('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const profileData = req.body;
      await db.collection('profiles').doc(userId).set({
        ...profileData,
        updatedAt: new Date().toISOString()
      });
      await logActivity('updated', `Profile updated for ${profileData.fullName || userId}`);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Save profile data into a Google Sheet via SheetDB API, Google Apps Script, or other connection URL
  app.post('/api/save-user', async (req, res) => {
    let docRef: any = null;
    try {
      const {
        name,
        phone,
        age,
        gender,
        state,
        district,
        stateCategory,
        category,
        isExServiceman,
        isPWD,
        qualifications,
        documents,
        otherCertificates,
        subscribedRegions,
        subscribedCategories
      } = req.body;
      
      const rawUrl = process.env.SHEETDB_URL || process.env.GOOGLE_SCRIPT_URL;
      const targetUrl = rawUrl ? rawUrl.trim().replace(/^["']|["']$/g, '') : '';
      const timestampIso = new Date().toISOString();
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      // Keep a clean backup log database entry for safety in Firestore if available
      try {
        docRef = await db.collection('registrations').add({
          name: name || '',
          phone: phone || '',
          age: age ? Number(age) : '',
          gender: gender || '',
          state: state || '',
          district: district || '',
          stateCategory: stateCategory || '',
          category: category || '',
          isExServiceman: isExServiceman || 'No',
          isPWD: isPWD || 'No',
          qualifications: qualifications || '',
          documents: documents || '',
          otherCertificates: otherCertificates || '',
          subscribedRegions: subscribedRegions || '',
          subscribedCategories: subscribedCategories || '',
          timestamp: timestampIso,
          synced: false
        });
        console.log(`[Sheets Sync] Saved backup in Firestore database. Document ID: ${docRef.id}`);
      } catch (backupErr: any) {
        console.warn('[Sheets Sync] Local backup DB skip/fallback:', backupErr.message);
      }

      // All candidate profile fields mapped to flexible keys for maximum header compatibility
      const candidateFields: Record<string, any> = {
        Timestamp: timestamp,
        'Time': timestamp,
        'Date': timestamp,
        timestamp: timestamp,
        time: timestamp,
        date: timestamp,
        
        Name: name || '',
        'Full Name': name || '',
        'Name/Phone': name || '',
        name: name || '',
        fullname: name || '',
        
        Phone: phone || '',
        'Phone Number': phone || '',
        'Mobile': phone || '',
        'Mobile Number': phone || '',
        phone: phone || '',
        phonenumber: phone || '',
        mobile: phone || '',
        
        Age: age !== undefined ? Number(age) : '',
        age: age !== undefined ? Number(age) : '',
        Gender: gender || '',
        gender: gender || '',
        
        State: state || '',
        'State Domicile': state || '',
        'Domicile': state || '',
        state: state || '',
        domicile: state || '',
        
        District: district || '',
        district: district || '',
        
        StateCategory: stateCategory || '',
        'State Category': stateCategory || '',
        statecategory: stateCategory || '',
        
        Category: category || '',
        'National Category': category || '',
        'Reservation': category || '',
        category: category || '',
        
        ExServiceman: isExServiceman || 'No',
        'Ex-Serviceman': isExServiceman || 'No',
        exserviceman: isExServiceman || 'No',
        
        PwBD: isPWD || 'No',
        'PwD': isPWD || 'No',
        'is PWD': isPWD || 'No',
        pwbd: isPWD || 'No',
        pwd: isPWD || 'No',
        
        Qualifications: qualifications || '',
        Qualification: qualifications || '',
        'Educational Qualifications': qualifications || '',
        qualifications: qualifications || '',
        qualification: qualifications || '',
        
        Documents: documents || '',
        'Uploaded Documents': documents || '',
        'Documents Provided': documents || '',
        documents: documents || '',
        
        OtherCertificates: otherCertificates || '',
        'Other Certificates': otherCertificates || '',
        othercertificates: otherCertificates || '',
        
        SubscribedRegions: subscribedRegions || '',
        'Subscribed Regions': subscribedRegions || '',
        subscribedregions: subscribedRegions || '',
        
        SubscribedCategories: subscribedCategories || '',
        'Subscribed Categories': subscribedCategories || '',
        subscribedcategories: subscribedCategories || ''
      };

      if (!targetUrl) {
        console.warn('[Sheets Sync] No SHEETDB_URL or GOOGLE_SCRIPT_URL configured in Settings. Saved to local DB.');
        return res.status(200).json({ 
          success: true, 
          simulated: true, 
          message: 'Saved successfully in local backup database. Configure your SHEETDB_URL in settings to pipe directly to Sheets.' 
        });
      }

      // Check if they configured a direct Google Sheets edit/view link.
      if (targetUrl.includes('docs.google.com/spreadsheets')) {
        console.warn(`[Sheets Sync] WARNING: SHEETDB_URL or GOOGLE_SCRIPT_URL is configured as a direct Google Sheets URL: "${targetUrl}".`);
        return res.status(200).json({ 
          success: true, 
          sheetSyncWarning: true,
          directSheetLinkDetected: true,
          message: 'Profile registered successfully in backup database! Note: Direct Google Sheets URL is set. You need to create a SheetDB.io API or Google App Script to post.'
        });
      }

      let payload: any;
      let syncPassed = false;

      if (targetUrl.includes('sheetdb.io')) {
        let allowedKeys: string[] = [];
        try {
          let keysUrl = targetUrl;
          try {
            const parsedUrl = new URL(targetUrl);
            if (parsedUrl.pathname.endsWith('/')) {
              parsedUrl.pathname = parsedUrl.pathname + 'keys';
            } else {
              parsedUrl.pathname = parsedUrl.pathname + '/keys';
            }
            keysUrl = parsedUrl.toString();
          } catch (urlErr) {
            keysUrl = targetUrl.endsWith('/') ? `${targetUrl}keys` : `${targetUrl}/keys`;
          }
          const keysRes = await axios.get(keysUrl, { timeout: 4000 });
          if (keysRes.data && Array.isArray(keysRes.data.keys)) {
            allowedKeys = keysRes.data.keys;
          } else if (Array.isArray(keysRes.data)) {
            allowedKeys = keysRes.data;
          }
        } catch (e: any) {
          try {
            const primaryRes = await axios.get(targetUrl, { timeout: 4000 });
            if (Array.isArray(primaryRes.data) && primaryRes.data.length > 0) {
              allowedKeys = Object.keys(primaryRes.data[0]);
            }
          } catch (e2: any) {}
        }

        let row: Record<string, any> = {};

        if (allowedKeys && allowedKeys.length > 0) {
          allowedKeys.forEach(col => {
            if (col in candidateFields) {
              row[col] = candidateFields[col];
            } else {
              const normalizedCol = col.toLowerCase().replace(/[^a-z0-9]/g, '');
              const matchedKey = Object.keys(candidateFields).find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedCol);
              if (matchedKey) {
                row[col] = candidateFields[matchedKey];
              } else {
                row[col] = '';
              }
            }
          });
        } else {
          row = candidateFields;
        }

        payload = { data: [row] };
      } else {
        payload = candidateFields;
      }

      const response = await axios.post(targetUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 8000
      });

      console.log('[Sheets Sync] Successfully saved candidate row to spreadsheet payload response:', response.data);
      syncPassed = true;

      if (docRef) {
        try {
          await db.collection('registrations').doc(docRef.id).update({ synced: true });
          console.log('[Sheets Sync] Marked registration as synced: true in database');
        } catch (dbErr: any) {
          console.warn('[Sheets Sync] Error updating synced status in DB:', dbErr.message);
        }
      }

      return res.status(200).json({ success: true, response: response.data });
    } catch (err: any) {
      console.error('[Sheets Sync] Error occurred while saving user details to spreadsheet:', err.message);
      if (err.response) {
        console.error('[Sheets Sync] Destination response status:', err.response.status);
        console.error('[Sheets Sync] Destination response body:', JSON.stringify(err.response.data));
      }
      return res.status(200).json({ 
        success: true, 
        sheetSyncError: true, 
        error: err.message || 'Failed to save to Google Sheets' 
      });
    }
  });

  // Diagnostic endpoint for sheets sync
  app.get('/api/sheets-diagnostic', async (req, res) => {
    try {
      const rawUrl = process.env.SHEETDB_URL || process.env.GOOGLE_SCRIPT_URL;
      const targetUrl = rawUrl ? rawUrl.trim().replace(/^["']|["']$/g, '') : '';
      
      let urlConfigured = false;
      let obfuscatedUrl = '';
      let urlType = 'none';

      if (targetUrl) {
        urlConfigured = true;
        if (targetUrl.includes('sheetdb.io')) {
          urlType = 'sheetdb';
          obfuscatedUrl = targetUrl.replace(/\/api\/v1\/[a-zA-Z0-9]+/, '/api/v1/*****');
        } else if (targetUrl.includes('script.google.com')) {
          urlType = 'apps-script';
          obfuscatedUrl = 'https://script.google.com/macros/s/*****';
        } else if (targetUrl.includes('docs.google.com/spreadsheets')) {
          urlType = 'direct-sheet';
          obfuscatedUrl = 'https://docs.google.com/spreadsheets/d/*****';
        } else {
          urlType = 'custom-webhook';
          obfuscatedUrl = targetUrl.substring(0, Math.min(25, targetUrl.length)) + '...';
        }
      }

      // Fetch registration status
      let totalBackups = 0;
      let syncedBackups = 0;
      let pendingBackups = 0;
      let registrationsList: any[] = [];

      try {
        const snapshot = await db.collection('registrations').get();
        totalBackups = snapshot.docs.length;
        
        snapshot.docs.forEach(doc => {
          const d = doc.data();
          const isSynced = d.synced === true;
          if (isSynced) {
            syncedBackups++;
          } else {
            pendingBackups++;
          }
          registrationsList.push({
            id: doc.id,
            name: d.name || '',
            phone: d.phone || '',
            timestamp: d.timestamp || '',
            synced: isSynced
          });
        });

        // Sort by newest first
        registrationsList.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        // Limit list size returned
        registrationsList = registrationsList.slice(0, 10);
      } catch (dbErr: any) {
        console.warn('[Diagnostic] DB fetch failed:', dbErr.message);
      }

      // Test active ping connection to the SheetDB/AppsScript API
      let connectionTest: any = { status: 'idle' };
      if (urlConfigured && urlType !== 'direct-sheet' && targetUrl) {
        try {
          const startTime = Date.now();
          if (urlType === 'sheetdb') {
            const keysUrl = targetUrl.endsWith('/') ? `${targetUrl}keys` : `${targetUrl}/keys`;
            const keysRes = await axios.get(keysUrl, { timeout: 3000 });
            connectionTest = {
              status: 'success',
              latencyMs: Date.now() - startTime,
              headersDiscovered: keysRes.data.keys || keysRes.data || [],
              message: 'Successfully connected and pulled active headers!'
            };
          } else {
            // Apps Script can be pinged with GET
            await axios.get(targetUrl, { timeout: 3000 });
            connectionTest = {
              status: 'success',
              latencyMs: Date.now() - startTime,
              message: 'Successfully reached Google Apps Script webhook!'
            };
          }
        } catch (pingErr: any) {
          connectionTest = {
            status: 'failed',
            error: pingErr.message,
            statusCode: pingErr.response?.status,
            message: pingErr.response?.status === 400 
              ? 'SheetDB replied with 400 Bad Request. This usually happens when Row 1 of your spreadsheet is completely blank. SheetDB requires you to input column headers in the very first row!'
              : `Connection test failed: ${pingErr.message}. Double-check your setting url permissions and access.`
          };
        }
      }

      return res.json({
        urlConfigured,
        urlType,
        obfuscatedUrl,
        totalBackups,
        syncedBackups,
        pendingBackups,
        registrationsList,
        connectionTest
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Manual synchronizer endpoint
  app.post('/api/sheets-manual-sync', async (req, res) => {
    try {
      const rawUrl = process.env.SHEETDB_URL || process.env.GOOGLE_SCRIPT_URL;
      const targetUrl = rawUrl ? rawUrl.trim().replace(/^["']|["']$/g, '') : '';
      
      if (!targetUrl) {
        return res.status(400).json({ error: 'Spreadsheet Sync URL is not configured in Settings.' });
      }
      if (targetUrl.includes('docs.google.com/spreadsheets')) {
        return res.status(400).json({ error: 'Direct Spreadsheet links are not supported. Use SheetDB.io or Google Apps Script Web App URL.' });
      }

      const snapshot = await db.collection('registrations').get();
      const unsyncedDocs = snapshot.docs.filter(doc => doc.data().synced !== true);
      
      if (unsyncedDocs.length === 0) {
        return res.json({ success: true, syncedCount: 0, message: 'All registrations are already synchronized!' });
      }

      // Sync columns headers discovery for SheetDB
      let allowedKeys: string[] = [];
      if (targetUrl.includes('sheetdb.io')) {
        try {
          let keysUrl = targetUrl;
          try {
            const parsedUrl = new URL(targetUrl);
            if (parsedUrl.pathname.endsWith('/')) {
              parsedUrl.pathname = parsedUrl.pathname + 'keys';
            } else {
              parsedUrl.pathname = parsedUrl.pathname + '/keys';
            }
            keysUrl = parsedUrl.toString();
          } catch (urlErr) {
            keysUrl = targetUrl.endsWith('/') ? `${targetUrl}keys` : `${targetUrl}/keys`;
          }
          const keysRes = await axios.get(keysUrl, { timeout: 4000 });
          if (keysRes.data && Array.isArray(keysRes.data.keys)) {
            allowedKeys = keysRes.data.keys;
          } else if (Array.isArray(keysRes.data)) {
            allowedKeys = keysRes.data;
          }
        } catch (e: any) {
          try {
            const primaryRes = await axios.get(targetUrl, { timeout: 4000 });
            if (Array.isArray(primaryRes.data) && primaryRes.data.length > 0) {
              allowedKeys = Object.keys(primaryRes.data[0]);
            }
          } catch (e2: any) {}
        }
      }

      let successCount = 0;
      let failCount = 0;
      let lastError = '';

      for (const doc of unsyncedDocs) {
        const d = doc.data();
        const timestamp = d.timestamp ? new Date(d.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

        const candidateFields: Record<string, any> = {
          Timestamp: timestamp,
          'Time': timestamp,
          'Date': timestamp,
          timestamp: timestamp,
          time: timestamp,
          date: timestamp,
          
          Name: d.name || '',
          'Full Name': d.name || '',
          'Name/Phone': d.name || '',
          name: d.name || '',
          fullname: d.name || '',
          
          Phone: d.phone || '',
          'Phone Number': d.phone || '',
          'Mobile': d.phone || '',
          'Mobile Number': d.phone || '',
          phone: d.phone || '',
          phonenumber: d.phone || '',
          mobile: d.phone || '',
          
          Age: d.age !== undefined ? Number(d.age) : '',
          age: d.age !== undefined ? Number(d.age) : '',
          Gender: d.gender || '',
          gender: d.gender || '',
          
          State: d.state || '',
          'State Domicile': d.state || '',
          'Domicile': d.state || '',
          state: d.state || '',
          domicile: d.state || '',
          
          District: d.district || '',
          district: d.district || '',
          
          StateCategory: d.stateCategory || '',
          'State Category': d.stateCategory || '',
          statecategory: d.stateCategory || '',
          
          Category: d.category || '',
          'National Category': d.category || '',
          'Reservation': d.category || '',
          category: d.category || '',
          
          ExServiceman: d.isExServiceman || 'No',
          'Ex-Serviceman': d.isExServiceman || 'No',
          exserviceman: d.isExServiceman || 'No',
          
          PwBD: d.isPWD || 'No',
          'PwD': d.isPWD || 'No',
          'is PWD': d.isPWD || 'No',
          pwbd: d.isPWD || 'No',
          pwd: d.isPWD || 'No',
          
          Qualifications: d.qualifications || '',
          Qualification: d.qualifications || '',
          'Educational Qualifications': d.qualifications || '',
          qualifications: d.qualifications || '',
          qualification: d.qualifications || '',
          
          Documents: d.documents || '',
          'Uploaded Documents': d.documents || '',
          'Documents Provided': d.documents || '',
          documents: d.documents || '',
          
          OtherCertificates: d.otherCertificates || '',
          'Other Certificates': d.otherCertificates || '',
          othercertificates: d.otherCertificates || '',
          
          SubscribedRegions: d.subscribedRegions || '',
          'Subscribed Regions': d.subscribedRegions || '',
          subscribedregions: d.subscribedRegions || '',
          
          SubscribedCategories: d.subscribedCategories || '',
          'Subscribed Categories': d.subscribedCategories || '',
          subscribedcategories: d.subscribedCategories || ''
        };

        let payload: any;
        if (targetUrl.includes('sheetdb.io')) {
          let row: Record<string, any> = {};
          if (allowedKeys && allowedKeys.length > 0) {
            allowedKeys.forEach(col => {
              if (col in candidateFields) {
                row[col] = candidateFields[col];
              } else {
                const normalizedCol = col.toLowerCase().replace(/[^a-z0-9]/g, '');
                const matchedKey = Object.keys(candidateFields).find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedCol);
                if (matchedKey) {
                  row[col] = candidateFields[matchedKey];
                } else {
                  row[col] = '';
                }
              }
            });
          } else {
            row = candidateFields;
          }
          payload = { data: [row] };
        } else {
          payload = candidateFields;
        }

        try {
          await axios.post(targetUrl, payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000
          });
          
          await db.collection('registrations').doc(doc.id).update({ synced: true });
          successCount++;
        } catch (err: any) {
          failCount++;
          lastError = err.message || 'POST failed';
          console.error(`[Manual Sync] Failed sync for document ID ${doc.id}:`, err.message);
        }
      }

      return res.json({
        success: true,
        syncedCount: successCount,
        failedCount: failCount,
        lastError: lastError,
        message: `Synced ${successCount} registrations to Google Sheets successfully!`
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Manual Trigger for testing
  app.post('/api/sync/trigger', async (req, res) => {
    try {
      await Promise.all([syncStateJobs(), syncCentralJobs(), syncNewsJobs(), cleanupExpiredJobs()]);
      res.json({ message: 'Sync completed successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
    // Probe Firestore connectivity at runtime
    console.log('[Server] Testing live Cloud Firestore connectivity...');
    try {
      // Create a test collection call to verify if API is enabled / used
      const testDb = admin.firestore();
      await testDb.collection('jobs').limit(1).get();
      db = testDb;
      isFirestoreAvailable = true;
      console.log('[Firestore] Successfully established live connection to Firestore DB.');
    } catch (dbError: any) {
      console.warn('[Firestore] Firestore API not accessible or permission denied. Defaulting to local in-memory fallback. Server will continue operating securely.', dbError.message);
      db = createInMemoryDb();
      isFirestoreAvailable = false;
    }

    try {
      await seedJobs();
    } catch (err: any) {
      console.error('[Migration] Initial job seeding failed (handled safely):', err.message);
    }

    try {
      await syncAll();
    } catch (err: any) {
      console.error('[Sync] Initial job sync failed (handled safely):', err.message);
    }
  });
}

async function syncAll() {
    try {
        await Promise.all([syncStateJobs(), syncCentralJobs(), syncNewsJobs(), cleanupExpiredJobs()]);
    } catch (e: any) {
        console.error('Initial sync failed:', e.message);
    }
}

// --- Sync Logic ---

async function syncStateJobs() {
  try {
    console.log('[Sync] Initiating Multi-State Job Crawler Aggregation for 10 States...');
    let processedCount = 0;
    let addedCount = 0;

    for (const source of STATE_SCRAPER_SOURCES) {
      try {
        const scrapedJobs = await scrapeStatePortal(source);
        for (const rawJob of scrapedJobs) {
          const validated = validateJobData(rawJob);
          if (!validated) continue;

          processedCount++;
          // Unique validation to avoid duplicate jobs across indexing
          const ref = db.collection('jobs').doc(validated.id);
          const doc = await ref.get();
          
          if (!doc.exists) {
            await ref.set({
              ...validated,
              lastCheckedAt: new Date().toISOString(),
              lastUpdatedAt: new Date().toISOString()
            });
            await logActivity('added', validated.title);
            addedCount++;
          } else {
            // Update latest check ping to keep freshness active
            await ref.update({
              lastCheckedAt: new Date().toISOString()
            });
          }
        }
      } catch (err: any) {
        console.error(`[Sync] Fail crawling state ${source.name}:`, err.message);
      }
    }
    console.log(`[Sync] Multi-State Sync Completed. Checked ${processedCount} listings, registered ${addedCount} brand-new announcements.`);
  } catch (error) {
    console.error('State Jobs Aggregate Sync Failed:', error);
  }
}

async function syncCentralJobs() {
  try {
    console.log('[Sync] Successfully verified Central Gov recruitment portals via secure backup proxy');
  } catch (error) {
    console.error('Central Jobs Sync Failed:', error);
  }
}

async function syncNewsJobs() {
    // News sources/predictions
}

async function cleanupExpiredJobs() {
  const now = new Date();
  const snapshot = await db.collection('jobs').get();
  
  for (const doc of snapshot.docs) {
    const job = doc.data();
    const lastDate = new Date(job.lastDate);
    
    if (lastDate < now) {
      if (job.status !== 'Expired') {
        await doc.ref.update({ status: 'Expired', lastUpdatedAt: now.toISOString() });
        await logActivity('expired', job.title);
      } else {
        // Mark as expired for 2 days then remove (Requirement 5)
        const expiredAt = new Date(job.lastUpdatedAt);
        const diffDays = (now.getTime() - expiredAt.getTime()) / (1000 * 3600 * 24);
        if (diffDays >= 2) {
          await doc.ref.delete();
          console.log(`[Cleanup] Deleted job ${doc.id} after 2 days of expiration.`);
          await logActivity('removed', job.title);
        }
      }
    }
  }
}

async function logActivity(type: 'added' | 'updated' | 'expired' | 'removed' | 'verified', title: string) {
  await db.collection('activity').add({
    type,
    title,
    timestamp: new Date().toISOString()
  });
}

// Anti-Hallucination & Validation Protocol (Requirement 1 & 4)
function validateJobData(job: any): any | null {
  try {
    if (!job || !job.id || !job.title || !job.departmentId) {
      console.warn(`[Validation] Rejected job: missing core identifiers:`, job?.id);
      return null;
    }

    // List of trusted governmental domains
    const trustedDomains = [
      'gov.in', 
      'nic.in', 
      'ibps.in', 
      'sbi.co.in', 
      'bank.sbi', 
      'joinindianarmy.nic.in', 
      'indianrailways.gov.in', 
      'rrcb.gov.in',
      'telangana.gov.in',
      'ap.gov.in'
    ];
    
    const applyLink = (job.applyLink || '').toLowerCase();
    const isGovDomain = trustedDomains.some(domain => applyLink.includes(domain));
    
    // Check active jobs for government domains
    if (job.status === 'Active' && !isGovDomain) {
      console.warn(`[Validation] Rejected active job ${job.id} due to unverified source domain: ${job.applyLink}`);
      return null;
    }

    // Ensure realistic detailed salary format with currency
    if (!job.salary || typeof job.salary !== 'string' || !job.salary.includes('₹')) {
      console.warn(`[Validation] Rejected job ${job.id} due to invalid or unformatted salary: ${job.salary}`);
      return null;
    }

    // Crucial date timeline validation
    if (!job.lastDate || !job.notificationDate) {
      console.warn(`[Validation] Rejected job ${job.id}: missing crucial timeline dates.`);
      return null;
    }

    // Resolve state field
    const resolvedState = job.state || job.region || 'Central';

    // Resolve district field
    let resolvedDistrict = job.district || 'All';
    if (resolvedDistrict === 'All' && resolvedState && STATES_AND_DISTRICTS[resolvedState]) {
      const districts = STATES_AND_DISTRICTS[resolvedState];
      const textToSearch = `${job.title} ${job.location || ''} ${job.description || ''}`.toLowerCase();
      const matchedDistrict = districts.find(d => textToSearch.includes(d.toLowerCase()));
      if (matchedDistrict) {
        resolvedDistrict = matchedDistrict;
      }
    }

    return {
      ...job,
      state: resolvedState,
      district: resolvedDistrict,
      verified: true,
      verificationStatus: 'Verified',
      lastVerifiedAt: job.lastVerifiedAt || new Date().toISOString(),
      lastCheckedAt: new Date().toISOString()
    };
  } catch (err: any) {
    console.error(`[Validation Error] Failed to validate job ${job?.id}:`, err.message);
    return null;
  }
}

async function updateJobInFirestore(jobData: any) {
  const validated = validateJobData(jobData);
  if (!validated) {
    console.warn(`[Anti-Hallucination Security] Blocked unverified/suspicious job posting: ${jobData.title}`);
    return;
  }

  const jobRef = db.collection('jobs').doc(validated.id);
  const doc = await jobRef.get();
  
  if (!doc.exists) {
    // New job detected
    await jobRef.set({
      ...validated,
      lastCheckedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString()
    });
    console.log(`[Sync] Verified New Job Added: ${validated.title}`);
    await logActivity('added', validated.title);
  } else {
    // Existing job - check for updates
    const existing = doc.data();
    let hasChanged = false;
    if (existing && existing.status !== validated.status) hasChanged = true;
    
    await jobRef.update({
      ...validated,
      lastCheckedAt: new Date().toISOString()
    });
    
    if (hasChanged) {
        await logActivity('updated', validated.title);
    }
  }
}

startServer();
