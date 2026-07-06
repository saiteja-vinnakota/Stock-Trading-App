import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Order from "../models/Order.js";
import Transaction from "../models/Transaction.js";

/*
==========================================
BUY STOCK
POST /api/orders/buy
==========================================
*/

export const buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    if (!stockId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Stock and quantity are required.",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than zero.",
      });
    }

    // Logged in user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Stock
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found.",
      });
    }

    if (!stock.isTradingEnabled) {
      return res.status(400).json({
        success: false,
        message: "Trading is currently disabled for this stock.",
      });
    }

    const totalAmount = stock.price * quantity;

    // Check Balance

    if (user.balance < totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance.",
      });
    }

    // Deduct Balance

    user.balance -= totalAmount;

    await user.save();

    /*
        ================================
        Portfolio
        ================================
        */

    let portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (portfolio) {
      const previousInvestment = portfolio.totalInvestment;

      const newInvestment = previousInvestment + totalAmount;

      const newQuantity = portfolio.quantity + quantity;

      portfolio.averagePrice = newInvestment / newQuantity;

      portfolio.quantity = newQuantity;

      portfolio.totalInvestment = newInvestment;

      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        user: user._id,

        stock: stock._id,

        quantity,

        averagePrice: stock.price,

        totalInvestment: totalAmount,
      });
    }

    /*
        ================================
        Order History
        ================================
        */

    const order = await Order.create({
      user: user._id,

      stock: stock._id,

      quantity,

      price: stock.price,

      totalAmount,

      orderType: "BUY",

      status: "SUCCESS",
    });

    /*
        ================================
        Transaction
        ================================
        */

    const transaction = await Transaction.create({
      user: user._id,

      stock: stock._id,

      transactionType: "BUY",

      quantity,

      price: stock.price,

      totalAmount,
    });

    res.status(201).json({
      success: true,

      message: "Stock Purchased Successfully",

      walletBalance: user.balance,

      portfolio,

      order,

      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/*
==========================================
SELL STOCK
POST /api/orders/sell
==========================================
*/

export const sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    if (!stockId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Stock and quantity are required.",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than zero.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found.",
      });
    }

    if (!stock.isTradingEnabled) {
      return res.status(400).json({
        success: false,
        message: "Trading is currently disabled for this stock.",
      });
    }

    const portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Stock not found in portfolio.",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Shares.",
      });
    }

    const totalAmount = stock.price * quantity;

    // Add money to wallet

    user.balance += totalAmount;

    await user.save();

    // Update Portfolio

    portfolio.quantity -= quantity;

    portfolio.totalInvestment = portfolio.averagePrice * portfolio.quantity;

    if (portfolio.quantity === 0) {
      await Portfolio.findByIdAndDelete(portfolio._id);
    } else {
      await portfolio.save();
    }

    // Order History

    const order = await Order.create({
      user: user._id,
      stock: stock._id,
      quantity,
      price: stock.price,
      totalAmount,
      orderType: "SELL",
      status: "SUCCESS",
    });

    // Transaction

    const transaction = await Transaction.create({
      user: user._id,
      stock: stock._id,
      transactionType: "SELL",
      quantity,
      price: stock.price,
      totalAmount,
    });

    res.status(200).json({
      success: true,
      message: "Stock Sold Successfully",
      walletBalance: user.balance,
      order,
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
GET ALL ORDERS
GET /api/orders
==========================================
*/

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("stock")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
GET SINGLE ORDER
GET /api/orders/:id
==========================================
*/

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("stock")
      .populate("user", "-password");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
DELETE ORDER
DELETE /api/orders/:id
==========================================
*/

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
