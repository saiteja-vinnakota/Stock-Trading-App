import express from "express";

import {
    getTransactions,
    getTransactionById,
    getAllTransactions,
    deleteTransaction
} from "../controllers/transactionController.js";

import {
    protect,
    adminOnly
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTransactions);

router.get("/admin/all", protect, adminOnly, getAllTransactions);

router.get("/:id", protect, getTransactionById);

router.delete("/:id", protect, adminOnly, deleteTransaction);

export default router;