import express from "express";
import { seedStocks } from "../controllers/seedController.js";

const router = express.Router();

router.post("/", seedStocks);

export default router;