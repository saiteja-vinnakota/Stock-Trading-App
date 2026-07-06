import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Search, Star, Trash2, Eye, TrendingUp } from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const { data } = await axiosInstance.get("/watchlist");

      setWatchlist(data.watchlist);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load watchlist.");
    } finally {
      setLoading(false);
    }
  };

  const removeStock = async (id) => {
    if (!window.confirm("Remove this stock from watchlist?")) {
      return;
    }

    try {
      const { data } = await axiosInstance.delete(`/watchlist/${id}`);

      toast.success(data.message);

      fetchWatchlist();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove stock.");
    }
  };

  const filteredWatchlist = useMemo(() => {
    return watchlist.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.stock?.symbol?.toLowerCase().includes(keyword) ||
        item.stock?.name?.toLowerCase().includes(keyword)
      );
    });
  }, [watchlist, search]);

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

          <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-yellow-500 text-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold">My Watchlist</h1>

            <p className="mt-3 text-slate-200 text-lg">
              Keep track of your favourite stocks and monitor their latest
              prices.
            </p>
          </div>

          {/* Summary */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Stocks Watching</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {watchlist.length}
                  </h2>
                </div>

                <Star size={42} className="text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Search Result</p>

                  <h2 className="text-3xl font-bold text-blue-600 mt-2">
                    {filteredWatchlist.length}
                  </h2>
                </div>

                <TrendingUp size={42} className="text-blue-600" />
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
                placeholder="Search by symbol or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Watchlist Table */}

          <div className="bg-white rounded-3xl shadow border mt-8 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold">Favorite Stocks</h2>

                <p className="text-gray-500 mt-1">
                  Showing {filteredWatchlist.length} of {watchlist.length}{" "}
                  stocks
                </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-162.5">
              <table className="w-full">
                <thead className="bg-slate-100 sticky top-0 z-10">
                  <tr>
                    <th className="text-left p-4">Symbol</th>

                    <th className="text-left p-4">Company</th>

                    <th className="text-left p-4">Exchange</th>

                    <th className="text-left p-4">Sector</th>

                    <th className="text-right p-4">Current Price</th>

                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredWatchlist.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-16 text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <Star size={42} className="text-yellow-400" />

                          <p className="text-lg font-medium">
                            Your watchlist is empty
                          </p>

                          <p>Add stocks from the Stock Market page.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredWatchlist.map((item) => (
                      <tr
                        key={item._id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold">
                              {item.stock?.symbol?.charAt(0)}
                            </div>

                            <span className="font-bold text-slate-800">
                              {item.stock?.symbol}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div>
                            <p className="font-semibold">{item.stock?.name}</p>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {item.stock?.stockExchange}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                            {item.stock?.sector}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <span className="font-bold text-emerald-600 text-lg">
                            $
                            {Number(item.stock?.price).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <Link
                              to={`/stock/${item.stock._id}`}
                              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
                            >
                              <Eye size={17} />
                              View
                            </Link>

                            <button
                              onClick={() => removeStock(item._id)}
                              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                              <Trash2 size={17} />
                              Remove
                            </button>
                          </div>
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

export default Watchlist;
