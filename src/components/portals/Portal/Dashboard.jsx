import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function BasicDashboard() {
    const [selected, setSelected] = useState("profile");
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            navigate("/portal", { replace: true });
        }
    }, [navigate]);

    const userEmail = localStorage.getItem("userEmail") || "Guest";

    const [profileData, setProfileData] = useState({
        name: "",
        phone: "",
        department: "",
    });

    const [issues, setIssues] = useState(() => {
        const savedIssues = localStorage.getItem("issues") || "[]";
        return JSON.parse(savedIssues);
    });

    const [filter, setFilter] = useState("in progress");

    useEffect(() => {
        const savedData = localStorage.getItem("user");
        if (savedData) {
            setProfileData(JSON.parse(savedData));
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("issues");
        localStorage.removeItem("userEmail");
    
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('kc-')) {
                localStorage.removeItem(key);
            }
        });
    
        toast.success("Logout successful!"); // ✅ react-hot-toast
        navigate("/portal", { replace: true });
    };
    
    const handleIssueSubmit = async (e) => {
        e.preventDefault();
    
        const issueData = {
            name: profileData.name,
            phone: profileData.phone,
            department: profileData.department,
            issueType: e.target.issueType.value,
            description: e.target.description.value,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(issueData),
            });
    
            if (response.ok) {
                toast.success('Issue submitted successfully!'); // ✅ success toast
                e.target.reset(); // Reset form after submission
                fetchIssues(); // 🔥 Fetch updated issues after submit
            } else {
                toast.error('Failed to submit issue.'); // ✅ error toast
            }
        } catch (error) {
            console.error('Error submitting issue:', error);
            toast.error('Server error!'); // ✅ error toast
        }
    };
    
    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/issues');
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    const filteredIssues = issues.filter((issue) => {
        if (filter === "all") return true;
        return (issue.status || "").toLowerCase() === filter.toLowerCase();
    });

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-blue-700">User Panel</h2>
                <nav className="flex flex-col space-y-4">
                    <button
                        onClick={() => setSelected("create")}
                        className={`px-4 py-2 rounded-lg hover:cursor-pointer text-left ${selected === "create"
                            ? "bg-indigo-500 text-white"
                            : "hover:bg-indigo-100"
                            }`}
                    >
                        Create Issue/Complaint
                    </button>
                    <button
                        onClick={() => setSelected("generated")}
                        className={`px-4 py-2 rounded-lg hover:cursor-pointer text-left ${selected === "generated"
                            ? "bg-indigo-500 text-white"
                            : "hover:bg-indigo-100"
                            }`}
                    >
                        Generated Issues
                    </button>
                    <button
                        onClick={() => setSelected("profile")}
                        className={`px-4 py-2 rounded-lg hover:cursor-pointer text-left ${selected === "profile"
                            ? "bg-indigo-500 text-white"
                            : "hover:bg-indigo-100"
                            }`}
                    >
                        Profile
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 relative">
                <div className="absolute top-4 right-8 flex items-center space-x-4">
                    {/* Show user email */}
                    <span className="text-gray-700 font-semibold">{userEmail}</span>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-rose-600 hover:via-pink-600 hover:to-red-600 hover:cursor-pointer hover:font-bold"
                    >
                        Logout
                    </button>
                </div>

                {selected === "create" && (
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Create Issue</h2>
                        <form onSubmit={handleIssueSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={profileData.name}
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={profileData.phone}
                                readOnly
                            />
                            <select
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={profileData.department}
                                disabled
                            >
                                <option value="">Select Department</option>
                                <option value="Technical">Technical</option>
                                <option value="Billing">Billing</option>
                                <option value="General">General</option>
                            </select>
                            <select
                                name="issueType"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                <option>Select Issue Type</option>
                                <option>Technical</option>
                                <option>Billing</option>
                                <option>General</option>
                            </select>
                            <textarea
                                name="description"
                                placeholder="Describe your issue..."
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                rows="4"
                            ></textarea>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:cursor-pointer hover:font-bold"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {selected === "generated" && (
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Generated Issues</h2>

                        {/* Filter Buttons */}
                        <div className="mb-4 space-x-4">
                            <button
                                onClick={() => setFilter("all")}
                                className={`p-3 border rounded-lg ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"} cursor-pointer`}
                            >
                                All Issues
                            </button>
                            <button
                                onClick={() => setFilter("pending")}
                                className={`p-3 border rounded-lg ${filter === "pending" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"} cursor-pointer`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter("in progress")}
                                className={`p-3 border rounded-lg ${filter === "in progress" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"} cursor-pointer`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setFilter("completed")}
                                className={`p-3 border rounded-lg ${filter === "completed" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"} cursor-pointer`}
                            >
                                Completed
                            </button>
                        </div>

                        {filteredIssues.length === 0 ? (
                            <p className="text-gray-600">No issues found under this filter.</p>
                        ) : (
                            <ul className="space-y-4">
                                {filteredIssues.map((issue) => (
                                    <li key={issue.id} className="p-4 border rounded-lg shadow bg-white">
                                        <p><strong>Issue Number:</strong> {issue.id}</p>
                                        <p><strong>Name:</strong> {issue.name}</p>
                                        <p><strong>Phone:</strong> {issue.phone}</p>
                                        <p><strong>Department:</strong> {issue.department}</p>
                                        <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                        <p><strong>Description:</strong> {issue.description}</p>
                                        <p><strong>Submitted On:</strong> {issue.submittedOn}</p>
                                        <p><strong>Status:</strong> {issue.status}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {selected === "profile" && (
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-600 mb-6">User Profile</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const name = e.target.name.value.trim();
                                const phone = e.target.phone.value.trim();
                                const department = e.target.department.value.trim();

                                const newErrors = {};
                                if (!name) newErrors.name = true;
                                if (!phone) newErrors.phone = true;
                                if (!department) newErrors.department = true;

                                if (Object.keys(newErrors).length > 0) {
                                    setErrors(newErrors);
                                    toast.error("Please fill in all the fields!");
                                    return;
                                }

                                setErrors({});
                                const userData = { name, phone, department };
                                localStorage.setItem("user", JSON.stringify(userData));
                                setProfileData(userData);

                                setIsLoading(true);

                                setTimeout(() => {
                                    setIsLoading(false);
                                    toast.success("Profile saved successfully!");

                                    setTimeout(() => {
                                        setSelected("create");
                                    }, 2000); // short wait for a smooth feel
                                }, 500);
                            }}
                            className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                                defaultValue={profileData.name}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Your Phone Number"
                                className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
                                defaultValue={profileData.phone}
                            />
                            <select
                                name="department"
                                className={`w-full p-3 border rounded-lg ${errors.department ? 'border-red-500' : ''}`}
                                defaultValue={profileData.department}
                            >
                                <option value="">Select Department</option>
                                <option value="Technical">Technical</option>
                                <option value="Billing">Billing</option>
                                <option value="General">General</option>
                            </select>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:cursor-pointer hover:font-bold flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>

                        <Toaster position="top-center" />
                        
                    </div>
                )}
            </main>
        </div>
    );
}

export default BasicDashboard;
