import { Link } from "react-router-dom";
import Header from "../common/Header";
import workImage from '../../assets/work.gif';
import phoneImage from '../../assets/phone.gif';
import emailImage from '../../assets/message.gif';
import rocketImage from '../../assets/rocket.gif';
import targetImage from '../../assets/target.gif';
import userImage from '../../assets/user.gif';


function LandingPage() {
    return (
        <div>
            <Header />
            <div className="mx-auto">
                {/* Hero Section */}
                <section id="home" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-center px-4 relative">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 mb-4 animate-pulse">
                        Simplify Your Complaint Process
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Fast, Transparent & Reliable Complaint Handling with real-time updates and smooth processes.
                    </p>
                    <div className="flex space-x-6 justify-center">
                        <Link
                            to="/portal"
                            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90 hover:from-indigo-600 hover:to-indigo-800 hover:font-bold"
                        >
                            Complain Portal
                        </Link>
                        <Link
                            to="/admin"
                            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90 hover:from-rose-600 hover:to-rose-800 hover:font-bold"
                        >
                            Admin Portal
                        </Link>
                        <Link
                            to="/staff"
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90 hover:from-emerald-600 hover:to-emerald-800 hover:font-bold"
                        >
                            Staff Portal
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-12">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8">
                        <div className="p-6 bg-white rounded-2xl shadow-xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-4 border-indigo-500">
                            <div className="mb-4 flex justify-center">
                                <img src={rocketImage} alt="Fast Demo" className="w-16 h-16" />
                            </div>
                            <h3 className="font-bold text-2xl mb-2">Fast Response</h3>
                            <p className="text-gray-600">Complaints are resolved swiftly and transparently by our expert team.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-4 border-purple-500">
                            <div className="mb-4 flex justify-center">
                                <img src={userImage} alt="User Demo" className="w-16 h-16" />
                            </div>
                            <h3 className="font-bold text-2xl mb-2">User Friendly</h3>
                            <p className="text-gray-600">Smooth, intuitive design for effortless complaint submissions and follow-ups.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-4 border-emerald-500">
                            <div className="mb-4 flex justify-center">
                                <img src={targetImage} alt="Target Demo" className="w-16 h-16" />
                            </div>
                            <h3 className="font-bold text-2xl mb-2">Track Status</h3>
                            <p className="text-gray-600">Real-time complaint tracking to keep you updated on every step.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-12">
                        What Our Users Say
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10 px-8">
                        <div className="p-6 bg-white rounded-2xl shadow-xl w-80 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <p className="italic text-gray-700">"Very easy to submit a complaint and get a response!"</p>
                            <h4 className="mt-4 font-semibold text-indigo-600">- Priya S.</h4>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-xl w-80 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <p className="italic text-gray-700">"The staff portal helped resolve my issue in no time!"</p>
                            <h4 className="mt-4 font-semibold text-indigo-600">- Rajesh K.</h4>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-xl w-80 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <p className="italic text-gray-700">"Love the clear status tracking feature!"</p>
                            <h4 className="mt-4 font-semibold text-indigo-600">- Simran P.</h4>
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer id="contact" className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-6 px-4">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        <h3 className="text-2xl font-bold mb-4 md:mb-0">Complaint Portal</h3>
                        {/* <div className="flex space-x-6 text-2xl">
                            <a href="https://github.com/pushkarraj7" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition duration-300">
                                <img src={workImage} alt="Work Demo" className="w-8 h-8 rounded-full" />
                            </a>                            
                            <a href="tel:+919142758769" className="hover:text-yellow-300 transition duration-300">
                                <img src={phoneImage} alt="Phone" className="w-8 h-8 rounded-full" />
                            </a>
                            <a href="mailto:iampushkarraj7@gmail.com" className="hover:text-yellow-300 transition duration-300">
                                <img src={emailImage} alt="Email" className="w-8 h-8 rounded-full" />
                            </a>
                        </div> */}
                        <div className="flex space-x-6 text-2xl">
                            <a href="https://github.com/pushkarraj7" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition duration-300">💼</a>
                            <a href="tel:+919142758769" className="hover:text-yellow-300 transition duration-300">📞</a>
                            <a href="mailto:iampushkarraj7@gmail.com" className="hover:text-yellow-300 transition duration-300">✉️</a>
                        </div>


                    </div>
                    <p className="mt-4 text-center text-sm text-gray-200">© 2025 Complaint Portal. All Rights Reserved.</p>
                </footer>

            </div>
        </div>
    );
}

export default LandingPage;
