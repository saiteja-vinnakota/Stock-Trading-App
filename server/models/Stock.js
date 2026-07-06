import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    open: {
      type: Number,
      required: true,
    },

    high: {
      type: Number,
      required: true,
    },

    low: {
      type: Number,
      required: true,
    },

    close: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
    },

    stockExchange: {
      type: String,
      required: true,
    },

    sector: {
      type: String,
      default: "General",
    },

    price: {
      type: Number,
      required: true,
    },

    lastPriceUpdate: {
      type: Date,
      default: Date.now,
    },

    isTradingEnabled: {
      type: Boolean,
      default: true,
    },

    history: {
      type: [historySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Stock", stockSchema);
