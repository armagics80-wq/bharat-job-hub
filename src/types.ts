import { QualificationID } from './data/qualifications';

export type QualificationType = QualificationID;

export interface Department {
  id: string;
  name: string;
  oldNames?: string[];
  officialUrl: string;
  state: 'Central' | 'Telangana' | 'Andhra Pradesh';
  category: 'SSC' | 'UPSC' | 'RRB' | 'Banking' | 'Police' | 'PSC' | 'Defence' | 'State Govt' | 'Central Govt' | 'Teaching';
  verified: boolean;
  lastVerifiedOn: string;
  lastCheckedAt: string;
}

export interface Job {
  id: string;
  title: string;
  departmentId: string;
  region: 'Central' | 'Telangana' | 'Andhra Pradesh';
  qualification: string; // Display string
  minQualification: QualificationType;
  allowedQualifications?: QualificationType[];
  specialRequirements?: string[];
  minAge: number;
  maxAge: number;
  salary: string;
  lastDate: string;
  notificationDate: string;
  examDate?: string;
  applyLink: string;
  officialSource: string;
  officialPdfUrl?: string;
  description: string;
  jobType: string;
  jobCategory: 'Police' | 'Teaching' | 'Railway' | 'Clerical' | 'Medical' | 'Technical' | 'Defense' | 'Banking' | 'Civil Services' | 'Other';
  natureOfWork: string;
  selectionProcess: string;
  examPattern?: string;
  reservationDetails?: string;
  location: string;
  howToApplySteps: string[];
  applicationFee?: string;
  documentRequired: string[];
  status: 'Active' | 'Upcoming' | 'Expired';
  sourceType: 'Official Notification' | 'Upcoming Opportunity' | 'Media Prediction';
  verified?: boolean;
  verificationStatus: 'Verified' | 'Pending' | 'Unavailable';
  lastVerifiedAt?: string;
  expiryTime?: number;
  lastCheckedAt?: string;
  lastUpdatedAt?: string;
}

export interface ActivityEvent {
  id: string;
  type: 'added' | 'updated' | 'expired' | 'removed' | 'verified';
  title: string;
  timestamp: string;
  targetId?: string;
}

export interface UserProfile {
  fullName: string;
  phoneNumber?: string;
  age: number;
  qualifications: QualificationType[];
  state: string;
  district: string;
  gender: 'Male' | 'Female' | 'Other';
  isPWD: boolean;
  skills: string[];
  documents: string[];
  otherCertificates?: string;
  preferredRegion?: string;
  subscriptions?: {
    regions: string[];
    categories: string[];
  };
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}
