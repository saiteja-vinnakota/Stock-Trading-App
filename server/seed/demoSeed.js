import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Order from "../models/Order.js";
import Transaction from "../models/Transaction.js";
import Watchlist from "../models/Watchlist.js";

import connectDB from "../config/db.js";

const PASSWORD = "Password@123";

const STOCKS = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 212
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 485
    },
    {
        symbol: "GOOGL",
        name: "Alphabet",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 196
    },
    {
        symbol: "AMZN",
        name: "Amazon",
        exchange: "NASDAQ",
        sector: "E-Commerce",
        price: 225
    },
    {
        symbol: "META",
        name: "Meta",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 710
    },
    {
        symbol: "TSLA",
        name: "Tesla",
        exchange: "NASDAQ",
        sector: "Automobile",
        price: 315
    },
    {
        symbol: "NVDA",
        name: "NVIDIA",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 175
    },
    {
        symbol: "NFLX",
        name: "Netflix",
        exchange: "NASDAQ",
        sector: "Entertainment",
        price: 1260
    },
    {
        symbol: "AMD",
        name: "AMD",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 176
    },
    {
        symbol: "INTC",
        name: "Intel",
        exchange: "NASDAQ",
        sector: "Technology",
        price: 24
    }
];

const USERS = [
    {
        username: "admin",
        email: "admin@sbstocks.com",
        balance: 1000000,
        usertype: "admin"
    },
    {
        username: "Sai Teja",
        email: "saiteja@gmail.com",
        balance: 108540,
        usertype: "user"
    },
    {
        username: "Rahul Sharma",
        email: "rahul@gmail.com",
        balance: 92560,
        usertype: "user"
    },
    {
        username: "Ananya Reddy",
        email: "ananya@gmail.com",
        balance: 116420,
        usertype: "user"
    },
    {
        username: "Karthik Rao",
        email: "karthik@gmail.com",
        balance: 81230,
        usertype: "user"
    },
    {
        username: "Priya Gupta",
        email: "priya@gmail.com",
        balance: 123500,
        usertype: "user"
    },
    {
        username: "Neha Patel",
        email: "neha@gmail.com",
        balance: 97600,
        usertype: "user"
    },
    {
        username: "Rohan Mehta",
        email: "rohan@gmail.com",
        balance: 105840,
        usertype: "user"
    },
    {
        username: "Aarav Singh",
        email: "aarav@gmail.com",
        balance: 118920,
        usertype: "user"
    }
];

/*
==========================================
HELPER FUNCTIONS
==========================================
*/

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function randomDate(days = 90) {
    const date = new Date();
    date.setDate(date.getDate() - randomInt(1, days));
    return date;
}

/*
==========================================
GENERATE REALISTIC OHLC HISTORY
==========================================
*/

function generateHistory(startPrice) {
    const history = [];
    let lastClose = startPrice;
    const today = new Date();

    for (let i = 100; i >= 1; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const open = lastClose;
        const movement = random(-0.03, 0.03); // Daily movement (-3% to +3%)
        const close = +(open * (1 + movement)).toFixed(2);

        const high = +(
            Math.max(open, close) *
            (1 + random(0.001, 0.02))
        ).toFixed(2);

        const low = +(
            Math.min(open, close) *
            (1 - random(0.001, 0.02))
        ).toFixed(2);

        history.push({
            date,
            open,
            high,
            low,
            close
        });

        lastClose = close;
    }

    return {
        history,
        currentPrice: lastClose
    };
}

/*
==========================================
CREATE USERS
==========================================
*/

async function createUsers() {
    console.log("Creating Users...");
    const createdUsers = [];
    
    // Hash password once to speed up seeding
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    for (const item of USERS) {
        const user = await User.create({
            username: item.username,
            email: item.email,
            password: hashedPassword,
            balance: item.balance,
            usertype: item.usertype
        });
        createdUsers.push(user);
    }

    console.log(`${createdUsers.length} Users Created`);
    return createdUsers;
}

/*
==========================================
CREATE STOCKS
==========================================
*/

async function createStocks() {
    console.log("Creating Stocks...");
    const createdStocks = [];

    for (const item of STOCKS) {
        const generated = generateHistory(item.price);

        const stock = await Stock.create({
            symbol: item.symbol,
            name: item.name,
            stockExchange: item.exchange,
            sector: item.sector,
            price: generated.currentPrice,
            lastPriceUpdate: new Date(),
            history: generated.history
        });

        createdStocks.push(stock);
    }

    console.log(`${createdStocks.length} Stocks Created`);
    return createdStocks;
}

