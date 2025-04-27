import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function BasicHome() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Send OTP function that calls the backend API
    const sendOtp = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        try {
            // Hit the API to send OTP to the provided email
            const response = await axios.post("http://localhost:5000/send-otp", { email });

            if (response.data.success) {
                // OTP sent successfully
                setIsOtpSent(true);
                setErrorMessage("");

                // Show a success toast message
                toast.success("Check your email for the OTP and verify it!");
            } else {
                // Handle API error (if OTP failed to send)
                setErrorMessage("Failed to send OTP. Please try again later.");
            }
        } catch (error) {
            // Handle any errors with the API call
            console.error(error);
            setErrorMessage("An error occurred while sending OTP. Please try again.");
        }
    };

    // Verify OTP function
    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });

            if (response.data.success) {
                // Save user email to localStorage
                localStorage.setItem("userEmail", email);

                // Redirect to dashboard
                navigate('/portal-dashboard', { state: { user: response.data.user } });
            } else {
                // Show a styled error message for incorrect OTP
                setErrorMessage(response.data.message); // Assuming the backend sends an appropriate message
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while verifying OTP. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-center px-4 relative">
            <button
                onClick={() => {
                    navigate('/'); // Directly redirect to / page
                    toast.info("Redirecting to the homepage.");
                }}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out group"
            >
                <span className="text-white text-xl font-bold transform group-hover:rotate-360 transition-all duration-1000 ease-in-out hover:cursor-pointer">
                    &larr;
                </span>
            </button>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 animate-pulse">
                Welcome to the Portal
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
                Please log in with your email to continue.
            </p>

            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col space-y-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="px-4 py-3 border-2 border-indigo-500 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                {isOtpSent && (
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="px-4 py-3 border-2 border-indigo-500 rounded-lg text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                )}

                {/* Styled error message for OTP verification */}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-500 text-sm font-medium px-4 py-3 rounded-lg mt-4">
                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="flex justify-center items-center space-x-4">
                    <div className="flex justify-center">
                        <button
                            onClick={sendOtp}
                            className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-indigo-600 hover:cursor-pointer"
                        >
                            Send OTP
                        </button>
                    </div>

                    {isOtpSent && (
                        <div className="flex justify-center">
                            <button
                                onClick={verifyOtp}
                                className="px-6 py-3 bg-rose-500 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-rose-600 hover:cursor-pointer"
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BasicHome;
