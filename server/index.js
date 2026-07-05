import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoute.js";
import stockRoutes from "./routes/stockRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";
import portfolioRoutes from "./routes/portfolioRoute.js";
import watchlistRoutes from "./routes/watchlistRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import strategyRoutes from "./routes/strategyRoute.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";
import seedRoutes from "./routes/seedRoute.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SB Stocks API Running"
    });
});

app.use("/api/users", userRoutes);

app.use("/api/stocks", stockRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/portfolio", portfolioRoutes);

app.use("/api/watchlist", watchlistRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/strategy", strategyRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/seed", seedRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});