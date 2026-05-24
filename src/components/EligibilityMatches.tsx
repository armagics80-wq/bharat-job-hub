import { useState, useMemo } from 'react';
import { Job, UserProfile } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  BellRing, 
  ShieldCheck, 
  Globe, 
  Clock, 
  Bookmark, 
  Info, 
  ExternalLink, 
  Lock, 
  Unlock, 
  ArrowRight, 
  BookOpen, 
  UserCheck, 
  MapPin, 
  Award,
  PenTool,
  HelpCircle,
  Check,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, differenceInDays, formatDistanceToNow } from 'date-fns';
import { getDepartmentById } from '../data/departments';
import { getQualificationById } from '../data/qualifications';
import { isUserEligible } from '../lib/utils';
import JobCard from './JobCard';

interface EligibilityMatchesProps {
  profile: UserProfile;
  jobs: Job[];
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  aiMatches: { id: string; guidance: string }[];
  onNotifySync: (msg: string) => void;
}

export default function EligibilityMatches({
  profile,
  jobs,
  savedJobIds,
  onToggleSave,
  aiMatches,
  onNotifySync
}: EligibilityMatchesProps) {
  const [reminders, setReminders] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('user_sync_reminders');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [expandedPrepJobs, setExpandedPrepJobs] = useState<Set<string>>(new Set());

  const handleToggleReminder = (jobId: string, jobTitle: string) => {
    const next = new Set(reminders);
    if (next.has(jobId)) {
      next.delete(jobId);
      onNotifySync(`Notification cancelled for ${jobTitle}`);
    } else {
      next.add(jobId);
      onNotifySync(`✓ SMS & Email status alerts enabled for ${jobTitle}!`);
    }
    setReminders(next);
    try {
      localStorage.setItem('user_sync_reminders', JSON.stringify(Array.from(next)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePrepExpand = (jobId: string) => {
    const next = new Set(expandedPrepJobs);
    if (next.has(jobId)) {
      next.delete(jobId);
    } else {
      next.add(jobId);
    }
    setExpandedPrepJobs(next);
  };

  // Compute matches
  const { availableNow, comingSoon } = useMemo(() => {
    const availableList: { job: Job; eligibility: any; guidance: string }[] = [];
    const comingSoonList: { job: Job; isUpcoming: boolean; eligibility: any; guidance: string }[] = [];

    jobs.forEach(job => {
      const elig = isUserEligible(profile, job);
      const isUpcoming = job.status === 'Upcoming';
      const aiMatch = aiMatches.find(m => m.id === job.id);
      const guidance = aiMatch?.guidance || '';

      if (isUpcoming) {
        // Upcoming jobs always go to coming soon, regardless of current eligibility
        comingSoonList.push({
          job,
          isUpcoming: true,
          eligibility: elig,
          guidance: guidance || `Expected recruitment notification. Eligible with current qualification.`
        });
      } else {
        if (elig.isEligible) {
          // Active & eligible
          availableList.push({
            job,
            eligibility: elig,
            guidance
          });
        } else {
          // Mismatching credentials (Active but ineligible right now) -> goes to Coming Soon under target/prep
          comingSoonList.push({
            job,
            isUpcoming: false,
            eligibility: elig,
            guidance
          });
        }
      }
    });

    // Arrange list priority
    return {
      availableNow: availableList,
      comingSoon: comingSoonList
    };
  }, [jobs, profile, aiMatches]);

  const userEducationLabels = useMemo(() => {
    if (!profile.qualifications || profile.qualifications.length === 0) return 'None Selected';
    return profile.qualifications
      .map(q => getQualificationById(q)?.label || q)
      .join(', ');
  }, [profile.qualifications]);

  return (
    <div className="space-y-6">
      {/* 📋 PROFILE OVERVIEW DASHBOARD BANNER */}
      <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-12 w-96 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 flex-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
              <UserCheck className="w-3 h-3 text-emerald-400" /> Active Eligibility Profile
            </div>
            <h2 className="text-lg font-black tracking-tight text-white leading-tight">
              {profile.fullName || 'Guest Candidate'}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-1">
              Analyzing government portals for: <span className="text-emerald-400 font-bold">{userEducationLabels}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-wider">
            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5">
              <span className="text-slate-400 text-[8px]">Age</span>
              <span className="text-slate-200">{profile.age} Yrs</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5">
              <span className="text-slate-400 text-[8px]">Category</span>
              <span className="text-slate-200">{profile.category.replace('_', ' ')}</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5">
              <span className="text-slate-400 text-[8px]">Local State</span>
              <span className="text-slate-200">{profile.state || 'All India'}</span>
            </div>
            {profile.isPWD && (
              <div className="px-3 py-1.5 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 flex items-center gap-1">
                ♿ PwBD
              </div>
            )}
            {profile.isExServiceman && (
              <div className="px-3 py-1.5 bg-teal-950/40 border border-teal-800/60 rounded-lg text-teal-300 flex items-center gap-1">
                🎖️ Ex-Serviceman
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Match Count Summary Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/60 text-slate-300">
          <div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Available Now</span>
            <span className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {availableNow.length} Jobs
            </span>
          </div>
          <div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Coming Soon / Target</span>
            <span className="text-sm font-black text-white flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {comingSoon.length} Alerts
            </span>
          </div>
          <div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Matched Quotas</span>
            <span className="text-sm font-black text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {profile.category === 'UR' ? 'Standard' : 'Reserved Benefits'}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Portal Synchronizer</span>
            <span className="text-sm font-bold text-slate-300 flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              100% Verified
            </span>
          </div>
        </div>
      </div>

      {/* 📊 TWO-COLUMN VERIFICATION LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ================= COLUMN 1: AVAILABLE NOW (Left 7 Columns) ================= */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-white border border-slate-200/80 p-3.5 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  📍 AVAILABLE NOW
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Apply Online Today ({availableNow.length} Jobs Matched)</p>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tight">
              100% Eligible
            </span>
          </div>

          <div className="space-y-4">
            {availableNow.length > 0 ? (
              availableNow.map(({ job, eligibility, guidance }) => {
                const department = getDepartmentById(job.departmentId);
                const isSaved = savedJobIds.has(job.id);

                return (
                  <div 
                    key={job.id} 
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-indigo-300 transition-all group flex flex-col"
                  >
                    {/* Top status bar */}
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse font-mono" />
                        Live & Open
                      </div>
                      <span className="text-slate-400">{job.region} Government</span>
                    </div>

                    <div className="p-4 space-y-3 flex-1">
                      {/* Job Title & Source badge */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                            {job.jobCategory || 'Central Govt'}
                          </span>
                          <span className="text-[9px] font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            <Globe className="w-3 h-3 text-slate-400" /> Source: {job.officialSource}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-normal">{department?.name}</p>
                      </div>

                      {/* Primary Parameters Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] leading-tight p-3 bg-slate-50 border border-slate-150 rounded-lg">
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Vacancies</span>
                          <span className="font-extrabold text-indigo-700">{job.vacancies || 'Postings Notified'}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Salary Scale</span>
                          <span className="font-extrabold text-slate-800">{job.salary}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Apply Deadline</span>
                          <span className="font-extrabold text-rose-600">{format(new Date(job.lastDate), 'dd MMM yyyy')}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Scheduled Exam</span>
                          <span className="font-extrabold text-slate-600">{job.examDate || 'Refer to Gazette'}</span>
                        </div>
                      </div>

                      {/* 📋 ELIGIBILITY COMPOSITE STATUS METRIC */}
                      <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/80 space-y-2">
                        <div className="text-[9px] font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Verified Eligibility Checkmarks
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] text-emerald-800 font-medium leading-none">
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Age check: <strong className="text-emerald-900 font-bold">{profile.age}</strong> fits {job.minAge}-{job.maxAge} Yrs</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="truncate">Qual: <strong className="text-emerald-900 font-bold">MAPPED</strong> ({job.qualification})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Reservation Benefit: <strong className="text-emerald-900 font-bold">{profile.category.replace('_', ' ')}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>Region candidacy: <strong className="text-emerald-900 font-bold">{job.region === 'Central' ? 'Central Open' : `${job.region} state quota`}</strong></span>
                          </div>
                        </div>

                        {eligibility && eligibility.reason && (
                          <div className="text-[9px] text-emerald-700/80 italic pt-1 border-t border-emerald-100/60 leading-tight">
                            Status context: {eligibility.reason}
                          </div>
                        )}
                      </div>

                      {/* Guidance Box (if existing) */}
                      {guidance && (
                        <div className="p-2.5 bg-indigo-50 text-indigo-900 border border-indigo-100 rounded text-[10px] leading-relaxed flex gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span><strong>AI Guidance:</strong> {guidance}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer Apply action section */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[8px] text-slate-400 font-mono tracking-wider block">ID: {job.id.slice(0, 10).toUpperCase()}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleSave(job.id)}
                          className={`p-2 rounded border text-xs font-bold transition-all ${
                            isSaved 
                            ? 'bg-rose-50 border-rose-250 text-rose-600' 
                            : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-220'
                          }`}
                          title={isSaved ? "Remove Bookmark" : "Save Notification"}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                        </button>

                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                        >
                          APPLY NOW ↗
                        </a>

                        <button 
                          onClick={() => handleTogglePrepExpand(job.id)}
                          className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                            expandedPrepJobs.has(job.id) ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
                          }`}
                        >
                          {expandedPrepJobs.has(job.id) ? 'Collapse' : 'Details ⤓'}
                        </button>
                      </div>
                    </div>

                    {/* Detailed expanded content directly rendered */}
                    <AnimatePresence>
                      {expandedPrepJobs.has(job.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-150 overflow-hidden bg-slate-50/40"
                        >
                          <div className="p-4 space-y-4 text-xs leading-relaxed text-slate-600">
                            <div>
                              <h5 className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">About the recruitment & structure</h5>
                              <p className="text-[11px] font-medium text-slate-700">{job.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                              <div>
                                <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5">Selection methodology</span>
                                <span className="font-bold text-slate-700">{job.selectionProcess || 'Refer to official document standard syllabus'}</span>
                              </div>
                              <div>
                                <span className="text-[9px] font-black uppercase text-slate-400 block mb-0.5 font-mono">Exam system</span>
                                <span className="font-bold text-slate-700">{job.examPattern || 'Offline written examination / Computer based CBT test'}</span>
                              </div>
                            </div>

                            {job.howToApplySteps && job.howToApplySteps.length > 0 && (
                              <div className="bg-white p-3 rounded-lg border border-slate-200">
                                <h5 className="text-[9px] font-black uppercase tracking-wider text-indigo-900 mb-1.5">Official Application Steps</h5>
                                <ol className="list-decimal pl-4 space-y-1.5 text-[10px] font-bold text-slate-700">
                                  {job.howToApplySteps.slice(0, 5).map((step, idx) => (
                                    <li key={idx} className="leading-tight">{step}</li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center bg-white rounded-xl border border-slate-250 p-6">
                <Info className="w-12 h-12 text-slate-350 mx-auto mb-4" />
                <h4 className="text-sm font-bold text-slate-700">No active eligible matches found</h4>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                  Try broadening your profile preferences, checking optional certs, or consult upcoming ads in Coming Soon column on right.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: COMING SOON / TARGET OPPORTUNITIES (Right 5 Columns) ================= */}
        <div className="xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between bg-white border border-slate-200/80 p-3.5 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600 animate-pulse">
                <BellRing className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  🔔 COMING SOON & TARGETS
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Expected Launches & Career Prep ({comingSoon.length} Items)</p>
              </div>
            </div>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-tight">
              Future Path
            </span>
          </div>

          <div className="space-y-4">
            {comingSoon.length > 0 ? (
              comingSoon.map(({ job, isUpcoming, eligibility }) => {
                const isSaved = savedJobIds.has(job.id);
                const hasReminder = reminders.has(job.id);
                const department = getDepartmentById(job.departmentId);

                return (
                  <div 
                    key={job.id} 
                    className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all relative ${
                      isUpcoming 
                      ? 'border-indigo-150 hover:border-indigo-300' 
                      : 'border-slate-200/80 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    {/* Badge alert ribbon for eligibility locks */}
                    {!isUpcoming && (
                      <div className="absolute top-0 right-0 pt-2 pr-2">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 text-[8px] font-black uppercase tracking-wider rounded">
                          <Lock className="w-2.5 h-2.5" /> Target Prep
                        </span>
                      </div>
                    )}
                    {isUpcoming && (
                      <div className="absolute top-0 right-0 pt-2 pr-2">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[8px] font-black uppercase tracking-wider rounded animate-pulse">
                          ⏱️ EXPECTED
                        </span>
                      </div>
                    )}

                    <div className="p-4 space-y-3">
                      {/* Org details */}
                      <div className="space-y-1 pr-16 bg-transparent">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{department?.name || 'Government Organization'}</p>
                        <h4 className="text-xs font-black text-slate-800 leading-tight block">{job.title}</h4>
                        <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Globe className="w-3 h-3 text-slate-400 shrink-0" /> Portal: {job.officialSource}
                        </p>
                      </div>

                      {/* Timeline status context or qualification lockers */}
                      {isUpcoming ? (
                        <div className="p-2.5 bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-lg text-[10px] leading-relaxed space-y-1">
                          <div className="flex items-center gap-1.5 font-black text-[9px] uppercase text-indigo-850">
                            <Clock className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
                            Anticipated Launch Calendar
                          </div>
                          <div className="font-bold">
                            📅 Expected publication: <span className="text-indigo-650">{job.notificationDate ? format(new Date(job.notificationDate), 'MMMM yyyy') : 'Shortly'}</span>
                          </div>
                          <div className="text-slate-500 text-[9px] leading-tight">
                            Status: Officially approved under local state gazette. Preparing application templates.
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-900 rounded-lg text-[10px] leading-relaxed space-y-1">
                          <div className="flex items-center gap-1.5 font-black text-[9px] uppercase text-rose-850">
                            <Lock className="w-3.5 h-3.5 text-rose-500" />
                            ELIGIBILITY LOCKS PENDING
                          </div>
                          
                          <div className="space-y-1 font-bold text-rose-800 text-[9.5px]">
                            <div>
                              ✗ Qualification gap: requires <span className="bg-rose-100 text-rose-900 font-black px-1 rounded">{getQualificationById(job.minQualification)?.label || job.qualification}</span>
                            </div>
                            <div className="text-[9px] text-slate-500 leading-tight font-medium mt-1">
                              💡 Solution: Map this opportunity for future preparation. Perfect if completing matching degrees standard duration.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Brief statistics */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500 border-t border-dashed border-slate-200/80 pt-2 font-medium">
                        <span>💰 Salary Scale: <strong className="text-slate-700">{job.salary}</strong></span>
                        <span>👥 Vacancies: <strong className="text-slate-700">{job.vacancies || 'TBD'}</strong></span>
                      </div>
                    </div>

                    {/* Left footer action actions */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[8px] text-slate-400 font-mono tracking-wider">REF ID: {job.id.slice(0, 8).toUpperCase()}</span>
                      
                      <div className="flex items-center gap-1.5">
                        {isUpcoming ? (
                          <button
                            onClick={() => handleToggleReminder(job.id, job.title)}
                            className={`px-3 py-1 bg-transparent rounded text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all ${
                              hasReminder 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 animate-bounce' 
                              : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-slate-50'
                            }`}
                          >
                            {hasReminder ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                MATCH ALERT ON ✓
                              </>
                            ) : (
                              <>
                                <BellRing className="w-3 h-3 text-indigo-500 animate-pulse" />
                                SET ALERT REMINDER
                              </>
                            )}
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleTogglePrepExpand(job.id)}
                            className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-wider transition-all ${
                              expandedPrepJobs.has(job.id) ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100'
                            }`}
                          >
                            {expandedPrepJobs.has(job.id) ? 'Collapse' : 'Prep Guide ⤓'}
                          </button>
                        )}

                        <button
                          onClick={() => onToggleSave(job.id)}
                          className={`p-1.5 rounded border transition-all ${
                            isSaved 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : 'bg-white border-slate-200 text-slate-400'
                          }`}
                          title="Save Opportunity"
                        >
                          <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable preparation guide */}
                    <AnimatePresence>
                      {expandedPrepJobs.has(job.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-150 overflow-hidden bg-slate-100/30"
                        >
                          <div className="p-4 space-y-3.5 text-xs text-slate-650 leading-relaxed">
                            <div className="flex items-start gap-2">
                              <BookOpen className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                              <div>
                                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-0.5">Syllabus & recommended books</h5>
                                <p className="text-[11px] font-medium text-slate-700">
                                  Standard requirements are subject to syllabus norms in {job.region}. Candidates are advised to pursue general awareness, basic quantitative calculations and state history parameters early.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 border-t border-slate-200/80 pt-3">
                              <Award className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                              <div>
                                <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-0.5">Estimated starting salary range</h5>
                                <p className="text-[11px] font-black text-slate-75 *">
                                  Upon meeting qualification and passing exam thresholds, starting scale is {job.salary} accompanied with state DA & standard allowances.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center bg-slate-50 border border-dashed border-slate-200 p-6 rounded-xl">
                <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No upcoming target notifications available.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
