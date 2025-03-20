const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional, for future password-based login
    isVerified: { type: Boolean, default: false }, // For OTP verification
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
