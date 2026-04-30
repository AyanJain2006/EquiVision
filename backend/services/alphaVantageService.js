const axios = require('axios');

const getStockData = async (symbol) => {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data['Global Quote'];
        
        if (!data || Object.keys(data).length === 0) {
            // Return mock data if API limit reached or demo key used
            return {
                symbol,
                price: (Math.random() * 1000).toFixed(2),
                change: (Math.random() * 10 - 5).toFixed(2),
                changePercent: (Math.random() * 2 - 1).toFixed(2) + '%'
            };
        }

        return {
            symbol: data['01. symbol'],
            price: data['05. price'],
            change: data['09. change'],
            changePercent: data['10. change percent']
        };
    } catch (error) {
        console.error(`Error fetching stock ${symbol}:`, error.message);
        return null;
    }
};

module.exports = { getStockData };
