import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
    Search,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    CheckCircle
} from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";

function AllOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const { data } = await axiosInstance.get("/admin/orders");

            setOrders(data.orders);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load orders."
            );

        } finally {

            setLoading(false);

        }

    };

    const filteredOrders = useMemo(() => {

        return orders.filter((order) => {

            const keyword = search.toLowerCase();

            return (

                order.user?.username
                    ?.toLowerCase()
                    .includes(keyword) ||

                order.stock?.symbol
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    }, [orders, search]);

    const totalOrders = orders.length;

    const buyOrders = orders.filter(
        order => order.orderType === "BUY"
    ).length;

    const sellOrders = orders.filter(
        order => order.orderType === "SELL"
    ).length;

    const successOrders = orders.filter(
        order => order.status === "SUCCESS"
    ).length;

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="min-h-screen bg-slate-100 flex justify-center items-center">

                    <div className="text-xl font-semibold">

                        Loading Orders...

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

                    {/* Hero */}

                    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-orange-600 text-white p-10 shadow-xl">

                        <h1 className="text-4xl font-bold">

                            Order Management

                        </h1>

                        <p className="mt-3 text-slate-200 text-lg">

                            Monitor every BUY and SELL order placed
                            across the platform.

                        </p>

                    </div>

                    {/* Statistics */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Total Orders

                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">

                                        {totalOrders}

                                    </h2>

                                </div>

                                <ShoppingCart
                                    size={40}
                                    className="text-slate-700"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        BUY Orders

                                    </p>

                                    <h2 className="text-3xl font-bold text-emerald-600 mt-2">

                                        {buyOrders}

                                    </h2>

                                </div>

                                <TrendingUp
                                    size={40}
                                    className="text-emerald-600"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        SELL Orders

                                    </p>

                                    <h2 className="text-3xl font-bold text-red-600 mt-2">

                                        {sellOrders}

                                    </h2>

                                </div>

                                <TrendingDown
                                    size={40}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Successful

                                    </p>

                                    <h2 className="text-3xl font-bold text-blue-600 mt-2">

                                        {successOrders}

                                    </h2>

                                </div>

                                <CheckCircle
                                    size={40}
                                    className="text-blue-600"
                                />

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
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                        </div>

                    </div>

                    {/* Orders Table */}

                    <div className="bg-white rounded-3xl shadow border mt-8 overflow-hidden">

                        <div className="flex items-center justify-between p-6 border-b">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Order History

                                </h2>

                                <p className="text-gray-500 mt-1">

                                    Showing {filteredOrders.length} of {orders.length} orders

                                </p>

                            </div>

                        </div>

                        <div className="overflow-x-auto max-h-162.5">

                            <table className="w-full">

                                <thead className="bg-slate-100 sticky top-0 z-10">

                                    <tr>

                                        <th className="text-left p-4 font-semibold">

                                            User

                                        </th>

                                        <th className="text-left p-4 font-semibold">

                                            Stock

                                        </th>

                                        <th className="text-center p-4 font-semibold">

                                            Type

                                        </th>

                                        <th className="text-center p-4 font-semibold">

                                            Qty

                                        </th>

                                        <th className="text-right p-4 font-semibold">

                                            Price

                                        </th>

                                        <th className="text-right p-4 font-semibold">

                                            Total

                                        </th>

                                        <th className="text-center p-4 font-semibold">

                                            Status

                                        </th>

                                        <th className="text-center p-4 font-semibold">

                                            Date

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredOrders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={8}
                                                className="text-center py-14 text-gray-500"
                                            >

                                                No matching orders found.

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredOrders.map((order) => (
                                                                                        <tr
                                                key={order._id}
                                                className="border-t hover:bg-slate-50 transition"
                                            >

                                                <td className="p-4">

                                                    <div>

                                                        <p className="font-semibold text-slate-800">

                                                            {order.user?.username}

                                                        </p>

                                                        <p className="text-sm text-gray-500">

                                                            {order.user?.email}

                                                        </p>

                                                    </div>

                                                </td>

                                                <td className="p-4">

                                                    <div>

                                                        <p className="font-bold">

                                                            {order.stock?.symbol}

                                                        </p>

                                                        <p className="text-sm text-gray-500">

                                                            {order.stock?.name}

                                                        </p>

                                                    </div>

                                                </td>

                                                <td className="p-4 text-center">

                                                    {order.orderType === "BUY" ? (

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

                                                    {order.quantity}

                                                </td>

                                                <td className="p-4 text-right">

                                                    $

                                                    {Number(
                                                        order.price
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }
                                                    )}

                                                </td>

                                                <td className="p-4 text-right font-bold">

                                                    $

                                                    {Number(
                                                        order.totalAmount
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }
                                                    )}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {order.status === "SUCCESS" ? (

                                                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">

                                                            SUCCESS

                                                        </span>

                                                    ) : order.status === "PENDING" ? (

                                                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">

                                                            PENDING

                                                        </span>

                                                    ) : (

                                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">

                                                            FAILED

                                                        </span>

                                                    )}

                                                </td>

                                                <td className="p-4 text-center text-sm">

                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}

                                                    <br />

                                                    <span className="text-gray-500">

                                                        {new Date(
                                                            order.createdAt
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

export default AllOrders;