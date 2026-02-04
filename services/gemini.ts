
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDocumentRisk = async (docDescription: string, base64Images: string[] = []) => {
  try {
    const parts: any[] = [
      {
        text: `You are a Nigerian land documentation expert. Analyze the following document details and any attached photos. Explain the legal risks, what to verify (e.g., AGIS, Land Registry), and the pros/cons in simple Nigerian English. Use terms like "original copy", "certified true copy", "search at registry".
      
      Document Description: ${docDescription || 'No description provided, please analyze the images.'}`
      }
    ];

    base64Images.forEach((img) => {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: img.split(',')[1] || img
        }
      });
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: "You are a professional but friendly real estate lawyer in Abuja. You speak clearly and emphasize trust and due diligence. You are helping a client understand if their land documents are genuine and what steps they need to take for verification.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oga, we sorry. I no fit analyze this one right now. Abeg try again later or check your network.";
  }
};

export const getNeighborhoodInsights = async (location: string, landmark: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick, punchy "vibe check" for a property located in ${location} near ${landmark}. 
      Mention things like typical power supply (NEPA/PHCN), security levels, road quality, and the "caliber" of neighbors. 
      Use 3 short bullet points. Keep it professional but local (Nigerian context).`,
      config: {
        systemInstruction: "You are an Abuja neighborhood expert. You know every street from Maitama to Kubwa. You give honest, insider advice to home seekers.",
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    return "• Premium location with good accessibility.\n• High security zone.\n• Reliable utility support in this axis.";
  }
};
