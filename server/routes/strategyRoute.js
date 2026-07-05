import express from "express";
import { analyzeStrategy } from "../controllers/strategyController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/analyze", protect, analyzeStrategy);

export default router;