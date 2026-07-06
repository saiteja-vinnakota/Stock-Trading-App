import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  BriefcaseBusiness,
  ArrowLeftRight,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/cards/DashboardCard";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function Home() {
  const [dashboard, setDashboard] = useState(null);

  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await axiosInstance.get("/dashboard");

      setDashboard(data.dashboard);

      setRecentOrders(data.recentOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const portfolioColor = useMemo(() => {
    if (!dashboard) return "emerald";

    return dashboard.profitLoss >= 0 ? "emerald" : "red";
  }, [dashboard]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome */}

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold">Trading Dashboard</h1>

              <p className="text-gray-500 mt-2">
                Monitor your portfolio and virtual trading performance.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/stocks"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition"
              >
                Browse Stocks
              </Link>

              <Link
                to="/portfolio"
                className="border px-6 py-3 rounded-xl bg-white hover:bg-slate-100 transition"
              >
                Portfolio
              </Link>
            </div>
          </div>

          {/* Hero Card */}

          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-300">Virtual Wallet</p>

                <h2 className="text-5xl font-bold mt-3">
                  ${dashboard.walletBalance.toFixed(2)}
                </h2>

                <p className="text-slate-300 mt-3">Available for Trading</p>
              </div>

              <Wallet size={70} className="text-emerald-400" />
            </div>
          </div>

          {/* Summary */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <DashboardCard
              title="Investment"
              value={`$${dashboard.investment.toFixed(2)}`}
              color="blue"
              icon={<BriefcaseBusiness size={24} />}
            />

            <DashboardCard
              title="Current Value"
              value={`$${dashboard.currentValue.toFixed(2)}`}
              color="emerald"
              icon={<TrendingUp size={24} />}
            />

            <DashboardCard
              title="Profit / Loss"
              value={`$${dashboard.profitLoss.toFixed(2)}`}
              color={portfolioColor}
              icon={
                dashboard.profitLoss >= 0 ? (
                  <TrendingUp size={24} />
                ) : (
                  <TrendingDown size={24} />
                )
              }
            />

            <DashboardCard
              title="Watchlist"
              value={dashboard.watchlist}
              color="amber"
              icon={<Star size={24} />}
            />
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <ArrowLeftRight className="text-emerald-600" />

                <h2 className="text-xl font-semibold">Trading Activity</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500">Orders</p>

                  <h3 className="text-3xl font-bold mt-2">
                    {dashboard.totalOrders}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">Transactions</p>

                  <h3 className="text-3xl font-bold mt-2">
                    {dashboard.totalTransactions}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/stocks"
                  className="bg-emerald-600 text-white rounded-xl p-5 text-center hover:bg-emerald-700 transition"
                >
                  Buy Stocks
                </Link>

                <Link
                  to="/portfolio"
                  className="bg-slate-800 text-white rounded-xl p-5 text-center hover:bg-slate-900 transition"
                >
                  Portfolio
                </Link>

                <Link
                  to="/history"
                  className="bg-blue-600 text-white rounded-xl p-5 text-center hover:bg-blue-700 transition"
                >
                  History
                </Link>

                <Link
                  to="/watchlist"
                  className="bg-amber-500 text-white rounded-xl p-5 text-center hover:bg-amber-600 transition"
                >
                  Watchlist
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders */}

          <div className="mt-10 bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Orders</h2>

              <Link
                to="/history"
                className="text-emerald-600 font-medium hover:underline"
              >
                View All
              </Link>
            </div>

            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Stock</th>

                  <th className="text-center p-4">Type</th>

                  <th className="text-center p-4">Qty</th>

                  <th className="text-right p-4">Price</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-10 text-gray-500">
                      No Orders Yet
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-slate-50">
                      <td className="p-4 font-semibold">
                        {order.stock?.symbol}
                      </td>

                      <td className="p-4 text-center">
                        {order.orderType === "BUY" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            BUY
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                            SELL
                          </span>
                        )}
                      </td>

                      <td className="text-center">{order.quantity}</td>

                      <td className="text-right p-4">
                        ${Number(order.price).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
