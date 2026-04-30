const express = require('express');
const router = express.Router();
const { getRiskProfile } = require('../controllers/riskController');
const { getPortfolio, rebalancePortfolio } = require('../controllers/portfolioController');
const { getTopStocks } = require('../controllers/stockController');

// Risk Routes
router.post('/risk-profile', getRiskProfile);

// Portfolio Routes
router.get('/portfolio/:userId', getPortfolio);
router.post('/rebalance', rebalancePortfolio);

// Stock Routes
router.get('/stocks', getTopStocks);

module.exports = router;
