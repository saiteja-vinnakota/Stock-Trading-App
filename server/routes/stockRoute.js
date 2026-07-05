import express from "express";

import {
    getStocks,
    getStockBySymbol,
    searchStocks,
    addStock,
    updateStock,
    deleteStock,
    getStockHistory,
    getStockDetails,
    updateStockPrice,
} from "../controllers/stockController.js";

import {
    protect,
    adminOnly,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getStocks);

router.get("/search", searchStocks);

router.get("/:symbol", getStockBySymbol);

// Admin Routes
router.post("/", protect, adminOnly, addStock);

router.put("/:id", protect, adminOnly, updateStock);

router.delete("/:id", protect, adminOnly, deleteStock);

router.get("/history/:symbol", getStockHistory);

router.get("/details/:id", getStockDetails);

router.put(
    "/price/:id",
    protect,
    adminOnly,
    updateStockPrice
);

export default router;