import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRiskProfile = (name, answers) => api.post('/risk-profile', { name, answers });
export const getPortfolio = (userId) => api.get(`/portfolio/${userId}`);
export const getStocks = () => api.get('/stocks');
export const rebalancePortfolio = (userId) => api.post('/rebalance', { userId });

export default api;
