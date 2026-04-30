import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRiskProfile } from '../services/api';

const RiskFormPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState({
        duration: '',
        riskType: '',
        amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !answers.duration || !answers.riskType) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Mapping values to numbers for backend scoring
            const mappedAnswers = {
                duration: answers.duration === '1-3' ? 2 : answers.duration === '3-7' ? 5 : answers.duration === '7-15' ? 8 : 12,
                riskType: answers.riskType === 'Conservative' ? 3 : answers.riskType === 'Balanced' ? 7 : 12,
                amount: 5 // placeholder for amount weighting
            };

            const response = await getRiskProfile(name, mappedAnswers);
            const { riskLevel, user } = response.data;
            
            // Save user info to local storage for dashboard
            localStorage.setItem('user', JSON.stringify(user));
            
            navigate('/dashboard', { state: { riskLevel } });
        } catch (err) {
            setError('Failed to process risk profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-body-md text-body-md antialiased bg-background min-h-screen">
            {/* TopNavBar */}
            <header className="bg-white/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm font-['Manrope'] antialiased h-16">
                <div className="flex items-center justify-between px-8 h-16 max-w-[1440px] mx-auto">
                    <div className="flex items-center gap-xl">
                        <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">EquiVision</Link>
                        <nav className="hidden md:flex gap-lg items-center">
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors" to="/dashboard">Dashboard</Link>
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors" to="#">Portfolio</Link>
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors" to="#">Insights</Link>
                            <Link className="text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold hover:text-blue-500 transition-colors" to="/risk-form">Risk Profile</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-8 max-w-[1440px] mx-auto min-h-screen">
                <div className="grid grid-cols-12 gap-xl">
                    <aside className="hidden lg:block col-span-3">
                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col py-6 sticky top-24 font-['Manrope'] text-sm shadow-sm">
                            <div className="px-6 mb-8">
                                <h2 className="text-lg font-black text-gray-900">Wealth Portal</h2>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Institutional Grade</p>
                            </div>
                            <nav className="flex-1 space-y-1">
                                <Link className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-all" to="/dashboard">
                                    <span className="material-symbols-outlined mr-3">dashboard</span> Overview
                                </Link>
                                <Link className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-all" to="#">
                                    <span className="material-symbols-outlined mr-3">pie_chart</span> Allocations
                                </Link>
                                <Link className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 transition-all" to="#">
                                    <span className="material-symbols-outlined mr-3">trending_up</span> Performance
                                </Link>
                                <Link className="flex items-center px-6 py-3 bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 transition-all" to="/risk-form">
                                    <span className="material-symbols-outlined mr-3" style={{fontVariationSettings: "'FILL' 1"}}>security</span> Risk Analysis
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    <div className="col-span-12 lg:col-span-9">
                        <section className="max-w-4xl">
                            <div className="mb-xl">
                                <h1 className="font-display-lg text-display-lg text-on-surface">Investor Risk Profile</h1>
                                <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">Determine your optimal asset allocation through institutional-grade risk assessment.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                <div className="p-8 space-y-xl">
                                    {error && <div className="p-4 bg-error-container text-on-error-container rounded-lg font-medium">{error}</div>}
                                    
                                    <div className="space-y-md">
                                        <label className="font-headline-sm text-headline-sm text-on-surface block">Full Name</label>
                                        <input 
                                            className="w-full h-12 bg-white border border-outline-variant rounded-lg px-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md" 
                                            placeholder="Enter your name" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-md">
                                        <label className="flex items-center gap-sm font-headline-sm text-headline-sm text-on-surface">
                                            <span className="bg-primary-fixed text-on-primary-fixed w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                            What is your planned investment duration?
                                        </label>
                                        <div className="relative max-w-md">
                                            <select 
                                                className="w-full h-12 bg-white border border-outline-variant rounded-lg px-md appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                                                value={answers.duration}
                                                onChange={(e) => setAnswers({...answers, duration: e.target.value})}
                                                required
                                            >
                                                <option value="" disabled>Select investment horizon</option>
                                                <option value="1-3">Short Term (1 - 3 years)</option>
                                                <option value="3-7">Medium Term (3 - 7 years)</option>
                                                <option value="7-15">Long Term (7 - 15 years)</option>
                                                <option value="15+">Retirement Horizon (15+ years)</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                                        </div>
                                    </div>

                                    <hr className="border-gray-100"/>

                                    <div className="space-y-md">
                                        <label className="flex items-center gap-sm font-headline-sm text-headline-sm text-on-surface">
                                            <span className="bg-primary-fixed text-on-primary-fixed w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                            Which statement best describes your risk appetite?
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                                            {['Conservative', 'Balanced', 'Aggressive'].map((type) => (
                                                <label key={type} className={`group relative flex flex-col p-md rounded-xl cursor-pointer transition-all active:scale-[0.98] border-2 ${answers.riskType === type ? 'bg-blue-50 border-primary' : 'bg-white border-outline-variant hover:border-primary'}`}>
                                                    <input 
                                                        className="absolute top-4 right-4 w-5 h-5 text-primary focus:ring-primary border-outline-variant" 
                                                        name="risk" 
                                                        type="radio"
                                                        checked={answers.riskType === type}
                                                        onChange={() => setAnswers({...answers, riskType: type})}
                                                    />
                                                    <span className="font-headline-sm text-headline-sm text-on-surface mb-xs">{type}</span>
                                                    <span className="text-body-sm text-on-surface-variant">
                                                        {type === 'Conservative' && 'Prioritizes capital preservation over high returns.'}
                                                        {type === 'Balanced' && 'Seeks a mix of growth and stability. Moderate market swings.'}
                                                        {type === 'Aggressive' && 'Focuses on long-term capital appreciation. High volatility.'}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100"/>

                                    <div className="space-y-md">
                                        <label className="flex items-center gap-sm font-headline-sm text-headline-sm text-on-surface">
                                            <span className="bg-primary-fixed text-on-primary-fixed w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                            Planned monthly investment amount
                                        </label>
                                        <div className="max-w-md relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-data-mono">$</span>
                                            <input 
                                                className="w-full h-12 bg-white border border-outline-variant rounded-lg pl-8 pr-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-data-mono text-body-md" 
                                                placeholder="5,000" 
                                                type="number"
                                                value={answers.amount}
                                                onChange={(e) => setAnswers({...answers, amount: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-md">
                                    <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                                        Secure institutional-grade encryption.
                                    </div>
                                    <div className="flex gap-md w-full md:w-auto">
                                        <button disabled={loading} className="flex-1 md:flex-none px-xl h-12 bg-primary text-white rounded-lg font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center">
                                            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Analyze Risk'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RiskFormPage;
