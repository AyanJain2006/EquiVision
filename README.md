# Smart Investment Diversification System

A full-stack application built with React, Node.js, Express, and MongoDB.

## Features
- **Risk Profiling**: Determine your investment risk level through an institutional-grade questionnaire.
- **Dynamic Portfolio**: View your asset allocation (Stocks, Bonds, Gold, Crypto) based on your risk profile.
- **Real-time Stocks**: Fetch live market data using the Alpha Vantage API.
- **Portfolio Rebalancing**: Adjust your assets to optimal target levels with one click.
- **Premium UI**: Integrated with a high-fidelity design from Stitch.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS (via CDN), Chart.js, Axios.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **External API**: Alpha Vantage.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB running locally (default: `mongodb://localhost:27017/investment-db`).
- Alpha Vantage API Key (Optional, uses demo/mock data if not provided).

### Setup Backend
1. Navigate to `backend` folder.
2. Install dependencies: `npm install`.
3. Configure `.env` if needed.
4. Start server: `npm start` or `node server.js`.

### Setup Frontend
1. Navigate to `frontend` folder.
2. Install dependencies: `npm install`.
3. Start development server: `npm run dev`.

## API Endpoints
- `POST /api/risk-profile`: Submit questionnaire and get risk level.
- `GET /api/portfolio/:risk`: Get allocation for a specific risk level.
- `GET /api/stocks`: Get live stock data.
- `POST /api/rebalance`: Rebalance a user's portfolio.
