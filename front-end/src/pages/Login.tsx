
    import { useState } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import { isEmail } from "../utils/isEmail";
    import logo from "../images/lokanata_logo.jpeg";

    import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography
    } from "@mui/material";

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

        try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert("Login error: " + (data.message || "Unknown error"));
            return;
        }

        nav("/");
        } catch {
        alert("Server error");
        }
    };

    return (
        <Box
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default"
        }}
        >
        <Card sx={{ width: 360, p: 2 }}>
            <CardContent>
                <img src={logo} alt="Logo" style={{ width: "100px", margin: "0 auto 16px", display: "block" }} />
            <Typography variant="h5" textAlign="center" mb={2}>
                LOGIN
            </Typography>

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                />

                <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                />

                <Button type="submit" fullWidth>
                Login
                </Button>

                <Typography textAlign="center" fontSize={14}>
                Don't have an account?{" "}
                <Link
                    to="/register"
                    style={{
                    color: "#C17F4A",
                    textDecoration: "none",
                    fontWeight: "bold"
                    }}
                >
                    Register here
                </Link>
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </Box>
    );
    };

    export default Login;