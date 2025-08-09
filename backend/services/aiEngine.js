
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();


const generate = async (prompt) => {

const ai = new GoogleGenAI({});
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}


module.exports = {generate}


