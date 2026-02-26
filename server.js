const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI with server-side API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-server-api-key-here');

// AI Enhancement endpoint
app.post('/api/enhance-summary', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ 
        error: 'Please enter your summary first.' 
      });
    }

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
    const enhancedText = response.text().trim();

    res.json({ 
      enhancedText 
    });

  } catch (error) {
    console.error("AI Enhancement Error:", error);
    res.status(500).json({ 
      error: "AI enhancement failed. Please check your internet connection and try again." 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resume Builder AI Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;