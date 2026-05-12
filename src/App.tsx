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
import { Search, Filter, RefreshCw, Info, IndianRupee, Globe, Send, ShieldCheck, Sparkles, ArrowRight, Bell, BellRing, Building2 } from 'lucide-react';
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

  useEffect(() => {
    // 1. Real-time job listener
    const unsubJobs = jobService.subscribeToLatestJobs((updatedJobs) => {
      setJobs(updatedJobs);
      setIsLoading(false);
      
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

    return () => {
      unsubJobs();
      unsubAuth();
    };
  }, []); // Only run on mount

  const handleMatch = async (p: UserProfile, currentJobs: Job[] = jobs) => {
    if (currentJobs.length > 0) {
      const matchResult = await aiService.matchJobs(p, currentJobs);
      setAiMatches(matchResult.matches || []);
      setNotificationsCount(0);
    }
  };

  // Trigger match when both profile and jobs are available for the first time
  useEffect(() => {
    if (profile && jobs.length > 0 && aiMatches.length === 0) {
      handleMatch(profile, jobs);
    }
  }, [profile, jobs.length, aiMatches.length]);

  const saveProfile = async (data: UserProfile) => {
    if (!user) {
      alert("Please sign in to save your profile and get AI matching.");
      return;
    }
    setIsSaving(true);
    await profileService.saveProfile(user.uid, data);
    setProfile(data);
    await handleMatch(data);
    setIsSaving(false);
    setActiveTab('eligible');
    setTimeout(() => {
      document.getElementById('matches-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Regions: Central, Telangana, Andhra Pradesh
      // All region shows everything
      const matchesRegion = filterRegion === 'All' || job.region === filterRegion;

      // Smart State Filter: 
      // If profile exists and user is viewing 'All' regions
      // We still show Central jobs. 
      // But we might want to prioritize jobs from their state.
      // For now, the explicit region filter handles the state-specific views.

      return matchesSearch && matchesRegion;
    });
  }, [jobs, searchTerm, filterRegion, profile]);

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
          <span className="font-bold tracking-tight text-xl">Bharat Govt</span>
        </div>

        <div className="p-4 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2 px-2">Regions</div>
            {['All', 'Central', 'Telangana', 'Andhra Pradesh'].map((region) => (
              <button
                key={region}
                onClick={() => setFilterRegion(region)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterRegion === region ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800'
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
                <span className={user ? 'text-emerald-400' : 'text-amber-400'}>{user ? 'Signed In' : 'Guest'}</span>
              </div>
              {profile && (
                <>
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-mono">{profile.age}y</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qual:</span>
                    <span className="font-mono truncate ml-2">{profile.qualification}</span>
                  </div>
                </>
              )}
              <button 
                onClick={() => setActiveTab('browse')} // Simplified navigation
                className="w-full mt-2 py-2 bg-indigo-700 hover:bg-indigo-600 rounded text-center transition-colors font-bold uppercase tracking-tighter text-[10px]"
              >
                {profile ? 'Check Notifications' : 'Complete Profile'}
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-3 text-white flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Security Check</span>
              <span className="text-[10px] text-emerald-400">Active</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full"></div>
            </div>
            <div className="text-[10px] text-slate-400">Authorized government data stream enabled.</div>
          </div>
        </div>

        <div className="p-4 bg-indigo-950 text-[10px] text-indigo-400 text-center font-mono">
          v1.0.4-stable • BharatHub
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Header notificationCount={notificationsCount} />

        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Section 1: Latest Notifications & News */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <BellRing className="w-4 h-4 text-rose-500" /> Latest Jobs & News
              </h2>
              <div className="flex gap-2">
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by dept/title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
                <select 
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] outline-none shadow-sm font-bold"
                >
                  <option value="All">All Regions</option>
                  <option value="Central">Central Govt</option>
                  <option value="Telangana">Telangana State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh State</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2 space-y-1">
                {filteredJobs.slice(0, 5).map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {filteredJobs.length > 5 && (
                <button 
                  onClick={() => document.getElementById('full-job-list')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-2 bg-slate-50 text-[10px] font-bold text-slate-500 border-t border-slate-100 hover:text-indigo-600"
                >
                  View All Notifications
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Step 2: Eligibility Profile moved here */}
            <div className="lg:col-span-12 space-y-4">
               <ProfileForm 
                  initialData={profile} 
                  onSave={saveProfile} 
                  isLoading={isSaving} 
                />
            </div>

            {/* Step 3: Matches (Visible after processing) */}
            <div className="lg:col-span-12 space-y-4" id="matches-section">
              {activeTab === 'eligible' && (
                <div className="bg-indigo-900 border border-indigo-700 rounded-lg p-5 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-amber-400" /> 
                        Recommended Government Jobs for You
                      </h2>
                      <p className="text-indigo-200 text-sm mt-1">Based on your {profile?.qualification} and residency in {profile?.state}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {matchedJobItems.length > 0 ? (
                      matchedJobItems.map(({ job, guidance }) => (
                        <JobCard key={job.id} job={job} guidance={guidance} isMatch={true} />
                      ))
                    ) : (
                      <div className="py-12 text-center bg-white/5 rounded-lg border border-white/10">
                        <Info className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                        <p className="text-sm text-indigo-200">No matching jobs found for your criteria yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Full List at bottom */}
            <div className="lg:col-span-12 space-y-4" id="full-job-list">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">All Active Government Jobs</h3>
                <span className="text-[10px] text-slate-400">{filteredJobs.length} Positions Available</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.slice(5).map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
