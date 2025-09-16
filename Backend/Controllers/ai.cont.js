import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            res.status(400).json({ message: " Messing Required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") //remove string ```json
            .replace(/```$/, "") //remove ending...
            .trim() //remove the extra spaces

        //Now safe to parse
        const data = JSON.parse(cleanedText)

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate Questions", error: error.message });

    }
}

export const generateConceptExplanation = async (req, res) => {
    try {
        const {question}=req.body;

        if(!question){
            return res.status(400).json({message: "Missing required fields"})
        }

        const prompt=conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") //remove string ```json
            .replace(/```$/, "") //remove ending...
            .trim() //remove the extra spaces

        //Now safe to parse
        const data = JSON.parse(cleanedText)

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: "Failed to generate Questions", error: error.message });
    }
}