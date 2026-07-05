import express from "express";

import {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist
} from "../controllers/watchlistController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToWatchlist);

router.get("/", protect, getWatchlist);

router.delete("/:id", protect, removeFromWatchlist);

export default router;