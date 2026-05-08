const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithAI = async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fetch User Data
        let user = null;
        if (userId) {
            user = await User.findById(userId);
        }

        const riskLevel = user ? user.riskLevel : 'Unassigned';
        const portfolio = user ? user.portfolio : null;

        // Structured prompt
        const prompt = `
You are an expert AI financial advisor. 
The user asks: "${message}"

User context:
- Risk Profile: ${riskLevel}
- Current Portfolio: ${portfolio ? JSON.stringify(portfolio) : 'No portfolio yet'}

Guidelines:
- Act like a financial advisor.
- Understand queries related to investments (stocks, gold, bonds, etc.)
- Provide recommendations, reasoning, risk level, and allocation suggestions (percentages).
- If user is HIGH risk -> suggest more stocks.
- If LOW risk -> suggest bonds + gold.
- If no portfolio -> suggest beginner allocation.
- If they ask for stock recommendations, suggest 2-3 stocks with sector, risk level, and reason.

Your response MUST be in strictly valid JSON format exactly matching the following structure:
{
  "advice": "Your detailed advice here...",
  "allocation": {
    "stocks": "percentage (e.g. 50%)",
    "gold": "percentage (e.g. 30%)",
    "bonds": "percentage (e.g. 20%)"
  },
  "reasoning": "Your detailed reasoning here...",
  "risk_level": "High/Medium/Low"
}
Return ONLY valid JSON. Do not include markdown code blocks like \`\`\`json.
`;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        let textResponse = result.response.text();
        
        // Clean markdown backticks if AI still includes them
        textResponse = textResponse.replace(/```json/gi, '').replace(/```/g, '').trim();

        const parsedResponse = JSON.parse(textResponse.trim());

        res.json(parsedResponse);
    } catch (error) {
        console.error('Chat AI Error:', error);
        res.status(500).json({ error: 'Failed to process AI chat response', details: error.message });
    }
};
