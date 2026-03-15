import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYLLABUS_URLS = [
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.ECE.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E.CSE.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/EEE/B.E.%20EEE.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.Tech.IT.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Mech/B.E.Mech.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/Civil/BE.Civil.pdf",
  "https://cac.annauniv.edu/aidetails/afug_2021_fu/Revised/IandC/B.E%20ECE%20(VLSI%20Design).pdf",
  "https://cac.annauniv.edu/aidetails/afug_2025_fu/ECE/B.E%20Electronics%20&%20Computer%20Eng.pdf",
  "https://cac.annauniv.edu/uddetails/udug_2023_revision/ECE/B.E.%20Biomedical.pdf"
];

export type Question = {
  id: string;
  type: "mcq" | "drawing";
  text: string;
  options?: string[];
  correctAnswer?: string;
};

export async function generateQuestions(topic: string): Promise<Question[]> {
  const prompt = `Generate 10 questions for the engineering topic "${topic}". 
  Base the questions on the Anna University syllabus provided in the following URLs:
  ${SYLLABUS_URLS.join("\n")}
  
  If the topic is generic like "Unit 1 - Topic 1", pick a random topic from the syllabus of the specified subject.
  Ensure the questions are different every time this is called (add randomness).
  Make them challenging but fair for college students.
  Include a mix of "mcq" (multiple choice) and "drawing" type questions. About 2-3 questions should be "drawing" type (e.g., "Draw the circuit diagram for...", "Sketch the waveform of...").
  For MCQ questions, include exactly 4 options and specify the correct answer.
  For Drawing questions, do not include options or correct answer fields.
  Return the result as a JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        tools: [{ urlContext: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, description: "Either 'mcq' or 'drawing'" },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 4 options, only required if type is 'mcq'"
              },
              correctAnswer: { type: Type.STRING, description: "Only required if type is 'mcq'" }
            },
            required: ["id", "type", "text"]
          }
        },
        temperature: 0.9, // High temperature for variety
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    const questions = JSON.parse(text) as Question[];
    return questions;
  } catch (error: any) {
    console.error("Error generating questions:", error);
    
    // Fallback questions if API fails (e.g., rate limit 429)
    console.log("Using fallback questions due to API error.");
    return getFallbackQuestions(topic);
  }
}

function getFallbackQuestions(topic: string): Question[] {
  return [
    {
      id: "fb1",
      type: "mcq",
      text: `Which of the following is a fundamental concept in ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A"
    },
    {
      id: "fb2",
      type: "mcq",
      text: `What is the primary application of the principles learned in ${topic}?`,
      options: ["Data Analysis", "System Design", "Signal Processing", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      id: "fb3",
      type: "drawing",
      text: `Draw a basic block diagram representing a core system in ${topic}.`
    },
    {
      id: "fb4",
      type: "mcq",
      text: `Which mathematical tool is most commonly used to analyze problems in ${topic}?`,
      options: ["Calculus", "Linear Algebra", "Probability", "Discrete Math"],
      correctAnswer: "Calculus"
    },
    {
      id: "fb5",
      type: "drawing",
      text: `Sketch the typical output waveform or graph expected in a standard ${topic} experiment.`
    }
  ];
}
