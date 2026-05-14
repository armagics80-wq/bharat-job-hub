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
  }
];

export const getDepartmentById = (id: string) => DEPARTMENTS.find(d => d.id === id);
