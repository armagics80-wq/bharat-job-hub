import { GoogleGenAI } from "@google/genai";
import { Job, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const aiService = {
  async matchJobs(userProfile: UserProfile, availableJobs: Job[]) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found. Skipping AI matching.");
      return availableJobs;
    }

    const model = "gemini-3-flash-preview";
    const prompt = `
      You are an expert career counselor for Indian government jobs. Match users with eligible jobs across Central and State streams.

      User Profile:
      - Qualification: ${userProfile.qualification}
      - Age: ${userProfile.age}
      - Gender: ${userProfile.gender}
      - State: ${userProfile.state}
      - District: ${userProfile.district}
      - PWD: ${userProfile.isPWD ? 'Yes' : 'No'}
      
      Available Jobs:
      ${availableJobs.map(j => `ID: ${j.id}, Title: ${j.title}, Dept: ${j.department}, Region: ${j.region}, Qualification: ${j.qualification}, Max Age: ${j.maxAge}`).join('\n')}
      
      MATCHING PHILOSOPHY:
      1. BE GENEROUS: It is better to show a "Partial Match" than nothing at all.
      2. HIERARCHY: If a user has a "Degree" / "B.Tech" / "PG", they are ELIGIBLE for all jobs requiring 10th, 12th, or general Degree.
      3. REGION: Central jobs are for everyone. State jobs (TS/AP) are primary for state residents but show them as "Secondary Match" for others if eligibility fits.
      4. AGE: Consider standard age relaxations (+5 years for Female/PWD) even if not explicitly in the job description.
      
      Provide a JSON array of matches. 
      Guidance should be encouraging: "You qualify for this because your ${userProfile.qualification} exceeds the requirement."
      
      Format: { "matches": [{ "id": "job_id", "guidance": "Encouraging eligibility guidance" }] }
    `;

    try {
      const aiPromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI Matching Timeout")), 3000)
      );

      const response: any = await Promise.race([aiPromise, timeoutPromise]);
      const text = response.text || '{"matches": []}';
      return JSON.parse(text);
    } catch (error: any) {
      console.warn("AI matching failed or timed out. Using permissive local fallback.", error.message);
      
      const getQualScore = (q: string) => {
        if (!q) return 0;
        const low = q.toLowerCase();
        if (low.includes('post graduate') || low.includes('pg') || low.includes('m.') || low.includes('phd') || low.includes('doctorate')) return 40;
        if (low.includes('graduate') || low.includes('degree') || low.includes('b.') || low.includes('any degree')) return 30;
        if (low.includes('12th') || low.includes('inter') || low.includes('diploma') || low.includes('polytechnic')) return 20;
        if (low.includes('10th') || low.includes('ssc')) return 10;
        return 5;
      };

      const userScore = getQualScore(userProfile.qualification);

      return {
        matches: availableJobs
          .filter(job => {
            // Region: Central is open to all. State jobs are open to residents.
            const isRegionalMatch = job.region === 'Central' || job.region === userProfile.state;
            
            // Qual: User score >= job score.
            const jobScore = getQualScore(job.qualification);
            const isQualMatch = userScore >= jobScore;

            // Age: Basic check + generous relaxation for Female/PWD.
            const ageBuff = (userProfile.gender === 'Female' || userProfile.isPWD) ? 5 : 0;
            const isAgeMatch = userProfile.age <= (job.maxAge + ageBuff);

            return isRegionalMatch && isQualMatch && isAgeMatch;
          })
          .map(job => ({
            id: job.id,
            guidance: `Eligible based on qualification hierarchy (${userProfile.qualification} covers ${job.qualification}). Residency and age requirements within standard boundaries.`
          }))
          .slice(0, 15)
      };
    }
  }
};
