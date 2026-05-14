export type QualificationID = 
  | '5th' | '8th' | '10th' | '12th'
  | 'ITI' | 'Polytechnic' | 'Nursing_Diploma' | 'DEd' | 'DPharmacy'
  | 'Degree_Any' | 'BA' | 'BCom' | 'BSc' | 'BTech' | 'BCA' | 'BBA' | 'BEd' | 'LLB' | 'BPharmacy' | 'MBBS' | 'Agriculture_Degree' | 'Nursing_Degree'
  | 'PG_Any' | 'MA' | 'MSc' | 'MCom' | 'MBA' | 'MCA' | 'MTech' | 'LLM' | 'PhD'
  | 'TTC' | 'TET_Qualified' | 'DSC_Qualified'
  | 'NCC' | 'Sports_Quota' | 'Ex_Serviceman' | 'Apprentice' | 'Computer_Cert'
  | 'Any';

export interface Qualification {
  id: QualificationID;
  label: string;
  rank: number;
  category: 'School' | 'Technical/Diploma' | 'Degree' | 'Postgraduate' | 'Teaching' | 'Special' | 'Other';
}

export const QUALIFICATIONS: Qualification[] = [
  // School
  { id: '5th', label: '5th Pass', rank: 1, category: 'School' },
  { id: '8th', label: '8th Pass', rank: 2, category: 'School' },
  { id: '10th', label: '10th Pass / SSC', rank: 3, category: 'School' },
  { id: '12th', label: 'Intermediate / 12th Pass', rank: 4, category: 'School' },

  // Technical / Diploma
  { id: 'ITI', label: 'ITI', rank: 5, category: 'Technical/Diploma' },
  { id: 'Polytechnic', label: 'Polytechnic Diploma', rank: 5, category: 'Technical/Diploma' },
  { id: 'Nursing_Diploma', label: 'Nursing Diploma', rank: 5, category: 'Technical/Diploma' },
  { id: 'DEd', label: 'D.Ed', rank: 5, category: 'Technical/Diploma' },
  { id: 'DPharmacy', label: 'D.Pharmacy', rank: 5, category: 'Technical/Diploma' },

  // Degree
  { id: 'Degree_Any', label: 'Any Degree', rank: 6, category: 'Degree' },
  { id: 'BA', label: 'BA', rank: 6, category: 'Degree' },
  { id: 'BCom', label: 'BCom', rank: 6, category: 'Degree' },
  { id: 'BSc', label: 'BSc', rank: 6, category: 'Degree' },
  { id: 'BTech', label: 'BTech / BE', rank: 6, category: 'Degree' },
  { id: 'BCA', label: 'BCA', rank: 6, category: 'Degree' },
  { id: 'BBA', label: 'BBA', rank: 6, category: 'Degree' },
  { id: 'BEd', label: 'B.Ed', rank: 6, category: 'Degree' },
  { id: 'LLB', label: 'LLB', rank: 6, category: 'Degree' },
  { id: 'BPharmacy', label: 'B.Pharmacy', rank: 6, category: 'Degree' },
  { id: 'MBBS', label: 'MBBS', rank: 6, category: 'Degree' },
  { id: 'Agriculture_Degree', label: 'Agriculture Degree', rank: 6, category: 'Degree' },
  { id: 'Nursing_Degree', label: 'Nursing Degree', rank: 6, category: 'Degree' },

  // Postgraduate
  { id: 'PG_Any', label: 'Post Graduate (Any)', rank: 7, category: 'Postgraduate' },
  { id: 'MA', label: 'MA', rank: 7, category: 'Postgraduate' },
  { id: 'MSc', label: 'MSc', rank: 7, category: 'Postgraduate' },
  { id: 'MCom', label: 'MCom', rank: 7, category: 'Postgraduate' },
  { id: 'MBA', label: 'MBA', rank: 7, category: 'Postgraduate' },
  { id: 'MCA', label: 'MCA', rank: 7, category: 'Postgraduate' },
  { id: 'MTech', label: 'MTech', rank: 7, category: 'Postgraduate' },
  { id: 'LLM', label: 'LLM', rank: 7, category: 'Postgraduate' },
  { id: 'PhD', label: 'PhD', rank: 8, category: 'Postgraduate' },

  // Teaching
  { id: 'TTC', label: 'TTC', rank: 5, category: 'Teaching' },
  { id: 'TET_Qualified', label: 'TET Qualified', rank: 5, category: 'Teaching' },
  { id: 'DSC_Qualified', label: 'DSC Qualified', rank: 5, category: 'Teaching' },

  // Special
  { id: 'NCC', label: 'NCC Certificate', rank: 0, category: 'Special' },
  { id: 'Sports_Quota', label: 'Sports Quota', rank: 0, category: 'Special' },
  { id: 'Ex_Serviceman', label: 'Ex-Serviceman', rank: 0, category: 'Special' },
  { id: 'Apprentice', label: 'Apprentice Experience', rank: 0, category: 'Special' },
  { id: 'Computer_Cert', label: 'Computer Certification', rank: 0, category: 'Special' },

  { id: 'Any', label: 'Any Qualification', rank: 0, category: 'Other' }
];

export const QUAL_RANKS_MAP: Record<string, Qualification> = Object.fromEntries(
  QUALIFICATIONS.map(q => [q.id, q])
);

export const getQualificationById = (id: string) => QUAL_RANKS_MAP[id];
