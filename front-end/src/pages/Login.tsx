import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../utils/isEmail";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isEmail(email)) {
            alert("Email is invalid");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            alert("Login error: " + data);
            return;
        }

        nav("/");
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    padding: "40px",
                    borderRadius: "16px",
                    background: "rgba(135, 7, 7, 0.12)",
                    backdropFilter: "blur(12px)",
                }}>
                <h1>LOGIN</h1>
                <form style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "40px",
                    width: "320px",
                    borderRadius: "16px",
                    background: "white",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                }} onSubmit={handleLogin}>
                    <input style={{
                        padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #bcd2ff",
                            fontSize: "14px",
                            background: "#e8f0ff"
                    }}
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input style={{
                        padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #bcd2ff",
                            fontSize: "14px",
                            background: "#e8f0ff"
                    }}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                    <p style={{
                        textAlign: "center",
                        fontSize: "14px",
                        marginTop: "8px"
                    }}>
                        Don't have an account?{" "}
                        {/* <Link
                            to="/register"
                            style={{
                                color: "#2f6fed",
                                textDecoration: "none",
                                fontWeight: "bold"
                            }}
                        > */}
                            Register here
                        {/* </Link> */}
                    </p>
                </form>
                </div>
            </div>

        </div>
    );
};

export default Login;