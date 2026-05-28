import { useState, useMemo } from 'react';
import { Job, UserProfile } from '../types';
import { Calendar, ExternalLink, BadgeInfo, Sparkles, ChevronDown, ChevronUp, BellRing, ShieldCheck, Zap, Globe, AlertCircle, Clock, CheckCircle2, GraduationCap, Bookmark, Eye, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isToday, differenceInDays, formatDistanceToNow } from 'date-fns';
import { getDepartmentById } from '../data/departments';
import { isUserEligible } from '../lib/utils';
import { getQualificationById } from '../data/qualifications';
import PdfPreviewModal from './PdfPreviewModal';

interface JobCardProps {
  job: Job;
  guidance?: string;
  isMatch?: boolean;
  userProfile?: UserProfile | null;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
}

export default function JobCard({ job, guidance, isMatch, userProfile, isSaved = false, onToggleSave }: JobCardProps) {
  const [showHowToApply, setShowHowToApply] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'success' | 'copied'>('idle');

  const department = getDepartmentById(job.departmentId);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}?jobId=${job.id}`;
    const shareTitle = job.title;
    const shareText = `Check out this government job notification: ${job.title} at ${department?.name || 'Gov Board'}. Vacancies: ${job.vacancies || 'TBA'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareState('success');
        setTimeout(() => setShareState('idle'), 2500);
        return;
      } catch (err) {
        console.warn("Native share failed or dismissed, trying clipboard copy:", err);
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\nOfficial Link: ${job.applyLink}\nShare URL: ${shareUrl}`);
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2500);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

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
        return {
          label: 'Active',
          color: 'bg-emerald-50 text-emerald-650 border-emerald-100',
          message: 'Status verified via official portal'
        };
      }
      
      last.setHours(23, 59, 59, 999);
      const lastTime = last.getTime();
      const notify = notificationDate ? new Date(notificationDate) : new Date();
      
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
  const isVerified = job.verificationStatus === 'Verified' || (department?.verified && job.officialSource);
  const isUpcoming = job.status === 'Upcoming' || new Date(job.notificationDate) > new Date();
  const isExpired = new Date(job.lastDate) < new Date();
  const isActive = job.status === 'Active' && !isExpired && !isUpcoming;
  
  const isJobNewToday = job.lastUpdatedAt ? (new Date().getTime() - new Date(job.lastUpdatedAt).getTime()) <= (24 * 60 * 60 * 1000) : false;
  const isRecentlyUpdated = job.lastUpdatedAt ? differenceInDays(new Date(), new Date(job.lastUpdatedAt)) <= 3 && !isJobNewToday : false;
  const isClosingSoon = !isExpired && differenceInDays(new Date(job.lastDate), new Date()) <= 3 && differenceInDays(new Date(job.lastDate), new Date()) >= 0;

  // Active preparation checklist state tracking
  const [completedStudySteps, setCompletedStudySteps] = useState<Record<number, boolean>>(() => {
    try {
      const stored = localStorage.getItem(`study_checklist_${job.id}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const toggleChecklist = (index: number) => {
    setCompletedStudySteps(prev => {
      const updated = { ...prev, [index]: !prev[index] };
      try {
        localStorage.setItem(`study_checklist_${job.id}`, JSON.stringify(updated));
      } catch (err) {
        console.error("Localstorage save failed:", err);
      }
      return updated;
    });
  };

  const selectionStages = useMemo(() => {
    if (job.deep_guidance?.selection_process && job.deep_guidance.selection_process.length > 0) {
      return job.deep_guidance.selection_process;
    }
    if (job.selectionProcess) {
      return job.selectionProcess.split(/[,;.⁃\n]+/).map(s => s.trim()).filter(s => s.length > 4);
    }
    return [
      'Written Examination (Objective MCQs)',
      'Physical Standard or Trade Proficiency Test (if applicable)',
      'Document Verification & Final Model Posting'
    ];
  }, [job]);

  const studyChecklist = useMemo(() => {
    if (job.deep_guidance?.study_checklist && job.deep_guidance.study_checklist.length > 0) {
      return job.deep_guidance.study_checklist;
    }
    return [
      `Review exact syllabus & scheme blueprint for ${job.title}`,
      `Verify age cut-off dates: ${job.minAge || 'TBA'} - ${job.maxAge || 'TBA'} Years range`,
      `Verify education qualification matches: ${job.qualification}`,
      'Organize reservation category proof / support OTR documents',
      'Download the official notification PDF file for subject syllabus details'
    ];
  }, [job]);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`bg-white shadow-md rounded-xl border border-slate-100 p-4 md:p-5 transition-all duration-300 hover:shadow-lg ${
        showHowToApply ? 'ring-2 ring-indigo-505 bg-slate-50/50' : 'hover:bg-slate-50/30'
      } ${isMatch ? 'border-indigo-100 bg-indigo-50/10' : ''}`}
    >
      <div className="flex flex-col gap-3">
        {/* Top Badges & Source Verification Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-2.5" id={`badge-row-${job.id}`}>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getSourceTypeColor(job.sourceType)}`}>
              {job.sourceType}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getRegionColor(job.region)}`}>
              {job.region}
            </span>
            {isJobNewToday && (
              <span className="text-[10px] px-2 py-0.5 bg-rose-605 text-white bg-rose-600 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                <Zap className="w-2.5 h-2.5 fill-white" /> New Today
              </span>
            )}
          </div>

          {/* 100% Verified Official Source badge with checkmark icon */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] md:text-[11px] font-semibold select-none">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="font-bold">100% Verified Official Source</span>
          </div>
        </div>

        {/* Card Header: Job Title (Dark Navy) & Department (Gray) */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
          <div className="flex-1 min-w-0" onClick={() => setShowHowToApply(!showHowToApply)}>
            <div className="space-y-0.5 cursor-pointer">
              <h3 className="text-sm md:text-base font-extrabold text-[#0a192f] hover:text-indigo-600 transition-colors leading-snug flex flex-wrap items-center gap-1.5">
                <span>{job.title}</span>
                {eligibility && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    eligibility.isEligible 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : eligibility.type === 'error' 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {eligibility.isEligible ? <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> : <AlertCircle className="w-2.5 h-2.5 text-amber-600" />}
                    {eligibility.isEligible ? 'Eligible' : 'Check Criteria'}
                  </span>
                )}
              </h3>
              
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="text-xs font-semibold text-slate-500">{department?.name || 'Recruitment Department'}</span>
                {job.jobCategory && (
                  <>
                    <span className="h-2.5 w-px bg-slate-200" />
                    <span className="text-[10.5px] bg-slate-50 border border-slate-150 rounded px-1.5 py-0.2 text-slate-500 font-medium">{job.jobCategory}</span>
                  </>
                )}
              </div>
            </div>

            {/* Candidate eligibility badge notifications */}
            {eligibility && !eligibility.isEligible && (
              <p className="text-[10px] font-bold text-rose-600 flex items-center gap-1 mt-2 bg-rose-50 px-2 py-1 rounded-lg border border-rose-100 inline-block text-left">
                <AlertCircle className="w-3 h-3 text-rose-505 shrink-0" /> {eligibility.reason}
              </p>
            )}
            {eligibility && eligibility.isEligible && eligibility.reason.includes('relaxation') && (
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-2 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 inline-block text-left">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {eligibility.reason}
              </p>
            )}
          </div>

          {/* Corner Call to Actions: Bookmarking, Sharing and Learn More toggle buttons */}
          <div className="flex items-center gap-1.5 shrink-0 sm:self-center" id={`controls-${job.id}`}>
            {/* Save bookmark */}
            <button
              id={`bookmark-${job.id}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleSave) onToggleSave(job.id);
              }}
              title={isSaved ? "Remove from Saved Jobs" : "Save Job Opportunity"}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${
                isSaved 
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-605' : ''}`} />
            </button>

            {/* Share action */}
            <button
              id={`share-${job.id}`}
              onClick={handleShare}
              title="Share or Copy Job Announcement URL"
              className={`p-1.5 rounded-lg border transition-all duration-200 flex items-center justify-center gap-1 ${
                shareState !== 'idle'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600 animate-pulse' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/20'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              {shareState !== 'idle' && (
                <span className="text-[8px] font-black uppercase tracking-wider px-0.5 text-emerald-700">
                  {shareState === 'copied' ? 'Copied' : 'Shared'}
                </span>
              )}
            </button>

            {/* Expander activator button */}
            <button 
              id={`details-toggle-${job.id}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                setShowHowToApply(!showHowToApply); 
              }}
              className={`px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 border flex items-center gap-1 ${
                showHowToApply 
                ? 'bg-[#0a192f] border-[#0a192f] text-white shadow' 
                : 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-705 hover:text-indigo-700'
              }`}
            >
              <span>{showHowToApply ? 'Less' : 'Learn More'}</span>
              {showHowToApply ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Tags badge mappings displayed as small, pill-shaped badges */}
        <div className="flex flex-wrap gap-1" id={`tags-container-${job.id}`}>
          {(job.tags || [job.jobType, job.jobCategory, job.region].filter(Boolean)).map((tag, idx) => (
            <span
              id={`tag-${job.id}-${idx}`}
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick horizontal spec grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[10.5px] text-slate-650" id={`spec-ribbon-${job.id}`}>
          <div>
            <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vacancies</span>
            <span className="font-extrabold text-slate-850">{String(job.vacancies || 'TBA')}</span>
          </div>
          <div>
            <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Salary Band</span>
            <span className="font-extrabold text-indigo-700">{job.salary}</span>
          </div>
          <div>
            <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Last Date</span>
            <span className="font-extrabold text-rose-600 font-mono">
              {job.lastDate ? format(new Date(job.lastDate), 'dd-MM-yyyy') : 'TBA'}
            </span>
          </div>
          <div>
            <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vetting Status</span>
            <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Safe Portal
            </span>
          </div>
        </div>
      </div>

      {/* 2. THE "LEARN MORE" SECTION (Expanded State) */}
      <AnimatePresence>
        {showHowToApply && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
            id={`learn-more-expanded-${job.id}`}
          >
            <div className="border-t border-slate-100 mt-5 pt-5 space-y-6">
              
              {/* Quick Eligibility - bento-like grid box with icons */}
              <div>
                <h4 className="text-xs font-black text-[#0a192f] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-indigo-50 pb-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-650 shrink-0" />
                  Quick Eligibility
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id={`eligibility-grid-${job.id}`}>
                  {/* Age Limits box */}
                  <div className="bg-slate-50/80 border border-slate-150/60 rounded-xl p-4 flex gap-3.5 items-start text-left">
                    <div className="h-9 w-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100">
                      <Clock className="w-5 h-5 col-span-1" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-black text-slate-450 uppercase tracking-widest leading-none">Age limits</h5>
                      <span className="font-extrabold text-[#0a192f] text-sm block leading-normal mt-0.5">
                        {job.deep_guidance?.quick_eligibility?.age_limit || `${job.minAge} - ${job.maxAge} Years`}
                      </span>
                      {job.detailedReservation?.ageRelaxation && (
                        <div className="pt-2 border-t border-dashed border-slate-200 mt-2">
                          <span className="text-[9px] font-semibold text-indigo-950 uppercase tracking-wider block mb-1">Standard Government Relaxations:</span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {Object.entries(job.detailedReservation.ageRelaxation).map(([cat, yrs]) => (
                              <div key={cat} className="text-[9.5px] bg-white rounded border border-slate-100 p-1 flex justify-between">
                                <span className="text-slate-500 font-semibold uppercase">{cat.replace('_', ' ')}:</span>
                                <span className="text-indigo-655 font-black text-indigo-700">+{yrs}y</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Qualification box */}
                  <div className="bg-slate-50/80 border border-slate-150/60 rounded-xl p-4 flex gap-3.5 items-start text-left">
                    <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100">
                      <GraduationCap className="w-5 h-5 col-span-1" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-black text-slate-455 uppercase tracking-widest leading-none">Qualification</h5>
                      <span className="font-extrabold text-[#0a192f] text-sm block leading-snug mt-0.5">
                        {job.deep_guidance?.quick_eligibility?.qualification || job.qualification}
                      </span>
                      {job.specialRequirements && job.specialRequirements.length > 0 && (
                        <div className="pt-2 border-t border-dashed border-slate-201 mt-2 text-[9.5px]">
                          <span className="text-slate-450 font-bold uppercase block mb-0.5">Specialized parameters required</span>
                          <p className="font-semibold text-slate-700 leading-tight">{job.specialRequirements.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Process - mapped into visually connected timeline/numbered steps */}
              <div>
                <h4 className="text-xs font-black text-[#0a192f] uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-indigo-50 pb-1.5">
                  <span className="text-indigo-650 font-black">▶</span>
                  Selection Process Timeline & Exam Stages
                </h4>
                <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm text-left" id={`timeline-${job.id}`}>
                  {selectionStages.map((stage, sIdx) => (
                    <div key={sIdx} className="flex gap-4 relative">
                      {/* Connected timeline rail */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 bg-[#0a192f] text-white rounded-full flex items-center justify-center text-[11px] font-black z-10 shrink-0 shadow-sm">
                          {sIdx + 1}
                        </div>
                        {sIdx < selectionStages.length - 1 && (
                          <div className="w-[2px] grow bg-indigo-50 my-1 pb-4" />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                          {stage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Checklist - mapped into interactive UI checkboxes */}
              <div>
                <h4 className="text-xs font-black text-[#0a192f] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-indigo-50 pb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  High-Yield Preparation Roadmap & Study Checklist
                </h4>
                <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-4 md:p-5 space-y-3 text-left" id={`interactive-roadmap-${job.id}`}>
                  <p className="text-[10px] text-emerald-800 font-bold pb-1 block">Click to check off tasks as you cover them in your preparation:</p>
                  <div className="space-y-2.5">
                    {studyChecklist.map((roadmapTip, rIdx) => {
                      const isChecked = !!completedStudySteps[rIdx];
                      return (
                        <label 
                          id={`step-label-${job.id}-${rIdx}`}
                          key={rIdx} 
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isChecked 
                            ? 'bg-emerald-50/50 border-emerald-200/50 text-emerald-850' 
                            : 'bg-white border-slate-150 text-slate-705 hover:border-indigo-200 hover:shadow-sm'
                          }`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleChecklist(rIdx)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4.5 w-4.5 shrink-0 cursor-pointer"
                          />
                          <span className={`text-xs select-none leading-relaxed ${isChecked ? 'line-through text-slate-400 font-medium' : 'font-semibold text-slate-800'}`}>
                            {roadmapTip}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Application instructions area */}
              <div>
                <h4 className="text-xs font-black text-[#0a192f] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b border-indigo-50 pb-1.5">
                  <ExternalLink className="w-4 h-4 text-indigo-500 shrink-0" />
                  Step-by-Step Portal Application Process
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5 text-slate-700 text-xs space-y-3.5 text-left" id={`steps-details-${job.id}`}>
                  {(job.application_steps || job.howToApplySteps || []).length > 0 ? (
                    (job.application_steps || job.howToApplySteps).map((step, index) => (
                      <div key={index} className="flex gap-2.5 items-start">
                        <span className="font-extrabold text-[#0a192f] text-xs shrink-0">{index + 1}.</span>
                        <p className="font-semibold text-slate-700 leading-relaxed">{step}</p>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-3.5">
                      <div className="p-3 bg-white rounded-lg border border-slate-150">
                        <span className="font-black text-indigo-700 block text-[9.5px] uppercase tracking-wider mb-1">Step 1: One-Time Registration (OTR)</span>
                        Navigate to the official portal page and complete your OTR. Key in exact identity proof variables.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-slate-150">
                        <span className="font-black text-indigo-700 block text-[9.5px] uppercase tracking-wider mb-1">Step 2: Profile Submission</span>
                        Access active notification <code>{job.title}</code>, provide school metrics, upload passport photo & structural details.
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-slate-150">
                        <span className="font-black text-indigo-700 block text-[9.5px] uppercase tracking-wider mb-1">Step 3: Pay Fees online</span>
                        Submit applications using standard online gateway mechanisms and keep confirmation PDF receipts stored safely.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Prominent Apply Now footer bar linked securely to the source_website */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-left" id={`footer-actions-${job.id}`}>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Official Verification Portal</span>
                  <a 
                    href={department?.officialUrl || job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-indigo-600 hover:text-indigo-805 font-extrabold text-xs break-all flex items-center gap-1 hover:underline"
                  >
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    {department?.officialUrl || job.officialSource || 'https://ssc.gov.in'}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0 justify-end">
                  {/* View PDF modal handler */}
                  {job.officialPdfUrl ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPdfPreview(true);
                      }}
                      className="px-4 py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl shadow-xs hover:bg-indigo-100 transition flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4 text-indigo-650" /> View Document PDF
                    </button>
                  ) : (
                    <span className="px-3.5 py-2.5 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl border border-slate-200 cursor-not-allowed">
                      PDF Awaited
                    </span>
                  )}

                  {/* Apply Now prominent button securely linking to source_website / applyLink */}
                  {job.applyLink && (
                    <a 
                      href={job.applyLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow hover:shadow-md transition duration-200 uppercase tracking-wider flex items-center gap-1.5 focus:ring-4 focus:ring-emerald-200"
                    >
                      Apply Now <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {guidance && (
        <div className="mt-3 p-3 bg-indigo-950/95 text-indigo-100 rounded-xl border border-indigo-900 text-xs leading-relaxed flex gap-2">
          <Sparkles className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
          <span><span className="text-amber-400 font-bold">AI Note:</span> {guidance}</span>
        </div>
      )}

      {/* PDF Modal overlay */}
      <AnimatePresence>
        {showPdfPreview && job.officialPdfUrl && (
          <PdfPreviewModal
            pdfUrl={job.officialPdfUrl}
            jobTitle={job.title}
            onClose={() => setShowPdfPreview(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
