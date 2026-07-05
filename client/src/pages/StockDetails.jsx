import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";

function StockDetails() {
    const { id } = useParams();
    const [stock, setStock] = useState(null);
    const [history, setHistory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [watchlisted, setWatchlisted] = useState(false);
    const [watchlistId, setWatchlistId] = useState(null);
    const [selectedRange, setSelectedRange] = useState("ALL");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const stockRes = await axiosInstance.get(
                `/stocks/details/${id}`
            );
            setStock(stockRes.data.stock);

            const historyRes = await axiosInstance.get(
                `/stocks/history/${stockRes.data.stock.symbol}`
            );
            setHistory(historyRes.data.history);

            try {
                const watchlistRes = await axiosInstance.get("/watchlist");
                const item = watchlistRes.data.watchlist.find(
                    watch => watch.stock._id === stockRes.data.stock._id
                );

                if (item) {
                    setWatchlisted(true);
                    setWatchlistId(item._id);
                } else {
                    setWatchlisted(false);
                    setWatchlistId(null);
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            toast.error("Unable to load stock.");
        } finally {
            setLoading(false);
        }
    };

    const buyStock = async () => {
        try {
            await axiosInstance.post("/orders/buy", {
                stockId: stock._id,
                quantity
            });
            toast.success("Stock Purchased");
            fetchStock();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const sellStock = async () => {
        try {
            await axiosInstance.post("/orders/sell", {
                stockId: stock._id,
                quantity
            });
            toast.success("Stock Sold");
            fetchStock();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const toggleWatchlist = async () => {
        try {
            if (watchlisted) {
                await axiosInstance.delete(
                    `/watchlist/${watchlistId}`
                );
                toast.success("Removed from Watchlist");
            } else {
                await axiosInstance.post(
                    "/watchlist",
                    {
                        stockId: stock._id
                    }
                );
                toast.success("Added to Watchlist");
            }
            fetchStock();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update watchlist."
            );
        }
    };

    const filteredHistory = useMemo(() => {
        if (selectedRange === "ALL") {
            return history;
        }

        const days = {
            "1D": 1,
            "1W": 7,
            "1M": 30,
            "6M": 180,
            "1Y": 365
        };

        const limit = days[selectedRange];
        return history.slice(-limit);
    }, [history, selectedRange]);

    const estimatedAmount = useMemo(() => {
        if (!stock) return 0;
        return stock.price * quantity;
    }, [stock, quantity]);

    // ApexCharts Configurations
    const candleSeries = useMemo(() => {
        return [
            {
                data: filteredHistory.map(candle => ({
                    x: new Date(candle.date),
                    y: [
                        candle.open,
                        candle.high,
                        candle.low,
                        candle.close
                    ]
                }))
            }
        ];
    }, [filteredHistory]);

    const candleOptions = {
        chart: {
            type: "candlestick",
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            }
        },
        theme: {
            mode: "light"
        },
        xaxis: {
            type: "datetime"
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        grid: {
            borderColor: "#e5e7eb"
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#16a34a",
                    downward: "#dc2626"
                }
            }
        }
    };

    // Calculate details for OHLC bar
    const last = useMemo(() => {
        return filteredHistory.at(-1);
    }, [filteredHistory]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="p-10 text-xl">
                    Loading Stock...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="bg-white rounded-3xl shadow-sm border p-8">
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-5xl font-bold">
                                        {stock.symbol}
                                    </h1>
                                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                                        {stock.stockExchange}
                                    </span>
                                </div>
                                <p className="text-gray-500 mt-3 text-lg">
                                    {stock.name}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
                                        {stock.sector}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <h2 className="text-5xl font-bold text-emerald-600">
                                    ${stock.price.toFixed(2)}
                                </h2>
                                {/* Trend Indicator */}
                                <p
                                    className={`mt-2 font-medium ${
                                        stock.history.length > 0 &&
                                        stock.history.at(-1)?.close >= stock.history.at(-1)?.open
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {stock.history.length > 0 &&
                                    stock.history.at(-1)?.close >= stock.history.at(-1)?.open
                                        ? "▲ Bullish"
                                        : "▼ Bearish"}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Live Market Price
                                </p>
                                <button
                                    onClick={toggleWatchlist}
                                    className={`mt-5 px-5 py-3 rounded-xl font-medium transition ${
                                        watchlisted
                                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                                            : "bg-slate-900 text-white hover:bg-slate-700"
                                    }`}
                                >
                                    {watchlisted
                                        ? "♥ Remove Watchlist"
                                        : "♡ Add Watchlist"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chart + Trade */}
                    <div className="grid lg:grid-cols-3 gap-6 mt-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">
                                    Price History
                                </h2>
                                <div className="flex gap-2 flex-wrap">
                                    ={["1D", "1W", "1M", "6M", "1Y", "ALL"].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSelectedRange(item)}
                                            className={`px-4 py-2 rounded-lg text-sm transition ${
                                                selectedRange === item
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-slate-100 hover:bg-slate-200"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* OHLC values */}
                            <div className="flex gap-6 mb-5 text-sm">
                                <span>
                                    Open <b>{last?.open}</b>
                                </span>
                                <span>
                                    High <b>{last?.high}</b>
                                </span>
                                <span>
                                    Low <b>{last?.low}</b>
                                </span>
                                <span>
                                    Close <b>{last?.close}</b>
                                </span>
                            </div>

                            {/* Apex Candlestick Chart */}
                            <div className="h-107.5">
                                <Chart
                                    options={candleOptions}
                                    series={candleSeries}
                                    type="candlestick"
                                    height={430}
                                />
                            </div>
                        </div>

                        {/* Trade Form */}
                        <div className="bg-white rounded-3xl shadow-sm border p-6 h-fit">
                            <h2 className="text-2xl font-bold mb-6">
                                Trade
                            </h2>
                            <div>
                                <p className="text-gray-500 mb-2">
                                    Quantity
                                </p>
                                <div className="flex items-center justify-between border rounded-xl">
                                    <button
                                        onClick={() =>
                                            quantity > 1 &&
                                            setQuantity(quantity - 1)
                                        }
                                        className="px-5 py-4 text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="px-5 py-4 text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Price
                                    </span>
                                    <span className="font-semibold">
                                        ${stock.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <span className="text-gray-500">
                                        Estimated Cost
                                    </span>
                                    <span className="text-2xl font-bold">
                                        ${estimatedAmount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={buyStock}
                                className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 text-lg font-semibold transition"
                            >
                                Buy Stock
                            </button>
                            <button
                                onClick={sellStock}
                                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 text-lg font-semibold transition"
                            >
                                Sell Stock
                            </button>
                        </div>
                    </div>

                    {/* Statistics Footer */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white rounded-2xl border shadow-sm p-6">
                            <p className="text-gray-500">Sector</p>
                            <h3 className="text-2xl font-bold mt-3">
                                {stock.sector}
                            </h3>
                        </div>
                        <div className="bg-white rounded-2xl border shadow-sm p-6">
                            <p className="text-gray-500">Exchange</p>
                            <h3 className="text-2xl font-bold mt-3">
                                {stock.stockExchange}
                            </h3>
                        </div>
                        <div className="bg-white rounded-2xl border shadow-sm p-6">
                            <p className="text-gray-500">Current Price</p>
                            <h3 className="text-2xl font-bold text-emerald-600 mt-3">
                                ${stock.price.toFixed(2)}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StockDetails;