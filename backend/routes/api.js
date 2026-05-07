const express = require('express');
const router = express.Router();
const { getRiskProfile } = require('../controllers/riskController');
const { getPortfolio, rebalancePortfolio } = require('../controllers/portfolioController');
const { getTopStocks } = require('../controllers/stockController');
const { chatWithAI } = require('../controllers/chatController');

const { getStats } = require('../controllers/statsController');

// Risk Routes
router.post('/risk-profile', getRiskProfile);

// Portfolio Routes
router.get('/portfolio/:userId', getPortfolio);
router.post('/rebalance', rebalancePortfolio);

// Stock Routes
router.get('/stocks', getTopStocks);

// Chat Route
router.post('/chat', chatWithAI);

// Stats Route
router.get('/stats', getStats);

module.exports = router;
