import { Link } from "react-router-dom";
import {
    TrendingUp,
    Wallet,
    LineChart,
    ShieldCheck,
    ArrowRight,
    BarChart3
} from "lucide-react";

import Navbar from "../components/Navbar";

function Landing() {
    return (
        <>
            <Navbar />

            <div className="bg-slate-50">

                {/* Hero */}

                <section className="max-w-7xl mx-auto px-6 py-20">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>

                            <span className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">

                                <TrendingUp size={16} className="mr-2" />

                                Paper Trading Platform

                            </span>

                            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mt-6 leading-tight">

                                Learn Stock Trading

                                <span className="text-emerald-600">

                                    {" "}Without Risk

                                </span>

                            </h1>

                            <p className="mt-8 text-lg text-slate-600 leading-8">

                                Practice buying and selling US stocks using
                                virtual money. Build your portfolio, analyze
                                market trends, and improve your investment
                                strategies in a realistic trading environment.

                            </p>

                            <div className="flex flex-wrap gap-4 mt-10">

                                <Link
                                    to="/register"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
                                >

                                    Start Trading

                                    <ArrowRight size={18} />

                                </Link>

                                <Link
                                    to="/login"
                                    className="border border-slate-300 hover:border-emerald-600 hover:text-emerald-600 px-7 py-4 rounded-xl font-semibold transition"
                                >

                                    Login

                                </Link>

                            </div>

                        </div>

                        <div>

                            <img
                                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
                                alt="Stock Market"
                                className="rounded-3xl shadow-2xl w-full h-125 object-cover"
                            />

                        </div>

                    </div>

                </section>

                {/* Stats */}

                <section className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

                            <h2 className="text-4xl font-bold text-emerald-600">

                                10+

                            </h2>

                            <p className="text-slate-500 mt-2">

                                US Stocks

                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

                            <h2 className="text-4xl font-bold text-blue-600">

                                100K

                            </h2>

                            <p className="text-slate-500 mt-2">

                                Virtual Balance

                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

                            <h2 className="text-4xl font-bold text-amber-500">

                                Live

                            </h2>

                            <p className="text-slate-500 mt-2">

                                Stock Prices

                            </p>

                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">

                            <h2 className="text-4xl font-bold text-red-500">

                                24×7

                            </h2>

                            <p className="text-slate-500 mt-2">

                                Portfolio Access

                            </p>

                        </div>

                    </div>

                </section>

                {/* Features */}

                <section className="max-w-7xl mx-auto px-6 py-24">

                    <div className="text-center mb-14">

                        <h2 className="text-4xl font-bold text-slate-900">

                            Everything You Need

                        </h2>

                        <p className="mt-4 text-slate-600">

                            Practice investing with powerful trading tools.

                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-white rounded-3xl shadow-sm border p-8">

                            <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                                <TrendingUp
                                    className="text-emerald-600"
                                />

                            </div>

                            <h3 className="text-xl font-semibold mt-6">

                                Live Market

                            </h3>

                            <p className="text-slate-600 mt-3">

                                Track real-time US stock prices and market
                                movements.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border p-8">

                            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                                <Wallet
                                    className="text-blue-600"
                                />

                            </div>

                            <h3 className="text-xl font-semibold mt-6">

                                Virtual Wallet

                            </h3>

                            <p className="text-slate-600 mt-3">

                                Trade using virtual funds without risking real
                                money.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border p-8">

                            <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                                <LineChart
                                    className="text-purple-600"
                                />

                            </div>

                            <h3 className="text-xl font-semibold mt-6">

                                Portfolio

                            </h3>

                            <p className="text-slate-600 mt-3">

                                Monitor investments, profits, losses and
                                performance.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border p-8">

                            <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center">

                                <ShieldCheck
                                    className="text-orange-600"
                                />

                            </div>

                            <h3 className="text-xl font-semibold mt-6">

                                Safe Learning

                            </h3>

                            <p className="text-slate-600 mt-3">

                                Learn investing strategies in a completely
                                risk-free environment.

                            </p>

                        </div>

                    </div>

                </section>

                {/* CTA */}

                <section className="max-w-7xl mx-auto px-6 pb-24">

                    <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-14 text-center text-white">

                        <BarChart3
                            size={54}
                            className="mx-auto mb-6 text-emerald-400"
                        />

                        <h2 className="text-4xl font-bold">

                            Ready to Become a Better Trader?

                        </h2>

                        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">

                            Join SB Stocks and gain hands-on trading experience
                            using virtual money before investing in real markets.

                        </p>

                        <Link
                            to="/register"
                            className="inline-block mt-8 bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold transition"
                        >

                            Create Free Account

                        </Link>

                    </div>

                </section>

            </div>
        </>
    );
}

export default Landing;