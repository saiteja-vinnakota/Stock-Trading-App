# 📈 SB Stocks - Virtual Stock Trading Platform

SB Stocks is a full-stack MERN virtual stock trading platform that enables users to learn and practice stock market trading using virtual money. The platform provides live stock prices, realistic portfolio management, order execution, transaction history, candlestick charts, watchlists, and an admin dashboard for managing stocks and users.

---

# 🚀 Features

## 👤 User Features

- JWT Authentication
- User Registration & Login
- Secure Password Encryption (bcrypt)
- Virtual Wallet
- Buy Stocks
- Sell Stocks
- Portfolio Management
- Profit & Loss Calculation
- Order History
- Transaction History
- Watchlist
- Live Stock Prices (Finnhub API)
- Company Search
- Candlestick Charts
- Responsive Dashboard
- Profile Page

---

## 👨‍💼 Admin Features

- Admin Authentication
- Dashboard Statistics
- View All Users
- Delete Users
- View All Orders
- View All Transactions
- View All Stocks
- Add Stocks
- Edit Stocks
- Delete Stocks
- Update Stock Prices

---

# 📊 Dashboard

The dashboard provides a quick overview of trading activity.

- Wallet Balance
- Total Investment
- Current Portfolio Value
- Profit / Loss
- Total Orders
- Total Transactions
- Watchlist Count
- Recent Orders

---

# 📈 Stock Market

- Live Stock Prices
- Search Stocks
- Company Information
- Historical Price Data
- Candlestick Charts
- Buy / Sell Stocks
- Add to Watchlist

---

# 💼 Portfolio

Track your investments with

- Holdings
- Quantity
- Average Buy Price
- Current Market Price
- Investment Amount
- Current Value
- Profit / Loss

---

# 📜 Trading History

## Orders

Displays every order placed.

- Buy / Sell
- Quantity
- Price
- Status
- Date

## Transactions

Displays only completed trades.

- Stock
- Buy / Sell
- Quantity
- Executed Price
- Total Amount
- Date

---

# ⭐ Watchlist

Users can

- Add Stocks
- Remove Stocks
- Track Favourite Companies

---

# 🔒 Authentication

- JWT Authentication
- Protected Routes
- Admin Authorization
- Password Hashing (bcrypt)

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- React Hook Form
- ApexCharts
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Morgan
- Axios

---

## APIs

### Finnhub API

Used for

- Live Stock Prices
- Market Quotes

---

# 📁 Project Structure

```
SB-Stocks
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── seed
│   ├── utils
│   ├── package.json
│   └── index.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/saiteja-vinnakota/Stock-Trading-App.git

cd SB-Stocks
```

---

## Server

```bash
cd server

npm install

npm run dev
```

---

## Client

```bash
cd client

npm install

npm run dev
```

---

# 🌱 Seed Demo Data

Populate the database with demo users, stocks, portfolios, orders, transactions and watchlists.

```bash
npm run seed
```

---

# Environment Variables

Create a `.env` inside the **server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

FINNHUB_API_KEY=YOUR_FINNHUB_API_KEY
```

---

# Database

## Development

- MongoDB Compass (Local)

## Demo / Production

- MongoDB Atlas

---

# Demo Accounts

## Admin

```
Email:
admin@sbstocks.com

Password:
Password@123
```

---

## Users

```
saiteja@gmail.com
Password@123

priya@gmail.com
Password@123

rohan@gmail.com
Password@123
```

---

# REST API

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/users/profile
```

---

## Stocks

```
GET /api/stocks

GET /api/stocks/search

GET /api/stocks/details/:id

GET /api/stocks/history/:symbol
```

---

## Orders

```
POST /api/orders/buy

POST /api/orders/sell

GET /api/orders
```

---

## Portfolio

```
GET /api/portfolio

GET /api/portfolio/:id
```

---

## Transactions

```
GET /api/transactions
```

---

## Watchlist

```
GET /api/watchlist

POST /api/watchlist

DELETE /api/watchlist/:id
```

---

## Admin

```
GET /api/admin/dashboard

GET /api/admin/users

GET /api/admin/orders

GET /api/admin/transactions

GET /api/admin/stocks

POST /api/admin/stocks

PUT /api/admin/stocks/:id

DELETE /api/admin/stocks/:id
```
----

# Future Improvements

- Real-Time WebSocket Updates
- AI Stock Recommendations
- Stock News
- Portfolio Analytics
- Dividend Tracking
- Multiple Stock Exchanges
- Dark Mode
- Mobile App
- Email Notifications

---

# Learning Outcomes

This project helped in understanding

- MERN Stack Development
- REST API Design
- JWT Authentication
- MongoDB Relationships
- Express Middleware
- React Hooks
- CRUD Operations
- Portfolio Calculations
- Stock Trading Workflow
- Responsive UI Design
- Admin Dashboard Development

---

# License

This project is developed for educational purposes.