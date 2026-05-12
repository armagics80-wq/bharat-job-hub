export interface Job {
  id: string;
  title: string;
  department: string;
  region: 'Central' | 'Telangana' | 'Andhra Pradesh';
  qualification: string;
  minAge: number;
  maxAge: number;
  salary: string;
  lastDate: string;
  notificationDate: string;
  applyLink: string;
  officialWebsite: string;
  description: string;
  documentRequired: string[];
  status: 'Active' | 'Expired' | 'Upcoming' | 'Exam Scheduled';
  examNote?: string;
}

export interface UserProfile {
  fullName: string;
  phoneNumber?: string;
  age: number;
  qualification: string;
  state: string;
  district: string;
  gender: 'Male' | 'Female' | 'Other';
  isPWD: boolean;
  skills: string[];
  documents: string[];
  otherCertificates?: string;
  preferredRegion?: string;
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
