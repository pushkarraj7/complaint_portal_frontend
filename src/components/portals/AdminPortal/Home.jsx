import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "123") {
            navigate("/admin/dashboard");
        } else {
            alert("Invalid credentials!");
        }
    };

    const handleBack = () => {
        navigate("/"); // This redirects to the landing page, assuming it's at "/"
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-100 to-rose-300 relative overflow-hidden">
            <ul className="bubbles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <li key={i}></li>
                ))}
            </ul>
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 text-rose-600 bg-white rounded-full w-14 h-14 shadow-lg hover:bg-gray-200 focus:outline-none transition-all duration-300 ease-in-out hover:cursor-pointer"
            >
                <span className="text-2xl font-normal group-hover:font-bold transition-all duration-300 ease-in-out">
                    &larr;
                </span>
            </button>
            <h1 className="text-rose-600 text-4xl md:text-5xl font-bold mb-8 z-10 animate-bounce">
                Welcome to the Admin Portal
            </h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-8 rounded-lg shadow-2xl max-w-md w-full z-10"
            >
                <h2 className="text-2xl font-bold text-rose-600 mb-4 text-center">Admin Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-lg hover:from-rose-600 hover:to-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all duration-300 ease-in-out transform hover:scale-105 active:from-rose-700 active:to-rose-900 hover:cursor-pointer block mx-auto"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Home;
