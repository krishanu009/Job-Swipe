
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();


const generate = async (prompt) => {
try{
    console.log("prompt",prompt);
  const ai = new GoogleGenAI({});
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;

  // return "asdffsd";

}
catch(e)
{
  console.log("err@ generate".e);
}


}

const generateUserDescription = async (candidate) =>
{
   let relavantInfo = extractRelevantInfo(candidate);

   let prompt = process.env.USER_DESC_PROMPT + JSON.stringify(relavantInfo);
   console.log("relavantInfo",relavantInfo);
   return await generate(prompt);
}

function extractRelevantInfo(candidate) {
  const {
    firstName,
    lastName,
    experiance = [],
    project = []
  } = candidate;

  
  const sortedExperience = [...experiance].sort((a, b) => {
    const dateA = a.current ? new Date() : new Date(a.endDate);
    const dateB = b.current ? new Date() : new Date(b.endDate);
    return dateB - dateA;
  });

  const latestExperience = sortedExperience[0] || {};


  const topProjects = project.slice(0, 2).map(p => ({
    name: p.projectName,
    domain: p.domain,
    description: p.description,
    techLinks: {
      github: p.githubLink,
      live: p.liveLink
    }
  }));

  return {
    name: `${firstName || ""} ${lastName || ""}`.trim(),
    latestExperience: {
      company: latestExperience.companyName || null,
      position: latestExperience.position || null,
      duration: latestExperience.startDate && latestExperience.endDate
        ? `${new Date(latestExperience.startDate).getFullYear()} - ${new Date(latestExperience.endDate).getFullYear()}`
        : latestExperience.current ? "Present" : null,
      description: latestExperience.roleDescription || null
    },
    projects: topProjects
  };
}


module.exports = {generate,generateUserDescription}


