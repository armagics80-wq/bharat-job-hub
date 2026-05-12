import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
  getDoc,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Job, UserProfile, OperationType, FirestoreErrorInfo } from '../types';

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const jobService = {
  async getLatestJobs(count: number = 20) {
    const path = 'jobs';
    try {
      const q = query(
        collection(db, path), 
        where('status', '==', 'Active'),
        orderBy('notificationDate', 'desc'), 
        limit(count)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  subscribeToLatestJobs(callback: (jobs: Job[]) => void, count: number = 20) {
    const path = 'jobs';
    const q = query(
      collection(db, path), 
      where('status', '==', 'Active'),
      orderBy('notificationDate', 'desc'), 
      limit(count)
    );
    
    return onSnapshot(q, (snapshot: any) => {
      const jobs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Job));
      callback(jobs);
    }, (error: any) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  },

  async getJobsByRegion(region: string) {
    const path = 'jobs';
    try {
      const q = query(
        collection(db, path), 
        where('region', '==', region),
        where('status', '==', 'Active'),
        orderBy('notificationDate', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async getJobById(id: string) {
    const path = `jobs/${id}`;
    try {
      const docRef = doc(db, 'jobs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Job;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  }
};

export const profileService = {
  async saveProfile(userId: string, profile: UserProfile) {
    const path = `userProfiles/${userId}`;
    try {
      await updateDoc(doc(db, 'userProfiles', userId), { ...profile, updatedAt: serverTimestamp() });
    } catch (error: any) {
      if (error.code === 'not-found') {
        // Create if doesn't exist
        try {
          await setDoc(doc(db, 'userProfiles', userId), { ...profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        } catch (innerError) {
          handleFirestoreError(innerError, OperationType.CREATE, path);
        }
      } else {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  },

  async getProfile(userId: string) {
    const path = `userProfiles/${userId}`;
    try {
      const docSnap = await getDoc(doc(db, 'userProfiles', userId));
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  }
};
