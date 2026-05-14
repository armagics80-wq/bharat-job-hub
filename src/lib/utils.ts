import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QualificationType, UserProfile, Job } from '../types';
import { QUAL_RANKS_MAP } from '../data/qualifications';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  type: 'success' | 'warning' | 'error';
}

function QUALIFICATIONS_DISPLAY(ids: QualificationType[]): string {
  if (!ids || ids.length === 0) return 'None';
  return ids.map(id => QUAL_RANKS_MAP[id]?.label || id).join(', ');
}

export function isUserEligible(user: UserProfile, job: Job): EligibilityResult {
  // 1. Qualification Hierarchy Check
  const userQuals = user.qualifications || [];
  const userRank = Math.max(0, ...userQuals.map(q => QUAL_RANKS_MAP[q]?.rank || 0));
  
  // Strict matching if allowedQualifications is provided
  const hasAllowedQual = job.allowedQualifications 
    ? userQuals.some(q => job.allowedQualifications!.includes(q))
    : true;

  const minRequiredQual = QUAL_RANKS_MAP[job.minQualification];
  const minRequiredRank = minRequiredQual?.rank || 0;

  // Rule: If job lists specific allowed types, user MUST have at least one
  if (job.allowedQualifications && !hasAllowedQual) {
    return {
      isEligible: false,
      reason: `Requires specific qualification: ${job.allowedQualifications.map(q => QUAL_RANKS_MAP[q]?.label || q).join(' or ')}.`,
      type: 'error'
    };
  }

  // Fallback to hierarchy rank
  if (job.minQualification !== 'Any' && minRequiredRank !== 0 && userRank < minRequiredRank) {
    return {
      isEligible: false,
      reason: `Requires ${minRequiredQual?.label || job.minQualification}. Your level is insufficient.`,
      type: 'error'
    };
  }

  // 2. Specific Technical Requirement Check
  if (job.specialRequirements && job.specialRequirements.length > 0) {
    const userContext = (userQuals.map(q => QUAL_RANKS_MAP[q]?.label || '').join(' ') + ' ' + user.skills.join(' ') + ' ' + (user.otherCertificates || '')).toLowerCase();
    
    const missingSpecs = job.specialRequirements.filter(spec => 
      !userContext.includes(spec.toLowerCase())
    );

    if (missingSpecs.length > 0) {
      return {
        isEligible: false,
        reason: `Requires: ${missingSpecs.join(', ')}.`,
        type: 'warning'
      };
    }
  }

  // 3. Age Check with Relaxation
  const baseMaxAge = job.maxAge;
  const isReserved = user.isPWD || user.gender === 'Female';
  const relaxation = isReserved ? 5 : 0;
  if (user.age < job.minAge) {
    return {
      isEligible: false,
      reason: `Minimum age required is ${job.minAge}.`,
      type: 'error'
    };
  }
  if (user.age > (baseMaxAge + relaxation)) {
    return {
      isEligible: false,
      reason: `Exceeds age limit (${user.age} > ${baseMaxAge}${relaxation ? `+${relaxation}` : ''}).`,
      type: 'error'
    };
  }

  // 4. Regional Check
  if (job.region !== 'Central' && job.region !== user.state) {
    return {
      isEligible: false,
      reason: `Restricted to ${job.region} residents.`,
      type: 'error'
    };
  }

  return {
    isEligible: true,
    reason: `Eligible based on ${minRequiredQual?.label || 'general'} requirements.`,
    type: 'success'
  };
}
