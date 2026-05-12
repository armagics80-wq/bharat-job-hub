import { useState } from 'react';
import { Job } from '../types';
import { Calendar, ExternalLink, BadgeInfo, Sparkles, ChevronDown, ChevronUp, BellRing, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

interface JobCardProps {
  job: Job;
  guidance?: string;
  isMatch?: boolean;
}

export default function JobCard({ job, guidance, isMatch }: JobCardProps) {
  const [showHowToApply, setShowHowToApply] = useState(false);

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Central': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Telangana': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Andhra Pradesh': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusDisplay = (status: Job['status'], lastDate: string) => {
    const isPast = new Date(lastDate) < new Date();
    
    if (isPast) {
      return {
        label: 'Closed / Expired',
        color: 'bg-rose-50 text-rose-600 border-rose-100'
      };
    }

    switch (status) {
      case 'Active':
        return {
          label: 'Available Now',
          color: 'bg-emerald-50 text-emerald-600 border-emerald-100 animate-pulse'
        };
      case 'Upcoming':
        return {
          label: 'Available Soon',
          color: 'bg-amber-50 text-amber-600 border-amber-100'
        };
      case 'Exam Scheduled':
        return {
          label: 'Exam Schedule Released',
          color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
        };
      default:
        return {
          label: 'Notification Live',
          color: 'bg-slate-50 text-slate-600 border-slate-100'
        };
    }
  };

  const statusInfo = getStatusDisplay(job.status, job.lastDate);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative group bg-white border-b last:border-b-0 border-slate-100 p-3 transition-colors hover:bg-slate-50 ${isMatch ? 'bg-indigo-50/10' : ''}`}
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
            {isMatch && (
              <span className="text-[9px] px-1.5 py-0.5 bg-amber-400 text-indigo-950 rounded font-bold uppercase tracking-tighter flex items-center gap-1">
                <Sparkles className="w-2 h-2" /> Match Found
              </span>
            )}
          </div>
          <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {job.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className={new Date(job.lastDate) < new Date() ? 'text-rose-500 font-bold' : ''}>
                Last date for applying: {format(new Date(job.lastDate), 'dd MMM yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BadgeInfo className="w-3 h-3" />
              <span>{job.qualification}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-center">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-bold text-slate-900">{job.salary}</div>
            <div className="text-[9px] text-slate-400 font-mono tracking-tighter">{job.id.slice(0, 8)}</div>
          </div>
          <div className="flex flex-col gap-1">
            {job.applyLink && new Date(job.lastDate) >= new Date() && (
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded hover:bg-indigo-700 transition-colors uppercase tracking-widest text-center"
              >
                Apply
              </a>
            )}
            <button 
              onClick={() => setShowHowToApply(!showHowToApply)}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-bold rounded hover:bg-slate-200 transition-colors uppercase flex items-center justify-center gap-1"
            >
              How to Apply {showHowToApply ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
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
            <div className="mt-3 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100 text-[11px] text-slate-700 space-y-3">
              <div className="font-bold text-indigo-900 flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Step-by-Step Application Guide:
              </div>
              
              <div className="space-y-3 ml-1 border-l-2 border-indigo-200 pl-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                  <p className="font-bold text-indigo-800">1. Visit the Official Portal</p>
                  <p className="text-slate-500 mt-0.5">Go to the official department website: 
                    <a href={job.officialWebsite} target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 hover:underline inline-flex items-center gap-1">
                      {job.officialWebsite} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                  <p className="font-bold text-indigo-800">2. Find Current Notifications</p>
                  <p className="text-slate-500 mt-0.5">Look for "Recruitment", "Careers", or "Latest Notifications" on the homepage. Find the advertisement number matching {job.id.slice(0, 8)}.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                  <p className="font-bold text-indigo-800">3. Register & Fill Details</p>
                  <p className="text-slate-500 mt-0.5">Click "Apply Online". Register with your email/phone. Keep your {job.documentRequired.join(', ')} scanned and ready.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white"></div>
                  <p className="font-bold text-indigo-800">4. Pay Fee & Submit</p>
                  <p className="text-slate-500 mt-0.5">Review all details carefully before final submission. Pay the application fee if applicable and save the acknowledgement receipt.</p>
                </div>
              </div>

              {job.examNote && (
                <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 border-l-4 border-l-amber-500">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <BellRing className="w-3.5 h-3.5" /> Important Exam Alert
                  </div>
                  {job.examNote}
                </div>
              )}

              {job.applyLink && new Date(job.lastDate) >= new Date() && (
                <div className="pt-2">
                  <a 
                    href={job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Go to Application Page <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
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
