export const analyzeStrategy = async (req, res) => {
    try {

        const {
            buyPrice,
            currentPrice,
            quantity
        } = req.body;

        if (!buyPrice || !currentPrice || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const investment = buyPrice * quantity;

        const currentValue = currentPrice * quantity;

        const profitLoss = currentValue - investment;

        const roi = ((profitLoss / investment) * 100).toFixed(2);

        res.status(200).json({

            success: true,

            analysis: {

                investment,

                currentValue,

                profitLoss,

                roi: `${roi}%`

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};