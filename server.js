require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const redis = require("./config/redis");

const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded bodies
app.use(helmet());  // Security headers
app.use(morgan("dev"));  // Logs requests

// ✅ CORS Configuration (Supports Multiple Origins)
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:3000"];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`❌ CORS Blocked: ${origin} not allowed`);
                callback(new Error("CORS not allowed for this origin"));
            }
        },
        credentials: true,
    })
);

// ✅ Debugging Middleware (Logs incoming requests)
app.use((req, res, next) => {
    console.log(`📥 ${req.method} Request to ${req.url}`);
    if (req.method === "POST" || req.method === "PUT") {
        console.log("📩 Request Body:", req.body);
    }
    next();
});

// ✅ Root Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "🚀 Welcome to FoodieLoverz API!" });
});

// ✅ Authentication Routes
app.use("/api/auth", authRoutes);

// ✅ Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ success: false, message: "❌ Route Not Found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);

// ✅ Redis Reconnection Handling
redis.on("end", () => {
    console.warn("⚠️ Redis Client Disconnected. Attempting to Reconnect...");
    setTimeout(() => redis.connect(), 3000);
});

// ✅ Graceful Shutdown (Handles Crashes)
const shutdown = (signal) => {
    console.log(`🛑 Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
        console.log("🛑 Server shutdown complete.");
        process.exit(0);
    });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (err) => {
    console.error("💥 Unhandled Promise Rejection:", err);
    shutdown("Unhandled Rejection");
});
