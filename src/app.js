const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const upload = multer({
    storage: multer.memoryStorage(),
});

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://budget-tracker-frontend-git-main-samraahmad8181-6269s-projects.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(cookieParser());

// ==========================================
// ROUTES
// ==========================================

const expenseRoutes = require("./routes/expense.route");
const authRoutes = require("./routes/auth.route");
const tripRoutes = require("./routes/trips.route");
const approvalRoutes = require("./routes/approval.route");
const dashboardRoutes = require("./routes/dashboard.route");

app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
