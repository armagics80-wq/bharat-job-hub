import { db, auth } from '../lib/firebase';
import { Job, UserProfile, OperationType, FirestoreErrorInfo } from '../types';
import { collection, onSnapshot, query, orderBy, getDocs, getDoc, doc, updateDoc, setDoc, serverTimestamp, limit } from 'firebase/firestore';

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

// Helper to filter and sort jobs according to real-time aggregation rules
const processJobs = (jobs: Job[]): Job[] => {
  const today = new Date();
  const todayTime = today.getTime();

  return jobs
    .map(job => {
      const notificationDate = new Date(job.notificationDate).getTime();
      const lastDate = new Date(job.lastDate);
      lastDate.setHours(23, 59, 59, 999);
      const lastDateTime = lastDate.getTime();
      const expiryThreshold = lastDateTime + (2 * 24 * 60 * 60 * 1000); // 2 days grace

      let currentStatus: 'Active' | 'Upcoming' | 'Expired' = job.status;

      if (todayTime < notificationDate) {
        currentStatus = 'Upcoming';
      } else if (todayTime > lastDateTime) {
        currentStatus = 'Expired';
      } else {
        currentStatus = 'Active';
      }

      return {
        ...job,
        status: currentStatus,
        expiryTime: expiryThreshold // Metadata for filtering
      };
    })
    .filter(job => {
      // Rule: After 2 days beyond lastDate, automatically remove from feed
      const todayTime = new Date().getTime();
      return todayTime <= job.expiryTime;
    })
    .sort((a, b) => {
      // Sort by notification date desc (latest first)
      return new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime();
    });
};

export const jobService = {
  subscribeToLatestJobs(callback: (jobs: Job[]) => void) {
    const jobsCol = collection(db, 'jobs');
    const q = query(jobsCol, orderBy('lastUpdatedAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Job[];
      callback(processJobs(jobs));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
    });
  },

  subscribeToActivity(callback: (activity: any[]) => void) {
    const activityCol = collection(db, 'activity');
    const q = query(activityCol, orderBy('timestamp', 'desc'), limit(15));
    
    return onSnapshot(q, (snapshot) => {
      const activity = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(activity);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'activity');
    });
  },

  async getJobById(id: string) {
    const path = `jobs/${id}`;
    try {
      const docSnap = await getDoc(doc(db, 'jobs', id));
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
    const path = `profiles/${userId}`;
    try {
      await updateDoc(doc(db, 'profiles', userId), { ...profile, updatedAt: serverTimestamp() });
    } catch (error: any) {
      if (error.code === 'not-found') {
        try {
          await setDoc(doc(db, 'profiles', userId), { ...profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        } catch (innerError) {
          handleFirestoreError(innerError, OperationType.CREATE, path);
        }
      } else {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }
  },

  async getProfile(userId: string) {
    const path = `profiles/${userId}`;
    try {
      const docSnap = await getDoc(doc(db, 'profiles', userId));
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
