import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
    Search,
    Plus,
    Activity,
    Building2,
    ShieldCheck,
    ShieldX
} from "lucide-react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axiosInstance from "../components/axiosInstance";

function AdminStocks() {

    const [stocks, setStocks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [symbol, setSymbol] = useState("");

    const [sector, setSector] = useState("");

    useEffect(() => {

        fetchStocks();

    }, []);

    const fetchStocks = async () => {

        try {

            const { data } = await axiosInstance.get(
                "/admin/stocks"
            );

            setStocks(data.stocks);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to fetch stocks."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const filteredStocks = useMemo(() => {

        return stocks.filter((stock) => {

            const key = search.toLowerCase();

            return (

                stock.symbol.toLowerCase().includes(key)

                ||

                stock.name.toLowerCase().includes(key)

            );

        });

    }, [stocks, search]);

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

                    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-blue-700 text-white p-10 shadow-xl">

                        <h1 className="text-4xl font-bold">

                            Stock Management

                        </h1>

                        <p className="mt-3 text-slate-200">

                            Manage available stocks and control trading status.

                        </p>

                    </div>

                    {/* Summary */}

                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-white rounded-2xl border shadow p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-gray-500">

                                        Total Stocks

                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">

                                        {stocks.length}

                                    </h2>

                                </div>

                                <Building2
                                    className="text-blue-600"
                                    size={40}
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl border shadow p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-gray-500">

                                        Trading Enabled

                                    </p>

                                    <h2 className="text-3xl font-bold text-emerald-600 mt-2">

                                        {

                                            stocks.filter(

                                                s => s.isTradingEnabled

                                            ).length

                                        }

                                    </h2>

                                </div>

                                <ShieldCheck
                                    className="text-emerald-600"
                                    size={40}
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl border shadow p-6">

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-gray-500">

                                        Trading Disabled

                                    </p>

                                    <h2 className="text-3xl font-bold text-red-600 mt-2">

                                        {

                                            stocks.filter(

                                                s => !s.isTradingEnabled

                                            ).length

                                        }

                                    </h2>

                                </div>

                                <ShieldX
                                    className="text-red-600"
                                    size={40}
                                />

                            </div>

                        </div>

                    </div>
                                        {/* Search + Add */}

                    <div className="bg-white rounded-2xl shadow border p-5 mt-8">

                        <div className="flex flex-col md:flex-row gap-4 justify-between">

                            <div className="relative flex-1">

                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search by symbol or company..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
                            >

                                <Plus size={20} />

                                Add Stock

                            </button>

                        </div>

                    </div>

                    {/* Table */}

                    <div className="bg-white rounded-3xl shadow border mt-8 overflow-hidden">

                        <div className="p-6 border-b">

                            <h2 className="text-2xl font-bold">

                                Listed Stocks

                            </h2>

                            <p className="text-gray-500 mt-1">

                                Showing {filteredStocks.length} of {stocks.length} stocks

                            </p>

                        </div>

                        <div className="overflow-x-auto max-h-162.5">

                            <table className="w-full">

                                <thead className="bg-slate-100 sticky top-0">

                                    <tr>

                                        <th className="text-left p-4">

                                            Symbol

                                        </th>

                                        <th className="text-left p-4">

                                            Company

                                        </th>

                                        <th className="text-left p-4">

                                            Exchange

                                        </th>

                                        <th className="text-left p-4">

                                            Sector

                                        </th>

                                        <th className="text-right p-4">

                                            Price

                                        </th>

                                        <th className="text-center p-4">

                                            Status

                                        </th>

                                        <th className="text-center p-4">

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredStocks.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={7}
                                                className="text-center py-16 text-gray-500"
                                            >

                                                No Stocks Found.

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredStocks.map((stock) => (
                                                                                        <tr
                                                key={stock._id}
                                                className="border-t hover:bg-slate-50 transition"
                                            >

                                                <td className="p-4 font-bold">

                                                    {stock.symbol}

                                                </td>

                                                <td className="p-4">

                                                    {stock.name}

                                                </td>

                                                <td className="p-4">

                                                    {stock.stockExchange}

                                                </td>

                                                <td className="p-4">

                                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">

                                                        {stock.sector}

                                                    </span>

                                                </td>

                                                <td className="p-4 text-right font-semibold text-emerald-600">

                                                    $

                                                    {Number(
                                                        stock.price
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }
                                                    )}

                                                </td>

                                                <td className="text-center p-4">

                                                    {stock.isTradingEnabled ? (

                                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">

                                                            Enabled

                                                        </span>

                                                    ) : (

                                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">

                                                            Disabled

                                                        </span>

                                                    )}

                                                </td>

                                                <td className="text-center p-4">

                                                    <button

                                                        onClick={async () => {

                                                            try {

                                                                const { data } = await axiosInstance.put(

                                                                    `/stocks/toggle/${stock._id}`

                                                                );

                                                                toast.success(data.message);

                                                                fetchStocks();

                                                            }

                                                            catch (error) {

                                                                toast.error(

                                                                    error.response?.data?.message ||

                                                                    "Unable to update."

                                                                );

                                                            }

                                                        }}

                                                        className={`px-5 py-2 rounded-lg text-white transition ${

                                                            stock.isTradingEnabled

                                                                ? "bg-red-500 hover:bg-red-600"

                                                                : "bg-emerald-600 hover:bg-emerald-700"

                                                        }`}

                                                    >

                                                        {

                                                            stock.isTradingEnabled

                                                                ? "Disable"

                                                                : "Enable"

                                                        }

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>
                                        {/* Add Stock Modal */}

                    {showModal && (

                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">

                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-2xl font-bold">

                                        Add New Stock

                                    </h2>

                                    <button
                                        onClick={() => {

                                            setShowModal(false);

                                            setSymbol("");

                                            setSector("");

                                        }}
                                        className="text-gray-500 hover:text-black text-2xl"
                                    >

                                        ×

                                    </button>

                                </div>

                                <div className="space-y-5">

                                    <div>

                                        <label className="block mb-2 font-medium">

                                            Stock Symbol

                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Example: AAPL"
                                            value={symbol}
                                            onChange={(e) =>
                                                setSymbol(
                                                    e.target.value.toUpperCase()
                                                )
                                            }
                                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <p className="text-sm text-gray-500 mt-2">

                                            Company details and current price
                                            will be fetched automatically from
                                            Finnhub.

                                        </p>

                                    </div>

                                    <div>

                                        <label className="block mb-2 font-medium">

                                            Sector

                                        </label>

                                        <select
                                            value={sector}
                                            onChange={(e) =>
                                                setSector(e.target.value)
                                            }
                                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >

                                            <option value="">
                                                Select Sector
                                            </option>

                                            <option>
                                                Technology
                                            </option>

                                            <option>
                                                Finance
                                            </option>

                                            <option>
                                                Healthcare
                                            </option>

                                            <option>
                                                Automobile
                                            </option>

                                            <option>
                                                Energy
                                            </option>

                                            <option>
                                                Retail
                                            </option>

                                            <option>
                                                Entertainment
                                            </option>

                                            <option>
                                                Telecommunications
                                            </option>

                                            <option>
                                                Industrial
                                            </option>

                                            <option>
                                                Consumer Goods
                                            </option>

                                            <option>
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                    <div className="flex justify-end gap-3 pt-3">

                                        <button

                                            onClick={() => {

                                                setShowModal(false);

                                                setSymbol("");

                                                setSector("");

                                            }}

                                            className="px-6 py-3 rounded-xl border"

                                        >

                                            Cancel

                                        </button>

                                        <button

                                            onClick={async () => {

                                                if (!symbol || !sector) {

                                                    toast.error(
                                                        "Please enter Symbol and Sector."
                                                    );

                                                    return;

                                                }

                                                try {

                                                    const { data } =
                                                        await axiosInstance.post(
                                                            "/stocks",
                                                            {
                                                                symbol,
                                                                sector
                                                            }
                                                        );

                                                    toast.success(
                                                        data.message
                                                    );

                                                    setShowModal(false);

                                                    setSymbol("");

                                                    setSector("");

                                                    fetchStocks();

                                                }

                                                catch (error) {

                                                    toast.error(

                                                        error.response?.data
                                                            ?.message ||

                                                        "Unable to add stock."

                                                    );

                                                }

                                            }}

                                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

                                        >

                                            Add Stock

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default AdminStocks;