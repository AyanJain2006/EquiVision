const { getStockData } = require('../services/alphaVantageService');

const getTopStocks = async (req, res) => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
    try {
        const stockPromises = symbols.map(symbol => getStockData(symbol));
        const stocks = await Promise.all(stockPromises);
        res.json(stocks.filter(s => s !== null));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTopStocks };
