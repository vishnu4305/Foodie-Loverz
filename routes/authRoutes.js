const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();
router.post("/signup", async (req, res) => {
    console.log("📥 Received Signup Request Body:", req.body); // Log request body

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.error("⚠️ Missing Fields!", req.body);
        return res.status(400).json({ success: false, message: "❌ All fields are required!" });
    }

    // Call the actual signup controller function
    try {
        await signup(req, res);
    } catch (error) {
        console.error("🔥 Signup Error:", error);
        res.status(500).json({ success: false, message: "❌ Internal Server Error" });
    }
});

router.post("/login", login);

module.exports = router;
