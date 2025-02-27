require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Secure API key
});

app.post("/generate-resume", async (req, res) => {
  const { name, skills, experience, education } = req.body;

  if (!name || !skills || !experience || !education) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const prompt = `Create a professional resume for ${name}. 
  Skills: ${skills}. 
  Experience: ${experience}. 
  Education: ${education}.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const resumeContent = completion.choices[0]?.message?.content || "No content generated.";
    res.json({ resume: resumeContent });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
