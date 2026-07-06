import axios from "axios";

export const getCompanyProfile = async (symbol) => {

    try {

        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;

        const { data } = await axios.get(url);

        if (!data || !data.name) {

            return null;

        }

        return {

            name: data.name,

            exchange: data.exchange

        };

    } catch (error) {

        return null;

    }

};