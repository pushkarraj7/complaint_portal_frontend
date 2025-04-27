import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "123") {
            // Store login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');  // Store that the user is logged in
    
            // Redirect to the dashboard
            navigate("/admin/dashboard");
        } else {
            // Custom styled error toast on invalid credentials
            toast.error("Invalid credentials!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
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
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:cursor-pointer group"
            >
                <span className="text-white text-2xl font-normal group-hover:rotate-360 transition-all duration-1000 ease-in-out group-hover:font-bold">
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

            {/* Toast container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default Home;
