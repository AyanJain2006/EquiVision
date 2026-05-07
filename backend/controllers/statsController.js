const User = require('../models/User');

const getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        
        const baseAssets = 1500000;
        const assetsUnderAnalysis = baseAssets + (userCount * 50000); 
        
        // Calculate averages using aggregation
        const avgStats = await User.aggregate([
            {
                $group: {
                    _id: null,
                    avgStocks: { $avg: "$portfolio.stocks" },
                    avgBonds: { $avg: "$portfolio.bonds" },
                    avgGold: { $avg: "$portfolio.gold" },
                    avgCrypto: { $avg: "$portfolio.crypto" },
                    avgScore: { $avg: "$diversificationScore" }
                }
            }
        ]);

        let allocation = {
            stocks: 40,
            bonds: 30,
            gold: 20,
            crypto: 10
        };
        let diversificationScore = 85;

        if (avgStats.length > 0) {
            allocation = {
                stocks: Math.round(avgStats[0].avgStocks || 40),
                bonds: Math.round(avgStats[0].avgBonds || 30),
                gold: Math.round(avgStats[0].avgGold || 20),
                crypto: Math.round(avgStats[0].avgCrypto || 10)
            };
            diversificationScore = Math.round(avgStats[0].avgScore || 85);
        }
        
        // Risk efficiency could be a static or semi-dynamic metric
        const riskEfficiency = 12.4 + (userCount * 0.1);

        res.json({
            activeInvestors: userCount,
            assetsUnderAnalysis: assetsUnderAnalysis,
            averageAllocation: allocation,
            diversificationScore: diversificationScore > 0 ? diversificationScore : 94,
            riskEfficiency: riskEfficiency.toFixed(1)
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
};

module.exports = { getStats };