/*
==========================================
CREATE PORTFOLIOS + ORDERS + TRANSACTIONS
==========================================
*/

async function createTradingData(users, stocks) {
    console.log("Creating Trading Data...");

    for (const user of users) {
        if (user.usertype === "admin") continue;

        // Each user owns 3-6 stocks
        const stockCount = randomInt(3, 6);
        const selectedStocks = [...stocks]
            .sort(() => Math.random() - 0.5)
            .slice(0, stockCount);

        for (const stock of selectedStocks) {
            const quantity = randomInt(5, 60);
            const averagePrice = +(stock.price * random(0.80, 1.10)).toFixed(2);
            const totalInvestment = +(averagePrice * quantity).toFixed(2);

            // Portfolio
            await Portfolio.create({
                user: user._id,
                stock: stock._id,
                quantity,
                averagePrice,
                totalInvestment
            });

            // BUY ORDER & TRANSACTION
            const buyDate = randomDate(90);

            await Order.create({
                user: user._id,
                stock: stock._id,
                quantity,
                price: averagePrice,
                totalAmount: totalInvestment,
                orderType: "BUY",
                status: "SUCCESS",
                createdAt: buyDate,
                updatedAt: buyDate
            });

            await Transaction.create({
                user: user._id,
                stock: stock._id,
                quantity,
                price: averagePrice,
                totalAmount: totalInvestment,
                transactionType: "BUY",
                createdAt: buyDate,
                updatedAt: buyDate
            });

            // 40% chance of SELL order
            if (Math.random() < 0.4) {
                const sellQty = randomInt(1, Math.max(1, Math.floor(quantity / 2)));
                const sellPrice = +(stock.price * random(0.95, 1.15)).toFixed(2);
                const sellTotal = +(sellQty * sellPrice).toFixed(2);
                const sellDate = randomDate(30);

                await Order.create({
                    user: user._id,
                    stock: stock._id,
                    quantity: sellQty,
                    price: sellPrice,
                    totalAmount: sellTotal,
                    orderType: "SELL",
                    status: "SUCCESS",
                    createdAt: sellDate,
                    updatedAt: sellDate
                });

                await Transaction.create({
                    user: user._id,
                    stock: stock._id,
                    quantity: sellQty,
                    price: sellPrice,
                    totalAmount: sellTotal,
                    transactionType: "SELL",
                    createdAt: sellDate,
                    updatedAt: sellDate
                });
            }
        }
    }

    console.log("Trading Data Created");
}

/*
==========================================
CREATE WATCHLISTS
==========================================
*/

async function createWatchlists(users, stocks) {
    console.log("Creating Watchlists...");

    for (const user of users) {
        if (user.usertype === "admin") continue;

        const watchCount = randomInt(3, 5);
        const selectedStocks = [...stocks]
            .sort(() => Math.random() - 0.5)
            .slice(0, watchCount);

        for (const stock of selectedStocks) {
            await Watchlist.create({
                user: user._id,
                stock: stock._id,
                createdAt: randomDate(60),
                updatedAt: new Date()
            });
        }
    }

    console.log("Watchlists Created");
}

/*
==========================================
CLEAR DATABASE
==========================================
*/

async function clearDatabase() {
    console.log("Clearing Old Demo Data...");

    await User.deleteMany({});
    await Stock.deleteMany({});
    await Portfolio.deleteMany({});
    await Order.deleteMany({});
    await Transaction.deleteMany({});
    await Watchlist.deleteMany({});

    console.log("Database Cleared");
}

/*
==========================================
MAIN SEED FUNCTION
==========================================
*/

async function seedDatabase() {
    try {
        await connectDB();
        await clearDatabase();

        const users = await createUsers();
        const stocks = await createStocks();

        await createTradingData(users, stocks);
        await createWatchlists(users, stocks);

        console.log("");
        console.log("====================================");
        console.log("DEMO DATABASE CREATED SUCCESSFULLY");
        console.log("====================================");
        console.log("");

        console.log("Admin Login");
        console.log("Email    : admin@sbstocks.com");
        console.log("Password : Password@123");
        console.log("");

        console.log("User Login");
        console.log("Email    : saiteja@gmail.com");
        console.log("Password : Password@123");
        console.log("");

        console.log("Database Summary");
        console.log("------------------------------");
        console.log(`Users         : ${users.length}`);
        console.log(`Stocks        : ${stocks.length}`);
        console.log("Portfolio     : Generated");
        console.log("Orders        : Generated");
        console.log("Transactions  : Generated");
        console.log("Watchlists    : Generated");
        console.log("------------------------------");

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedDatabase();