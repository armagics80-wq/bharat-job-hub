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

    // 3. Regional / State Check Configuration (Inter-state candidates can apply as UR)
    const isOutofState = job.region !== 'Central' && user.state && job.region !== user.state;
    if (isOutofState) {
      return {
        isEligible: false,
        reason: `Restricted to candidates residing in ${job.region} state only. Your registered state is ${user.state}.`,
        type: 'error'
      };
    }

    const effectiveCategory = user.category;
    const effectiveIsPWD = user.isPWD;
    const effectiveIsExServiceman = user.isExServiceman;

    // 4. Age Check with Advanced Relaxation
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

    // Calculate relaxation based on effective qualifications/categories
    const catRelax = CATEGORY_RELAXATION[effectiveCategory] || 0;
    
    if (effectiveIsPWD) {
      // PwBD relaxation is often cumulative or a fixed higher value (usually +10)
      totalRelaxation = 10 + (catRelax > 0 ? catRelax : 0);
      relaxationReason = `Eligible under PwBD + ${effectiveCategory.replace('_', ' ')} relaxation (+${totalRelaxation}y)`;
    } else if (catRelax > 0) {
      totalRelaxation = catRelax;
      relaxationReason = `Eligible under ${effectiveCategory.replace('_', ' ')} relaxation (+${totalRelaxation}y)`;
    } else if (effectiveIsExServiceman) {
      totalRelaxation = 3;
      relaxationReason = `Eligible under Ex-Serviceman relaxation (+3y)`;
    } else if (user.gender === 'Female' && job.region !== 'Central') {
      // Many State govt jobs have 5 years relaxation for local state women candidates
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

    let ageExplanation = "";
    if (user.age > baseMaxAge && user.age <= maxAllowedAge) {
      ageExplanation = relaxationReason || `Eligible due to age relaxation.`;
    }

    // 5. District-Level Filtering (if job defines a specific district location, check if user resides there)
    if (job.location && job.location !== 'All India' && !job.location.toLowerCase().includes('statewide') && !job.location.toLowerCase().includes('all districts')) {
      const userDistrict = (user.district || '').toLowerCase();
      const jobLocation = job.location.toLowerCase();
      
      // If the location specifies a structured district (not 'statewide') and doesn't match the user district
      if (userDistrict && !jobLocation.includes(userDistrict) && jobLocation.trim() !== '') {
        // District-specific jobs are highly localized; warn but mark ineligible if they don't match
        return {
          isEligible: false,
          reason: `Restricted to candidates residing in ${job.location} district only. Your district is registered as ${user.district}.`,
          type: 'error'
        };
      }
    }

    return {
      isEligible: true,
      reason: ageExplanation || relaxationReason || `Eligible based on ${minRequiredQual?.label || 'general'} requirements.`,
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
