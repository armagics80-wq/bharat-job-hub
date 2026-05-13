/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import JobCard from './components/JobCard';
import ProfileForm from './components/ProfileForm';
import { jobService, profileService } from './services/jobService';
import { aiService } from './services/aiService';
import { auth, db } from './lib/firebase';
import { Job, UserProfile } from './types';
import { Search, Filter, RefreshCw, Info, IndianRupee, Globe, Send, ShieldCheck, Sparkles, ArrowRight, Bell, BellRing, Building2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [aiMatches, setAiMatches] = useState<{id: string, guidance: string}[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'eligible'>('browse');
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [lastProcessedJobsCount, setLastProcessedJobsCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [minutesSinceLastSync, setMinutesSinceLastSync] = useState(0);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // 1. Real-time job listener
    const unsubJobs = jobService.subscribeToLatestJobs((updatedJobs) => {
      setJobs(updatedJobs);
      setIsLoading(false);
      setLastSyncTime(new Date());
      setMinutesSinceLastSync(0);
      
      setLastProcessedJobsCount(prev => {
        if (prev > 0 && updatedJobs.length > prev) {
          const newCount = updatedJobs.length - prev;
          setNotificationsCount(n => n + newCount);
        }
        return updatedJobs.length;
      });
    }, 50);

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

    // Update "minutes ago" counter every minute
    const syncInterval = setInterval(() => {
      setMinutesSinceLastSync(Math.floor((new Date().getTime() - lastSyncTime.getTime()) / 60000));
    }, 60000);

    return () => {
      unsubJobs();
      unsubAuth();
      clearInterval(syncInterval);
    };
  }, [lastSyncTime]); // Re-run when lastSyncTime updates to reset interval

  const handleMatch = async (p: UserProfile, currentJobs: Job[] = jobs) => {
    if (currentJobs.length > 0) {
      const matchResult = await aiService.matchJobs(p, currentJobs);
      setAiMatches(matchResult.matches || []);
      setNotificationsCount(0);
      if (matchResult.matches && matchResult.matches.length > 0) {
        setActiveTab('eligible');
      }
    }
  };

  // Trigger match when both profile and jobs are available for the first time
  useEffect(() => {
    if (profile && jobs.length > 0 && aiMatches.length === 0) {
      handleMatch(profile, jobs);
    }
  }, [profile, jobs.length, aiMatches.length]);

  const saveProfile = async (data: UserProfile) => {
    setIsSaving(true);
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
    await handleMatch(data);
    setIsSaving(false);
    setActiveTab('eligible');
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = filterRegion === 'All' || job.region === filterRegion;

      return matchesSearch && matchesRegion;
    });
  }, [jobs, searchTerm, filterRegion]);

  const matchedJobItems = useMemo(() => {
    if (aiMatches.length === 0) return [];
    return aiMatches
      .map(m => {
        const job = jobs.find(j => j.id === m.id);
        if (job) return { job, guidance: m.guidance };
        return null;
      })
      .filter(Boolean) as { job: Job, guidance: string }[];
  }, [aiMatches, jobs]);

  return (
    <div id="app-root" className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar - High Density Indigo Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6 flex items-center gap-3 border-b border-indigo-800">
          <div className="w-8 h-8 bg-amber-400 rounded-sm flex items-center justify-center font-bold text-indigo-950">B</div>
          <span className="font-bold tracking-tight text-xl">BharatHub</span>
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
                    <span className="font-mono truncate ml-2 text-indigo-200">{profile.qualification}</span>
                  </div>
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
          v1.0.5-stable • Bharat Govt Notifications
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header 
          notificationCount={notificationsCount} 
          onNotificationClick={() => setActiveTab('eligible')} 
        />

        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
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
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold uppercase tracking-tight text-slate-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-600" /> Latest Openings
                    </h2>
                    {(searchTerm || filterRegion !== 'All') && (
                      <button 
                        onClick={() => { setSearchTerm(''); setFilterRegion('All'); }}
                        className="text-[9px] font-bold text-indigo-600 hover:text-indigo-800 uppercase flex items-center gap-1 border border-indigo-100 px-2 py-0.5 rounded-full bg-indigo-50"
                      >
                         Clear Filter <RefreshCw className="w-2.5 h-2.5" />
                      </button>
                    )}
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
                  </div>
                </div>

                {/* Latest Jobs section */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-2 space-y-1">
                      {filteredJobs.length > 0 ? (
                        <>
                          {filteredJobs.slice(0, 10).map(job => (
                            <JobCard key={job.id} job={job} />
                          ))}
                          {filteredJobs.length > 10 && (
                            <div className="p-4 bg-slate-50 text-center">
                              <p className="text-xs text-slate-500">Showing top 10 results. Use search/filter to narrow down.</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="py-20 text-center">
                          <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                          <h3 className="text-sm font-bold text-slate-700">No jobs found</h3>
                          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms</p>
                          <button 
                            onClick={() => { setSearchTerm(''); setFilterRegion('All'); }}
                            className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                          >
                            Reset all filters
                          </button>
                        </div>
                      )}
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
                          ? `Matching jobs for your ${profile.qualification} degree in ${profile.state}`
                          : 'Complete your profile to unlock AI matching'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    {matchedJobItems.length > 0 ? (
                      matchedJobItems.map(({ job, guidance }) => (
                        <JobCard key={job.id} job={job} guidance={guidance} isMatch={true} />
                      ))
                    ) : (
                      <div className="py-16 text-center bg-white/5 rounded-lg border border-white/10">
                        {profile ? (
                          <>
                            <RefreshCw className="w-10 h-10 text-indigo-400 mx-auto mb-3 animate-spin duration-[3000ms]" />
                            <p className="text-sm text-indigo-200">Processing live data streams for matches...</p>
                            <p className="text-[10px] text-indigo-400 mt-2 uppercase tracking-widest font-mono">Status: Checking Central/State Records</p>
                          </>
                        ) : (
                          <>
                            <Info className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                            <p className="text-sm text-indigo-200">Enter your details above to get tailored recommendations.</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Badge */}
          <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Government Notification Service</span>
          </div>
        </div>
      </main>
    </div>
  );
}
