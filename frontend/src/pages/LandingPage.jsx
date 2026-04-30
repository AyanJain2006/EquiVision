import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-background text-on-surface font-body-md antialiased min-h-screen">
            {/* TopNavBar */}
            <header className="fixed top-0 w-full z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
                <nav className="flex items-center justify-between px-8 h-16 max-w-[1440px] mx-auto font-['Manrope'] antialiased">
                    <div className="flex items-center gap-xl">
                        <span className="text-xl font-bold tracking-tight text-blue-600">EquiVision</span>
                        <div className="hidden md:flex items-center gap-lg">
                            <Link className="text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold hover:text-blue-500 transition-colors cursor-pointer" to="/dashboard">Dashboard</Link>
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors cursor-pointer" to="#">Portfolio</Link>
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors cursor-pointer" to="#">Insights</Link>
                            <Link className="text-gray-500 font-medium hover:text-blue-500 transition-colors cursor-pointer" to="/risk-form">Risk Profile</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-md">
                        <div className="hidden lg:flex items-center bg-surface-container-low px-md py-xs rounded-full border border-outline-variant">
                            <span className="material-symbols-outlined text-outline text-body-sm">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-body-sm w-48 py-1" placeholder="Search markets..." type="text"/>
                        </div>
                        <div className="flex items-center gap-sm">
                            <button className="material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container transition-all rounded-full">notifications</button>
                            <button className="material-symbols-outlined text-on-surface-variant p-sm hover:bg-surface-container transition-all rounded-full">settings</button>
                            <div className="h-8 w-8 rounded-full bg-primary-fixed flex items-center justify-center border border-primary-container overflow-hidden ml-xs">
                                <img alt="User profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJEuoPbzeCySy5M3QZkdfOPIcZ9OLOJW3mQbPwKRKwjqv0piBYz2vYNdNNETK6D1fjkitnl9o6_ZSZxY7hHox4iwTjemwlSDVEcErA91wSxi3dY8X7WqNKb4tkOuA3CuUoUOHh0nbxXxMjZcK5BdjuYdFse0_ZWh9iRMmuALj5CAIoLTR6uopqJDR5SlhotKIamQJGSOIVZZUGV9_1hDuw7pjTNmCYHObXuF7GkniucOmQaq7GcfpGvzVEEEa-2W1n0B1uGLR-kbE"/>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-2xl pb-xl px-8">
                    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/30 to-secondary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4"></div>
                    </div>
                    <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
                        <div className="space-y-lg">
                            <div className="inline-flex items-center gap-sm bg-secondary-container/10 px-md py-xs rounded-full border border-secondary-container/20">
                                <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                                <span className="font-label-md text-on-secondary-container uppercase">Intelligent Allocation Engine</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface max-w-xl">
                                Smart Investment <br/><span className="text-primary">Diversification</span>
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                                Optimize your investments with intelligent risk-based portfolio allocation. Leverage institutional-grade algorithms to build resilience.
                            </p>
                            <div className="flex items-center gap-md">
                                <Link to="/risk-form">
                                    <button className="bg-primary hover:bg-primary-container text-on-primary px-xl py-md rounded-lg font-headline-sm transition-all shadow-lg shadow-primary/20">
                                        Get Started
                                    </button>
                                </Link>
                                <button className="flex items-center gap-sm text-primary font-headline-sm hover:bg-primary/5 px-md py-md rounded-lg transition-all">
                                    <span className="material-symbols-outlined">play_circle</span>
                                    View Demo
                                </button>
                            </div>
                            <div className="flex items-center gap-xl pt-md border-t border-gray-100">
                                <div>
                                    <div className="text-headline-md font-bold text-on-surface">$2.4B+</div>
                                    <div className="text-body-sm text-outline">Assets Under Analysis</div>
                                </div>
                                <div>
                                    <div className="text-headline-md font-bold text-on-surface">18k+</div>
                                    <div className="text-body-sm text-outline">Active Investors</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="glass-card rounded-2xl p-lg shadow-2xl relative z-10">
                                <div className="flex items-center justify-between mb-lg">
                                    <div className="flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                                        <span className="font-headline-sm">Current Allocation</span>
                                    </div>
                                    <span className="bg-secondary/10 text-secondary px-sm py-xs rounded-full font-label-md">BALANCED</span>
                                </div>
                                <div className="space-y-md">
                                    {/* Allocation Item */}
                                    <div className="space-y-xs">
                                        <div className="flex justify-between text-body-sm">
                                            <span className="font-medium">US Equities</span>
                                            <span className="text-outline">Target: 40%</span>
                                        </div>
                                        <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[42%]"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                                            <span>Actual: 42%</span>
                                            <span className="text-tertiary">+2% Overweight</span>
                                        </div>
                                    </div>
                                    {/* Allocation Item */}
                                    <div className="space-y-xs">
                                        <div className="flex justify-between text-body-sm">
                                            <span className="font-medium">International Bonds</span>
                                            <span className="text-outline">Target: 30%</span>
                                        </div>
                                        <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[28%]"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                                            <span>Actual: 28%</span>
                                            <span className="text-secondary">-2% Underweight</span>
                                        </div>
                                    </div>
                                    {/* Allocation Item */}
                                    <div className="space-y-xs">
                                        <div className="flex justify-between text-body-sm">
                                            <span className="font-medium">Emerging Tech</span>
                                            <span className="text-outline">Target: 15%</span>
                                        </div>
                                        <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[15%]"></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                                            <span>Actual: 15%</span>
                                            <span className="text-outline">OPTIMAL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Data Points */}
                            <div className="absolute -bottom-md -right-md glass-card p-md rounded-xl shadow-lg z-20 hidden md:block">
                                <div className="flex items-center gap-md">
                                    <div className="p-sm bg-secondary/10 rounded-lg">
                                        <span className="material-symbols-outlined text-secondary">trending_up</span>
                                    </div>
                                    <div>
                                        <div className="text-body-sm text-outline">Risk Efficiency</div>
                                        <div className="text-headline-sm text-on-surface">+12.4%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-md -left-md glass-card p-md rounded-xl shadow-lg z-20 hidden md:block">
                                <div className="flex items-center gap-md">
                                    <div className="p-sm bg-primary/10 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">verified_user</span>
                                    </div>
                                    <div>
                                        <div className="text-body-sm text-outline">Diversification Score</div>
                                        <div className="text-headline-sm text-on-surface">94/100</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid Insights */}
                <section className="py-2xl px-8 max-w-[1440px] mx-auto">
                    <div className="mb-xl text-center">
                        <h2 className="font-display-lg text-headline-md mb-sm text-on-surface">Institutional Intelligence for Everyone</h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto font-body-md">Our multi-layered analysis engine processes millions of data points to ensure your portfolio remains stable during market volatility.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg h-auto">
                        <div className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-lg shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden relative">
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-primary mb-md">query_stats</span>
                                <h3 className="font-headline-md mb-md">Advanced Portfolio Correlation</h3>
                                <p className="text-on-surface-variant font-body-md max-w-md">Identify hidden overlaps in your investments. We detect when different assets move in sync, exposing you to unintended risk.</p>
                            </div>
                            <div className="mt-xl relative z-10">
                                <div className="flex gap-sm overflow-x-auto pb-sm no-scrollbar">
                                    <div className="min-w-[140px] p-md bg-background rounded-xl border border-outline-variant">
                                        <div className="text-label-md text-outline mb-xs">CORRELATION</div>
                                        <div className="text-headline-sm text-error">High (0.84)</div>
                                        <div className="text-body-sm mt-xs">Tech / Crypto</div>
                                    </div>
                                    <div className="min-w-[140px] p-md bg-background rounded-xl border border-outline-variant">
                                        <div className="text-label-md text-outline mb-xs">HEDGE RATIO</div>
                                        <div className="text-headline-sm text-secondary">Optimal</div>
                                        <div className="text-body-sm mt-xs">Gold / Equities</div>
                                    </div>
                                    <div className="min-w-[140px] p-md bg-background rounded-xl border border-outline-variant">
                                        <div className="text-label-md text-outline mb-xs">ALPHA GEN</div>
                                        <div className="text-headline-sm text-primary">+4.2%</div>
                                        <div className="text-body-sm mt-xs">Alt Assets</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-10">
                                <span className="material-symbols-outlined text-[200px]">grid_view</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-lg shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-secondary-fixed/20 rounded-xl flex items-center justify-center mb-md">
                                <span className="material-symbols-outlined text-on-secondary-container">security</span>
                            </div>
                            <h3 className="font-headline-sm mb-sm">Risk Guardrails</h3>
                            <p className="text-body-sm text-on-surface-variant">Set automated threshold alerts that notify you when your allocation drifts beyond your comfort zone.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-lg shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-tertiary-fixed/20 rounded-xl flex items-center justify-center mb-md">
                                <span className="material-symbols-outlined text-on-tertiary-container">science</span>
                            </div>
                            <h3 className="font-headline-sm mb-sm">Stress Testing</h3>
                            <p className="text-body-sm text-on-surface-variant">Simulate how your portfolio would perform in historical crashes or hypothetical macro shifts.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-2xl px-8">
                    <div className="max-w-[1440px] mx-auto bg-primary-container rounded-3xl p-xl flex flex-col md:flex-row items-center justify-between text-on-primary overflow-hidden relative">
                        <div className="relative z-10 md:w-2/3">
                            <h2 className="font-display-lg text-headline-md mb-md">Ready to optimize your wealth?</h2>
                            <p className="text-body-lg opacity-90 max-w-xl">Join thousands of institutional and retail investors who use EquiVision to secure their financial future through precision diversification.</p>
                        </div>
                        <div className="relative z-10 mt-xl md:mt-0">
                            <Link to="/risk-form">
                                <button className="bg-white text-primary px-xl py-md rounded-lg font-headline-sm shadow-xl hover:bg-surface-container-low transition-all">
                                    Create Your Free Profile
                                </button>
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-12"></div>
                        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white/5 -skew-x-12 -translate-x-12"></div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1440px] mx-auto font-['Manrope'] text-xs uppercase tracking-wider">
                    <div className="mb-md md:mb-0">
                        <span className="text-gray-400">© 2024 EquiVision Financial. All rights reserved.</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-xl">
                        <Link className="text-gray-400 hover:text-gray-900 transition-colors" to="#">Privacy Policy</Link>
                        <Link className="text-gray-400 hover:text-gray-900 transition-colors" to="#">Terms of Service</Link>
                        <Link className="text-gray-400 hover:text-gray-900 transition-colors" to="#">SEC Disclosures</Link>
                        <Link className="text-gray-400 hover:text-gray-900 transition-colors" to="#">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
