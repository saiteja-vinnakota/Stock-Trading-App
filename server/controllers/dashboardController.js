import User from "../models/User.js";
import Portfolio from "../models/Portfolio.js";
import Order from "../models/Order.js";
import Transaction from "../models/Transaction.js";
import Watchlist from "../models/WatchList.js";

export const getDashboard = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const holdings = await Portfolio.find({
            user: req.user._id
        }).populate("stock");

        let investment = 0;
        let currentValue = 0;

        holdings.forEach((item) => {

            investment += item.totalInvestment;

            currentValue += item.stock.price * item.quantity;

        });

        const profitLoss = currentValue - investment;

        const totalOrders = await Order.countDocuments({
            user: req.user._id
        });

        const totalTransactions = await Transaction.countDocuments({
            user: req.user._id
        });

        const watchlist = await Watchlist.countDocuments({
            user: req.user._id
        });

        const recentOrders = await Order.find({
            user: req.user._id
        })
            .populate("stock")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            success: true,

            dashboard: {

                walletBalance: user.balance,

                investment,

                currentValue,

                profitLoss,

                totalOrders,

                totalTransactions,

                watchlist

            },

            recentOrders

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};