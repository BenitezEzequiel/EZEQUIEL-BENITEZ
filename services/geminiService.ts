
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedAssets } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    pythonScript: {
      type: Type.STRING,
      description: "A complete, executable Python script using Selenium WebDriver to automate the scenario. The script should be well-commented, explaining each step, following best practices. It must include necessary imports and webdriver setup/teardown.",
    },
    testCases: {
      type: Type.ARRAY,
      description: "A list of relevant test cases, including both positive and negative scenarios.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          type: { type: Type.STRING, enum: ['Positive', 'Negative'] },
          description: { type: Type.STRING, description: "A concise description of the test case." },
          steps: { type: Type.STRING, description: "Step-by-step instructions for the test case." },
          expectedResult: { type: Type.STRING, description: "The expected outcome of the test case." },
        },
        required: ['id', 'type', 'description', 'steps', 'expectedResult'],
      },
    },
    bugReport: {
      type: Type.OBJECT,
      description: "A sample bug report based on a plausible failure from one of the negative test cases.",
      properties: {
        title: { type: Type.STRING, description: "A clear, concise title for a potential bug." },
        environment: { type: Type.STRING, description: "Example environment details, e.g., 'Browser: Chrome 125, OS: Windows 11'." },
        stepsToReproduce: { type: Type.STRING, description: "Numbered steps to reproduce the bug." },
        actualResult: { type: Type.STRING, description: "What actually happened." },
        expectedResult: { type: Type.STRING, description: "What should have happened according to specifications." },
      },
      required: ['title', 'environment', 'stepsToReproduce', 'actualResult', 'expectedResult'],
    },
  },
  required: ['pythonScript', 'testCases', 'bugReport'],
};


export async function generateTestAssets(scenario: string): Promise<GeneratedAssets> {
  const systemInstruction = `You are an expert QA Automation Engineer specializing in Python with Selenium. Your task is to act as a teaching assistant for a university student's final project on test automation. Given a user's scenario, you must generate a complete testing package in a structured JSON format. The response must adhere strictly to the provided JSON schema. Ensure the Python code is complete, executable, and includes comments explaining the logic.`;
  
  const prompt = `Based on the following test scenario, please generate the required testing assets.

Scenario: "${scenario}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.5,
      }
    });
    
    const jsonText = response.text.trim();
    const parsedData: GeneratedAssets = JSON.parse(jsonText);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not get a valid response from the AI model.");
  }
}
