import express from "express";

import {
    buyStock,
    sellStock,
    getOrders,
    getOrderById,
    deleteOrder
} from "../controllers/orderController.js";

import {
    protect,
    adminOnly
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyStock);

router.post("/sell", protect, sellStock);

router.get("/", protect, getOrders);

router.get("/:id", protect, getOrderById);

router.delete("/:id", protect, adminOnly, deleteOrder);

export default router;