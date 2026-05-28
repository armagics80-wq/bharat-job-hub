import { useState, useMemo, useEffect } from 'react';
import { Job, UserProfile } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronDown, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  Info,
  RefreshCw,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getQualificationById, QUALIFICATIONS } from '../data/qualifications';
import { STATES_AND_DISTRICTS } from '../data/statesAndDistricts';
import { isUserEligible } from '../lib/utils';
import { aiService } from '../services/aiService';
import JobCard from './JobCard';

interface EligibilityMatchesProps {
  profile?: UserProfile | null;
  jobs: Job[];
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onNotifySync?: (msg: string) => void;
}

export default function EligibilityMatches({
  profile,
  jobs,
  savedJobIds,
  onToggleSave,
  onNotifySync
}: EligibilityMatchesProps) {
  // Initialize filter state from localStorage, fallback to profile data or default empty
  const [selectedState, setSelectedState] = useState(() => {
    return localStorage.getItem('elig_state') || profile?.state || '';
  });
  
  const [selectedQualification, setSelectedQualification] = useState(() => {
    return localStorage.getItem('elig_qualification') || profile?.qualifications?.[0] || '';
  });
  
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('elig_category') || profile?.category || 'UR';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [aiMatches, setAiMatches] = useState<{ id: string; guidance: string }[]>([]);

  // Category community definitions
  const categories = [
    { id: 'UR', label: 'General / Unreserved (UR)' },
    { id: 'EWS', label: 'Economically Weaker Section (EWS)' },
    { id: 'OBC_NCL', label: 'OBC - Non Creamy Layer (OBC-NCL)' },
    { id: 'SC', label: 'Scheduled Caste (SC)' },
    { id: 'ST', label: 'Scheduled Tribe (ST)' },
  ];

  // Academics
  const selectableQualifications = QUALIFICATIONS.filter(q => 
    ['School', 'Technical/Diploma', 'Degree', 'Postgraduate'].includes(q.category)
  ).sort((a, b) => a.rank - b.rank);

  // Directly retrieve user profile payload based on filters
  const currentUserProfile = useMemo(() => {
    const p: UserProfile = {
      fullName: 'Eligible Candidate',
      phoneNumber: '',
      state: selectedState,
      qualifications: [selectedQualification as any],
      category: selectedCategory as any,
      nationalCategory: selectedCategory as any,
      stateCategory: selectedCategory as any,
      age: 24, // Neutral standard age for checks
      isExServiceman: false,
      isPWD: false,
      gender: 'Male',
      district: '',
      skills: [],
      documents: [],
      otherCertificates: '',
      preferredRegion: 'All',
      subscriptions: {
        regions: [],
        categories: []
      }
    };
    return p;
  }, [selectedState, selectedQualification, selectedCategory]);

  const handleCheckEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedQualification) {
      setSearchError("Please finalize both State of Domicile and Qualification selectors first.");
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);

    // Persist selected configurations
    localStorage.setItem('elig_state', selectedState);
    localStorage.setItem('elig_qualification', selectedQualification);
    localStorage.setItem('elig_category', selectedCategory);

    // Compute verified eligible jobs first
    const eligibleList = jobs.filter(job => {
      try {
        return isUserEligible(currentUserProfile, job).isEligible;
      } catch (err) {
        console.error("Local eligibility verify crashed:", err);
        return false;
      }
    });

    try {
      // Direct call to Gemini AI API matching logic
      const result = await aiService.matchJobs(currentUserProfile, eligibleList);
      if (result && result.matches) {
        setAiMatches(result.matches);
        if (onNotifySync) {
          onNotifySync(`✓ Loaded ${result.matches.length} matches from eligibility engine!`);
        }
      } else {
        // Fallback display local matches
        setAiMatches(eligibleList.map(job => ({
          id: job.id,
          guidance: `Verified Eligibility: Your chosen credentials satisfy the official recruitment notification requirements.`
        })));
      }
    } catch (err: any) {
      console.warn("Direct Gemini pipeline error, fallback to local match guidelines", err);
      setSearchError("General matching guide active. Displaying official verified listings.");
      setAiMatches(eligibleList.map(job => ({
        id: job.id,
        guidance: `Verified Eligibility: Your chosen credentials satisfy the official recruitment notification requirements.`
      })));
    } finally {
      setIsLoading(false);
    }
  };

  // Merge aiMatches mapping directly back to complete Job objects
  const displayMatchedJobs = useMemo(() => {
    return aiMatches
      .map(match => {
        const matchingJob = jobs.find(j => j.id === match.id);
        if (!matchingJob) return null;
        return {
          job: matchingJob,
          guidance: match.guidance
        };
      })
      .filter((item): item is { job: Job; guidance: string } => item !== null);
  }, [aiMatches, jobs]);

  return (
    <div className="space-y-6 text-left" id="eligibility-matches-container">
      {/* 📋 ENGINE SELECTORS PANEL */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Banner header to establish distinct tone */}
        <div className="bg-[#0a192f] text-white p-5 text-left">
          <h2 className="text-base font-extrabold tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            Check Live Government Job Eligibility
          </h2>
          <p className="text-xs text-slate-350 mt-1 leading-relaxed">
            Specify your domicile state, highest academic tier, and reserve community status below. We'll run a real-time eligibility matching algorithm and query the Gemini API directly.
          </p>
        </div>

        {/* Dynamic drop-down selectors form */}
        <form onSubmit={handleCheckEligibility} className="p-5 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Domicile State Selector */}
            <div className="space-y-1.5" id="state-select-container">
              <label htmlFor="elig-state" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                State of Domicile
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  id="elig-state"
                  required
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select State</option>
                  {Object.keys(STATES_AND_DISTRICTS).sort().map(stateName => (
                    <option key={stateName} value={stateName}>{stateName}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
              </div>
            </div>

            {/* Academic Qualification Selector */}
            <div className="space-y-1.5" id="qualification-select-container">
              <label htmlFor="elig-qualification" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Highest Qualification
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  id="elig-qualification"
                  required
                  value={selectedQualification}
                  onChange={(e) => setSelectedQualification(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Highest Level</option>
                  {selectableQualifications.map(qual => (
                    <option key={qual.id} value={qual.id}>{qual.label}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
              </div>
            </div>

            {/* Reservation Community Selector */}
            <div className="space-y-1.5" id="category-select-container">
              <label htmlFor="elig-category" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Social Category Queue
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  id="elig-category"
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
              </div>
            </div>

          </div>

          {/* Primary Unified CTA Button */}
          <div className="pt-2" id="check-eligibility-button-section">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#0a192f] text-emerald-450 hover:text-white border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  <span>Finding Matches...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Check Eligibility</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error alert if any */}
      {searchError && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="font-semibold leading-relaxed">{searchError}</p>
        </div>
      )}

      {/* 📋 ELIGIBLE MATCH RESULTS CONTAINER */}
      <div className="space-y-4">
        {hasSearched ? (
          isLoading ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm">
              <RefreshCw className="w-10 h-10 text-indigo-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Compiling Job Match Matrix</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                Applying relaxation models and parsing requirements dynamically against the Gemini AI engine...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                    Your Eligible Matches ({displayMatchedJobs.length})
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  Status: 100% Eligible
                </span>
              </div>

              {displayMatchedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayMatchedJobs.map(({ job, guidance }) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      userProfile={currentUserProfile} 
                      isSaved={savedJobIds.has(job.id)}
                      onToggleSave={onToggleSave}
                      isMatch={true}
                      guidance={guidance}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <Info className="w-12 h-12 text-slate-350 mx-auto mb-3" />
                  <h4 className="text-sm font-black text-slate-700 uppercase">No active matches found</h4>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    We verified your coordinates but no currently open job announcements in {selectedState} perfectly fit the selected criteria. Try adjusting your preferences!
                  </p>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
            <Info className="w-12 h-12 text-slate-350 mx-auto mb-3" />
            <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">No eligibility screening run yet</h4>
            <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
              Select your region state, qualifications, and reservation categories in the form above and click <strong className="text-slate-700">Check Eligibility</strong> to test eligibility parameters instantly against live openings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
