import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQualificationRank(q: string): number {
  if (!q) return 0;
  const low = q.toLowerCase();
  
  if (low.includes('post graduate') || low.includes('pg') || low.includes('masters') || low.includes('m.') || low.includes('mtech') || low.includes('mca') || low.includes('msc')) return 5;
  if (low.includes('graduate') || low.includes('degree') || low.includes('bachelor') || low.includes('b.') || low.includes('btech') || low.includes('any degree') || low.includes('graduation')) return 4;
  if (low.includes('diploma') || low.includes('polytechnic')) return 3;
  if (low.includes('12th') || low.includes('intermediate') || low.includes('inter') || low.includes('hsc') || low.includes('iti')) return 2;
  if (low.includes('10th') || low.includes('ssc') || low.includes('matric')) return 1;
  return 0;
}

export function isUserEligible(user: any, job: any): boolean {
  // 1. Qualification Hierarchical Check
  const userRank = getQualificationRank(user.qualification);
  const jobQuals = job.qualification.split(/[/,;]|\sor\s/i).map((s: string) => s.trim()).filter(Boolean);
  
  let satisfiesQual = false;
  if (jobQuals.length > 0) {
    const minRequiredRank = Math.min(...jobQuals.map((q: string) => getQualificationRank(q)).filter((r: number) => r > 0));
    satisfiesQual = userRank >= minRequiredRank;
  } else {
    satisfiesQual = userRank >= getQualificationRank(job.qualification);
  }
  
  if (!satisfiesQual) return false;

  // 2. Age Check with Relaxation
  const baseMaxAge = job.maxAge;
  const relaxation = (user.gender === 'Female' || user.isPWD || user.category !== 'General') ? 5 : 0;
  if (user.age > (baseMaxAge + relaxation)) return false;

  // 3. Regional Check
  if (job.region !== 'Central' && job.region !== user.state) return false;

  return true;
}
