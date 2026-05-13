import { useState } from 'react';
import { UserProfile } from '../types';
import { Save, GraduationCap, Calendar, User, FileText, Sparkles } from 'lucide-react';

interface ProfileFormProps {
  initialData?: UserProfile | null;
  onSave: (data: UserProfile) => void;
  isLoading?: boolean;
}

export default function ProfileForm({ initialData, onSave, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    fullName: '',
    phoneNumber: '',
    age: 18,
    qualification: '',
    state: '',
    district: '',
    gender: 'Male',
    isPWD: false,
    skills: [],
    documents: [],
    otherCertificates: '',
    preferredRegion: 'All'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              value={isNaN(formData.age) ? '' : formData.age}
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, age: val === '' ? NaN : parseInt(val) });
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Qualification
            </label>
            <select
              required
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white"
            >
              <option value="">Select</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Degree (Arts/Science/Comm)">Degree (General)</option>
              <option value="B.E / B.Tech">B.E / B.Tech</option>
              <option value="LLB / LLM (Law)">Law (LLB/LLM)</option>
              <option value="MBBS / BDS / BPT">Medical (MBBS/BDS)</option>
              <option value="B.Pharm / M.Pharm">Pharmacy</option>
              <option value="Diploma (Polytechnic)">Diploma</option>
              <option value="Post Graduate (MA/MSc/MCom)">Post Graduate</option>
              <option value="PhD">Doctorate (PhD)</option>
              <option value="CA / ICWA / CS">Finance (CA/CS)</option>
            </select>
          </div>
          
          <div className="pb-1">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50 border border-slate-100">
              <input 
                type="checkbox" 
                checked={formData.isPWD} 
                onChange={(e) => setFormData({ ...formData, isPWD: e.target.checked })}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-xs font-bold text-slate-700">PWD / Physically Handicapped?</span>
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
