import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";

function History() {

    const [activeTab, setActiveTab] = useState("orders");

    const [orders, setOrders] = useState([]);

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const [orderRes, transactionRes] = await Promise.all([
                axiosInstance.get("/orders"),
                axiosInstance.get("/transactions")
            ]);

            setOrders(orderRes.data.orders);

            setTransactions(transactionRes.data.transactions);

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

                <div className="p-10 text-xl">

                    Loading History...

                </div>

            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="bg-slate-50 min-h-screen">

                <div className="max-w-7xl mx-auto p-6">

                    <h1 className="text-3xl font-bold mb-8">

                        Trading History

                    </h1>

                    <div className="flex gap-4 mb-8">

                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`px-6 py-2 rounded-lg transition ${
                                activeTab === "orders"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white border"
                            }`}
                        >
                            Orders
                        </button>

                        <button
                            onClick={() => setActiveTab("transactions")}
                            className={`px-6 py-2 rounded-lg transition ${
                                activeTab === "transactions"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white border"
                            }`}
                        >
                            Wallet Transactions
                        </button>

                    </div>

                    {activeTab === "orders" ? (

                        <div className="bg-white rounded-2xl shadow border overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-100">

                                    <tr>

                                        <th className="p-4 text-left">Stock</th>

                                        <th className="p-4 text-center">Type</th>

                                        <th className="p-4 text-center">Quantity</th>

                                        <th className="p-4 text-right">Price</th>

                                        <th className="p-4 text-right">Total</th>

                                        <th className="p-4 text-center">Status</th>

                                        <th className="p-4 text-center">Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="p-8 text-center text-gray-500"
                                            >

                                                No Orders Found

                                            </td>

                                        </tr>

                                    ) : (

                                        orders.map((order) => (

                                            <tr
                                                key={order._id}
                                                className="border-t hover:bg-slate-50"
                                            >

                                                <td className="p-4 font-semibold">

                                                    {order.stock?.symbol}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {order.orderType === "BUY" ? (

                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                            BUY

                                                        </span>

                                                    ) : (

                                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                                                            SELL

                                                        </span>

                                                    )}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {order.quantity}

                                                </td>

                                                <td className="p-4 text-right">

                                                    ${Number(order.price).toFixed(2)}

                                                </td>

                                                <td className="p-4 text-right font-semibold">

                                                    ${Number(order.totalAmount).toFixed(2)}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {order.status}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {new Date(order.createdAt).toLocaleString()}

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {transactions.length === 0 ? (

                                <div className="bg-white rounded-2xl shadow border p-10 text-center text-gray-500">

                                    No Transactions Found

                                </div>

                            ) : (

                                transactions.map((transaction) => (

                                    <div
                                        key={transaction._id}
                                        className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center"
                                    >

                                        <div>

                                            <h2 className="text-lg font-semibold">

                                                {transaction.stock?.symbol}

                                            </h2>

                                            <p className="text-gray-500 mt-1">

                                                {new Date(transaction.createdAt).toLocaleString()}

                                            </p>

                                        </div>

                                        <div className="text-center">

                                            {transaction.transactionType === "BUY" ? (

                                                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">

                                                    Debit

                                                </span>

                                            ) : (

                                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                                    Credit

                                                </span>

                                            )}

                                        </div>

                                        <div className="text-right">

                                            <h2
                                                className={`text-xl font-bold ${
                                                    transaction.transactionType === "BUY"
                                                        ? "text-red-600"
                                                        : "text-green-600"
                                                }`}
                                            >

                                                {transaction.transactionType === "BUY"
                                                    ? "-"
                                                    : "+"}

                                                ${Number(transaction.totalAmount).toFixed(2)}

                                            </h2>

                                            <p className="text-gray-500">

                                                {transaction.transactionType}

                                            </p>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default History;