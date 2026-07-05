import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import History from "./pages/History";
import Profile from "./pages/Profile";
import StockDetails from "./pages/StockDetails";
import Stocks from "./pages/Stocks";

import Admin from "./pages/Admin";
import Users from "./pages/Users";
import AllOrders from "./pages/AllOrders";
import AllTransactions from "./pages/AllTransactions";

import Login from "./components/Login";
import Register from "./components/Register";

import { useGeneral } from "./context/GeneralContext";

function App() {
  const { token, user } = useGeneral();

  const PrivateRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!token || user?.usertype !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <Portfolio />
          </PrivateRoute>
        }
      />

      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/stocks"
        element={
          <PrivateRoute>
            <Stocks />
          </PrivateRoute>
        }
      />

      <Route
        path="/stock/:id"
        element={
          <PrivateRoute>
            <StockDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/transactions"
        element={
          <AdminRoute>
            <AllTransactions />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
