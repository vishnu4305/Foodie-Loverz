import { useState } from "react";
import { createPortal } from "react-dom";
import closeBtn from "/images/closeBtn.jpg";
import signupCss from "./Signup.module.css";

const Signup = ({ setAuth }) => {
    const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handles input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validates email format
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Handles form submission
    const handleSignup = async () => {
        setError("");
        const { userName, email, password } = formData;

        // Basic Validation
        if (!userName.trim() || !email.trim() || !password.trim()) {
            setError("⚠️ Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            setError("⚠️ Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("⚠️ Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                userName: userName.trim(),
                email: email.trim(),
                password: password.trim(),
            };

            console.log("📤 Sending Signup Data:", JSON.stringify(payload, null, 2));

            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("📥 Server Response:", JSON.stringify(result, null, 2));

            if (response.ok) {
                alert("✅ Signup successful! Please log in.");
                setAuth({ closed: false, login: true, signup: false });
            } else {
                setError(result.message || "❌ Signup failed. Try again.");
            }
        } catch (error) {
            setError("❌ Network error. Please try again later.");
            console.error("🔥 Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span className={signupCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="Close" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    <input
                        className={signupCss.inpBox}
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={formData.userName}
                        onChange={handleChange}
                        autoComplete="userName"
                    />
                    <input
                        className={signupCss.inpBox}
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                    <input
                        className={signupCss.inpBox}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    {error && <div className={signupCss.errorMsg}>{error}</div>}
                    <button className={signupCss.btn} onClick={handleSignup} disabled={loading}>
                        {loading ? "Signing Up..." : "Create Account"}
                    </button>
                </div>
                <hr className={signupCss.break} />
                <div className={signupCss.newToZomato}>
                    Already have an account?{" "}
                    <span className={signupCss.createAcc} onClick={() => setAuth({ closed: false, login: true, signup: false })}>
                        Log in
                    </span>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Signup;
