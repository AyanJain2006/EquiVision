import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api');

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
export const sendChatMessage = (userId, message) => api.post('/chat', { userId, message });
export const getStats = () => api.get('/stats');

export default api;
