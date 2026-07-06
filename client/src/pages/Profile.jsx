import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Wallet,
  BriefcaseBusiness,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import axiosInstance from "../components/axiosInstance";
import Loader from "../components/Loader";

function Profile() {
  const [user, setUser] = useState(null);

  const [portfolio, setPortfolio] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileRes = await axiosInstance.get("/users/profile");

      const portfolioRes = await axiosInstance.get("/portfolio");

      setUser(profileRes.data.user);

      setPortfolio(portfolioRes.data);
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
        <Loader />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

          {/* Hero */}

          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold">{user.username}</h2>

                <p className="text-slate-300 mt-2">{user.email}</p>
              </div>

              <div className="mt-6 md:mt-0 text-right">
                <p className="text-slate-300">Wallet Balance</p>

                <h2 className="text-5xl font-bold text-emerald-400 mt-2">
                  ${user.balance.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>

          {/* Profile Info */}

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8">
                Account Information
              </h2>

              <div className="space-y-7">
                <div className="flex items-center gap-4">
                  <User className="text-blue-600" size={28} />

                  <div>
                    <p className="text-gray-500">Username</p>

                    <h3 className="font-semibold text-lg">{user.username}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="text-emerald-600" size={28} />

                  <div>
                    <p className="text-gray-500">Email</p>

                    <h3 className="font-semibold text-lg">{user.email}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <BadgeCheck className="text-amber-500" size={28} />

                  <div>
                    <p className="text-gray-500">Role</p>

                    <span className="inline-block mt-1 bg-slate-100 px-4 py-2 rounded-full capitalize font-medium">
                      {user.usertype}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio */}

            <div className="bg-white rounded-3xl shadow-sm border p-8">
              <h2 className="text-2xl font-semibold mb-8">Portfolio Summary</h2>

              <div className="space-y-7">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Wallet className="text-blue-600" />

                    <span>Wallet Balance</span>
                  </div>

                  <span className="font-bold">${user.balance.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="text-purple-600" />

                    <span>Total Investment</span>
                  </div>

                  <span className="font-bold">
                    ${portfolio.invested.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="text-emerald-600" />

                    <span>Current Value</span>
                  </div>

                  <span className="font-bold">
                    ${portfolio.currentValue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t pt-6">
                  <span className="font-semibold">Profit / Loss</span>

                  <span
                    className={`text-xl font-bold ${
                      portfolio.profitLoss >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {portfolio.profitLoss >= 0 ? "+" : ""}$
                    {portfolio.profitLoss.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
