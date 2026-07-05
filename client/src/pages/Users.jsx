import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
    Search,
    Users as UsersIcon,
    ShieldCheck,
    User,
    Wallet,
    Trash2
} from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const { data } = await axiosInstance.get("/admin/users");

            setUsers(data.users);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load users."
            );

        } finally {

            setLoading(false);

        }

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            const { data } = await axiosInstance.delete(
                `/admin/users/${id}`
            );

            toast.success(data.message);

            fetchUsers();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed."
            );

        }

    };

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const keyword = search.toLowerCase();

            return (

                user.username.toLowerCase().includes(keyword) ||

                user.email.toLowerCase().includes(keyword)

            );

        });

    }, [users, search]);

    const totalUsers = users.length;

    const admins = users.filter(
        user => user.usertype === "admin"
    ).length;

    const customers = users.filter(
        user => user.usertype !== "admin"
    ).length;

    const totalBalance = users.reduce(

        (sum, user) => sum + user.balance,

        0

    );

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="min-h-screen bg-slate-100 flex justify-center items-center">

                    <div className="text-xl font-semibold">

                        Loading Users...

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

                    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-blue-600 text-white p-10 shadow-xl">

                        <h1 className="text-4xl font-bold">

                            User Management

                        </h1>

                        <p className="mt-3 text-slate-200 text-lg">

                            Manage registered users and monitor platform accounts.

                        </p>

                    </div>

                    {/* Summary */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Total Users

                                    </p>

                                    <h2 className="text-3xl font-bold mt-2">

                                        {totalUsers}

                                    </h2>

                                </div>

                                <UsersIcon
                                    size={42}
                                    className="text-blue-600"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Admins

                                    </p>

                                    <h2 className="text-3xl font-bold text-indigo-600 mt-2">

                                        {admins}

                                    </h2>

                                </div>

                                <ShieldCheck
                                    size={42}
                                    className="text-indigo-600"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Customers

                                    </p>

                                    <h2 className="text-3xl font-bold text-emerald-600 mt-2">

                                        {customers}

                                    </h2>

                                </div>

                                <User
                                    size={42}
                                    className="text-emerald-600"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-2xl shadow border p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500">

                                        Total Wallet Balance

                                    </p>

                                    <h2 className="text-2xl font-bold text-orange-600 mt-2">

                                        ${totalBalance.toLocaleString()}

                                    </h2>

                                </div>

                                <Wallet
                                    size={42}
                                    className="text-orange-500"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Search */}

                    <div className="bg-white rounded-2xl shadow border mt-8 p-5">

                        <div className="relative">

                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search by username or email..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    {/* Table */}

                    <div className="bg-white rounded-3xl shadow border mt-8 overflow-hidden">

                        <div className="p-6 border-b">

                            <h2 className="text-2xl font-bold">

                                Registered Users

                            </h2>

                            <p className="text-gray-500 mt-1">

                                Showing {filteredUsers.length} of {users.length} users

                            </p>

                        </div>

                        <div className="overflow-x-auto max-h-162.5">

                            <table className="w-full">

                                <thead className="bg-slate-100 sticky top-0">

                                    <tr>

                                        <th className="text-left p-4">

                                            User

                                        </th>

                                        <th className="text-left p-4">

                                            Email

                                        </th>

                                        <th className="text-center p-4">

                                            Role

                                        </th>

                                        <th className="text-right p-4">

                                            Wallet

                                        </th>

                                        <th className="text-center p-4">

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredUsers.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={5}
                                                className="text-center py-12 text-gray-500"
                                            >

                                                No users found.

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredUsers.map((user) => (

                                            <tr
                                                key={user._id}
                                                className="border-t hover:bg-slate-50 transition"
                                            >

                                                <td className="p-4">

                                                    <div className="flex items-center gap-4">

                                                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                                                            {user.username
                                                                .charAt(0)
                                                                .toUpperCase()}

                                                        </div>

                                                        <div>

                                                            <p className="font-semibold">

                                                                {user.username}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="p-4">

                                                    {user.email}

                                                </td>

                                                <td className="text-center p-4">

                                                    {user.usertype === "admin" ? (

                                                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">

                                                            ADMIN

                                                        </span>

                                                    ) : (

                                                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">

                                                            USER

                                                        </span>

                                                    )}

                                                </td>

                                                <td className="text-right p-4 font-semibold text-emerald-600">

                                                    ${user.balance.toLocaleString()}

                                                </td>

                                                <td className="text-center p-4">

                                                    {user.usertype === "admin" ? (

                                                        <span className="text-gray-400">

                                                            Protected

                                                        </span>

                                                    ) : (

                                                        <button
                                                            onClick={() =>
                                                                deleteUser(user._id)
                                                            }
                                                            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                                        >

                                                            <Trash2 size={16} />

                                                            Delete

                                                        </button>

                                                    )}

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

export default Users;