import axios from "axios";

export const getLivePrice = async (symbol) => {
    try {

        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;

        const { data } = await axios.get(url);

        if (!data || data.c === 0) {
            return null;
        }

        return data.c;

    } catch (error) {

        console.log("Finnhub Error:", error.message);

        return null;

    }
};