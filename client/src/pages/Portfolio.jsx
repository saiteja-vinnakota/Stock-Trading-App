import { useEffect, useMemo, useState } from "react";
import { PieChart, Wallet, TrendingUp, TrendingDown } from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data } = await axiosInstance.get("/portfolio");

      setPortfolio(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalHoldings = useMemo(() => {
    if (!portfolio) return 0;

    return portfolio.holdings.length;
  }, [portfolio]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  const profitPositive = portfolio.profitLoss >= 0;
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold">My Portfolio</h1>

              <p className="text-gray-500 mt-2">
                Track your holdings and overall portfolio performance.
              </p>
            </div>
          </div>

          {/* Portfolio Hero */}

          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-slate-300">Current Portfolio Value</p>

                <h2 className="text-5xl font-bold mt-3">
                  ${portfolio.currentValue.toFixed(2)}
                </h2>

                <p className="text-slate-300 mt-3">{totalHoldings} Holdings</p>
              </div>

              <div className="flex justify-end">
                <PieChart size={80} className="text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Summary */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <Wallet className="text-blue-600 mb-5" size={32} />

              <p className="text-gray-500">Total Investment</p>

              <h2 className="text-3xl font-bold mt-3">
                ${portfolio.invested.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <TrendingUp className="text-emerald-600 mb-5" size={32} />

              <p className="text-gray-500">Current Value</p>

              <h2 className="text-3xl font-bold mt-3">
                ${portfolio.currentValue.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              {profitPositive ? (
                <TrendingUp className="text-emerald-600 mb-5" size={32} />
              ) : (
                <TrendingDown className="text-red-600 mb-5" size={32} />
              )}

              <p className="text-gray-500">Profit / Loss</p>

              <h2
                className={`text-3xl font-bold mt-3 ${
                  profitPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                ${portfolio.profitLoss.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <PieChart className="text-amber-500 mb-5" size={32} />

              <p className="text-gray-500">Holdings</p>

              <h2 className="text-3xl font-bold mt-3">{totalHoldings}</h2>
            </div>
          </div>

          {/* Holdings */}

          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">Current Holdings</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4">Stock</th>

                    <th className="text-center p-4">Qty</th>

                    <th className="text-right p-4">Avg Price</th>

                    <th className="text-right p-4">Market Price</th>

                    <th className="text-right p-4">Investment</th>

                    <th className="text-right p-4">Current Value</th>

                    <th className="text-right p-4">P/L</th>
                  </tr>
                </thead>

                <tbody>
                  {portfolio.holdings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center p-10 text-gray-500"
                      >
                        No Holdings Yet
                      </td>
                    </tr>
                  ) : (
                    portfolio.holdings.map((holding) => (
                      <tr
                        key={holding._id}
                        className="border-t hover:bg-slate-50"
                      >
                        <td className="p-4">
                          <div>
                            <h3 className="font-bold">
                              {holding.stock.symbol}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {holding.stock.name}
                            </p>
                          </div>
                        </td>

                        <td className="text-center">{holding.quantity}</td>

                        <td className="text-right p-4">
                          ${Number(holding.averagePrice).toFixed(2)}
                        </td>

                        <td className="text-right p-4">
                          ${Number(holding.stock.price).toFixed(2)}
                        </td>

                        <td className="text-right p-4">
                          ${holding.investment.toFixed(2)}
                        </td>

                        <td className="text-right p-4 font-semibold">
                          ${holding.currentValue.toFixed(2)}
                        </td>

                        <td
                          className={`text-right p-4 font-bold ${
                            holding.profitLoss >= 0
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {holding.profitLoss >= 0 ? "+" : ""}$
                          {holding.profitLoss.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
