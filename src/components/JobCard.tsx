import { useState } from 'react';
import { Job } from '../types';
import { Calendar, ExternalLink, BadgeInfo, Sparkles, ChevronDown, ChevronUp, BellRing, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isToday, differenceInDays } from 'date-fns';

interface JobCardProps {
  job: Job;
  guidance?: string;
  isMatch?: boolean;
}

export default function JobCard({ job, guidance, isMatch }: JobCardProps) {
  const [showHowToApply, setShowHowToApply] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Central': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Telangana': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Andhra Pradesh': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusDisplay = (status: Job['status'], lastDate: string, notificationDate: string) => {
    const today = new Date();
    const last = new Date(lastDate);
    const notify = new Date(notificationDate);
    
    if (last < today) {
      return {
        label: 'Expired',
        color: 'bg-rose-50 text-rose-600 border-rose-100',
        message: 'Application closed on ' + format(last, 'dd MMM yyyy')
      };
    }

    if (status === 'Upcoming' || notify > today) {
      const labels = ['Expected Recruitment', 'Coming Soon', 'Notification Awaited'];
      const displayLabel = labels[Math.floor(notify.getTime() / 1000) % labels.length];
      
      return {
        label: displayLabel,
        color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        message: 'Notification Expected: ' + format(notify, 'dd MMM yyyy')
      };
    }

    if (status === 'Active') {
      return {
        label: 'Active Now',
        color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        message: 'Applications Open until ' + format(last, 'dd MMM yyyy')
      };
    }

    return {
      label: 'Notification Live',
      color: 'bg-slate-50 text-slate-600 border-slate-100',
      message: 'Refer to Official Portal'
    };
  };

  const statusInfo = getStatusDisplay(job.status, job.lastDate, job.notificationDate);
    const isVerified = job.verified && job.officialSource;
    const isUpcoming = job.status === 'Upcoming' || new Date(job.notificationDate) > new Date();
    const isExpired = new Date(job.lastDate) < new Date();
    const isActive = job.status === 'Active' && !isExpired && !isUpcoming;
    
    const isJobNewToday = isToday(new Date(job.notificationDate));
    const isLatest = differenceInDays(new Date(), new Date(job.notificationDate)) <= 3;

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
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${getRegionColor(job.region)}`}>
              {job.region}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            {isVerified ? (
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold uppercase tracking-tighter flex items-center gap-1 border border-emerald-100">
                <ShieldCheck className="w-2.5 h-2.5" /> Source: {job.officialSource}
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded font-bold uppercase tracking-tighter flex items-center gap-1 border border-rose-100">
                <BadgeInfo className="w-2.5 h-2.5" /> Verified notification unavailable
              </span>
            )}
            {isJobNewToday && (
              <span className="text-[9px] px-1.5 py-0.5 bg-rose-600 text-white rounded font-bold uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                <Zap className="w-2 h-2 fill-white" /> New Today
              </span>
            )}
            {!isJobNewToday && isLatest && (
              <span className="text-[9px] px-1.5 py-0.5 bg-indigo-600 text-white rounded font-bold uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                Latest
              </span>
            )}
            {isMatch && (
              <span className="text-[9px] px-1.5 py-0.5 bg-amber-400 text-indigo-950 rounded font-bold uppercase tracking-tighter flex items-center gap-1">
                <Sparkles className="w-2 h-2" /> Match Found
              </span>
            )}
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {job.title}
          </h3>

          <div className="mt-1.5 text-[10px] text-slate-600 leading-relaxed max-w-2xl">
            <motion.div
              animate={{ height: 'auto' }}
              className="inline"
            >
              {isDescExpanded ? job.description : (job.description.length > 150 ? `${job.description.slice(0, 150)}...` : job.description)}
            </motion.div>
            {job.description.length > 150 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsDescExpanded(!isDescExpanded); }}
                className="ml-1 text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer inline-flex items-center gap-0.5"
              >
                {isDescExpanded ? (
                  <>Read Less <ChevronUp className="w-2.5 h-2.5" /></>
                ) : (
                  <>Read More <ChevronDown className="w-2.5 h-2.5" /></>
                )}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-indigo-400" />
              <span className="font-medium">Notification: {format(new Date(job.notificationDate), 'dd MMM yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span className={`font-medium ${new Date(job.lastDate) < new Date() ? 'text-rose-500' : ''}`}>
                Last Date: {format(new Date(job.lastDate), 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BadgeInfo className="w-3 h-3 text-slate-400" />
              <span className="font-medium">{job.qualification}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-center">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-bold text-slate-900">{job.salary}</div>
            <div className="text-[9px] text-slate-400 font-mono tracking-tighter">{job.id.slice(0, 8)}</div>
          </div>
          <div className="flex flex-col gap-1">
            {isActive && job.applyLink && (
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded hover:bg-indigo-700 transition-colors uppercase tracking-widest text-center shadow-sm"
              >
                Apply Now
              </a>
            )}
            {isUpcoming && (
              <div className="px-3 py-1.5 bg-slate-100 text-slate-400 text-[10px] font-bold rounded cursor-not-allowed uppercase tracking-widest text-center border border-slate-200">
                Awaited
              </div>
            )}
            {isExpired && (
              <div className="px-3 py-1.5 bg-rose-50 text-rose-400 text-[10px] font-bold rounded cursor-not-allowed uppercase tracking-widest text-center border border-rose-100">
                Closed
              </div>
            )}
            <button 
              onClick={() => setShowHowToApply(!showHowToApply)}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold rounded hover:bg-slate-200 transition-colors uppercase flex items-center justify-center gap-1"
            >
              Details {showHowToApply ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
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
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
              {/* Job Details Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
                  <BadgeInfo className="w-4 h-4 text-slate-600" />
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Job Details & Specifications</h4>
                </div>
                <div className="p-4 space-y-4 flex-1">
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 flex items-start gap-2">
                    <Sparkles className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-[10px] font-bold text-amber-800 uppercase mb-0.5">Quick Summary</h5>
                      <p className="text-[10px] text-amber-900 leading-tight">Official {job.department} recruitment for {job.jobType} positions. Verification from {job.officialSource}.</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Full Description</h5>
                    <p className="text-[11px] text-slate-700 leading-relaxed">{job.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Department</h5>
                      <p className="text-[11px] text-slate-900 font-bold">{job.department}</p>
                      <p className="text-[9px] text-slate-500">{job.region} Classification</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Job Type</h5>
                      <p className="text-[11px] text-slate-900 font-bold">{job.jobType || 'Full-time'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Salary / Pay Scale</h5>
                      <p className="text-[11px] text-indigo-700 font-bold">{job.salary}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Vacancy Location</h5>
                      <p className="text-[11px] text-slate-900 font-bold">{job.location || 'All India'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age Limit</h5>
                      <p className="text-[11px] text-slate-900 font-bold">{job.minAge} - {job.maxAge} Years</p>
                      <p className="text-[9px] text-slate-500">Relaxations as per Govt rules</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Qualification</h5>
                      <p className="text-[11px] text-slate-900 font-bold">{job.qualification}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Selection Process</h5>
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 italic text-[10px] text-slate-600">
                      {job.selectionProcess}
                    </div>
                  </div>
                </div>
              </div>

              {/* How To Apply Section */}
              <div className="bg-indigo-50/30 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
                <div className="bg-indigo-100/50 px-4 py-2.5 border-b border-indigo-100 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">How To Apply Step-by-Step</h4>
                </div>
                <div className="p-4 space-y-5 flex-1 flex flex-col">
                  <div className="space-y-4">
                    {job.howToApplySteps && job.howToApplySteps.length > 0 ? (
                      job.howToApplySteps.map((step, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                              {idx + 1}
                            </div>
                            {idx !== job.howToApplySteps.length - 1 && <div className="w-0.5 grow bg-indigo-200 my-1"></div>}
                          </div>
                          <p className="text-[11px] text-slate-700 pt-0.5 leading-snug">{step}</p>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-4 ml-1 border-l-2 border-indigo-200 pl-4">
                        <div className="relative">
                          <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                          <p className="font-bold text-indigo-800 text-[11px]">1. Visit Official Website</p>
                          <p className="text-slate-500 text-[10px] mt-0.5">Go to {job.officialWebsite} and find the careers section.</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                          <p className="font-bold text-indigo-800 text-[11px]">2. Online Registration</p>
                          <p className="text-slate-500 text-[10px] mt-0.5">Fill the application form with your personal and educational details.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto space-y-4 pt-4">
                    <div className="bg-white/80 p-3 rounded-lg border border-indigo-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-indigo-900 font-bold text-[10px] uppercase">
                        <Calendar className="w-3.5 h-3.5" /> Important Dates
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Release Date</p>
                          <p className="text-[10px] font-bold text-slate-700">{format(new Date(job.notificationDate), 'dd MMM yyyy')}</p>
                        </div>
                        <div className="bg-rose-50 p-2 rounded border border-rose-100">
                          <p className="text-[9px] text-rose-400 font-bold uppercase">Last Date</p>
                          <p className="text-[10px] font-bold text-rose-700">{format(new Date(job.lastDate), 'dd MMM yyyy')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 p-3 rounded-lg border border-indigo-100 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-indigo-900 font-bold text-[10px] uppercase">
                        <ShieldCheck className="w-3.5 h-3.5" /> Required Documents
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {job.documentRequired.map((doc, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                       {job.applyLink && isActive && (
                        <a 
                          href={job.applyLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98] text-[11px] uppercase tracking-wider"
                        >
                          Open Official Application Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Application Fee</span>
                          <span className="text-[10px] font-bold text-slate-700">{job.applicationFee || 'Refer to Notification'}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Support Website</span>
                          <a href={job.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-600 font-bold hover:underline">
                            {job.officialWebsite.replace('https://', '')}
                          </a>
                        </div>
                      </div>
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
