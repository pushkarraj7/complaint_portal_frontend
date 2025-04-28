import { useState } from "react";
import './Header.css';


function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white/70 shadow-md backdrop-blur-md z-50 transition-all duration-500">
            <div className="flex justify-between items-center px-6 sm:px-8 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <a href="#home" className="flex items-center space-x-2">
                    <div className="text-3xl font-extrabold wave-animation">
                        {Array.from("ComplaintPortal").map((letter, index) => (
                            <span
                                key={index}
                                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </a>

                <nav className="hidden md:flex space-x-8 text-lg items-center">
                    {[
                        { href: "#features", label: "Features" },
                        { href: "#testimonials", label: "Testimonials" },
                        { href: "#contact", label: "Contact" },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="relative group overflow-hidden"
                        >
                            <span className="inline-block transition-all duration-300 ease-in-out text-gray-700 group-hover:text-indigo-600 group-hover:drop-shadow-lg group-hover:animate-bounceToUnderline">
                                {item.label}
                            </span>
                            <span className="block h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></span>
                        </a>
                    ))}

                    {/* GitHub Logo after Contact */}
                    <a
                        href="https://github.com/pushkarraj7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 transition-colors transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="transition-transform duration-300"
                        >
                            <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.302 3.438 
9.8 8.205 11.387 0.6 0.113 0.82-0.258 
0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 
0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.089-0.745 
0.084-0.729 0.084-0.729 1.205 0.084 1.84 
1.236 1.84 1.236 1.07 1.834 2.809 1.304 
3.495 0.997 0.108-0.776 0.418-1.305 0.76-1.605-2.665-0.3-5.467-1.332-5.467-5.931 
0-1.31 0.469-2.381 1.235-3.221-0.135-0.303-0.54-1.523 0.105-3.176 
0 0 1.005-0.322 3.3 1.23 0.96-0.267 
1.98-0.399 3-0.405 1.02 0.006 2.04 0.138 
3 0.405 2.28-1.552 3.285-1.23 
3.285-1.23 0.645 1.653 0.24 2.873 0.12 
3.176 0.765 0.84 1.23 1.911 
1.23 3.221 0 4.609-2.805 5.625-5.475 
5.921 0.435 0.372 0.81 1.102 0.81 
2.222 0 1.606-0.015 2.896-0.015 
3.286 0 0.315 0.21 0.694 0.825 
0.576 4.765-1.587 8.2-6.085 
8.2-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </nav>

                {/* Hamburger Menu Button */}
                <div className="flex items-center space-x-4 md:hidden">
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
                className={`md:hidden bg-white shadow-md py-4 transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="flex flex-col items-center space-y-4 text-lg">
                    <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">
                        Features
                    </a>
                    <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">
                        Testimonials
                    </a>
                    <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
                        Contact
                    </a>
                    {/* GitHub Logo after Contact in Mobile too */}
                    <a
                        href="https://github.com/pushkarraj7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 transition-colors transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="transition-transform duration-300"
                        >
                            <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.302 3.438 
9.8 8.205 11.387 0.6 0.113 0.82-0.258 
0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 
0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.089-0.745 
0.084-0.729 0.084-0.729 1.205 0.084 1.84 
1.236 1.84 1.236 1.07 1.834 2.809 1.304 
3.495 0.997 0.108-0.776 0.418-1.305 0.76-1.605-2.665-0.3-5.467-1.332-5.467-5.931 
0-1.31 0.469-2.381 1.235-3.221-0.135-0.303-0.54-1.523 0.105-3.176 
0 0 1.005-0.322 3.3 1.23 0.96-0.267 
1.98-0.399 3-0.405 1.02 0.006 2.04 0.138 
3 0.405 2.28-1.552 3.285-1.23 
3.285-1.23 0.645 1.653 0.24 2.873 0.12 
3.176 0.765 0.84 1.23 1.911 
1.23 3.221 0 4.609-2.805 5.625-5.475 
5.921 0.435 0.372 0.81 1.102 0.81 
2.222 0 1.606-0.015 2.896-0.015 
3.286 0 0.315 0.21 0.694 0.825 
0.576 4.765-1.587 8.2-6.085 
8.2-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
