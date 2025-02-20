import "./Component.css";
import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                username,
                password,
            });

            if (response.data && response.data.jwt_token) {
                localStorage.setItem("token", response.data.jwt_token);
                navigate('/taskboard')
            } else {
                console.error("No JWT token in response");
                setErrorMessage("Login failed. Please try again.");
            }

        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Invalid credentials. Please try again.");
        }
    };



    return (
        <div>
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
