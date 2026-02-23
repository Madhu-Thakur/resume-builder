import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function enhanceSummary(text) {
  if (!text || text.trim() === "") {
    return "Please enter your summary first.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are a professional resume writing expert.

Rewrite the following professional summary to:
- Be ATS-friendly
- Use strong action verbs
- Sound confident and impactful
- Keep it under 120 words
- Avoid generic phrases like "hardworking" or "seeking opportunity"

Professional Summary:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();

  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return "AI enhancement failed. Please try again.";
  }
}