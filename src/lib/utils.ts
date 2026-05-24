import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QualificationType, UserProfile, Job } from '../types';
import { getQualificationById } from '../data/qualifications';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  type: 'success' | 'warning' | 'error';
}

function QUALIFICATIONS_DISPLAY(ids: QualificationType[]): string {
  try {
    if (!ids || ids.length === 0) return 'None';
    return ids.map(id => {
      try {
        return getQualificationById(id)?.label || id;
      } catch (e) {
        return id;
      }
    }).join(', ');
  } catch (error) {
    return 'Processing error';
  }
}

export function isUserEligible(user: UserProfile, job: Job): EligibilityResult {
  try {
    if (!user || !job) {
      return { isEligible: false, reason: "Invalid data", type: "error" };
    }

    // 1. Qualification Hierarchy Check
    const userQuals = user.qualifications || [];
    const userRank = Math.max(0, ...userQuals.map(q => {
      try {
        return getQualificationById(q)?.rank || 0;
      } catch (e) {
        return 0;
      }
    }));
    
    // Strict matching if allowedQualifications is provided
    const hasAllowedQual = job.allowedQualifications 
      ? userQuals.some(q => job.allowedQualifications!.includes(q))
      : true;

    const minRequiredQual = getQualificationById(job.minQualification);
    const minRequiredRank = minRequiredQual?.rank || 0;

    // Rule: If job lists specific allowed types, user MUST have at least one
    if (job.allowedQualifications && !hasAllowedQual) {
      const allowedLabels = job.allowedQualifications.map(q => {
        try {
          return getQualificationById(q)?.label || q;
        } catch (e) {
          return q;
        }
      }).join(' or ');

      return {
        isEligible: false,
        reason: `Requires specific qualification: ${allowedLabels}.`,
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
      const userContext = (userQuals.map(q => {
        try {
          return getQualificationById(q)?.label || '';
        } catch (e) {
          return '';
        }
      }).join(' ') + ' ' + (user.skills || []).join(' ') + ' ' + (user.otherCertificates || '')).toLowerCase();
      
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

    // 3. Age Check with Advanced Relaxation
    const baseMaxAge = job.maxAge;
    let totalRelaxation = 0;
    let relaxationReason = "";

    // Define standard relaxations
    const CATEGORY_RELAXATION: Record<string, number> = {
      'OBC_NCL': 3,
      'SC': 5,
      'ST': 5,
      'EWS': 0, // Usually no age relaxation for EWS in most notifications
      'BC_A': 5, 'BC_B': 5, 'BC_C': 5, 'BC_D': 5, 'BC_E': 5,
      'AP_BC_A': 5, 'AP_BC_B': 5, 'AP_BC_C': 5, 'AP_BC_D': 5, 'AP_BC_E': 5,
    };

    // Calculate relaxation
    const catRelax = CATEGORY_RELAXATION[user.category] || 0;
    
    if (user.isPWD) {
      // PwBD relaxation is often cumulative or a fixed higher value (usually +10)
      totalRelaxation = 10 + (catRelax > 0 ? catRelax : 0);
      relaxationReason = `Eligible under PwBD + ${user.category.replace('_', ' ')} relaxation (+${totalRelaxation}y)`;
    } else if (catRelax > 0) {
      totalRelaxation = catRelax;
      relaxationReason = `Eligible under ${user.category.replace('_', ' ')} relaxation (+${totalRelaxation}y)`;
    } else if (user.isExServiceman) {
      totalRelaxation = 3;
      relaxationReason = `Eligible under Ex-Serviceman relaxation (+3y)`;
    } else if (user.gender === 'Female' && job.region !== 'Central') {
      // Many State govt jobs have 5 years relaxation for women
      totalRelaxation = 5;
      relaxationReason = `Eligible under Women's relaxation (+5y)`;
    }

    const maxAllowedAge = baseMaxAge + totalRelaxation;

    if (user.age < job.minAge) {
      return {
        isEligible: false,
        reason: `Minimum age required is ${job.minAge}.`,
        type: 'error'
      };
    }

    if (user.age > maxAllowedAge) {
      return {
        isEligible: false,
        reason: `Age ${user.age} exceeds relaxed limit of ${maxAllowedAge} for ${user.category.replace('_', ' ')}.`,
        type: 'error'
      };
    }

    if (user.age > baseMaxAge && user.age <= maxAllowedAge) {
      return {
        isEligible: true,
        reason: relaxationReason || `Eligible due to age relaxation.`,
        type: 'success'
      };
    }

    // 4. Regional / State Check (Local vs Non-Local)
    if (job.region !== 'Central' && job.region !== user.state) {
      // In TS/AP, non-locals can apply for "Open" quota (usually 5-20% of posts)
      // We'll mark as warning instead of strict error unless specified
      const isStrictLocal = job.detailedReservation?.localNonLocalRules?.toLowerCase().includes('only') || false;
      
      if (isStrictLocal) {
        return {
          isEligible: false,
          reason: `Restricted to ${job.region} residents only (Strictly Local).`,
          type: 'error'
        };
      }

      return {
        isEligible: true,
        reason: `Eligible as Non-Local candidate for ${job.region} notification.`,
        type: 'warning'
      };
    }

    return {
      isEligible: true,
      reason: relaxationReason || `Eligible based on ${minRequiredQual?.label || 'general'} requirements.`,
      type: 'success'
    };
  } catch (error) {
    console.error("Eligibility processing failed:", error);
    return {
      isEligible: false,
      reason: "Unable to process eligibility right now",
      type: "error"
    };
  }
}
