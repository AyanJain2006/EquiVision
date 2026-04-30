const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const allocations = {
    Low: { stocks: 30, bonds: 50, gold: 20, crypto: 0 },
    Medium: { stocks: 50, bonds: 30, gold: 10, crypto: 10 },
    High: { stocks: 70, bonds: 10, gold: 10, crypto: 10 }
};

const calculateDiversificationScore = (portfolio) => {
    const assets = Object.values(portfolio).filter(val => val > 0).length;
    return (assets / 4) * 100;
};

const getPortfolio = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const risk = user.riskLevel;
        const allocation = allocations[risk] || allocations.Medium;
        const score = calculateDiversificationScore(allocation);
        
        res.json({ 
            allocation, 
            diversificationScore: score,
            aiPortfolioRecommendation: user.aiPortfolioRecommendation || "Based on your risk level, this diversified allocation is ideal for stability and growth."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rebalancePortfolio = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const targetAllocation = allocations[user.riskLevel] || allocations.Medium;
        user.portfolio = targetAllocation;
        user.diversificationScore = calculateDiversificationScore(targetAllocation);
        
        let aiPortfolioRecommendation = "Based on your risk level, this diversified allocation is ideal for stability and growth.";
        
        if (process.env.GEMINI_API_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                
                const prompt = `Act as an expert financial advisor. My risk level is ${user.riskLevel}. My new portfolio allocation is: Stocks ${targetAllocation.stocks}%, Bonds ${targetAllocation.bonds}%, Gold ${targetAllocation.gold}%, Crypto ${targetAllocation.crypto}%. Provide a concise, engaging 2-sentence explanation on why this specific mix is recommended for me.`;
                
                const result = await model.generateContent(prompt);
                const response = await result.response;
                aiPortfolioRecommendation = response.text();
            } catch (aiError) {
                console.error("AI Portfolio Recommendation Error:", aiError.message);
            }
        }
        
        user.aiPortfolioRecommendation = aiPortfolioRecommendation;
        await user.save();
        
        res.json({ 
            message: 'Portfolio rebalanced successfully', 
            portfolio: user.portfolio, 
            score: user.diversificationScore,
            aiPortfolioRecommendation 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPortfolio, rebalancePortfolio };
