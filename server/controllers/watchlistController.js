import Watchlist from "../models/WatchList.js";
import Stock from "../models/Stock.js";

/*
==========================================
ADD TO WATCHLIST
POST /api/watchlist
==========================================
*/

export const addToWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;

        if (!stockId) {
            return res.status(400).json({
                success: false,
                message: "Stock ID is required."
            });
        }

        const stock = await Stock.findById(stockId);

        if (!stock) {
            return res.status(404).json({
                success: false,
                message: "Stock not found."
            });
        }

        const alreadyExists = await Watchlist.findOne({
            user: req.user._id,
            stock: stockId
        });

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Stock already exists in watchlist."
            });
        }

        const watchlist = await Watchlist.create({
            user: req.user._id,
            stock: stockId
        });

        res.status(201).json({
            success: true,
            message: "Stock added to watchlist.",
            watchlist
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
GET WATCHLIST
GET /api/watchlist
==========================================
*/

export const getWatchlist = async (req, res) => {

    try {

        const watchlist = await Watchlist.find({
            user: req.user._id
        }).populate("stock");

        res.status(200).json({
            success: true,
            count: watchlist.length,
            watchlist
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
REMOVE FROM WATCHLIST
DELETE /api/watchlist/:id
==========================================
*/

export const removeFromWatchlist = async (req, res) => {

    try {

        const watchlist = await Watchlist.findById(req.params.id);

        if (!watchlist) {

            return res.status(404).json({
                success: false,
                message: "Item not found."
            });

        }

        await watchlist.deleteOne();

        res.status(200).json({
            success: true,
            message: "Removed from watchlist."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};