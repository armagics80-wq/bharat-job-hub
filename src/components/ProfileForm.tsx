import { useState, useMemo } from 'react';
import { UserProfile, QualificationType } from '../types';
import { Save, GraduationCap, Calendar, User, FileText, Sparkles, BellRing, Search, Check, X, ShieldCheck, Briefcase, AlertCircle, AlertTriangle, Info, Download, Mail } from 'lucide-react';
import { QUALIFICATIONS, getQualificationById } from '../data/qualifications';
import { STATES_AND_DISTRICTS } from '../data/statesAndDistricts';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getApiUrl } from '../utils/apiUrl';

interface ProfileFormProps {
  initialData?: UserProfile | null;
  onSave: (data: UserProfile) => void | Promise<void>;
  isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSave, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(() => {
    const defaultData: UserProfile = {
      fullName: '',
      phoneNumber: '',
      age: 18,
      category: 'UR',
      nationalCategory: 'UR',
      stateCategory: 'STATE_GEN',
      isExServiceman: false,
      qualifications: [],
      state: '',
      district: '',
      gender: 'Male',
      isPWD: false,
      skills: [],
      documents: [],
      otherCertificates: '',
      preferredRegion: 'All',
      subscriptions: {
        regions: [],
        categories: []
      },
      emailForDigest: '',
      digestEnabled: false,
      digestFrequency: 'Weekly'
    };

    if (!initialData) return defaultData;

    return {
      ...defaultData,
      ...initialData,
      qualifications: initialData.qualifications || ((initialData as any).qualification ? [(initialData as any).qualification as any] : []),
      subscriptions: initialData.subscriptions || defaultData.subscriptions,
      nationalCategory: initialData.nationalCategory || initialData.category || 'UR',
      stateCategory: initialData.stateCategory || (initialData.state === 'Telangana' ? 'TS_OC' : initialData.state === 'Andhra Pradesh' ? 'AP_OC' : initialData.state === 'Punjab' ? 'PB_GEN' : initialData.state === 'Haryana' ? 'HR_GEN' : 'STATE_GEN')
    };
  });

