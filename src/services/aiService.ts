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
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const text = response.text || '{"matches": []}';
      return JSON.parse(text);
    } catch (error: any) {
      // Check if it's a quota error (429)
      const errorStr = JSON.stringify(error).toLowerCase();
      const isQuotaError = errorStr.includes('429') || errorStr.includes('resource_exhausted') || errorStr.includes('quota');

      if (isQuotaError) {
        console.warn("Gemini Quota exceeded. Using basic matching fallback.");
        
        // Simple fallback logic: filter jobs by region/state
        const fallbackMatches = availableJobs
          .filter(job => {
            const isStateMatch = job.region === userProfile.state || job.region === 'Central';
            const isLogicalResidency = !(
              (job.region === 'Telangana' && userProfile.state === 'Andhra Pradesh') ||
              (job.region === 'Andhra Pradesh' && userProfile.state === 'Telangana')
            );
            return isStateMatch && isLogicalResidency;
          })
          .map(job => ({
            id: job.id,
            guidance: "Matched based on qualification and residency. Detailed AI tips are temporarily restricted due to system limits."
          }));

        return { matches: fallbackMatches.slice(0, 5) };
      }

      console.error("Error in AI job matching:", error);
      return { matches: [] };
    }
  }
};
