import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loginUser } from "../store/authSlice";
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

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const { user, isLoading, error } = useAppSelector(state => state.auth);

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

        dispatch(loginUser({ email, password }));
    };

    // 🔥 redirect after login success
    useEffect(() => {
        if (user) {
            nav("/");
        }
    }, [user, nav]);

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
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "100px",
                            margin: "0 auto 16px",
                            display: "block"
                        }}
                    />

                    <Typography sx={{variant:"h5" ,textAlign:"center", mb:2}}>
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
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />

                        <Button type="submit" fullWidth disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>

                        {error && (
                            <Typography color="error" sx={{textAlign:"center" ,fontSize:"14"}} >
                                {error}
                            </Typography>
                        )}

                        <Typography sx={{textAlign:"center" ,fontSize:"14"}} >
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