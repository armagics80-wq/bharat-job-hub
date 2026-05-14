import { GoogleGenAI } from "@google/genai";
import { Job, UserProfile } from "../types";
import { isUserEligible } from "../lib/utils";
import { getDepartmentById } from "../data/departments";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const aiService = {
  async matchJobs(userProfile: UserProfile, eligibleJobs: Job[]): Promise<{ matches: { id: string; guidance: string }[] }> {
    if (eligibleJobs.length === 0 || !process.env.GEMINI_API_KEY) {
      return { 
        matches: eligibleJobs.map(job => ({
          id: job.id,
          guidance: `Verified Eligibility: Your ${userProfile.qualification} satisfies the ${job.qualification} requirement for this ${job.region} position.`
        }))
      };
    }

    const model = "gemini-3-flash-preview";
    const prompt = `
      You are a career counselor for Indian government jobs. The following jobs have been VERIFIED as eligible for the user.
      Provide a highly encouraging one-sentence guidance for each job explaining why their specific profile (${userProfile.qualification}, ${userProfile.state}) is a perfect fit.
      
      User Profile:
      - Qualification: ${userProfile.qualification}
      - State: ${userProfile.state}
      - Age: ${userProfile.age}

      Eligible Jobs:
      ${eligibleJobs.map(j => `ID: ${j.id}, Title: ${j.title}, Dept: ${getDepartmentById(j.departmentId)?.name || j.departmentId}`).join('\n')}
      
      Format: { "matches": [{ "id": "job_id", "guidance": "Concise guidance string" }] }
    `;

    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI Matching Timeout")), 4000)
      );

      const aiPromise = ai.models.generateContent({
        model: model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });

      const response: any = await Promise.race([aiPromise, timeoutPromise]);
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '{"matches": []}';
      
      const result = JSON.parse(text.replace(/```json|```/g, '').trim());
      
      // Post-filter AI results to ensure we only return IDs that were in our eligible list
      if (result.matches) {
        result.matches = result.matches.filter((m: {id: string}) => eligibleJobs.some(j => j.id === m.id));
      }
      
      return result;
    } catch (error: any) {
      console.warn("AI guidance failed or timed out. Using fallback guidance.", error.message);
      
      return {
        matches: eligibleJobs.map(job => ({
          id: job.id,
          guidance: `Strict match: Your ${userProfile.qualification} satisfies the ${job.qualification} requirement for this ${job.region} position.`
        }))
      };
    }
  }
};
