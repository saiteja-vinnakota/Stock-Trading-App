import Transaction from "../models/Transaction.js";

/*
==========================================
GET ALL TRANSACTIONS
GET /api/transactions
==========================================
*/

export const getTransactions = async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user._id
        })
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
GET SINGLE TRANSACTION
GET /api/transactions/:id
==========================================
*/

export const getTransactionById = async (req, res) => {

    try {

        const transaction = await Transaction.findById(req.params.id)
            .populate("stock")
            .populate("user", "-password");

        if (!transaction) {

            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });

        }

        res.status(200).json({
            success: true,
            transaction
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
ADMIN
GET ALL TRANSACTIONS
==========================================
*/

export const getAllTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find()
            .populate("stock")
            .populate("user", "-password")
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
DELETE TRANSACTION
==========================================
*/

export const deleteTransaction = async (req, res) => {

    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {

            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });

        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: "Transaction Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};