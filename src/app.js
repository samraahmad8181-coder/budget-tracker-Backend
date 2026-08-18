const express = require('express')
const app = express()
const multer = require('multer')
const cookieParser = require("cookie-parser");
const cors = require("cors");

const upload = multer({ storage: multer.memoryStorage() })
//Middlewares
app.use(express.json())
app.use(
    cors({
        origin: "https://budget-tracker-frontend-woad.vercel.app",
        credentials: true,
    })
);
const expenseRoutes = require('./routes/expense.route')
const authRoutes = require('./routes/auth.route')
const tripRoutes = require("./routes/trips.route");
const approvalRoutes = require("./routes/approval.route");
const dashboardRoutes = require("./routes/dashboard.route");

app.use(cookieParser());
app.use('/api/expenses', expenseRoutes)
app.use('/api/auth', authRoutes)
app.use("/api/trips", tripRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;
