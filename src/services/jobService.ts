import { db, auth } from '../lib/firebase';
import { Job, UserProfile, OperationType, FirestoreErrorInfo } from '../types';
import { STATIC_JOBS } from '../data/jobData';

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
  async getLatestJobs(count: number = 20) {
    // Merge static and potential live data (if any)
    const combinedJobs = processJobs(STATIC_JOBS);
    return combinedJobs.slice(0, count);
  },

  subscribeToLatestJobs(callback: (jobs: Job[]) => void, _count: number = 20) {
    // For "reliable local data handling", we return local data immediately
    // In a real app, this could also listen to Firestore and merge
    const activeJobs = processJobs(STATIC_JOBS);
    
    // Simulate initial load without the "fake loading" feel
    setTimeout(() => {
      callback(activeJobs);
    }, 100);

    // Return a dummy unsubscriber
    return () => {};
  },

  async getJobsByRegion(region: string) {
    const activeJobs = processJobs(STATIC_JOBS);
    if (region === 'All') return activeJobs;
    return activeJobs.filter(j => j.region === region);
  },

  async getJobById(id: string) {
    return STATIC_JOBS.find(j => j.id === id) || null;
  }
};

export const profileService = {
  async saveProfile(userId: string, profile: UserProfile) {
    const { updateDoc, doc, setDoc, serverTimestamp } = await import('firebase/firestore');
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
    const { getDoc, doc } = await import('firebase/firestore');
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
