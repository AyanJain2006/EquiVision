import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStocks, getPortfolio, rebalancePortfolio } from '../services/api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { name: 'Investor', riskLevel: 'Medium' });
    const [stocks, setStocks] = useState([]);
    const [portfolio, setPortfolio] = useState({ stocks: 0, bonds: 0, gold: 0, crypto: 0 });
    const [score, setScore] = useState(0);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [loading, setLoading] = useState(true);
    const [rebalancing, setRebalancing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const stockRes = await getStocks();
            setStocks(stockRes.data);

            if (user._id) {
                const portfolioRes = await getPortfolio(user._id);
                setPortfolio(portfolioRes.data.allocation);
                setScore(portfolioRes.data.diversificationScore);
                setAiRecommendation(portfolioRes.data.aiPortfolioRecommendation);
            }
        } catch (err) {
            console.error("Error fetching dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRebalance = async () => {
        if (!user._id) {
            alert("Please complete the risk profile form first.");
            return;
        }
        setRebalancing(true);
        try {
            const res = await rebalancePortfolio(user._id);
            setPortfolio(res.data.portfolio);
            setScore(res.data.score);
            setAiRecommendation(res.data.aiPortfolioRecommendation);
            
            // update local storage user if needed
            const updatedUser = { ...user, aiPortfolioRecommendation: res.data.aiPortfolioRecommendation };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            
            alert("Portfolio rebalanced to optimal levels!");
        } catch (err) {
            alert("Failed to rebalance. Please try again.");
        } finally {
            setRebalancing(false);
        }
    };

    const chartData = {
        labels: ['Stocks', 'Bonds', 'Gold', 'Crypto'],
        datasets: [{
            data: [portfolio.stocks, portfolio.bonds, portfolio.gold, portfolio.crypto],
            backgroundColor: ['#004ac6', '#006c49', '#bc4800', '#737686'],
            borderWidth: 0,
        }]
    };

    const chartOptions = {
        cutout: '70%',
        plugins: { legend: { display: false } }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-background text-on-surface">
            {/* SideNavBar */}
            <aside className="bg-white border-r border-gray-200 h-screen w-64 fixed left-0 top-0 z-40 hidden md:flex flex-col py-6 font-['Manrope']">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-gray-900 leading-none">Wealth Portal</h1>
                        <p className="text-[10px] uppercase tracking-widest text-outline mt-1">Institutional Grade</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <div 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 flex items-center px-4 py-3 rounded-sm cursor-pointer"
                    >
                        <span className="material-symbols-outlined mr-3">dashboard</span> Overview
                    </div>
                    {['Allocations', 'Performance', 'Risk Analysis', 'Reports'].map(item => {
                        const iconMap = {
                            'Allocations': 'pie_chart',
                            'Performance': 'trending_up',
                            'Risk Analysis': 'security',
                            'Reports': 'assessment'
                        };
                        
                        const handleSidebarClick = () => {
                            if (item === 'Reports') {
                                window.print();
                                return;
                            }
                            
                            const sectionIdMap = {
                                'Allocations': 'allocations-section',
                                'Performance': 'performance-section',
                                'Risk Analysis': 'risk-section'
                            };
                            
                            const element = document.getElementById(sectionIdMap[item]);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        };
                        
                        return (
                            <div key={item} onClick={handleSidebarClick} className="text-gray-600 hover:bg-gray-50 flex items-center px-4 py-3 rounded-sm cursor-pointer transition-all">
                                <span className="material-symbols-outlined mr-3">{iconMap[item]}</span>
                                <span className="font-body-sm">{item}</span>
                            </div>
                        );
                    })}
                </nav>
                <div className="px-4 mt-auto">
                    <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                        <span className="material-symbols-outlined text-sm">add</span> New Investment
                    </button>
                    <div className="border-t border-gray-100 pt-6 mt-6 pb-6">
                        <Link to="/" className="text-gray-600 hover:bg-gray-50 flex items-center px-4 py-2 rounded-sm"><span className="material-symbols-outlined mr-3 text-sm">logout</span> Sign Out</Link>
                    </div>
                </div>
            </aside>

            <main className="flex-1 md:ml-64 pb-12">
                <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30 font-['Manrope']">
                    <h2 className="font-headline-sm text-on-surface">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-outline hover:text-primary"><span className="material-symbols-outlined">notifications</span></button>
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3q21FKyN955mvFFkZxAS5YCDe5UtuZnUUWnXX5S5o5ktgowCVwvMNxtUt4jaLYn9UOFfmV6Qdk0tWdJ6CzqCTtkrYVwrhFfF6WpTutSJ7QQk9HaLWPIAakUq_ylojhuYSxqHlHWwd2b0wUSLjA4ZtNaEU-VNWnDbwAXZbhK5hulUPH_XS45MQTep2VNYzhxpaujGtGpRHGZCvDNto0fORTO62LCsvpOTbi_r5jJsj9L27VH7923S17V7PIDRRcwKbSPxxqY0yHPI" alt="User" />
                        </div>
                    </div>
                </header>

                <div className="max-w-[1440px] mx-auto px-8 pt-8 font-['Manrope']">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                            <h3 className="font-display-lg text-display-lg text-on-surface">Welcome back, {user.name}</h3>
                            <p className="text-on-surface-variant font-body-md mt-1">Your {user.riskLevel} risk portfolio is optimized for current market conditions.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-secondary-container px-4 py-2 rounded-xl flex items-center gap-2">
                                <span className="material-symbols-outlined text-on-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-on-secondary-container leading-none">Risk Level</p>
                                    <p className="font-headline-sm text-on-secondary-container leading-tight">{user.riskLevel}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleRebalance}
                                disabled={rebalancing}
                                className="bg-primary text-white font-bold h-12 px-6 rounded-lg shadow-sm hover:shadow-md active:opacity-80 transition-all flex items-center gap-2"
                            >
                                {rebalancing ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <><span className="material-symbols-outlined">rebase_edit</span> Rebalance Portfolio</>}
                            </button>
                        </div>
                    </div>

                    {/* AI Insights Section */}
                    {(user.aiRiskAnalysis || aiRecommendation) && (
                        <div id="risk-section" className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-sm mb-8 scroll-mt-24">
                            <h4 className="font-headline-sm text-blue-900 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue-600">psychology</span> 
                                AI Portfolio Analysis
                            </h4>
                            <div className="space-y-4">
                                {user.aiRiskAnalysis && (
                                    <div className="bg-white/60 p-4 rounded-lg">
                                        <p className="text-sm font-bold text-gray-700 mb-1">Risk Profile Insights</p>
                                        <p className="text-sm text-gray-800">{user.aiRiskAnalysis}</p>
                                    </div>
                                )}
                                {aiRecommendation && (
                                    <div className="bg-white/60 p-4 rounded-lg">
                                        <p className="text-sm font-bold text-gray-700 mb-1">Portfolio Recommendation</p>
                                        <p className="text-sm text-gray-800">{aiRecommendation}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-12 gap-6">
                        <div id="allocations-section" className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm scroll-mt-24">
                            <h4 className="font-headline-sm mb-8">Asset Allocation</h4>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-48 h-48 relative">
                                    <Doughnut data={chartData} options={chartOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <p className="text-xs text-outline font-bold uppercase">Allocated</p>
                                        <p className="text-xl font-bold">100%</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    {Object.entries(portfolio).map(([asset, value], idx) => (
                                        <div key={asset} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: chartData.datasets[0].backgroundColor[idx]}}></div>
                                                <span className="text-sm font-medium capitalize">{asset}</span>
                                            </div>
                                            <span className="text-sm font-bold">{value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-headline-sm">Diversification Index</h4>
                                    <p className="text-sm text-outline">Stability rating based on asset mix</p>
                                </div>
                                <div className="bg-secondary/10 px-3 py-1 rounded-full">
                                    <span className="text-secondary font-bold text-sm">Optimized</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                <div className="p-4 bg-surface-container-low rounded-lg text-center">
                                    <p className="text-sm text-outline mb-1">Health Score</p>
                                    <p className="text-3xl font-display-lg text-primary">{score}/100</p>
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                        <div className="bg-primary h-full transition-all duration-1000" style={{width: `${score}%`}}></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-surface-container-low rounded-lg text-center">
                                    <p className="text-sm text-outline mb-1">Risk Adjusted</p>
                                    <p className="text-3xl font-display-lg text-secondary">{user.riskLevel === 'Low' ? 'High' : 'Optimal'}</p>
                                </div>
                                <div className="p-4 bg-surface-container-low rounded-lg text-center">
                                    <p className="text-sm text-outline mb-1">Asset Types</p>
                                    <p className="text-3xl font-display-lg text-tertiary">{Object.values(portfolio).filter(v => v > 0).length}</p>
                                </div>
                            </div>
                            {score < 75 && (
                                <div className="mt-8 flex items-center justify-between p-4 bg-error-container/10 border border-error/20 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-error">warning</span>
                                        <p className="text-sm font-medium text-error">Alert: Your portfolio is not sufficiently diversified. Click rebalance.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div id="performance-section" className="col-span-12 scroll-mt-24">
                            <h4 className="font-headline-md mb-4">Market Watch (Performance)</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {stocks.map(stock => (
                                    <div key={stock.symbol} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-primary transition-all cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="font-bold">{stock.symbol}</p>
                                                <p className="text-xs text-outline">{stock.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xs font-bold ${stock.change.startsWith('-') ? 'text-error' : 'text-secondary'}`}>
                                                    {stock.changePercent}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-8 w-full mt-2">
                                            <svg className="w-full h-full" viewBox="0 0 100 30">
                                                <path d="M0 25 L20 22 L40 24 L60 18 L80 20 L100 5" fill="none" stroke={stock.change.startsWith('-') ? '#ba1a1a' : '#006c49'} strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
