import Portfolio from "../models/Portfolio.js";

/*
==========================================
GET USER PORTFOLIO
GET /api/portfolio
==========================================
*/

export const getPortfolio = async (req, res) => {
    try {

        const portfolio = await Portfolio.find({
            user: req.user._id
        }).populate("stock");

        let invested = 0;
        let currentValue = 0;

        const holdings = portfolio.map((item) => {

            const investment = item.totalInvestment;

            const current = item.stock.price * item.quantity;

            const profitLoss = current - investment;

            invested += investment;

            currentValue += current;

            return {

                _id: item._id,

                stock: item.stock,

                quantity: item.quantity,

                averagePrice: item.averagePrice,

                investment,

                currentValue: current,

                profitLoss

            };

        });

        res.status(200).json({

            success: true,

            invested,

            currentValue,

            profitLoss: currentValue - invested,

            holdings

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
GET SINGLE HOLDING
GET /api/portfolio/:id
==========================================
*/

export const getHolding = async (req, res) => {

    try {

        const holding = await Portfolio.findById(req.params.id)
            .populate("stock");

        if (!holding) {

            return res.status(404).json({
                success: false,
                message: "Holding not found"
            });

        }

        res.status(200).json({
            success: true,
            holding
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};