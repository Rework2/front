import OpenAI from "openai";

export const openaiClient = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || "API_KEY",
});

export default openaiClient;

