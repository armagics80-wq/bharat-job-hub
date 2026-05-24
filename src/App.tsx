/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MinimalActivityFeed from './components/MinimalActivityFeed';
import JobCard from './components/JobCard';
import ProfileForm from './components/ProfileForm';
import ErrorBoundary from './components/ErrorBoundary';
import { jobService, profileService } from './services/jobService';
import { aiService } from './services/aiService';
import { STATIC_JOBS } from './data/jobData';
import { auth } from './lib/firebase';
import { Job, UserProfile } from './types';
import { isUserEligible } from './lib/utils';
import { getDepartmentById } from './data/departments';
import { getQualificationById } from './data/qualifications';
import { Search, Filter, RefreshCw, Info, IndianRupee, Globe, Send, ShieldCheck, Sparkles, ArrowRight, Bell, BellRing, Building2, Briefcase, Calendar, Clock, Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, differenceInDays } from 'date-fns';

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(STATIC_JOBS);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [aiMatches, setAiMatches] = useState<{id: string, guidance: string}[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'eligible'>('browse');
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [knownJobIds, setKnownJobIds] = useState<Set<string>>(new Set());
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [minutesSinceLastSync, setMinutesSinceLastSync] = useState(0);
  const [isGuest, setIsGuest] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear success message after 3s
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    // 1. Real-time job listener
    const unsubJobs = jobService.subscribeToLatestJobs((updatedJobs) => {
      // Merge with static jobs as fallback to ensure something always renders
      const combined = [...updatedJobs];
      const seenIds = new Set(updatedJobs.map(j => j.id));
      
      STATIC_JOBS.forEach(sJob => {
        if (!seenIds.has(sJob.id)) {
          combined.push(sJob);
        }
      });

      // Sort jobs by latest verified update by default
      const sorted = combined.sort((a, b) => {
        const dateA = a.lastUpdatedAt ? new Date(a.lastUpdatedAt).getTime() : 0;
        const dateB = b.lastUpdatedAt ? new Date(b.lastUpdatedAt).getTime() : 0;
        return dateB - dateA;
      });
      setJobs(sorted);
      setIsLoading(false);
      setLastSyncTime(new Date());
      setMinutesSinceLastSync(0);
      
      setKnownJobIds(prevIds => {
        if (prevIds.size > 0) {
          const newJobs = updatedJobs.filter(job => !prevIds.has(job.id));
          
          if (newJobs.length > 0) {
            // Smart notifications based on subscriptions
            const subs = profile?.subscriptions;
            const filtered = subs && (subs.regions.length > 0 || subs.categories.length > 0)
              ? newJobs.filter(job => {
                  const regionMatch = subs.regions.length === 0 || subs.regions.includes(job.region);
                  const dept = getDepartmentById(job.departmentId);
                  const categoryMatch = subs.categories.length === 0 || subs.categories.some(cat => 
                    job.title.toLowerCase().includes(cat.toLowerCase()) || 
                    dept?.name.toLowerCase().includes(cat.toLowerCase()) ||
                    dept?.category.toLowerCase().includes(cat.toLowerCase())
                  );
                  return regionMatch && categoryMatch;
                })
              : newJobs;

            if (filtered.length > 0) {
              setNotificationsCount(n => n + filtered.length);
            }
          }
        }
        return new Set(updatedJobs.map(j => j.id));
      });
    });

    // 2. Auth listener
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const p = await profileService.getProfile(u.uid);
        if (p) {
          setProfile(p);
        }
      }
    });

    return () => {
      unsubJobs();
      unsubAuth();
    };
  }, [profile]);

  // Update "minutes ago" counter every minute
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setMinutesSinceLastSync(Math.floor((new Date().getTime() - lastSyncTime.getTime()) / 60000));
    }, 60000);

    return () => clearInterval(syncInterval);
  }, [lastSyncTime]);

  const handleMatch = async (p: UserProfile, currentJobs: Job[] = jobs) => {
    if (currentJobs.length > 0) {
      setMatchError(null);
      setIsMatching(true);
      try {
        // 1. DETERMINISTIC LOCAL FILTERING (STRICT ACCURACY)
        // Ensure p and currentJobs are valid
        if (!p || !currentJobs) throw new Error("Invalid profile or jobs data");

        const eligibleJobs = currentJobs.filter(job => {
          try {
            return isUserEligible(p, job).isEligible;
          } catch (e) {
            console.error("Eligibility check failed for job:", job.id, e);
            return false;
          }
        });
        
        // Initial matches based on code logic
        const localMatches = eligibleJobs.map(job => {
          let qualLabel = 'background';
          try {
            if (p.qualifications && p.qualifications.length > 0) {
              qualLabel = getQualificationById(p.qualifications[0])?.label || p.qualifications[0];
            }
          } catch (e) {
            console.error("Local match label error:", e);
          }

          return {
            id: job.id,
            guidance: `Verified Eligibility: Your ${qualLabel}${p.qualifications.length > 1 ? ' and other credentials' : ''} meet the official requirements for this ${job.region} position.`
          };
        });

        // Use a functional update to avoid unnecessary re-triggers if possible
        setAiMatches(localMatches);
        
        // 2. OPTIONAL AI GUIDANCE (ONLY FOR TEXT ENHANCEMENT)
        if (process.env.GEMINI_API_KEY && eligibleJobs.length > 0) {
          try {
            const aiResult = await aiService.matchJobs(p, eligibleJobs);
            if (aiResult && aiResult.matches && aiResult.matches.length > 0) {
              setAiMatches(aiResult.matches);
            }
          } catch (aiErr) {
            console.error("AI Matching failed, falling back to local results", aiErr);
          }
        }

        setNotificationsCount(0);
        if (eligibleJobs.length > 0) {
          setActiveTab('eligible');
        }
      } catch (error) {
        console.error("Matching error:", error);
        setMatchError("Unable to load matching jobs. Please check your profile details and try again.");
      } finally {
        setIsMatching(false);
      }
    }
  };

  // Trigger match when both profile and jobs are available for the first time
  // Use a ref to prevent infinite loops if aiMatches remains empty
  const hasAttemptedFirstMatch = useState(false)[0]; // Minimal toggle or just dependency check
  const [lastMatchedProfileId, setLastMatchedProfileId] = useState<string>('');

  useEffect(() => {
    // Generate a simple hash of profile to detect changes
    const profileKey = profile ? `${profile.fullName}-${profile.age}-${profile.qualifications.join(',')}` : '';
    
    if (profile && jobs.length > 0 && profileKey !== lastMatchedProfileId && !isMatching) {
      setLastMatchedProfileId(profileKey);
      handleMatch(profile, jobs);
    }
  }, [profile, jobs.length, isMatching, lastMatchedProfileId]);

  const saveProfile = async (data: UserProfile) => {
    setIsSaving(true);
    setAiMatches([]); // Aggressively clear results to prevent stale data
    try {
      if (user) {
        await profileService.saveProfile(user.uid, data);
      } else {
        // Create a guest session automatically if not logged in
        const guestId = 'guest-' + Math.random().toString(36).substring(7);
        setUser({
          uid: guestId,
          displayName: 'Guest User',
          photoURL: null
        });
        localStorage.setItem('temp_profile', JSON.stringify(data));
        setIsGuest(true);
      }
      setProfile(data);
      setSuccessMessage('Eligibility profile updated successfully!');
      setIsSaving(false);
      setActiveTab('eligible');
      
      // Trigger matching immediately after save
      await handleMatch(data);
    } catch (error) {
      console.error("Save error:", error);
      setIsSaving(false);
    }
  };

  const { activeJobs, upcomingJobs, totalMonitored } = useMemo(() => {
    const processed = jobs.filter(job => {
      const dept = getDepartmentById(job.departmentId);
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           dept?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dept?.oldNames?.some(old => old.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRegion = filterRegion === 'All' || job.region === filterRegion;
      const matchesCategory = filterCategory === 'All' || dept?.category === filterCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });

    const results = {
      activeJobs: processed.filter(j => j.status === 'Active' || j.status === 'Upcoming'),
      upcomingJobs: processed.filter(j => j.status === 'Upcoming'),
      totalMonitored: processed.length
    };
    return results;
  }, [jobs, searchTerm, filterRegion, filterCategory]);

  const matchedJobItems = useMemo(() => {
    if (!aiMatches || aiMatches.length === 0) return [];
    return aiMatches
      .map(m => {
        try {
          const job = jobs.find(j => j.id === m.id);
          if (job && profile) {
            const elig = isUserEligible(profile, job);
            if (!elig.isEligible) return null; // Strict filter failsafe
          }
          if (job) return { job, guidance: m.guidance };
        } catch (e) {
          console.error("Match processing error:", e);
        }
        return null;
      })
      .filter(Boolean) as { job: Job, guidance: string }[];
  }, [aiMatches, jobs, profile]);

  const { matchedActive, matchedFuture } = useMemo(() => {
    return {
      matchedActive: matchedJobItems.filter(m => m.job.status === 'Active'),
      matchedFuture: matchedJobItems.filter(m => m.job.status === 'Upcoming')
    };
  }, [matchedJobItems]);

  return (
    <ErrorBoundary>
      <div id="app-root" className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar - High Density Indigo Sidebar */}
      <aside className="w-64 bg-indigo-950 text-white flex flex-col shrink-0 hidden lg:flex border-r border-indigo-900">
        <div className="p-5 flex items-center gap-3 border-b border-indigo-900/60">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-black text-white text-sm shadow-md">🇮🇳</div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-black tracking-tight text-[10px] text-orange-400 uppercase leading-none">BHARAT GOVT</span>
            <span className="font-black tracking-tight text-sm text-white uppercase leading-normal truncate">JOB NOTIFY</span>
          </div>
        </div>

        <div className="p-4 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2 px-2">Navigation</div>
            <button
                onClick={() => setActiveTab('browse')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'browse' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                Browse All Jobs
              </button>
              <button
                onClick={() => setActiveTab('eligible')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  activeTab === 'eligible' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Your Matches
                </div>
                {notificationsCount > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {notificationsCount}
                  </span>
                )}
              </button>
          </nav>

          <nav className="space-y-1">
            <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2 px-2">Regions</div>
            {['All', 'Central', 'Telangana', 'Andhra Pradesh'].map((region) => (
              <button
                key={region}
                onClick={() => {
                  setFilterRegion(region);
                  setActiveTab('browse');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterRegion === region && activeTab === 'browse' ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800'
                }`}
              >
                <span>{region === 'All' ? '🇮🇳' : region === 'Central' ? '🏛️' : region === 'Telangana' ? '⚖️' : '🌴'}</span>
                {region === 'All' ? 'All Regions' : region}
              </button>
            ))}
          </nav>

          <div>
            <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2 px-2">Your Profile</div>
            <div className="bg-indigo-950/50 p-3 rounded-lg border border-indigo-700/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={(user || isGuest) ? 'text-emerald-400' : 'text-amber-400'}>{(user || isGuest) ? 'Signed In' : 'Guest'}</span>
              </div>
              {profile && (
                <>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-mono">{profile.age}y</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qual:</span>
                    <span className="font-mono truncate ml-2 text-indigo-200">
                      {profile.qualifications && profile.qualifications.length > 0 
                        ? (() => {
                            try {
                              const label = getQualificationById(profile.qualifications[0])?.label || profile.qualifications[0];
                              return `${label.split(' ')[0]}${profile.qualifications.length > 1 ? '+' : ''}`;
                            } catch (e) {
                              return profile.qualifications[0];
                            }
                          })()
                        : 'None'}
                    </span>
                  </div>
                  {profile.subscriptions && (profile.subscriptions.regions.length > 0 || profile.subscriptions.categories.length > 0) && (
                    <div className="pt-2 mt-2 border-t border-indigo-800/50">
                      <div className="text-[9px] text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Bell className="w-2 h-2" /> Subscriptions
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {profile.subscriptions.regions.map(r => (
                          <span key={r} className="bg-indigo-800 px-1 rounded text-[8px]">{r}</span>
                        ))}
                        {profile.subscriptions.categories.map(c => (
                          <span key={c} className="bg-indigo-800 px-1 rounded text-[8px]">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              <button 
                onClick={() => setActiveTab(profile ? 'eligible' : 'browse')}
                className="w-full mt-2 py-2 bg-indigo-700 hover:bg-indigo-600 rounded text-center transition-colors font-bold uppercase tracking-tighter text-[10px]"
              >
                {profile ? 'Check Matches' : 'Complete Profile'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-950 text-[10px] text-indigo-400 text-center font-mono">
          v1.1.0-stable • BHARAT GOVT JOB NOTIFY
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header 
          notificationCount={notificationsCount} 
          onNotificationClick={() => setActiveTab('eligible')} 
        />

        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Success Notification */}
          <AnimatePresence>
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-20 right-4 lg:right-10 z-[100] bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-3 border border-emerald-500"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-bold">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200 mb-6 sticky top-0 bg-slate-50 z-20 pt-2 lg:hidden">
             <button 
              onClick={() => setActiveTab('browse')}
              className={`pb-3 text-[10px] font-bold uppercase tracking-wider transition-all relative ${activeTab === 'browse' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              Browse
              {activeTab === 'browse' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
            </button>
            <button 
              onClick={() => setActiveTab('eligible')}
              className={`pb-3 text-[10px] font-bold uppercase tracking-wider transition-all relative ${activeTab === 'eligible' ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              Matches {notificationsCount > 0 && <span className="ml-1 text-rose-500 text-[8px]">•</span>}
              {activeTab === 'eligible' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'browse' ? (
              <motion.div 
                key="browse"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold uppercase tracking-tight text-slate-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-600" /> Aggregated Notifications
                      </h2>
                      {(searchTerm || filterRegion !== 'All' || filterCategory !== 'All') && (
                        <button 
                          onClick={() => { setSearchTerm(''); setFilterRegion('All'); setFilterCategory('All'); }}
                          className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 uppercase flex items-center gap-1 border border-indigo-100 px-2 py-0.5 rounded-full bg-indigo-50"
                        >
                           Clear Filter <RefreshCw className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative w-48 sm:w-64">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search by dept/title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <select 
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] outline-none font-bold text-slate-600"
                    >
                      <option value="All">All Regions</option>
                      <option value="Central">Central Govt</option>
                      <option value="Telangana">Telangana State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh State</option>
                    </select>
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] outline-none font-bold text-slate-600"
                    >
                      <option value="All">All Categories</option>
                      <option value="Teaching">Teaching Jobs</option>
                      <option value="Police">Police Jobs</option>
                      <option value="Banking">Banking Jobs</option>
                      <option value="Railway">Railway Jobs</option>
                      <option value="SSC">SSC Jobs</option>
                      <option value="UPSC">UPSC Jobs</option>
                      <option value="PSC">PSC Jobs</option>
                      <option value="Defence">Defence Jobs</option>
                    </select>
                  </div>
                </div>

                {/* Dashboard Section */}
                <MinimalActivityFeed jobs={jobs} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Section 1: Available Now (Left Column) */}
                  <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="text-sm font-bold uppercase tracking-tight text-slate-700 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-600" /> Live Verification Stream
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 font-medium">Auto-Synced {minutesSinceLastSync === 0 ? 'just now' : `${minutesSinceLastSync}m ago`}</span>
                        <span className="text-[10px] text-slate-500 font-medium font-mono">{activeJobs.length} Verified Ads</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                      {isMatching && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                             <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
                             <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Refreshing eligible jobs...</p>
                          </div>
                        </div>
                      )}
                      
                        <div className="p-2 space-y-1">
                        {matchError ? (
                          <div className="py-12 text-center px-6">
                            <AlertCircle className="w-10 h-10 text-rose-300 mx-auto mb-4" />
                            <h3 className="text-sm font-bold text-slate-700">{matchError}</h3>
                            <button 
                              onClick={() => handleMatch(profile!, jobs)}
                              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded text-[10px] font-bold uppercase tracking-widest"
                            >
                              Retry Matching
                            </button>
                          </div>
                        ) : activeJobs.length > 0 ? (
                          activeJobs.map(job => (
                            <JobCard key={job.id} job={job} userProfile={profile} />
                          ))
                        ) : (
                          <div className="py-20 text-center">
                            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-sm font-bold text-slate-700">No matching jobs currently available</h3>
                            <p className="text-xs text-slate-500 mt-1">Check back soon for fresh government notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Future Opportunities (Right Column) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <h2 className="text-sm font-bold uppercase tracking-tight text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-600" /> Notifications Feed
                      </h2>
                    </div>

                    <div className="bg-white/50 rounded-xl border border-dashed border-indigo-200 p-4 space-y-4 relative overflow-hidden">
                      {isMatching && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                           <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                        </div>
                      )}
                      {upcomingJobs.length > 0 ? (
                        upcomingJobs.map(job => {
                          const elig = profile ? isUserEligible(profile, job) : null;
                          return (
                            <div key={job.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-1 flex gap-1">
                                {job.verified && (
                                  <span title="Official Verified" className="text-emerald-600 bg-emerald-50 p-0.5 rounded border border-emerald-100">
                                    <ShieldCheck className="w-2.5 h-2.5" />
                                  </span>
                                )}
                                {elig && (
                                  <span className={`p-0.5 rounded border ${elig.isEligible ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                    {elig.isEligible ? <CheckCircle2 className="w-2.5 h-2.5" /> : <AlertCircle className="w-2.5 h-2.5" />}
                                  </span>
                                )}
                                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${
                                  job.status === 'Upcoming' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {job.status === 'Upcoming' ? 'Notification Awaited' : job.status}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 pr-12 leading-tight">{job.title}</h4>
                              <p className="text-[10px] text-slate-500 mt-1">{getDepartmentById(job.departmentId)?.name || 'Unknown Dept'}</p>
                              
                              {elig && !elig.isEligible && (
                                <p className="text-[9px] text-rose-600 font-bold mt-2 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> Ineligible: {job.minQualification} required
                                </p>
                              )}

                              <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-2">
                                <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  job.status === 'Upcoming' ? 'text-indigo-600 bg-indigo-50' : 'text-rose-600 bg-rose-50'
                                }`}>
                                  {job.status === 'Upcoming' ? `Starts: ${format(new Date(job.notificationDate), 'MMM d, yyyy')}` : `Closed: ${format(new Date(job.lastDate), 'MMM d, yyyy')}`}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-10 text-center text-slate-400">
                          <Info className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="text-[10px] uppercase font-bold tracking-widest">No upcoming notifications</p>
                        </div>
                      )}
                      
                      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                         <div className="flex items-center gap-2 mb-1">
                            <BellRing className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-tighter">Stay Notified</span>
                         </div>
                         <p className="text-[9px] text-indigo-700/70 leading-relaxed">We track yearly recruitment patterns and departmental announcements to help you prepare early.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="eligible"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <ProfileForm 
                  initialData={profile} 
                  onSave={saveProfile} 
                  isLoading={isSaving} 
                />

                <div className="bg-indigo-900 border border-indigo-700 rounded-xl p-5 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <ShieldCheck className="w-32 h-32" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 relative">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-amber-400" /> 
                        Recommended for Your Profile
                      </h2>
                      <p className="text-indigo-200 text-sm mt-1">
                        {profile 
                          ? `Matching jobs for your qualifications in ${profile.state}`
                          : 'Complete your profile to unlock AI matching'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 relative">
                    {profile ? (
                      isMatching ? (
                        <div className="xl:col-span-3 py-16 text-center bg-white/5 rounded-lg border border-white/10">
                          <RefreshCw className="w-8 h-8 text-indigo-400 mx-auto mb-3 animate-spin" />
                          <p className="text-sm text-indigo-200">Analyzing official recruitment calendars...</p>
                        </div>
                      ) : (
                        <>
                          {/* Matched Active Jobs */}
                          <div className="xl:col-span-2 space-y-4">
                            <div className="flex items-center justify-between px-1">
                              <h2 className="text-sm font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Available Jobs Now
                              </h2>
                            </div>
                            <div className="space-y-4">
                              {matchedActive.length > 0 ? (
                                matchedActive.map(({ job, guidance }) => (
                                  <JobCard key={job.id} job={job} guidance={guidance} isMatch={true} userProfile={profile} />
                                ))
                              ) : (
                                <div className="py-12 text-center bg-white/5 rounded-xl border border-dashed border-white/20 text-indigo-200">
                                  <Info className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm font-medium">No matching jobs found currently.</p>
                                  <p className="text-[10px] mt-1 opacity-60">We only show jobs where you meet 100% of the eligibility criteria.</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Future Opportunities */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                              <h2 className="text-sm font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                <BellRing className="w-4 h-4 text-amber-400" /> Future Opportunities
                              </h2>
                            </div>
                            <div className="space-y-3">
                              {matchedFuture.length > 0 ? (
                                matchedFuture.map(({ job, guidance }) => (
                                  <div key={job.id} className="bg-indigo-800/40 p-4 rounded-xl border border-indigo-700/50 relative group shadow-lg">
                                    <div className="absolute top-2 right-2">
                                      <span className="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase bg-indigo-900/80 text-amber-200 border border-amber-600/50">
                                        Notification Awaited
                                      </span>
                                    </div>
                                    <h4 className="text-xs font-bold text-white pr-10">{job.title}</h4>
                                    <p className="text-[10px] text-indigo-300 mt-1 line-clamp-1 italic">
                                      {getDepartmentById(job.departmentId)?.name || 'Unknown Dept'}
                                    </p>
                                    
                                    <div className="mt-3 p-2 bg-indigo-950/50 rounded border border-indigo-700/30">
                                      <p className="text-[10px] text-indigo-200 leading-tight">
                                        <Sparkles className="w-2.5 h-2.5 inline mr-1 text-amber-400" />
                                        {guidance}
                                      </p>
                                    </div>
                                    
                                    <div className="mt-3 flex items-center justify-between text-[9px] font-bold">
                                      <span className="text-amber-400/90 flex items-center gap-1">
                                        <Calendar className="w-2.5 h-2.5" />
                                        Expected: {format(new Date(job.notificationDate), 'MMMM yyyy')}
                                      </span>
                                      <span className="text-indigo-400 uppercase tracking-tighter">Deterministic Match</span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="py-10 text-center bg-white/5 rounded-lg border border-white/10 text-indigo-400">
                                  <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 italic px-4">No future predicted alerts for your qualification</p>
                                </div>
                              )}
                            </div>
                            <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-700/30">
                               <p className="text-[10px] text-indigo-300/80 leading-relaxed italic">
                                 <Info className="w-3 h-3 inline mr-1 text-indigo-400" />
                                 Note: Future opportunities are based on recurring recruitment patterns. Notification awaited.
                               </p>
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      <div className="xl:col-span-3 py-16 text-center bg-white/5 rounded-lg border border-white/10">
                        <Info className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                        <p className="text-sm text-indigo-200 px-10">Enter your official details above to get precise eligibility recommendations.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        </div>
      </main>
    </div>
  </ErrorBoundary>
  );
}
