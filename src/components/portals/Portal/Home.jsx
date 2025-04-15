import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BasicHome() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const sendOtp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        const staticOtp = "123456";
        localStorage.setItem("otp", staticOtp);
        setIsOtpSent(true);
        setErrorMessage("");
    };

    const verifyOtp = () => {
        const storedOtp = localStorage.getItem("otp");
        if (otp === storedOtp) {
            navigate('/portal-dashboard', { state: { email } });
        } else {
            setErrorMessage("Invalid OTP, please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-center px-4 relative">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 bg-white border border-gray-200 rounded-full w-14 h-14 flex items-center justify-center shadow-md hover:shadow-xl hover:bg-gray-100 transition-all duration-300 ease-in-out hover:cursor-pointer group"
            >
                <span className="text-gray-700 text-2xl font-normal group-hover:font-bold transition-all duration-300 ease-in-out">
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

                {errorMessage && (
                    <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
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
