import express from "express";

import {
    getDashboard,
    getUsers,
    deleteUser,
    getAllOrders,
    getAllTransactions,
    getAllStocks
} from "../controllers/adminController.js";

import {
    protect,
    adminOnly
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
==========================================
ADMIN AUTHORIZATION
==========================================
*/

router.use(protect);

router.use(adminOnly);

/*
==========================================
DASHBOARD
==========================================
*/

router.get("/dashboard", getDashboard);

/*
==========================================
USERS
==========================================
*/

router.get("/users", getUsers);

router.delete("/users/:id", deleteUser);

/*
==========================================
ORDERS
==========================================
*/

router.get("/orders", getAllOrders);

/*
==========================================
TRANSACTIONS
==========================================
*/

router.get("/transactions", getAllTransactions);

/*
==========================================
STOCKS
==========================================
*/

router.get("/stocks", getAllStocks);

export default router;