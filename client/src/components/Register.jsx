import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "./axiosInstance";
import Navbar from "./Navbar";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axiosInstance.post(
                "/users/register",
                formData
            );

            toast.success(data.message || "Registration Successful");

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="min-h-[90vh] bg-slate-50 flex items-center justify-center px-6">

                <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                    <h1 className="text-3xl font-bold text-center text-slate-800">
                        Create Account
                    </h1>

                    <p className="text-center text-slate-500 mt-2 mb-8">
                        Start practicing stock trading today
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                    </form>

                    <p className="text-center mt-6 text-slate-600">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 text-emerald-600 font-semibold"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>
        </>
    );

}

export default Register;