import { useState } from 'react';
import { UserProfile } from '../types';
import { QUALIFICATIONS } from '../data/qualifications';
import { STATES_AND_DISTRICTS } from '../data/statesAndDistricts';
import { User, Phone, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

interface ProfileFormProps {
  initialData?: UserProfile | null;
  onSave: (data: UserProfile) => void | Promise<void>;
  isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSave, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.fullName || '',
    phone: initialData?.phoneNumber || '',
    state: initialData?.state || '',
    qualification: initialData?.qualifications?.[0] || '',
    category: initialData?.category || 'UR',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter qualifications to present user with high-level academic/vocational choices
  const selectableQualifications = QUALIFICATIONS.filter(q => 
    ['School', 'Technical/Diploma', 'Degree', 'Postgraduate'].includes(q.category)
  ).sort((a, b) => a.rank - b.rank);

  const categories = [
    { id: 'UR', label: 'General / Unreserved (UR)' },
    { id: 'EWS', label: 'Economically Weaker Section (EWS)' },
    { id: 'OBC_NCL', label: 'OBC - Non Creamy Layer (OBC-NCL)' },
    { id: 'SC', label: 'Scheduled Caste (SC)' },
    { id: 'ST', label: 'Scheduled Tribe (ST)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    // 1. MUST be the very first line of handleSubmit
    e.preventDefault();

    // 2. Add temporary alert to confirm click registration
    alert("Connecting to database...");

    setIsSubmitting(true);

    try {
      // 3. Asynchronous POST request to '/api/save-user'
      const response = await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          state: formData.state,
          qualification: formData.qualification,
          category: formData.category,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('[SheetDB] User profile synchronized successfully!');

      // Map back to global UserProfile object structure with defaults for required core fields
      const mappedProfile: UserProfile = {
        fullName: formData.name,
        phoneNumber: formData.phone,
        state: formData.state,
        qualifications: [formData.qualification as any],
        category: formData.category as any,
        nationalCategory: formData.category as any,
        age: 24, // neutral default age
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

      // 4. Immediately trigger existing match-fetching sequence
      await onSave(mappedProfile);

    } catch (err: any) {
      // Show exact failure message in browser console
      console.error(err.message || 'Failed to save profile to Google Sheets.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div id="profile-form-container" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-2xl mx-auto">
      {/* Header section */}
      <div className="bg-[#0a192f] text-white p-5 text-left">
        <h2 className="text-base font-extrabold tracking-wide flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          Check Government Job Eligibility
        </h2>
        <p className="text-xs text-slate-350 mt-1 leading-relaxed">
          Provide your core credentials below to verify your eligibility for SSC, Railways, and State Commission vacancies.
        </p>
      </div>

      {/* Form content */}
      <form id="profile-eligibility-form" onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 text-left">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="name-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Full Name <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="name-input"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Column grid for Phone & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Input */}
          <div className="space-y-1.5">
            <label htmlFor="phone-input" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Phone Number <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="phone-input"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* District / State Select */}
          <div className="space-y-1.5">
            <label htmlFor="state-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              State of Domicile <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                id="state-select"
                required
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs appearance-none cursor-pointer"
              >
                <option value="">Select State</option>
                {Object.keys(STATES_AND_DISTRICTS).sort().map(stateName => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
            </div>
          </div>
        </div>

        {/* Qualification Select */}
        <div className="space-y-1.5">
          <label htmlFor="qualification-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Highest Academic Qualification <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              id="qualification-select"
              required
              value={formData.qualification}
              onChange={(e) => handleInputChange('qualification', e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs appearance-none cursor-pointer"
            >
              <option value="">Select Highest Qualification</option>
              {selectableQualifications.map(qual => (
                <option key={qual.id} value={qual.id}>{qual.label}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
          </div>
        </div>

        {/* Reservation Category Select */}
        <div className="space-y-1.5">
          <label htmlFor="category-select" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Social Category / Community Reservation Quota <span className="text-rose-500 font-bold">*</span>
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              id="category-select"
              required
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 hover:bg-slate-50/50 border border-slate-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs appearance-none cursor-pointer"
            >
              <option value="">Select Quota Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
          </div>
        </div>

        {/* Form CTA Submit Button */}
        <div className="pt-4" id="submit-button-section">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-3 bg-[#0a192f] text-emerald-400 hover:text-white border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting || isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-200/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving Profile...</span>
              </>
            ) : (
              <span>Save & Check Eligibility</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
