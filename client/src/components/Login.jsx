import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "./axiosInstance";
import Navbar from "./Navbar";
import { useGeneral } from "../context/GeneralContext";

function Login() {
    const navigate = useNavigate();

    const { login, setLoading } = useGeneral();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axiosInstance.post(
                "/users/login",
                formData
            );

            login(data.user, data.token);

            toast.success("Login Successful");

            if (data.user.usertype === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
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
                        Login
                    </h1>

                    <p className="text-center text-slate-500 mt-2 mb-8">
                        Access your SB Stocks account
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

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
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-6 text-slate-600">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-emerald-600 ml-2 font-semibold"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>
        </>
    );
}

export default Login;