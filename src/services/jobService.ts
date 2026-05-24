import { Job, UserProfile } from '../types';
import { STATIC_JOBS } from '../data/jobData';

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
      // Anti-Hallucination rule: STRICTLY display ONLY verified, official government notifications
      if (job.verified === false || job.verificationStatus === 'Unavailable') {
        return false;
      }

      const todayTime = new Date().getTime();
      const notificationTime = new Date(job.notificationDate).getTime();

      // Strict limit check: do not hallucinate upcoming or future jobs. Show only jobs released up to current time.
      if (todayTime < notificationTime) {
        return false;
      }

      // Rule: After 2 days beyond lastDate, automatically remove from feed
      return todayTime <= job.expiryTime;
    })
    .sort((a, b) => {
      // Sort by notification date desc (latest first)
      return new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime();
    });
};

export const jobService = {
  subscribeToLatestJobs(callback: (jobs: Job[]) => void) {
    let active = true;
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('API server down');
        const data = await res.json();
        if (active) callback(processJobs(data));
      } catch (err) {
        console.warn('[Sync Client] Failed to fetch live jobs, using cached Static Jobs fallback:', err);
        if (active) callback(processJobs(STATIC_JOBS));
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 12000); // Check for updates every 12s

    return () => {
      active = false;
      clearInterval(interval);
    };
  },

  subscribeToActivity(callback: (activity: any[]) => void) {
    let active = true;
    const fetchActivity = async () => {
      try {
        const res = await fetch('/api/activity');
        if (!res.ok) throw new Error('API server down');
        const data = await res.json();
        if (active) callback(data);
      } catch (err) {
        if (active) {
          callback([
            { id: '1', type: 'verified', title: 'BHARAT GOVT JOB NOTIFY Engine Active', timestamp: new Date().toISOString() }
          ]);
        }
      }
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 12000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  },

  async getJobById(id: string): Promise<Job | null> {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const jobsList = await res.json();
        const found = jobsList.find((j: any) => j.id === id);
        if (found) return found as Job;
      }
    } catch (err) {
      console.warn('Error fetching job by id:', err);
    }
    const staticJob = STATIC_JOBS.find(j => j.id === id);
    return staticJob || null;
  }
};

export const profileService = {
  async saveProfile(userId: string, profile: UserProfile) {
    try {
      // Synchronously record in local storage for double-safe offline fallback
      localStorage.setItem(`profile_${userId}`, JSON.stringify(profile));

      const res = await fetch(`/api/profile/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to save profile to server');
    } catch (err) {
      console.warn('[Sync Client] Failed to save profile to server, saved locally in browser:', err);
    }
  },

  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const local = localStorage.getItem(`profile_${userId}`);
      if (local) {
        try {
          return JSON.parse(local) as UserProfile;
        } catch (e) {}
      }

      const res = await fetch(`/api/profile/${userId}`);
      if (res.ok) {
        const data = await res.json();
        return data as UserProfile;
      }
    } catch (err) {
      console.warn('[Sync Client] Failed to get profile from server, trying local cache storage:', err);
    }
    const local = localStorage.getItem(`profile_${userId}`);
    if (local) {
      try {
        return JSON.parse(local) as UserProfile;
      } catch (e) {}
    }
    return null;
  }
};