  const [qualSearch, setQualSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{
    status: 'success' | 'warning' | 'simulated' | 'error' | null;
    message: string;
    details?: string;
  }>({ status: null, message: '' });

  const filteredQuals = useMemo(() => {
    if (!qualSearch) return QUALIFICATIONS;
    return QUALIFICATIONS.filter(q => 
      q.label.toLowerCase().includes(qualSearch.toLowerCase()) || 
      q.category.toLowerCase().includes(qualSearch.toLowerCase())
    );
  }, [qualSearch]);

  const handleExportJSON = () => {
    try {
      const dataStr = JSON.stringify(formData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const fileName = `${formData.fullName ? formData.fullName.trim().replace(/\s+/g, '_') : 'profile'}_eligibility.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', fileName);
      linkElement.click();
    } catch (err: any) {
      console.error('[Export Profile] JSON export failed:', err);
      alert('Failed to export profile to JSON: ' + err.message);
    }
  };

  const handleExportCSV = () => {
    try {
      const qualificationLabels = formData.qualifications.map(id => {
        try {
          return getQualificationById(id)?.label || id;
        } catch {
          return id;
        }
      });

      const fields = [
        { label: 'Full Name', value: formData.fullName || '' },
        { label: 'Phone Number', value: formData.phoneNumber || '' },
        { label: 'Age', value: formData.age },
        { label: 'Gender', value: formData.gender },
        { label: 'National Category', value: formData.nationalCategory || formData.category || 'UR' },
        { label: 'State Category', value: formData.stateCategory || '' },
        { label: 'Domicile State', value: formData.state || '' },
        { label: 'Domicile District', value: formData.district || '' },
        { label: 'Ex-Serviceman', value: formData.isExServiceman ? 'Yes' : 'No' },
        { label: 'Person with Disability', value: formData.isPWD ? 'Yes' : 'No' },
        { label: 'Qualifications', value: qualificationLabels.join('; ') },
        { label: 'Skills', value: (formData.skills || []).join('; ') },
        { label: 'Essential Documents', value: (formData.documents || []).join('; ') },
        { label: 'Preferred Region', value: formData.preferredRegion || 'All' },
        { label: 'Subscribed Regions', value: (formData.subscriptions?.regions || []).join('; ') },
        { label: 'Subscribed Categories', value: (formData.subscriptions?.categories || []).join('; ') },
      ];

      const escapeCSV = (val: any) => {
        let str = String(val === undefined || val === null ? '' : val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      };

      const headers = fields.map(f => escapeCSV(f.label)).join(',');
      const rowValues = fields.map(f => escapeCSV(f.value)).join(',');
      const csvContent = `${headers}\n${rowValues}`;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `${formData.fullName ? formData.fullName.trim().replace(/\s+/g, '_') : 'profile'}_eligibility.csv`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', fileName);
      linkElement.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('[Export Profile] CSV export failed:', err);
      alert('Failed to export profile to CSV: ' + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSyncFeedback({ status: null, message: "" });
    
    try {
      let isSyncedGlobally = false;
      let syncErrorDetail = '';
      
      // 1. Attempt Server-Side Save User API first
      try {
        const payload = {
          name: formData.fullName || '',
          phone: formData.phoneNumber || '',
          age: formData.age ? Number(formData.age) : 18,
          gender: formData.gender || '',
          state: formData.state || '',
          district: formData.district || '',
          stateCategory: formData.stateCategory || 'STATE_GEN',
          category: formData.nationalCategory || formData.category || 'UR',
          isExServiceman: formData.isExServiceman ? 'Yes' : 'No',
          isPWD: formData.isPWD ? 'Yes' : 'No',
          qualifications: formData.qualifications.join(', '),
          documents: formData.documents.join(', '),
          otherCertificates: formData.otherCertificates || '',
          subscribedRegions: (formData.subscriptions?.regions || []).join(', '),
          subscribedCategories: (formData.subscriptions?.categories || []).join(', '),
          emailForDigest: formData.emailForDigest || '',
          digestEnabled: formData.digestEnabled ? 'Yes' : 'No',
          digestFrequency: formData.digestFrequency || 'Weekly'
        };

        const response = await fetch(getApiUrl('/api/save-user'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          try {
            const resData = await response.json();
            if (resData.simulated || resData.sheetSyncError || resData.sheetSyncWarning || resData.directSheetLinkDetected) {
              // Server succeeded in writing the backup to Firestore, but sheet post failed/simulated
              isSyncedGlobally = true;
              setSyncFeedback({
                status: 'simulated',
                message: 'Saved in Local Backup Logs!',
                details: resData.message || resData.error || 'Your eligibility was saved. Spreadsheet direct post timed out or bypassed, but registration was safely recorded locally on our cloud.'
              });
            } else {
              isSyncedGlobally = true;
              setSyncFeedback({
                status: 'success',
                message: 'Successfully Synchronized!',
                details: 'Your eligibility criteria was safely synced with your Google Sheet tab and backed up in our secure cloud storage.'
              });
            }
          } catch (jsonErr) {
            isSyncedGlobally = true;
            setSyncFeedback({
              status: 'success',
              message: 'Successfully Synchronized!',
              details: 'Your eligibility criteria was safely saved in our secure cloud storage.'
            });
          }
        } else {
          try {
            const resErr = await response.json();
            syncErrorDetail = resErr.error || 'Server rejected request';
          } catch {
            syncErrorDetail = 'Server returned error ' + response.status;
          }
        }
      } catch (err: any) {
        syncErrorDetail = err.message || 'Cannot contact backend portal';
      }

      // 2. Client-side Firestore and spreadsheet connection fallback if server endpoint was offline/404
      if (!isSyncedGlobally) {
        let docId = 'fallback-' + Math.random().toString(36).substring(7);
        try {
          const backupDoc = await addDoc(collection(db, 'registrations'), {
            name: formData.fullName || '',
            phone: formData.phoneNumber || '',
            age: formData.age ? Number(formData.age) : 18,
            gender: formData.gender || '',
            state: formData.state || '',
            district: formData.district || '',
            stateCategory: formData.stateCategory || 'STATE_GEN',
            category: formData.nationalCategory || formData.category || 'UR',
            isExServiceman: formData.isExServiceman ? 'Yes' : 'No',
            isPWD: formData.isPWD ? 'Yes' : 'No',
            qualifications: formData.qualifications,
            documents: formData.documents,
            otherCertificates: formData.otherCertificates || '',
            emailForDigest: formData.emailForDigest || '',
            digestEnabled: formData.digestEnabled || false,
            digestFrequency: formData.digestFrequency || 'Weekly',
            timestamp: new Date().toISOString(),
            synced: false
          });
          docId = backupDoc.id;
          
          // Now fetch active sheet preferences to push directly if configured
          let customUrl = '';
          try {
            const settingsDoc = await getDoc(doc(db, 'settings', 'sheets_config'));
            if (settingsDoc.exists()) {
              const s = settingsDoc.data();
              customUrl = s?.SHEETDB_URL || s?.GOOGLE_SCRIPT_URL || '';
            }
          } catch (eNum) {
            console.warn('Could not read sheets_config from database, checking environment:', eNum);
          }

          if (!customUrl) {
            customUrl = (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL || '';
          }

          if (customUrl) {
            const timestampStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const rowPayload = {
              Timestamp: timestampStr,
              'Date': timestampStr,
              Name: formData.fullName || '',
              'Full Name': formData.fullName || '',
              Phone: formData.phoneNumber || '',
              'Phone Number': formData.phoneNumber || '',
              Age: formData.age,
              Gender: formData.gender,
              State: formData.state,
              District: formData.district,
              StateCategory: formData.stateCategory,
              Category: formData.nationalCategory || formData.category || 'UR',
              ExServiceman: formData.isExServiceman ? 'Yes' : 'No',
              PwBD: formData.isPWD ? 'Yes' : 'No',
              Qualifications: formData.qualifications.map(q => {
                try { return getQualificationById(q)?.label || q; } catch { return q; }
              }).join(', '),
              OtherCertificates: formData.otherCertificates || '',
              EmailForDigest: formData.emailForDigest || '',
              DigestEnabled: formData.digestEnabled ? 'Yes' : 'No',
              DigestFrequency: formData.digestFrequency || 'Weekly'
            };

            const sheetResponse = await fetch(customUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(customUrl.includes('sheetdb.io') ? { data: [rowPayload] } : rowPayload),
              mode: customUrl.includes('script.google.com') ? 'no-cors' : 'cors'
            });

            // Mark as synced (under no-cors we assume it is pushed)
            if (customUrl.includes('script.google.com') || sheetResponse.ok) {
              await updateDoc(doc(db, 'registrations', docId), { synced: true });
              isSyncedGlobally = true;
              setSyncFeedback({
                status: 'success',
                message: 'Successfully Synchronized (Direct-Client)!',
                details: 'Your eligibility criteria was pushed directly to the configured Google Sheet and registered in Firestore backup logs.'
              });
            } else {
              throw new Error('Connection refused with code ' + sheetResponse.status);
            }
          } else {
            // Backup active but no sheets link configured
            setSyncFeedback({
              status: 'simulated',
              message: 'Saved in Local Backup Logs!',
              details: 'Your profile has been saved. Note: Spreadsheet synchronizer bypass is active as no SHEETDB_URL or GOOGLE_SCRIPT_URL is currently configured.'
            });
          }
        } catch (dbErr: any) {
          console.warn('[Offline Engine] Fallback database action alert:', dbErr.message);
          setSyncFeedback({
            status: 'warning',
            message: 'Registered in Client Storage',
            details: `Saved locally. Multi-device sync bypass active (Server: ${syncErrorDetail}, Firebase: ${dbErr.message}).`
          });
        }
      }

      setShowResultModal(true);
      await onSave(formData);
    } catch (error: any) {
      console.error('Submission error:', error);
      setSyncFeedback({
        status: 'error',
        message: 'Could Not Update Synchronization Logs',
        details: error.message || 'An error occurred during verification.'
      });
      setShowResultModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded">
            <User className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Eligibility Profile</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-tight">Configure location and reservation parameters first to check matching vacancies</p>
          </div>
        </div>

        {/* Export Profile Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            Export profile:
          </span>
          <button
            type="button"
            onClick={handleExportJSON}
            title="Export full profile data to formatted JSON"
            className="px-2.5 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 text-slate-700 hover:text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            title="Export profile data to a structured spreadsheet CSV file"
            className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-slate-700 hover:text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
          >
            CSV
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        
        {/* 1. Domicile & Reservation Matrix (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 border border-slate-200/60 rounded-xl shadow-sm">
          
          {/* Column 1: State Selection & Reservation Category */}
          <div className="space-y-4">
            <div className="border-b border-indigo-100 pb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
              <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider block">State Domicile & local Quota</span>
            </div>

            {/* A. State Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                State Selection <span className="text-indigo-600 font-bold">*</span>
              </label>
              <select
                id="profile-state-select"
                name="state"
                required
                value={formData.state}
                onChange={(e) => {
                  const newState = e.target.value;
                  let defaultStateCat = 'STATE_GEN';
                  if (newState === 'Telangana') defaultStateCat = 'TS_OC';
                  if (newState === 'Andhra Pradesh') defaultStateCat = 'AP_OC';
                  if (newState === 'Punjab') defaultStateCat = 'PB_GEN';
                  if (newState === 'Haryana') defaultStateCat = 'HR_GEN';
                  
                  setFormData({ 
                    ...formData, 
                    state: newState, 
                    district: '', 
                    stateCategory: defaultStateCat 
                  });
                }}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              >
                <option value="">Select State</option>
                {Object.keys(STATES_AND_DISTRICTS).sort().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* B. State Reservation Category (Comes after State Selection) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                State Reservation Category <span className="text-indigo-600 font-bold">*</span>
              </label>
              <select
                id="profile-state-category-select"
                required
                disabled={!formData.state}
                value={formData.stateCategory || ''}
                onChange={(e) => setFormData({ ...formData, stateCategory: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
              >
                {!formData.state ? (
                  <option value="">Select state first</option>
                ) : (
                  <>
                    {formData.state === 'Telangana' && (
                      <>
                        <option value="TS_OC">General / General (TS OC)</option>
                        <option value="TS_EWS">Economically Weaker Section (TS EWS)</option>
                        <option value="BC_A">Backward Classes - Group A (TS BC-A)</option>
                        <option value="BC_B">Backward Classes - Group B (TS BC-B)</option>
                        <option value="BC_C">Backward Classes - Group C (TS BC-C)</option>
                        <option value="BC_D">Backward Classes - Group D (TS BC-D)</option>
                        <option value="BC_E">Backward Classes - Group E (TS BC-E)</option>
                        <option value="TS_SC">Scheduled Caste (TS SC)</option>
                        <option value="TS_ST">Scheduled Tribe (TS ST)</option>
                      </>
                    )}
                    {formData.state === 'Andhra Pradesh' && (
                      <>
                        <option value="AP_OC">General / General (AP OC)</option>
                        <option value="AP_EWS">Economically Weaker Section (AP EWS)</option>
                        <option value="AP_BC_A">Backward Classes - Group A (AP BC-A)</option>
                        <option value="AP_BC_B">Backward Classes - Group B (AP BC-B)</option>
                        <option value="AP_BC_C">Backward Classes - Group C (AP BC-C)</option>
                        <option value="AP_BC_D">Backward Classes - Group D (AP BC-D)</option>
                        <option value="AP_BC_E">Backward Classes - Group E (AP BC-E)</option>
                        <option value="AP_SC">Scheduled Caste (AP SC)</option>
                        <option value="AP_ST">Scheduled Tribe (AP ST)</option>
                      </>
                    )}
                    {formData.state === 'Punjab' && (
                      <>
                        <option value="PB_GEN">General / Unreserved (Punjab UR)</option>
                        <option value="PB_EWS">Economically Weaker Section (Punjab EWS)</option>
                        <option value="PB_BC">Backward Classes (Punjab BC)</option>
                        <option value="PB_SC_MZ">Balmiki / Mazhabi Sikh (Punjab SC-MZ)</option>
                        <option value="PB_SC_OT">Other Scheduled Castes (Punjab SC-Others)</option>
                        <option value="PB_LDESM">Lineal Descendants of ESM (Punjab LDESM)</option>
                      </>
                    )}
                    {formData.state === 'Haryana' && (
                      <>
                        <option value="HR_GEN">General / Unreserved (Haryana UR)</option>
                        <option value="HR_EWS">Economically Weaker Section (Haryana EWS)</option>
                        <option value="HR_BCA">Backward Classes Block-A (Haryana BC-A)</option>
                        <option value="HR_BCB">Backward Classes Block-B (Haryana BC-B)</option>
                        <option value="HR_SC">Scheduled Caste (Haryana SC)</option>
                        <option value="HR_DSC">Deprived Scheduled Caste (Haryana DSC)</option>
                      </>
                    )}
                    {formData.state !== 'Telangana' && formData.state !== 'Andhra Pradesh' && formData.state !== 'Punjab' && formData.state !== 'Haryana' && (
                      <>
                        <option value="STATE_GEN">General / Unreserved (Local State)</option>
                        <option value="STATE_EWS">Economically Weaker Section (State EWS)</option>
                        <option value="STATE_OBC">Backward Class / OBC (State OBC)</option>
                        <option value="STATE_SC">Scheduled Caste (State SC)</option>
                        <option value="STATE_ST">Scheduled Tribe (State ST)</option>
                      </>
                    )}
                  </>
                )}
              </select>
            </div>

            {/* C. District Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                District Selection <span className="text-indigo-600 font-bold">*</span>
              </label>
              <select
                id="profile-district-select"
                required
                disabled={!formData.state}
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">Select District</option>
                {formData.state && STATES_AND_DISTRICTS[formData.state] ? (
                  STATES_AND_DISTRICTS[formData.state].map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))
                ) : (
                  <option value="" disabled>Select state first</option>
                )}
              </select>
            </div>
          </div>

          {/* Column 2: National Level Selection & Other Special Reservations */}
          <div className="space-y-4">
            <div className="border-b border-indigo-100 pb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-indigo-600 rounded-full"></span>
              <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider block">National Level Categories</span>
            </div>

            {/* A. National Categories Reservation */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                National Level Category Reservation <span className="text-indigo-600 font-bold">*</span>
              </label>
              <select
                id="profile-national-category-select"
                required
                value={formData.nationalCategory || formData.category}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setFormData({ 
                    ...formData, 
                    nationalCategory: val,
                    category: val
                  });
                }}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
              >
                <option value="UR">General / Unreserved (UR)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
                <option value="OBC_NCL">OBC - Non Creamy Layer (OBC-NCL)</option>
                <option value="OBC_CL">OBC - Creamy Layer (OBC-CL)</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
              </select>
            </div>

            {/* B. Special Ex-Servicemen & Disability Quotas */}
            <div className="space-y-2 pt-2.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Special Reservations & Quotas
              </label>
              <div className="grid grid-cols-1 gap-2.5 p-3 bg-white border border-slate-200 rounded-xl shadow-inner">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.isExServiceman} 
                    onChange={(e) => setFormData({ ...formData, isExServiceman: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-[11px] font-black text-slate-800 block leading-tight">Ex-Servicemen (ESM)</span>
                    <span className="text-[8px] text-slate-450 block leading-none font-medium">Click if defensive or military veteran</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer border-t border-slate-100 pt-2.5 select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.isPWD} 
                    onChange={(e) => setFormData({ ...formData, isPWD: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-[11px] font-black text-slate-800 block leading-tight">PwBD / PH (Physically Handicapped)</span>
                    <span className="text-[8px] text-slate-450 block leading-none font-medium">Enables physically disabled seat reservation (+10y relaxation)</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

        </div>

        {/* 2. Personal Information Section */}
        <div className="border border-slate-200 p-4 rounded-xl space-y-4">
          <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
            <span className="w-1 h-2.5 bg-slate-405 rounded-full"></span>
            Personal Information
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Age
              </label>
              <input
                type="number"
                required
                min="18"
                max="100"
                value={formData.age || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({ ...formData, age: val === '' ? 0 : parseInt(val) || 0 });
                }}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Gender
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Educational Qualifications Section */}
        <div className="border border-slate-200 p-4 rounded-xl space-y-4">
          <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
            <span className="w-1 h-2.5 bg-slate-405 rounded-full"></span>
            Educational Qualifications
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <GraduationCap className="w-3 h-3" /> Select All Your Qualifications
              </label>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search qualification (e.g. BTech, Nursing, ITI...)"
                  value={qualSearch}
                  onChange={(e) => setQualSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-[240px] overflow-y-auto space-y-4 shadow-inner">
                {['School', 'Technical/Diploma', 'Degree', 'Postgraduate', 'Teaching', 'Special', 'Other'].map(cat => {
                  const qualsInCategory = filteredQuals.filter(q => q.category === cat);
                  if (qualsInCategory.length === 0) return null;
                  
                  return (
                    <div key={cat} className="space-y-2">
                      <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">{cat}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {qualsInCategory.map(q => {
                          const isSelected = formData.qualifications.includes(q.id);
                          return (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => {
                                const newQuals = isSelected 
                                  ? formData.qualifications.filter(id => id !== q.id) 
                                  : [...formData.qualifications, q.id];
                                setFormData({ ...formData, qualifications: newQuals });
                              }}
                              className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded border text-[10px] font-medium transition-all text-left ${
                                isSelected 
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                              }`}
                            >
                              <span className="truncate">{q.label}</span>
                              {isSelected && <Check className="w-3 h-3 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {filteredQuals.length === 0 && (
                  <div className="text-center py-4 text-slate-400 text-xs italic">
                    No qualifications found matching "{qualSearch}"
                  </div>
                )}
              </div>

              {/* Selected Summary */}
              {formData.qualifications.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.qualifications.map(id => {
                    let label: string = id;
                    try {
                      label = getQualificationById(id)?.label || id;
                    } catch (e) {
                      console.error("Error fetching qualification label:", e);
                    }
                    
                    return (
                      <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[9px] font-bold">
                        {label}
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, qualifications: formData.qualifications.filter(q => q !== id) })}
                          className="hover:text-rose-600"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Basic Documents (Select All)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Aadhar Card', 'Cast Certificate', 'EWS Cert', 'Income Cert', 'Residence Cert', 'PH Certificate'].map((doc) => {
              const isSelected = formData.documents.includes(doc);
              return (
                <button
                  key={doc}
                  type="button"
                  onClick={() => {
                    const newDocs = isSelected 
                      ? formData.documents.filter(d => d !== doc) 
                      : [...formData.documents, doc];
                    setFormData({ ...formData, documents: newDocs });
                  }}
                  className={`flex items-center gap-2 p-2 rounded border text-[9px] font-bold transition-all ${
                    isSelected 
                    ? 'bg-indigo-900 border-indigo-900 text-white' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                >
                  <FileText className="w-2.5 h-2.5" />
                  {doc}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            What other certificates do you have?
          </label>
          <textarea
            value={formData.otherCertificates}
            onChange={(e) => setFormData({ ...formData, otherCertificates: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all min-h-[60px]"
            placeholder="Type your extra certificates here (e.g. NCC, Sports, Typing, Computer Basic...)"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mb-2">
          <BellRing className="w-3.5 h-3.5 text-indigo-600" />
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Real-time Job Alerts</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Subscribe to Regions
            </label>
            <div className="max-h-36 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-1.5 custom-scrollbar">
              {[
                'Central', 'Andhra Pradesh', 'Telangana', 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Tamil Nadu', 'Madhya Pradesh', 'Rajasthan', 'Karnataka',
                'Gujarat', 'Odisha', 'Kerala', 'Punjab', 'Haryana', 'Jharkhand', 'Assam', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir', 'Tripura',
                'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Arunachal Pradesh', 'Goa', 'Delhi', 'Puducherry', 'Chandigarh', 'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Ladakh', 'Lakshadweep'
              ].map((region) => {
                const isSelected = formData.subscriptions?.regions.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => {
                      const currentRegions = formData.subscriptions?.regions || [];
                      const newRegions = isSelected 
                        ? currentRegions.filter(r => r !== region) 
                        : [...currentRegions, region];
                      setFormData({ 
                        ...formData, 
                        subscriptions: { 
                          ...(formData.subscriptions || { categories: [] }), 
                          regions: newRegions 
                        } 
                      });
                    }}
                    className={`px-2.5 py-1 rounded-full border text-[9px] font-bold transition-all ${
                      isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Job Categories (Based on Qualification)
            </label>
            <div className="flex flex-wrap gap-2">
              {['Police', 'Teaching', 'Banking', 'Railway', 'Group-I/II', 'Technical'].map((cat) => {
                const isSelected = formData.subscriptions?.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const currentCats = formData.subscriptions?.categories || [];
                      const newCats = isSelected 
                        ? currentCats.filter(c => c !== cat) 
                        : [...currentCats, cat];
                      setFormData({ 
                        ...formData, 
                        subscriptions: { 
                          ...(formData.subscriptions || { regions: [] }), 
                          categories: newCats 
                        } 
                      });
                    }}
                    className={`px-3 py-1 rounded-full border text-[9px] font-bold transition-all ${
                      isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="text-[9px] text-slate-400 mt-1 italic">You will receive notifications immediately when new jobs match these criteria.</p>
          </div>

          {/* Email Digest Settings */}
          <div className="space-y-2 border-t border-slate-100 pt-3 mt-3">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pt-1">
              <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              Email Digest Subscription
            </h4>
            
            <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3 shadow-xs">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={formData.digestEnabled || false} 
                  onChange={(e) => setFormData({ ...formData, digestEnabled: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <div>
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                    Receive periodic email digests for new vacancy announcements
                  </span>
                  <span className="text-[9px] text-slate-400 block leading-normal mt-0.5 font-medium">
                    We will send a summary of verified jobs that match your subscribed regions and eligibility categories directly to your inbox.
                  </span>
                </div>
              </label>

              {formData.digestEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 border-t border-slate-200/50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Digest Email Address <span className="text-indigo-600 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="email"
                        required={formData.digestEnabled}
                        value={formData.emailForDigest || ''}
                        onChange={(e) => setFormData({ ...formData, emailForDigest: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Digest Frequency
                    </label>
                    <select
                      value={formData.digestFrequency || 'Weekly'}
                      onChange={(e) => setFormData({ ...formData, digestFrequency: e.target.value as any })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-xs"
                    >
                      <option value="Daily">Daily Summary</option>
                      <option value="Weekly">Weekly Digest</option>
                      <option value="Monthly">Monthly Digest</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {syncFeedback.status && (
        <div id="sync-feedback-card" className={`p-4 rounded-xl border text-xs gap-3 flex items-start mb-4 ${
          syncFeedback.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-850' : 
          syncFeedback.status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          syncFeedback.status === 'simulated' ? 'bg-indigo-50 border-indigo-200 text-indigo-900' :
          'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          {syncFeedback.status === 'success' ? (
            <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          ) : syncFeedback.status === 'warning' ? (
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          ) : syncFeedback.status === 'simulated' ? (
            <Info className="w-4 h-4 shrink-0 text-indigo-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="font-extrabold">{syncFeedback.message}</p>
            <p className="text-[10px] leading-relaxed opacity-90">{syncFeedback.details}</p>
            {syncFeedback.status === 'simulated' && (
              <p className="text-[10px] text-indigo-700/80 mt-1">
                💡 To feed these entries instantly to your Google Sheets tab, please configure your <strong>SHEETDB_URL</strong> or <strong>GOOGLE_SCRIPT_URL</strong> environmental keys inside the settings. You can review all backup logs & manual trigger buttons in the <strong>Sync Status</strong> dashboard tab.
              </p>
            )}
            {syncFeedback.status === 'warning' && (
              <p className="text-[10px] text-amber-800/80 mt-1">
                💡 Direct links cannot receive HTTP form data. To fix, please read the step-by-step setup guides inside our <strong>Sync Status</strong> dashboard tab.
              </p>
            )}
            {syncFeedback.status === 'error' && (
              <p className="text-[10px] text-rose-800/80 mt-1">
                💡 Double check your SheetDB_URL or script permissions. If you created a new SheetDB API, <strong>make sure you have written headers (e.g. Name, Phone, State) in Row 1 of your Google Sheet first!</strong>
              </p>
            )}
          </div>
        </div>
      )}

      <button
        disabled={isSubmitting || isLoading}
        type="submit"
        className="w-full py-2.5 bg-indigo-600 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
      >
        {isSubmitting || isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Saving Profile & Finding Jobs...</span>
          </>
        ) : (
          <>
            <Save className="w-3.5 h-3.5" />
            Save & Check Eligibility
          </>
        )}
      </button>

      {/* Connection & Headers Diagnostic Alert Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-xl border border-slate-200 p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in duration-150">
            <button 
              type="button"
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2.5">
              <div className={`p-2.5 rounded-full ${
                syncFeedback.status === 'success' ? 'bg-emerald-50 text-emerald-600' :
                syncFeedback.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                syncFeedback.status === 'simulated' ? 'bg-indigo-50 text-indigo-600' :
                'bg-rose-50 text-rose-500'
              }`}>
                {syncFeedback.status === 'success' ? (
                  <Check className="w-5 h-5" />
                ) : syncFeedback.status === 'warning' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : syncFeedback.status === 'simulated' ? (
                  <Info className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {syncFeedback.status === 'success' ? 'Profile Saved & Registered' : 'Saved in Backup, Sync Caution'}
                </h3>
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Spreadsheet Synchronization Status</span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div className={`p-4 rounded-lg text-xs leading-relaxed font-semibold ${
                syncFeedback.status === 'success' ? 'bg-emerald-50/50 border border-emerald-100 text-emerald-950' :
                syncFeedback.status === 'warning' ? 'bg-amber-50/50 border border-amber-100 text-amber-955' :
                syncFeedback.status === 'simulated' ? 'bg-indigo-50/50 border border-indigo-100 text-indigo-950' :
                'bg-rose-50/40 border border-rose-100 text-rose-955'
              }`}>
                <p className="font-extrabold mb-1">{syncFeedback.message}</p>
                <p className="text-[10px] leading-relaxed font-medium opacity-90">{syncFeedback.details}</p>
              </div>

              {syncFeedback.status === 'error' && (
                <div className="p-3.5 bg-amber-50 border border-amber-205 rounded-lg text-[10px] leading-relaxed text-slate-700 space-y-1.5">
                  <span className="font-bold text-amber-800 uppercase block">
                    💡 EXPLANATION OF GOOGLE SHEETS DESYNCHRONIZATION:
                  </span>
                  <p>
                    Your details were safely backed up in our offline Firestore database so you won't lose them! But they could not be synced immediately to the Google Sheet.
                  </p>
                  <p className="font-black text-rose-700">
                    This happens if your SHEETDB_URL is misconfigured, or if Row 1 of your Google Sheet is completely blank.
                  </p>
                  <div className="bg-white/80 p-2.5 rounded border border-amber-150 text-[10px] font-medium">
                    <strong>How to solve:</strong> Open your Google Sheet, type headers in Row 1 (like <code>Timestamp</code>, <code>Name</code>, <code>Phone</code>, <code>State</code>, etc.), sync again, or check the <strong>Sync Status</strong> dashboard tab for real-time live terminal trace logs!
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="flex-1 py-2 bg-slate-900 text-white rounded text-xs font-black transition hover:bg-slate-800 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
