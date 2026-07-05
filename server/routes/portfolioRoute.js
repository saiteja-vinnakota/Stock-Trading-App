import express from "express";

import {
    getPortfolio,
    getHolding
} from "../controllers/portfolioController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPortfolio);

router.get("/:id", protect, getHolding);

export default router;