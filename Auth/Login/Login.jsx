import { useState } from "react";
import { createPortal } from "react-dom";
import closeBtn from "/images/closeBtn.jpg";
import loginCss from "./Login.module.css";

const Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("⚠️ Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                alert("✅ Login successful!");
                setLoggedIn(true);
                setAuth({ closed: true, login: false, signup: false });
            } else {
                setError(result.message || "❌ Invalid credentials.");
            }
        } catch (error) {
            setError("❌ Network error. Please try again.");
            console.error("Login Error:", error);
        }
        setLoading(false);
    };

    return createPortal(
        <div className={loginCss.outerDiv}>
            <div className={loginCss.modal}>
                <div className={loginCss.header}>
                    <span className={loginCss.ttl}>Login</span>
                    <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={loginCss.closeBtnImg} src={closeBtn} alt="Close" />
                    </span>
                </div>
                <div className={loginCss.lgBox}>
                    <input
                        className={loginCss.inpBox}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={loginCss.inpBox}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className={loginCss.errorMsg}>{error}</div>}
                    <button className={loginCss.btn} onClick={handleLogin} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                <hr className={loginCss.break} />
                <div className={loginCss.newToZomato}>
                    New to FoodieLoverz?{" "}
                    <span className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>
                        Create Account
                    </span>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Login;
