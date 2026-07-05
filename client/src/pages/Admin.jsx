import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Users,
    TrendingUp,
    ShoppingCart,
    Receipt,
    ArrowRight
} from "lucide-react";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/cards/DashboardCard";
import axiosInstance from "../components/axiosInstance";

function Admin() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const { data } = await axiosInstance.get("/admin/dashboard");

            setDashboard(data.dashboard);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-slate-100 flex justify-center items-center">

                    <div className="text-xl font-semibold">
                        Loading Dashboard...
                    </div>

                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100">

                <div className="max-w-7xl mx-auto px-6 py-8">

                    {/* Header */}

                    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-emerald-700 text-white p-10 shadow-xl">

                        <h1 className="text-4xl font-bold">

                            Admin Dashboard

                        </h1>

                        <p className="mt-3 text-slate-200 text-lg">

                            Manage users, monitor trades, maintain stocks and
                            oversee the SB Stocks platform.

                        </p>

                    </div>

                    {/* Statistics */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <DashboardCard
                            title="Total Users"
                            value={dashboard.totalUsers}
                            color="blue"
                        />

                        <DashboardCard
                            title="Stocks"
                            value={dashboard.totalStocks}
                            color="emerald"
                        />

                        <DashboardCard
                            title="Orders"
                            value={dashboard.totalOrders}
                            color="orange"
                        />

                        <DashboardCard
                            title="Transactions"
                            value={dashboard.totalTransactions}
                            color="red"
                        />

                    </div>

                    {/* Management */}

                    <h2 className="text-2xl font-bold mt-12 mb-6">

                        Management

                    </h2>

                    <div className="grid lg:grid-cols-2 gap-6">

                        <Link
                            to="/admin/users"
                            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition group border"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <Users
                                        size={45}
                                        className="text-blue-600 mb-4"
                                    />

                                    <h3 className="text-2xl font-bold">

                                        Manage Users

                                    </h3>

                                    <p className="text-gray-500 mt-3">

                                        View all registered users, manage
                                        accounts and remove unwanted users.

                                    </p>

                                </div>

                                <ArrowRight
                                    className="group-hover:translate-x-2 transition"
                                />

                            </div>

                        </Link>

                        <Link
                            to="/stocks"
                            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition group border"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <TrendingUp
                                        size={45}
                                        className="text-emerald-600 mb-4"
                                    />

                                    <h3 className="text-2xl font-bold">

                                        Manage Stocks

                                    </h3>

                                    <p className="text-gray-500 mt-3">

                                        Browse available stocks, update prices
                                        and manage stock listings.

                                    </p>

                                </div>

                                <ArrowRight
                                    className="group-hover:translate-x-2 transition"
                                />

                            </div>

                        </Link>

                        <Link
                            to="/admin/orders"
                            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition group border"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <ShoppingCart
                                        size={45}
                                        className="text-orange-500 mb-4"
                                    />

                                    <h3 className="text-2xl font-bold">

                                        Orders

                                    </h3>

                                    <p className="text-gray-500 mt-3">

                                        Monitor all BUY and SELL requests from
                                        platform users.

                                    </p>

                                </div>

                                <ArrowRight
                                    className="group-hover:translate-x-2 transition"
                                />

                            </div>

                        </Link>

                        <Link
                            to="/admin/transactions"
                            className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition group border"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <Receipt
                                        size={45}
                                        className="text-red-500 mb-4"
                                    />

                                    <h3 className="text-2xl font-bold">

                                        Transactions

                                    </h3>

                                    <p className="text-gray-500 mt-3">

                                        Review completed transactions and trading
                                        activity across the platform.

                                    </p>

                                </div>

                                <ArrowRight
                                    className="group-hover:translate-x-2 transition"
                                />

                            </div>

                        </Link>

                    </div>

                    {/* Footer */}

                    <div className="mt-12 rounded-3xl bg-white border shadow p-8">

                        <h3 className="text-xl font-bold">

                            Platform Summary

                        </h3>

                        <div className="grid md:grid-cols-4 gap-6 mt-6">

                            <div>

                                <p className="text-gray-500">

                                    Registered Users

                                </p>

                                <h2 className="text-3xl font-bold text-blue-600">

                                    {dashboard.totalUsers}

                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Listed Stocks

                                </p>

                                <h2 className="text-3xl font-bold text-emerald-600">

                                    {dashboard.totalStocks}

                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Total Orders

                                </p>

                                <h2 className="text-3xl font-bold text-orange-500">

                                    {dashboard.totalOrders}

                                </h2>

                            </div>

                            <div>

                                <p className="text-gray-500">

                                    Transactions

                                </p>

                                <h2 className="text-3xl font-bold text-red-500">

                                    {dashboard.totalTransactions}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Admin;