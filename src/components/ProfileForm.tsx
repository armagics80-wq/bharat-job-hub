import { useState, useMemo } from 'react';
import { UserProfile, QualificationType } from '../types';
import { Save, GraduationCap, Calendar, User, FileText, Sparkles, BellRing, Search, Check, X, ShieldCheck, Briefcase } from 'lucide-react';
import { QUALIFICATIONS, QUAL_RANKS_MAP } from '../data/qualifications';

interface ProfileFormProps {
  initialData?: UserProfile | null;
  onSave: (data: UserProfile) => void;
  isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSave, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(() => {
    const defaultData: UserProfile = {
      fullName: '',
      phoneNumber: '',
      age: 18,
      qualifications: [],
      state: '',
      district: '',
      gender: 'Male',
      isPWD: false,
      skills: [],
      documents: [],
      otherCertificates: '',
      preferredRegion: 'All',
      subscriptions: {
        regions: [],
        categories: []
      }
    };

    if (!initialData) return defaultData;

        return {
          ...defaultData,
          ...initialData,
          qualifications: initialData.qualifications || ((initialData as any).qualification ? [(initialData as any).qualification as any] : []),
          subscriptions: initialData.subscriptions || defaultData.subscriptions
        };
      });

  const [qualSearch, setQualSearch] = useState('');

  const filteredQuals = useMemo(() => {
    if (!qualSearch) return QUALIFICATIONS;
    return QUALIFICATIONS.filter(q => 
      q.label.toLowerCase().includes(qualSearch.toLowerCase()) || 
      q.category.toLowerCase().includes(qualSearch.toLowerCase())
    );
  }, [qualSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.qualifications.length === 0) {
      alert('Please select at least one qualification to check eligibility.');
      return;
    }
    onSave(formData);
  };

  return (
    <form id="profile-form" onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-indigo-50 rounded">
          <User className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">Eligibility Profile</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-tight">Enter details for reservation matching</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Enter full name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Age
            </label>
            <input
              type="number"
              required
              min="18"
              max="100"
              value={formData.age || ''}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, age: val === '' ? 0 : parseInt(val) || 0 });
              }}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gender
            </label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-3 h-3" /> Select All Your Qualifications
            </label>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search qualification (e.g. BTech, Nursing, ITI...)"
                value={qualSearch}
                onChange={(e) => setQualSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-[240px] overflow-y-auto space-y-4 shadow-inner">
              {['School', 'Technical/Diploma', 'Degree', 'Postgraduate', 'Teaching', 'Special', 'Other'].map(cat => {
                const qualsInCategory = filteredQuals.filter(q => q.category === cat);
                if (qualsInCategory.length === 0) return null;
                
                return (
                  <div key={cat} className="space-y-2">
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1">{cat}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {qualsInCategory.map(q => {
                        const isSelected = formData.qualifications.includes(q.id);
                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => {
                              const newQuals = isSelected 
                                ? formData.qualifications.filter(id => id !== q.id) 
                                : [...formData.qualifications, q.id];
                              setFormData({ ...formData, qualifications: newQuals });
                            }}
                            className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded border text-[10px] font-medium transition-all text-left ${
                              isSelected 
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                            }`}
                          >
                            <span className="truncate">{q.label}</span>
                            {isSelected && <Check className="w-3 h-3 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filteredQuals.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-xs italic">
                  No qualifications found matching "{qualSearch}"
                </div>
              )}
            </div>

            {/* Selected Summary */}
            {formData.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.qualifications.map(id => (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[9px] font-bold">
                    {QUAL_RANKS_MAP[id]?.label || id}
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, qualifications: formData.qualifications.filter(q => q !== id) })}
                      className="hover:text-rose-600"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="pb-1 bg-slate-50 border border-dashed border-slate-200 rounded p-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.isPWD} 
                onChange={(e) => setFormData({ ...formData, isPWD: e.target.checked })}
                className="w-4 h-4 accent-indigo-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-700">PWD / Physically Handicapped?</span>
                <p className="text-[9px] text-slate-500">Enable this to see jobs with age relaxation and PH reservation.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              State
            </label>
            <select
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white"
            >
              <option value="">Select State</option>
              <option value="Telangana">Telangana</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              District
            </label>
            <input
              type="text"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Your district"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Basic Documents (Select All)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['Aadhar Card', 'Cast Certificate', 'EWS Cert', 'Income Cert', 'Residence Cert', 'PH Certificate'].map((doc) => {
              const isSelected = formData.documents.includes(doc);
              return (
                <button
                  key={doc}
                  type="button"
                  onClick={() => {
                    const newDocs = isSelected 
                      ? formData.documents.filter(d => d !== doc) 
                      : [...formData.documents, doc];
                    setFormData({ ...formData, documents: newDocs });
                  }}
                  className={`flex items-center gap-2 p-2 rounded border text-[9px] font-bold transition-all ${
                    isSelected 
                    ? 'bg-indigo-900 border-indigo-900 text-white' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                >
                  <FileText className="w-2.5 h-2.5" />
                  {doc}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            What other certificates do you have?
          </label>
          <textarea
            value={formData.otherCertificates}
            onChange={(e) => setFormData({ ...formData, otherCertificates: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all min-h-[60px]"
            placeholder="Type your extra certificates here (e.g. NCC, Sports, Typing, Computer Basic...)"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mb-2">
          <BellRing className="w-3.5 h-3.5 text-indigo-600" />
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Real-time Job Alerts</h3>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Subscribe to Regions
            </label>
            <div className="flex flex-wrap gap-2">
              {['Central', 'Telangana', 'Andhra Pradesh'].map((region) => {
                const isSelected = formData.subscriptions?.regions.includes(region);
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => {
                      const currentRegions = formData.subscriptions?.regions || [];
                      const newRegions = isSelected 
                        ? currentRegions.filter(r => r !== region) 
                        : [...currentRegions, region];
                      setFormData({ 
                        ...formData, 
                        subscriptions: { 
                          ...(formData.subscriptions || { categories: [] }), 
                          regions: newRegions 
                        } 
                      });
                    }}
                    className={`px-3 py-1 rounded-full border text-[9px] font-bold transition-all ${
                      isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Job Categories (Based on Qualification)
            </label>
            <div className="flex flex-wrap gap-2">
              {['Police', 'Teaching', 'Banking', 'Railway', 'Group-I/II', 'Technical'].map((cat) => {
                const isSelected = formData.subscriptions?.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const currentCats = formData.subscriptions?.categories || [];
                      const newCats = isSelected 
                        ? currentCats.filter(c => c !== cat) 
                        : [...currentCats, cat];
                      setFormData({ 
                        ...formData, 
                        subscriptions: { 
                          ...(formData.subscriptions || { regions: [] }), 
                          categories: newCats 
                        } 
                      });
                    }}
                    className={`px-3 py-1 rounded-full border text-[9px] font-bold transition-all ${
                      isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="text-[9px] text-slate-400 mt-1 italic">You will receive notifications immediately when new jobs match these criteria.</p>
          </div>
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full py-2.5 bg-indigo-600 text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <Save className="w-3.5 h-3.5" />
            Save & Check Eligibility
          </>
        )}
      </button>
    </form>
  );
}
