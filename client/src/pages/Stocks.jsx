import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpDown, LayoutGrid, Table } from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function Stocks() {
  const [stocks, setStocks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("symbol");

  const [view, setView] = useState("table");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const { data } = await axiosInstance.get("/stocks");

      setStocks(data.stocks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStocks = useMemo(() => {
    let result = [...stocks];

    if (search) {
      result = result.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
          stock.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "price":
        result.sort((a, b) => b.price - a.price);

        break;

      case "sector":
        result.sort((a, b) => a.sector.localeCompare(b.sector));

        break;

      default:
        result.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    return result;
  }, [stocks, search, sortBy]);

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
          {/* Header */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold">Stock Market</h1>

              <p className="text-gray-500 mt-2">
                Browse US stocks and practice paper trading.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setView("table")}
                className={`p-3 rounded-xl transition ${
                  view === "table"
                    ? "bg-emerald-600 text-white"
                    : "bg-white border"
                }`}
              >
                <Table size={20} />
              </button>

              <button
                onClick={() => setView("grid")}
                className={`p-3 rounded-xl transition ${
                  view === "grid"
                    ? "bg-emerald-600 text-white"
                    : "bg-white border"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-sm border p-5 mb-8">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by company or symbol..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <ArrowUpDown size={18} className="text-gray-500" />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-xl px-4 py-3 w-full"
                >
                  <option value="symbol">Sort by Symbol</option>

                  <option value="price">Sort by Price</option>

                  <option value="sector">Sort by Sector</option>
                </select>
              </div>
            </div>
          </div>

          {/* GRID VIEW */}

          {view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStocks.map((stock) => (
                <div
                  key={stock._id}
                  className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{stock.symbol}</h2>

                      <p className="text-gray-500 mt-1">{stock.name}</p>
                    </div>

                    <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full">
                      {stock.sector}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-500">Current Price</p>

                    <h3 className="text-3xl font-bold text-emerald-600 mt-2">
                      ${Number(stock.price).toFixed(2)}
                    </h3>
                  </div>

                  <Link
                    to={`/stock/${stock._id}`}
                    className="block text-center mt-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* TABLE VIEW */

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-4">Symbol</th>

                    <th className="text-left p-4">Company</th>

                    <th className="text-left p-4">Sector</th>

                    <th className="text-right p-4">Price</th>

                    <th className="text-center p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStocks.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-10 text-gray-500"
                      >
                        No Stocks Found
                      </td>
                    </tr>
                  ) : (
                    filteredStocks.map((stock) => (
                      <tr
                        key={stock._id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4 font-bold">{stock.symbol}</td>

                        <td className="p-4">{stock.name}</td>

                        <td className="p-4">
                          <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                            {stock.sector}
                          </span>
                        </td>

                        <td className="p-4 text-right font-semibold text-emerald-600">
                          ${Number(stock.price).toFixed(2)}
                        </td>

                        <td className="p-4 text-center">
                          <Link
                            to={`/stock/${stock._id}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Stocks;
