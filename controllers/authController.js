const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Validate Environment Variables
if (!process.env.JWT_SECRET) {
    console.error("❌ Missing JWT_SECRET environment variable.");
    process.exit(1);
}

// ✅ Signup
exports.signup = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ success: false, message: "❌ All fields are required!" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "❌ Email already registered!" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ userName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ success: true, message: "✅ User registered successfully!" });
    } catch (error) {
        console.error("🔥 Signup Error:", error);
        res.status(500).json({ success: false, message: "Signup failed. Try again later." });
    }
};

// ✅ Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "❌ Email and password are required!" });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "❌ Invalid email or password!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "❌ Invalid email or password!" });
        }

        // Generate JWT Token (Now valid for 7 days)
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // ✅ Store token in an HTTP-only secure cookie
        res.cookie("authToken", token, {
            httpOnly: true, // Prevents client-side access (better security)
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ success: true, message: "✅ Login successful!", token });
    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ success: false, message: "Login failed. Try again later." });
    }
};

// ✅ Logout (Clears the cookie)
exports.logout = (req, res) => {
    res.clearCookie("authToken");
    res.json({ success: true, message: "✅ Successfully logged out!" });
};
