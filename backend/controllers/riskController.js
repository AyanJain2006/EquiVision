const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const calculateRiskLevel = (answers) => {
    // Example logic: sum of numerical values of answers
    const score = Object.values(answers).reduce((acc, val) => acc + parseInt(val), 0);
    
    if (score < 15) return 'Low';
    if (score < 25) return 'Medium';
    return 'High';
};

const getRiskProfile = async (req, res) => {
    try {
        const { name, answers } = req.body;
        const riskLevel = calculateRiskLevel(answers);
        
        let aiRiskAnalysis = "Based on your answers, your risk profile is calculated as " + riskLevel + ". You should maintain a balanced approach.";
        
        if (process.env.GEMINI_API_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                
                const prompt = `Analyze an investor's risk profile based on these scores: Duration Score=${answers.duration}, Risk Appetite Score=${answers.riskType}, Amount Score=${answers.amount}. The overall calculated risk level is ${riskLevel}. Provide a concise 2-sentence explanation of why this risk level suits them.`;
                
                const result = await model.generateContent(prompt);
                const response = await result.response;
                aiRiskAnalysis = response.text();
            } catch (aiError) {
                console.error("AI Risk Analysis Error:", aiError.message);
            }
        }
        
        let user = await User.findOne({ name });
        if (user) {
            user.riskLevel = riskLevel;
            user.aiRiskAnalysis = aiRiskAnalysis;
            await user.save();
        } else {
            user = await User.create({ name, riskLevel, aiRiskAnalysis });
        }
        
        res.json({ riskLevel, user, aiRiskAnalysis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRiskProfile };
