import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Order from "../models/Order.js";
import Transaction from "../models/Transaction.js";

/*
==========================================
ADMIN DASHBOARD
GET /api/admin/dashboard
==========================================
*/

export const getDashboard = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalStocks = await Stock.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalTransactions = await Transaction.countDocuments();

        const totalBalance = await User.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$balance"
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalStocks,
                totalOrders,
                totalTransactions,
                totalVirtualMoney:
                    totalBalance.length > 0
                        ? totalBalance[0].total
                        : 0
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
GET ALL USERS
GET /api/admin/users
==========================================
*/

export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
DELETE USER
DELETE /api/admin/users/:id
==========================================
*/

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
GET ALL ORDERS
GET /api/admin/orders
==========================================
*/

export const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "-password")
            .populate("stock")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
GET ALL TRANSACTIONS
GET /api/admin/transactions
==========================================
*/

export const getAllTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find()
            .populate("user", "-password")
            .populate("stock")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
GET ALL STOCKS
GET /api/admin/stocks
==========================================
*/

export const getAllStocks = async (req, res) => {

    try {

        const stocks = await Stock.find()
            .sort({ symbol: 1 });

        res.status(200).json({
            success: true,
            count: stocks.length,
            stocks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};