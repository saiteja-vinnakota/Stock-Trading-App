import { Link, useNavigate } from "react-router-dom";
import { useGeneral } from "../context/GeneralContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, token, logout } = useGeneral();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-emerald-400">
            SB Stocks
          </Link>

          {!token ? (
            <div className="flex items-center gap-8 text-sm">
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>

              <Link to="/login" className="hover:text-emerald-400 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          ) : user?.usertype === "admin" ? (
            <div className="flex items-center gap-8 text-sm">
              <Link to="/admin" className="hover:text-emerald-400">
                Dashboard
              </Link>

              <Link to="/admin/users" className="hover:text-emerald-400">
                Users
              </Link>

              <Link to="/admin/orders" className="hover:text-emerald-400">
                Orders
              </Link>

              <Link to="/admin/transactions" className="hover:text-emerald-400">
                Transactions
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8 text-sm">
              <Link to="/home" className="hover:text-emerald-400">
                Dashboard
              </Link>

              <Link to="/stocks" className="hover:text-emerald-400">
                Stocks
              </Link>

              <Link to="/portfolio" className="hover:text-emerald-400">
                Portfolio
              </Link>

              <Link to="/history" className="hover:text-emerald-400">
                History
              </Link>

              <Link to="/profile" className="hover:text-emerald-400">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
