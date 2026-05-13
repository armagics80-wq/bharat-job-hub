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
      You are an expert career counselor for government jobs in India (Central, Telangana, and Andhra Pradesh).
      Given the user profile and a list of jobs, filter and rank the jobs that most closely match the user's eligibility.
      
      User Profile:
      - Qualification: ${userProfile.qualification}
      - Age: ${userProfile.age}
      - Gender: ${userProfile.gender}
      - PWD Status: ${userProfile.isPWD ? 'Yes (Person with Disability)' : 'No'}
      - State: ${userProfile.state}
      - District: ${userProfile.district}
      - Documents: ${userProfile.documents.join(', ')}
      - Other Certificates: ${userProfile.otherCertificates || 'None'}
      
      Available Jobs:
      ${availableJobs.map(j => `ID: ${j.id}, Title: ${j.title}, Dept: ${j.department}, Region: ${j.region}, Qualification: ${j.qualification}, Max Age: ${j.maxAge}`).join('\n')}
      
      Return a JSON array of matching jobs. ORDER BY ELIGIBILITY. 
      IMPORTANT: 
      1. If a job is from Telangana and user is from Andhra Pradesh (and vice-versa), consider it low priority or ineligible UNLESS it's a Central job or specifically allows other state residents.
      2. Female and PWD candidates often have separate reservations, vacancies, or age relaxations. Account for this in the guidance.
      3. For Central jobs, many candidates from all states are eligible.
      
      Provide a detailed "guidance" string for each matching job. 
      The guidance should include:
      1. Why the user is a good fit.
      2. Specific exam preparation tips (e.g., focus on Arithmetic, General Studies, or technical subjects).
      3. Important documents they must have ready (e.g., "Keep your Study Certificates from 4th to 10th class ready for Local candidate verification").
      4. Note any reservation benefits they might get (Female/PWD/State).
      
      Format: { "matches": [{ "id": "job_id", "guidance": "detailed reasoning and tips" }] }
    `;

    try {
      // Set a race between AI matching and a 4s timeout fallback
      const aiPromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI Matching Timeout")), 4000)
      );

      const response: any = await Promise.race([aiPromise, timeoutPromise]);
      
      const text = response.text || '{"matches": []}';
      return JSON.parse(text);
    } catch (error: any) {
      console.warn("AI matching failed or timed out. Using fast local fallback.", error.message);
      
      // Fast Local Matching Fallback
      const matches = availableJobs
        .filter(job => {
          // 1. Basic Region/State Match
          const isStateMatch = job.region === userProfile.state || job.region === 'Central';
          
          // 2. Basic Qualification Check (Case-insensitive substring match)
          const userQual = userProfile.qualification.toLowerCase();
          const jobQual = job.qualification.toLowerCase();
          const isQualMatch = jobQual.includes(userQual) || userQual.includes(jobQual) || jobQual === 'any degree';
          
          // 3. Simple Age Check
          const isAgeMatch = userProfile.age <= job.maxAge;

          return isStateMatch && isQualMatch && isAgeMatch;
        })
        .map(job => ({
          id: job.id,
          guidance: `Eligible based on ${job.qualification} requirement and ${job.region} residency. Age requirement (${job.maxAge}) met.`
        }));

      return { matches: matches.slice(0, 10) };
    }
  }
};
