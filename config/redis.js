const Redis = require("ioredis");

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379, // Default Redis port
});

redis.on("connect", () => console.log("✅ Redis Connected Successfully!"));
redis.on("error", (err) => console.error("❌ Redis Connection Error:", err));

module.exports = redis;
