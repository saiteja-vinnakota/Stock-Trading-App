import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Search,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/transactions");

      setTransactions(data.transactions);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load transactions.",
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const keyword = search.toLowerCase();

      return (
        transaction.user?.username?.toLowerCase().includes(keyword) ||
        transaction.stock?.symbol?.toLowerCase().includes(keyword)
      );
    });
  }, [transactions, search]);

  const totalTransactions = transactions.length;

  const buyTransactions = transactions.filter(
    (transaction) => transaction.transactionType === "BUY",
  ).length;

  const sellTransactions = transactions.filter(
    (transaction) => transaction.transactionType === "SELL",
  ).length;

  const totalVolume = transactions.reduce(
    (sum, transaction) => sum + transaction.totalAmount,

    0,
  );

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

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero */}

          <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-red-600 text-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold">Transaction Management</h1>

            <p className="mt-3 text-slate-200 text-lg">
              View every completed stock transaction across the platform.
            </p>
          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Transactions</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {totalTransactions}
                  </h2>
                </div>

                <Receipt size={40} className="text-slate-700" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">BUY Transactions</p>

                  <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                    {buyTransactions}
                  </h2>
                </div>

                <TrendingUp size={40} className="text-emerald-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">SELL Transactions</p>

                  <h2 className="text-3xl font-bold text-red-600 mt-2">
                    {sellTransactions}
                  </h2>
                </div>

                <TrendingDown size={40} className="text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Trading Volume</p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-2">
                    $
                    {totalVolume.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </h2>
                </div>

                <DollarSign size={40} className="text-blue-600" />
              </div>
            </div>
          </div>
          {/* Search */}

          <div className="bg-white rounded-2xl shadow border p-5 mt-8">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by username or stock symbol..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Transactions Table */}

          <div className="bg-white rounded-3xl shadow border mt-8 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold">Transaction History</h2>

                <p className="text-gray-500 mt-1">
                  Showing {filteredTransactions.length} of {transactions.length}{" "}
                  transactions
                </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-162.5">
              <table className="w-full">
                <thead className="bg-slate-100 sticky top-0 z-10">
                  <tr>
                    <th className="text-left p-4 font-semibold">User</th>

                    <th className="text-left p-4 font-semibold">Stock</th>

                    <th className="text-center p-4 font-semibold">Type</th>

                    <th className="text-center p-4 font-semibold">Qty</th>

                    <th className="text-right p-4 font-semibold">Price</th>

                    <th className="text-right p-4 font-semibold">
                      Total Amount
                    </th>

                    <th className="text-center p-4 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-14 text-gray-500"
                      >
                        No matching transactions found.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {transaction.user?.username}
                            </p>

                            <p className="text-sm text-gray-500">
                              {transaction.user?.email}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <div>
                            <p className="font-bold">
                              {transaction.stock?.symbol}
                            </p>

                            <p className="text-sm text-gray-500">
                              {transaction.stock?.name}
                            </p>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          {transaction.transactionType === "BUY" ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                              BUY
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                              SELL
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-center font-medium">
                          {transaction.quantity}
                        </td>

                        <td className="p-4 text-right">
                          $
                          {Number(transaction.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        <td className="p-4 text-right font-bold text-blue-600">
                          $
                          {Number(transaction.totalAmount).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </td>

                        <td className="p-4 text-center text-sm">
                          {new Date(transaction.createdAt).toLocaleDateString()}

                          <br />

                          <span className="text-gray-500">
                            {new Date(
                              transaction.createdAt,
                            ).toLocaleTimeString()}
                          </span>
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

export default AllTransactions;
