import { useState, useMemo } from 'react';
import { Job, UserProfile } from '../types';
import { Calendar, ExternalLink, BadgeInfo, Sparkles, ChevronDown, ChevronUp, BellRing, ShieldCheck, Zap, Globe, AlertCircle, Clock, CheckCircle2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isToday, differenceInDays, formatDistanceToNow } from 'date-fns';
import { getDepartmentById } from '../data/departments';
import { isUserEligible } from '../lib/utils';
import { getQualificationById } from '../data/qualifications';

interface JobCardProps {
  job: Job;
  guidance?: string;
  isMatch?: boolean;
  userProfile?: UserProfile | null;
}

export default function JobCard({ job, guidance, isMatch, userProfile }: JobCardProps) {
  const [showHowToApply, setShowHowToApply] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const eligibility = useMemo(() => {
    if (!userProfile) return null;
    return isUserEligible(userProfile, job);
  }, [userProfile, job]);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Central': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Telangana': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Andhra Pradesh': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

    const getSourceTypeColor = (type: Job['sourceType']) => {
      switch (type) {
        case 'Official Notification': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'Upcoming Opportunity': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'Media Prediction': return 'bg-purple-50 text-purple-700 border-purple-100';
        default: return 'bg-slate-50 text-slate-700 border-slate-100';
      }
    };

  const getStatusDisplay = (status: Job['status'], lastDate: string, notificationDate: string) => {
    try {
      const today = new Date();
      const todayTime = today.getTime();
      
      const last = lastDate ? new Date(lastDate) : new Date();
      if (!lastDate) {
        // Fallback for missing date
        return {
          label: 'Active',
          color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          message: 'Status verified via official portal'
        };
      }
      
      last.setHours(23, 59, 59, 999);
      const lastTime = last.getTime();
      const notify = notificationDate ? new Date(notificationDate) : new Date();
      
      // Check for grace period (2 days after last date)
      const gracePeriodEnd = lastTime + (2 * 24 * 60 * 60 * 1000);

      if (todayTime > lastTime) {
        if (todayTime <= gracePeriodEnd) {
          return {
            label: `Expired ${formatDistanceToNow(last)} ago`,
            color: 'bg-rose-100 text-rose-800 border-rose-200',
            message: 'Official deadline passed. Posting remains active for 48h audit.'
          };
        }
        return {
          label: 'Closed',
          color: 'bg-slate-100 text-slate-500 border-slate-200',
          message: 'Notification removed from active cycle.'
        };
      }

      if (todayTime < notify.getTime()) {
        return {
          label: 'Upcoming',
          color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
          message: 'Aggregated from upcoming recruitment calendars'
        };
      }

      return {
        label: 'Active',
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        message: 'Verified Live Notification'
      };
    } catch (e) {
      console.error("Status calculation error:", e);
      return {
        label: 'Active',
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        message: 'Status check pending'
      };
    }
  };

  const statusInfo = getStatusDisplay(job.status, job.lastDate, job.notificationDate);
  const department = getDepartmentById(job.departmentId);
  const isVerified = job.verificationStatus === 'Verified' || (department?.verified && job.officialSource);
  const isUpcoming = job.status === 'Upcoming' || new Date(job.notificationDate) > new Date();
  const isExpired = new Date(job.lastDate) < new Date();
  const isActive = job.status === 'Active' && !isExpired && !isUpcoming;
  
  const isJobNewToday = job.lastUpdatedAt ? (new Date().getTime() - new Date(job.lastUpdatedAt).getTime()) <= (24 * 60 * 60 * 1000) : false;
  const isRecentlyUpdated = job.lastUpdatedAt ? differenceInDays(new Date(), new Date(job.lastUpdatedAt)) <= 3 && !isJobNewToday : false;
  const isClosingSoon = !isExpired && differenceInDays(new Date(job.lastDate), new Date()) <= 3 && differenceInDays(new Date(job.lastDate), new Date()) >= 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowHowToApply(!showHowToApply)}
      className={`relative group bg-white border-b last:border-b-0 border-slate-100 p-3 transition-colors hover:bg-slate-50 cursor-pointer ${isMatch ? 'bg-indigo-50/10' : ''} ${showHowToApply ? 'bg-slate-50' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Status & Category Badges */}
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${getSourceTypeColor(job.sourceType)}`}>
              {job.sourceType}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${getRegionColor(job.region)}`}>
              {job.region}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-bold uppercase tracking-tighter border border-slate-200">
               {job.jobCategory || 'General'}
            </span>

            {/* Verification Badge */}
            {job.verificationStatus === 'Verified' ? (
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold uppercase tracking-tighter flex items-center gap-1 border border-emerald-100">
                <ShieldCheck className="w-2.5 h-2.5" /> Official Notification
              </span>
            ) : job.verificationStatus === 'Pending' ? (
              <span className="text-[9px] px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded font-bold uppercase tracking-tighter flex items-center gap-1 border border-amber-100">
                <Clock className="w-2.5 h-2.5" /> Verification Pending
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded font-bold uppercase tracking-tighter flex items-center gap-1 border border-rose-100">
                <BadgeInfo className="w-2.5 h-2.5" /> Source Awaited
              </span>
            )}
            
            {isJobNewToday && (
              <span className="text-[9px] px-1.5 py-0.5 bg-rose-600 text-white rounded font-bold uppercase tracking-tighter flex items-center gap-1 shadow-sm ring-1 ring-rose-400 ring-offset-0">
                <Zap className="w-2 h-2 fill-white animate-pulse" /> New Today
              </span>
            )}
          </div>

          <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate flex items-center gap-2">
            {job.title}
            {eligibility && (
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                eligibility.isEligible 
                ? 'bg-emerald-100 text-emerald-700' 
                : eligibility.type === 'error' 
                  ? 'bg-rose-100 text-rose-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {eligibility.isEligible ? <CheckCircle2 className="w-2 h-2" /> : <AlertCircle className="w-2 h-2" />}
                {eligibility.isEligible ? 'Eligible' : 'Check Criteria'}
              </span>
            )}
          </h3>

          {eligibility && !eligibility.isEligible && (
            <p className="text-[9px] font-bold text-rose-600 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-2.5 h-2.5" /> {eligibility.reason}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-indigo-400" />
              <span className="font-medium">Last Date: {job.lastDate ? format(new Date(job.lastDate), 'dd MMM yyyy') : 'Awaited'}</span>
            </div>
            {job.vacancies && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[9px] font-black uppercase tracking-wider">
                <span>{job.vacancies} Vacancies</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] font-bold text-slate-400 uppercase">
                {job.lastVerifiedAt ? `Verified ${formatDistanceToNow(new Date(job.lastVerifiedAt), { addSuffix: true })}` : 'Fresh Update'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <span className="font-bold text-indigo-600 truncate max-w-[120px]">{department?.name || 'Official Portal'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-center">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-bold text-slate-900">{job.salary}</div>
            <div className="text-[9px] text-slate-400 font-mono tracking-tighter">{job.id.slice(0, 8)}</div>
          </div>
          <div className="flex flex-col gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowHowToApply(!showHowToApply); }}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                showHowToApply ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showHowToApply && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-6 pb-6">
              
              {/* SECTION 1: DETAILS */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeInfo className="w-4 h-4 text-white" />
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">1. Technical Details & Summary</h4>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium">Notification Ref: {job.id}</span>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Primary Info Column */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Position & Department</h5>
                        <p className="text-[12px] font-bold text-slate-900 leading-tight">{job.title}</p>
                        <p className="text-[11px] text-indigo-600 font-medium mt-1">{department?.name || 'Government Organization'}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{job.region} • {job.location || 'Official Vacancy'}</p>
                      </div>

                      <div className="pt-1">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold uppercase tracking-wider border border-slate-200">
                             Type: {job.jobType}
                            </span>
                             <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold uppercase tracking-wider border border-indigo-100">
                             Cat: {job.jobCategory}
                            </span>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div>
                            <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Department Role</h5>
                            <p className="text-[10px] text-slate-700 font-medium leading-tight">{job.departmentRole || 'Detailed role information awaited'}</p>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            <div>
                               <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Work Type</h5>
                               <p className="text-[10px] text-slate-700 font-medium">{job.workType || 'Permanent'}</p>
                            </div>
                            <div>
                               <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Probation</h5>
                               <p className="text-[10px] text-slate-700 font-medium">{job.probationPeriod || 'Standard'}</p>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* Eligibility & Selection Column */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Eligibility Criteria</h5>
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold text-slate-800">Base Age: {job.minAge} - {job.maxAge} Years</p>
                          <p className="text-[11px] font-bold text-slate-800">Qualification: {job.qualification}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{job.specialRequirements?.join(', ') || 'Standard norms apply'}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Transfer & Shift Policy</h5>
                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-600 leading-tight">
                            <span className="font-bold text-slate-400 uppercase text-[8px]">Transfer:</span> {job.transferPolicy || 'As per departmental norms'}
                          </p>
                          <p className="text-[10px] text-slate-600 leading-tight">
                            <span className="font-bold text-slate-400 uppercase text-[8px]">Shift:</span> {job.shiftNature || 'General Shift'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Selection Process</h5>
                        <p className="text-[11px] text-slate-600 leading-tight">
                          {job.selectionProcess || 'Official details not yet released'}
                        </p>
                      </div>
                    </div>

                    {/* Exam & Fees Column */}
                    <div className="space-y-4">
                       <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Detailed Reservation & Relaxation</h5>
                        {job.detailedReservation ? (
                          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                            {job.detailedReservation.centralRules && (
                              <p className="text-[9px] text-indigo-700 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 flex items-center gap-1">
                                <ShieldCheck className="w-2.5 h-2.5" /> Central Rules
                              </p>
                            )}
                            {job.detailedReservation.stateRules && (
                              <p className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                                <ShieldCheck className="w-2.5 h-2.5" /> State Rules
                              </p>
                            )}
                            <div className="grid grid-cols-2 gap-1.5">
                              {Object.entries(job.detailedReservation.ageRelaxation || {}).map(([cat, yrs]) => (
                                <div key={cat} className="flex items-center justify-between px-2 py-0.5 bg-slate-50 rounded border border-slate-200">
                                   <span className="text-[8px] font-bold text-slate-500 uppercase">{cat.replace('_', ' ')}</span>
                                   <span className="text-[9px] font-black text-indigo-600">+{yrs}y</span>
                                </div>
                              ))}
                            </div>
                            {job.detailedReservation.localNonLocalRules && (
                              <div className="p-1.5 bg-amber-50 border border-amber-100 rounded">
                                <p className="text-[8px] font-bold text-amber-800 leading-tight uppercase mb-0.5">Local Quota</p>
                                <p className="text-[9px] text-amber-900 font-medium leading-tight">{job.detailedReservation.localNonLocalRules}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 italic">Official reservation details not yet released</p>
                        )}
                      </div>

                      <div>
                        <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Fee Exemptions</h5>
                        <div className="flex flex-wrap gap-1">
                          {job.detailedReservation?.feeDetails ? (
                             Object.entries(job.detailedReservation.feeDetails).map(([cat, fee]) => (
                               <span key={cat} className={`text-[8px] px-1.5 py-0.5 rounded font-bold border ${fee.toLowerCase().includes('exempt') ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                 {cat}: {fee}
                               </span>
                             ))
                          ) : (
                            <p className="text-[10px] text-slate-800 font-bold">{job.applicationFee || 'Standard Fees Apply'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date Timeline */}
                  <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <p className="text-[9px] font-bold text-indigo-400 uppercase mb-1">Notification Out</p>
                      <p className="text-[13px] font-black text-indigo-900">{job.notificationDate ? format(new Date(job.notificationDate), 'dd MMM yyyy') : 'TBD'}</p>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <p className="text-[9px] font-bold text-rose-400 uppercase mb-1">Last Date to Apply</p>
                      <p className="text-[13px] font-black text-rose-900">{job.lastDate ? format(new Date(job.lastDate), 'dd MMM yyyy') : 'TBD'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Scheduled Exam Date</p>
                      <p className="text-[13px] font-black text-slate-700">{job.examDate || 'Awaited'}</p>
                    </div>
                  </div>

                  {/* Summary & Source */}
                  <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <h5 className="text-[9px] font-bold text-slate-400 uppercase mb-1">Notification Summary</h5>
                      <p className="text-[11px] text-slate-600 max-w-3xl">{job.description}</p>
                    </div>
                    <div className="flex gap-2">
                       {job.officialPdfUrl ? (
                         <a 
                          href={job.officialPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-rose-600 text-white text-[10px] font-bold uppercase rounded shadow hover:bg-rose-700 transition flex items-center gap-2"
                         >
                            <BadgeInfo className="w-3 h-3" /> Official PDF
                         </a>
                       ) : (
                         <div className="px-4 py-2 bg-slate-200 text-slate-500 text-[10px] font-bold uppercase rounded cursor-not-allowed">
                            PDF Awaited
                         </div>
                       )}
                       <a 
                        href={department?.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded hover:bg-slate-50 transition"
                       >
                         Source Website
                       </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: HOW TO APPLY */}
              <div className="bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
                <div className="bg-indigo-600 px-4 py-3 border-b border-indigo-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-white" />
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">2. Step-by-Step Application Guide</h4>
                  </div>
                  <span className="text-[9px] text-indigo-100 font-medium">Source: Official Department Portal</span>
                </div>

                <div className="p-6">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                      <div className="space-y-6">
                        {/* FIRST 5 STEPS */}
                        {[0,1,2,3,4].map((idx) => (
                           <div key={idx} className="flex gap-4 relative">
                              <div className="flex flex-col items-center">
                                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[11px] font-black z-10 shrink-0 shadow-sm">
                                  {idx + 1}
                                </div>
                                {idx < 4 && <div className="w-0.5 grow bg-indigo-200 my-1"></div>}
                              </div>
                              <div className="pt-1">
                                <p className="text-[11px] text-slate-800 font-medium leading-tight">
                                  {job.howToApplySteps?.[idx] || `Step ${idx+1}: Loading official guidance...`}
                                </p>
                              </div>
                           </div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {/* LAST 4 STEPS */}
                        {[5,6,7,8].map((idx) => (
                           <div key={idx} className="flex gap-4 relative">
                              <div className="flex flex-col items-center">
                                <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[11px] font-black z-10 shrink-0 shadow-sm">
                                  {idx + 1}
                                </div>
                                {idx < 8 && <div className="w-0.5 grow bg-indigo-200 my-1"></div>}
                              </div>
                              <div className="pt-1">
                                <p className="text-[11px] text-slate-800 font-medium leading-tight">
                                  {job.howToApplySteps?.[idx] || `Step ${idx+1}: Loading official guidance...`}
                                </p>
                              </div>
                           </div>
                        ))}
                        
                        <div className="mt-8 pt-6 border-t border-indigo-200">
                           <div className="bg-white p-4 rounded-lg border border-indigo-200">
                             <h5 className="text-[10px] font-bold text-indigo-900 uppercase flex items-center gap-2 mb-3">
                               <ShieldCheck className="w-3.5 h-3.5" /> Required Checklist
                             </h5>
                             <div className="flex flex-wrap gap-2">
                               {(job.documentRequired || []).map((doc, idx) => (
                                 <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100 font-medium">
                                    {doc}
                                 </span>
                               ))}
                             </div>
                             
                             <div className="mt-6 flex flex-col gap-2">
                                {isActive && job.applyLink && (
                                  <a 
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-indigo-600 text-white text-[11px] font-bold uppercase rounded-lg text-center hover:bg-indigo-700 transition shadow-lg active:scale-[0.98]"
                                  >
                                    Begin Online Registration
                                  </a>
                                )}
                                <p className="text-[9px] text-slate-400 text-center leading-tight mt-1">
                                   Ensure pop-ups are allowed in your browser settings to open the portal.
                                </p>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold text-amber-900 uppercase mb-1">Official Verification Protocol</p>
                        <p className="text-[10px] text-amber-800 leading-tight">
                          This recruitment details were last verified from the official {job.officialSource} gazette. We strongly recommend candidates to verify the final details from the official website {department?.officialUrl} before making any payments.
                        </p>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {guidance && (
        <div className="mt-2 p-2 bg-indigo-900 text-indigo-100 rounded border border-indigo-800 text-[10px] leading-relaxed flex gap-2">
          <Sparkles className="w-3 h-3 shrink-0 text-amber-400" />
          <span><span className="text-amber-400 font-bold">AI Note:</span> {guidance}</span>
        </div>
      )}
    </motion.div>
  );
}
