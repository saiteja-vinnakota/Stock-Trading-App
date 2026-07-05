import Stock from "../models/Stock.js";

/*
==========================================
GENERATE OHLC HISTORY
==========================================
*/

const generateHistory = (currentPrice) => {

    const history = [];

    let previousClose = currentPrice * 0.85;

    for (let i = 29; i >= 0; i--) {

        const date = new Date();

        date.setDate(date.getDate() - i);

        const open = previousClose;

        const movement = (Math.random() * 8 - 4);

        const close = Math.max(1, open + movement);

        const high =
            Math.max(open, close) + Math.random() * 3;

        const low =
            Math.min(open, close) - Math.random() * 3;

        history.push({

            date,

            open: Number(open.toFixed(2)),

            high: Number(high.toFixed(2)),

            low: Number(low.toFixed(2)),

            close: Number(close.toFixed(2))

        });

        previousClose = close;

    }

    return history;

};

/*
==========================================
SEED STOCKS
==========================================
*/

export const seedStocks = async (req, res) => {

    try {

        const count = await Stock.countDocuments();

        if (count > 0) {

            return res.status(200).json({

                success: true,

                message: "Stocks already seeded."

            });

        }

        const stocks = [

            {
                symbol: "AAPL",
                name: "Apple Inc.",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 210
            },

            {
                symbol: "MSFT",
                name: "Microsoft",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 485
            },

            {
                symbol: "GOOGL",
                name: "Alphabet",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 196
            },

            {
                symbol: "AMZN",
                name: "Amazon",
                stockExchange: "NASDAQ",
                sector: "E-Commerce",
                price: 225
            },

            {
                symbol: "META",
                name: "Meta",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 710
            },

            {
                symbol: "TSLA",
                name: "Tesla",
                stockExchange: "NASDAQ",
                sector: "Automobile",
                price: 315
            },

            {
                symbol: "NVDA",
                name: "NVIDIA",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 175
            },

            {
                symbol: "NFLX",
                name: "Netflix",
                stockExchange: "NASDAQ",
                sector: "Entertainment",
                price: 1260
            },

            {
                symbol: "AMD",
                name: "AMD",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 176
            },

            {
                symbol: "INTC",
                name: "Intel",
                stockExchange: "NASDAQ",
                sector: "Technology",
                price: 24
            }

        ];

        const finalStocks = stocks.map(stock => ({

            ...stock,

            history: generateHistory(stock.price)

        }));

        await Stock.insertMany(finalStocks);

        res.status(201).json({

            success: true,

            message: "Stocks Added Successfully",

            count: finalStocks.length

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};