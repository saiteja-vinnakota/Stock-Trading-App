import { getLivePrice } from "./stockApi.js";

const CACHE_TIME = 5 * 60 * 1000;

export const refreshStockPrice = async (stock) => {

    try {

        const shouldUpdate =
            !stock.lastPriceUpdate ||
            (Date.now() - new Date(stock.lastPriceUpdate).getTime()) > CACHE_TIME;

        if (!shouldUpdate) {

            return stock;

        }

        const livePrice = await getLivePrice(stock.symbol);

        if (!livePrice) {

            return stock;

        }

        const now = new Date();

        const today = now.toDateString();

        const lastCandle =
            stock.history.length > 0
                ? stock.history[stock.history.length - 1]
                : null;

        /*
        ==========================================
        SAME DAY -> UPDATE LAST CANDLE
        ==========================================
        */

        if (
            lastCandle &&
            new Date(lastCandle.date).toDateString() === today
        ) {

            lastCandle.high = Math.max(
                lastCandle.high,
                livePrice
            );

            lastCandle.low = Math.min(
                lastCandle.low,
                livePrice
            );

            lastCandle.close = livePrice;

        }

        /*
        ==========================================
        NEW DAY -> CREATE NEW CANDLE
        ==========================================
        */

        else {

            stock.history.push({

                date: now,

                open: stock.price,

                high: Math.max(stock.price, livePrice),

                low: Math.min(stock.price, livePrice),

                close: livePrice

            });

        }

        /*
        ==========================================
        KEEP ONLY LAST 100 CANDLES
        ==========================================
        */

        if (stock.history.length > 100) {

            stock.history.shift();

        }

        stock.price = livePrice;

        stock.lastPriceUpdate = now;

        await stock.save();

        return stock;

    } catch (error) {

        console.log(error.message);

        return stock;

    }

};