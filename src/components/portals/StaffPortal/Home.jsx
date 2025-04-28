import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function StaffHome() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [staffName, setStaffName] = useState("");  // To store the staff's name

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/api/staff/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                // Store the entire staff object in localStorage
                localStorage.setItem("staff", JSON.stringify(data.staff));  // Store name, email, and department
                navigate("/staff/dashboard");
            } else {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };
    
    const handleBack = () => {
        navigate("/"); // Redirect to landing page
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-100 to-emerald-300 relative overflow-hidden">
            <ul className="shapes">
                {Array.from({ length: 15 }).map((_, i) => (
                    <li key={i}></li>
                ))}
            </ul>

            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:cursor-pointer group"
            >
                <span className="text-white text-2xl font-normal group-hover:rotate-360 transition-all duration-1000 ease-in-out group-hover:font-bold">
                    &larr;
                </span>
            </button>

            {/* Heading */}
            <h1 className="text-emerald-600 text-4xl md:text-5xl font-bold mb-8 z-10 animate-bounce">
                Welcome to the Staff Portal
            </h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-8 rounded-lg shadow-2xl max-w-md w-full z-10 animate-float"
            >
                <h2 className="text-2xl font-bold text-emerald-600 mb-4 text-center">Staff Login</h2>
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
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all duration-300 ease-in-out transform hover:scale-105 active:from-emerald-700 active:to-emerald-900 hover:cursor-pointer block mx-auto"
                >
                    Login
                </button>
            </form>

            {/* Custom Toast */}
            {showToast && (
                <div className="fixed top-8 right-8 bg-white shadow-xl rounded-lg px-6 py-4 flex items-center gap-4 animate-slide-in">
                    <span className="text-red-500 text-2xl">⚠️</span>
                    <div>
                        <p className="text-gray-800 font-semibold">Login Failed</p>
                        <p className="text-sm text-gray-500">Invalid credentials, try again!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StaffHome;
