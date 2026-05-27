import { Department } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'ssc',
    name: 'Staff Selection Commission (SSC)',
    officialUrl: 'https://ssc.gov.in',
    state: 'Central',
    category: 'SSC',
    verified: true,
    lastVerifiedOn: '2026-05-10',
    lastCheckedAt: '2026-05-14T05:40:00Z'
  },
  {
    id: 'upsc',
    name: 'Union Public Service Commission (UPSC)',
    officialUrl: 'https://upsc.gov.in',
    state: 'Central',
    category: 'UPSC',
    verified: true,
    lastVerifiedOn: '2026-05-12',
    lastCheckedAt: '2026-05-14T05:41:00Z'
  },
  {
    id: 'rrb-central',
    name: 'Railway Recruitment Board (RRB)',
    officialUrl: 'https://www.rrcb.gov.in',
    state: 'Central',
    category: 'RRB',
    verified: true,
    lastVerifiedOn: '2026-05-08',
    lastCheckedAt: '2026-05-14T05:42:00Z'
  },
  {
    id: 'tgpsc',
    name: 'Telangana State Public Service Commission (TGPSC)',
    oldNames: ['TSPSC'],
    officialUrl: 'https://tgpsc.gov.in',
    state: 'Telangana',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-14',
    lastCheckedAt: '2026-05-14T05:43:00Z'
  },
  {
    id: 'appsc',
    name: 'Andhra Pradesh Public Service Commission (APPSC)',
    officialUrl: 'https://psc.ap.gov.in',
    state: 'Andhra Pradesh',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-13',
    lastCheckedAt: '2026-05-14T05:44:00Z'
  },
  {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    officialUrl: 'https://bank.sbi',
    state: 'Central',
    category: 'Banking',
    verified: true,
    lastVerifiedOn: '2026-05-11',
    lastCheckedAt: '2026-05-14T05:40:00Z'
  },
  {
    id: 'ibps',
    name: 'Institute of Banking Personnel Selection (IBPS)',
    officialUrl: 'https://www.ibps.in',
    state: 'Central',
    category: 'Banking',
    verified: true,
    lastVerifiedOn: '2026-05-09',
    lastCheckedAt: '2026-05-14T05:41:00Z'
  },
  {
    id: 'tg-police',
    name: 'Telangana State Level Police Recruitment Board (TGLPRB)',
    oldNames: ['TSLPRB'],
    officialUrl: 'https://tglprb.in',
    state: 'Telangana',
    category: 'Police',
    verified: true,
    lastVerifiedOn: '2026-05-14',
    lastCheckedAt: '2026-05-14T05:42:00Z'
  },
  {
    id: 'ap-police',
    name: 'Andhra Pradesh State Level Police Recruitment Board (APSLPRB)',
    oldNames: ['SLPRB AP'],
    officialUrl: 'https://slprb.ap.gov.in',
    state: 'Andhra Pradesh',
    category: 'Police',
    verified: true,
    lastVerifiedOn: '2026-05-10',
    lastCheckedAt: '2026-05-14T05:43:00Z'
  },
  {
    id: 'army',
    name: 'Indian Army',
    officialUrl: 'https://joinindianarmy.nic.in',
    state: 'Central',
    category: 'Defence',
    verified: true,
    lastVerifiedOn: '2026-05-05',
    lastCheckedAt: '2026-05-14T05:44:00Z'
  },
  {
    id: 'tg-govt',
    name: 'Telangana State Government',
    officialUrl: 'https://www.telangana.gov.in',
    state: 'Telangana',
    category: 'State Govt',
    verified: true,
    lastVerifiedOn: '2026-05-14',
    lastCheckedAt: '2026-05-14T05:45:00Z'
  },
  {
    id: 'tg-education',
    name: 'Directorate of School Education, Telangana',
    officialUrl: 'https://schooledu.telangana.gov.in',
    state: 'Telangana',
    category: 'Teaching',
    verified: true,
    lastVerifiedOn: '2026-05-14',
    lastCheckedAt: '2026-05-14T05:45:00Z'
  },
  {
    id: 'tg-tet',
    name: 'TSTET (Telangana State Teacher Eligibility Test)',
    officialUrl: 'https://tstet2024.aptonline.in',
    state: 'Telangana',
    category: 'Teaching',
    verified: true,
    lastVerifiedOn: '2026-05-14',
    lastCheckedAt: '2026-05-14T05:42:00Z'
  },
  // --- KARNATAKA ---
  {
    id: 'ka-kpsc',
    name: 'Karnataka Public Service Commission (KPSC)',
    officialUrl: 'https://ksc.karnataka.gov.in',
    state: 'Karnataka',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-24',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'ka-police',
    name: 'Karnataka State Police (KSP)',
    officialUrl: 'https://ksp.karnataka.gov.in',
    state: 'Karnataka',
    category: 'Police',
    verified: true,
    lastVerifiedOn: '2026-05-22',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- TAMIL NADU ---
  {
    id: 'tn-tnpsc',
    name: 'Tamil Nadu Public Service Commission (TNPSC)',
    officialUrl: 'https://tnpsc.gov.in',
    state: 'Tamil Nadu',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-23',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'tn-trb',
    name: 'Tamil Nadu Teacher Recruitment Board (TN TRB)',
    officialUrl: 'https://www.trb.tn.gov.in',
    state: 'Tamil Nadu',
    category: 'Teaching',
    verified: true,
    lastVerifiedOn: '2026-05-21',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- UTTAR PRADESH ---
  {
    id: 'up-uppsc',
    name: 'Uttar Pradesh Public Service Commission (UPPSC)',
    officialUrl: 'https://uppsc.up.nic.in',
    state: 'Uttar Pradesh',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-25',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'up-upsssc',
    name: 'Uttar Pradesh Subordinate Services Selection Commission (UPSSSC)',
    officialUrl: 'https://upsssc.gov.in',
    state: 'Uttar Pradesh',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-24',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- MAHARASHTRA ---
  {
    id: 'mh-mpsc',
    name: 'Maharashtra Public Service Commission (MPSC)',
    officialUrl: 'https://mpsc.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-24',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-police',
    name: 'Maharashtra Police Recruitment Board',
    officialUrl: 'https://mahapolice.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'Police',
    verified: true,
    lastVerifiedOn: '2026-05-22',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-education',
    name: 'Maharashtra General Education Department',
    officialUrl: 'https://education.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'Teaching',
    verified: true,
    lastVerifiedOn: '2026-05-23',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-health',
    name: 'Maharashtra Public Health Department',
    officialUrl: 'https://health.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'State Govt',
    verified: true,
    lastVerifiedOn: '2026-05-21',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-agri',
    name: 'Maharashtra Agriculture Department',
    officialUrl: 'https://agriculture.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'State Govt',
    verified: true,
    lastVerifiedOn: '2026-05-20',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-msrtc',
    name: 'Maharashtra State Road Transport Corporation (MSRTC)',
    officialUrl: 'https://msrtc.maharashtra.gov.in',
    state: 'Maharashtra',
    category: 'State Govt',
    verified: true,
    lastVerifiedOn: '2026-05-19',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  {
    id: 'mh-vitaran',
    name: 'MahaVitaran (MSEDCL)',
    officialUrl: 'https://www.mahadiscom.in',
    state: 'Maharashtra',
    category: 'State Govt',
    verified: true,
    lastVerifiedOn: '2026-05-18',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- BIHAR ---
  {
    id: 'br-bpsc',
    name: 'Bihar Public Service Commission (BPSC)',
    officialUrl: 'https://bpsc.bih.nic.in',
    state: 'Bihar',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-25',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- RAJASTHAN ---
  {
    id: 'rj-rpsc',
    name: 'Rajasthan Public Service Commission (RPSC)',
    officialUrl: 'https://rpsc.rajasthan.gov.in',
    state: 'Rajasthan',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-23',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- WEST BENGAL ---
  {
    id: 'wb-wbpsc',
    name: 'West Bengal Public Service Commission (WBPSC)',
    officialUrl: 'https://wbpsc.gov.in',
    state: 'West Bengal',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-24',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  },
  // --- MADHYA PRADESH ---
  {
    id: 'mp-mppsc',
    name: 'Madhya Pradesh Public Service Commission (MPPSC)',
    officialUrl: 'https://mppsc.mp.gov.in',
    state: 'Madhya Pradesh',
    category: 'PSC',
    verified: true,
    lastVerifiedOn: '2026-05-24',
    lastCheckedAt: '2026-05-26T12:00:00Z'
  }
];

export const getDepartmentById = (id: string) => DEPARTMENTS.find(d => d.id === id);
