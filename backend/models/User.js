const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Unassigned'],
        default: 'Unassigned'
    },
    portfolio: {
        stocks: { type: Number, default: 0 },
        bonds: { type: Number, default: 0 },
        gold: { type: Number, default: 0 },
        crypto: { type: Number, default: 0 }
    },
    diversificationScore: {
        type: Number,
        default: 0
    },
    aiRiskAnalysis: {
        type: String,
        default: ''
    },
    aiPortfolioRecommendation: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
