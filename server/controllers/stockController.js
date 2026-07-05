import Stock from "../models/Stock.js";
import { refreshStockPrice } from "../utils/updateStockPrice.js";

/*
==========================================
GET ALL STOCKS
==========================================
*/

export const getStocks = async (req, res) => {

    try {

        const stocks = await Stock.find().sort({ symbol: 1 });

        await Promise.all(
            stocks.map(stock => refreshStockPrice(stock))
        );

        res.status(200).json({
            success: true,
            count: stocks.length,
            stocks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
GET STOCK BY SYMBOL
==========================================
*/

export const getStockBySymbol = async (req, res) => {

    try {

        const stock = await Stock.findOne({
            symbol: req.params.symbol.toUpperCase()
        });

        if (!stock) {

            return res.status(404).json({
                success: false,
                message: "Stock not found"
            });

        }

        await refreshStockPrice(stock);

        res.status(200).json({
            success: true,
            stock
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
==========================================
SEARCH STOCKS
==========================================
*/

export const searchStocks = async (req, res) => {

    try {

        const keyword = req.query.search || "";

        const stocks = await Stock.find({

            $or: [

                {
                    symbol: {
                        $regex: keyword,
                        $options: "i"
                    }
                },

                {
                    name: {
                        $regex: keyword,
                        $options: "i"
                    }
                }

            ]

        });

        res.status(200).json({

            success: true,

            count: stocks.length,

            stocks

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
ADMIN ADD STOCK
==========================================
*/

export const addStock = async (req, res) => {

    try {

        const stock = await Stock.create(req.body);

        res.status(201).json({

            success: true,

            message: "Stock Added Successfully",

            stock

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
ADMIN UPDATE STOCK
==========================================
*/

export const updateStock = async (req, res) => {

    try {

        const stock = await Stock.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Stock Updated",

            stock

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
ADMIN DELETE STOCK
==========================================
*/

export const deleteStock = async (req, res) => {

    try {

        const stock = await Stock.findByIdAndDelete(req.params.id);

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Stock Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
GET STOCK HISTORY
==========================================
*/

export const getStockHistory = async (req, res) => {

    try {

        const stock = await Stock.findOne({

            symbol: req.params.symbol.toUpperCase()

        });

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        await refreshStockPrice(stock);

        res.status(200).json({

            success: true,

            symbol: stock.symbol,

            history: stock.history

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
ADMIN UPDATE PRICE
==========================================
*/

export const updateStockPrice = async (req, res) => {

    try {

        const { price } = req.body;

        const stock = await Stock.findById(req.params.id);

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        const now = new Date();

        stock.history.push({

            date: now,

            open: stock.price,

            high: Math.max(stock.price, price),

            low: Math.min(stock.price, price),

            close: price

        });

        if (stock.history.length > 100) {

            stock.history.shift();

        }

        stock.price = price;

        stock.lastPriceUpdate = now;

        await stock.save();

        res.status(200).json({

            success: true,

            message: "Stock Price Updated",

            stock

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/*
==========================================
GET STOCK DETAILS
==========================================
*/

export const getStockDetails = async (req, res) => {

    try {

        const stock = await Stock.findById(req.params.id);

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        await refreshStockPrice(stock);

        res.status(200).json({

            success: true,

            stock

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};