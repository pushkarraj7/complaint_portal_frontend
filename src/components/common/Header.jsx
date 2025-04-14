import { useState } from "react";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-500">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <a href="#home" className="flex items-center space-x-2">
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                        ComplaintPortal
                    </div>
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8 text-lg">
                    <a href="#features" className="relative group">
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Features</span>
                        <span className="block h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                    <a href="#testimonials" className="relative group">
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Testimonials</span>
                        <span className="block h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                    <a href="#contact" className="relative group">
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">Contact</span>
                        <span className="block h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </a>
                </nav>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative w-8 h-8 focus:outline-none transition-all duration-300 ease-in-out"
                    >
                        <div
                            className={`w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? "rotate-45 absolute top-1/2 left-1/2 translate-x-1/2" : "translate-y-2"}`}
                        ></div>
                        <div
                            className={`w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                        ></div>
                        <div
                            className={`w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? "-rotate-45 absolute top-1/2 left-1/2 translate-x-1/2" : "-translate-y-2"}`}
                        ></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white shadow-md py-4 transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <nav className="flex flex-col items-center space-y-4 text-lg">
                    <a
                        href="#features"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#testimonials"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Testimonials
                    </a>
                    <a
                        href="#contact"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
