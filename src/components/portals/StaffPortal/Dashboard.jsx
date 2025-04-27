import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [staffName] = useState("John");
    const [activeTab, setActiveTab] = useState("Assigned Issues");

    const [issues, setIssues] = useState([
        {
            id: 1744743291483,
            name: "Pushkar Raj",
            phone: "9142758769",
            email: "rajpushkar556@gmail.com",
            department: "Technical",
            issueType: "Technical",
            description: "issue with technical items",
            submittedOn: "4/16/2025, 12:24:51 AM",
            status: "In Progress",
            assignedTo: "John"
        },
        {
            id: 2,
            name: "Alice",
            phone: "9876543210",
            email: "alice@example.com",
            department: "Billing",
            issueType: "Billing",
            description: "Payment failure",
            submittedOn: "4/16/2025, 11:45:00 AM",
            status: "Pending",
            assignedTo: "Jane"
        },
        {
            id: 3,
            name: "Bob",
            phone: "1234567890",
            email: "bob@example.com",
            department: "Sales",
            issueType: "Sales",
            description: "Invoice discrepancy",
            submittedOn: "4/16/2025, 10:30:00 AM",
            status: "Completed",
            assignedTo: "Sarah"
        }
    ]);

    const handleStatusUpdate = (id, newStatus) => {
        setIssues(prev =>
            prev.map(issue =>
                issue.id === id ? { ...issue, status: newStatus } : issue
            )
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/staff');
    };

    const assignedTasks = issues.filter(issue => issue.assignedTo === staffName);
    const inProgressTasks = assignedTasks.filter(issue => issue.status === "In Progress");
    const completedTasks = assignedTasks.filter(issue => issue.status === "Completed");

    return (
        <div className="flex min-h-screen bg-emerald-100 relative">
            {/* Sidebar */}
            <aside className="w-64 bg-emerald-700 text-white p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8">Staff Panel</h2>
                <button
                    className={`text-left p-2 rounded-lg ${activeTab === "Assigned Issues" ? "bg-white text-emerald-700" : "hover:bg-emerald-600"} cursor-pointer`}
                    onClick={() => setActiveTab("Assigned Issues")}
                >
                    Assigned Issues
                </button>
                <button
                    className={`text-left p-2 rounded-lg ${activeTab === "In Progress" ? "bg-white text-emerald-700" : "hover:bg-emerald-600"} cursor-pointer`}
                    onClick={() => setActiveTab("In Progress")}
                >
                    In Progress
                </button>
                <button
                    className={`text-left p-2 rounded-lg ${activeTab === "Completed Issues" ? "bg-white text-emerald-700" : "hover:bg-emerald-600"} cursor-pointer`}
                    onClick={() => setActiveTab("Completed Issues")}
                >
                    Completed Issues
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Logout Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:scale-105 hover:bg-emerald-700 transition-all cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Section */}
                <section className="bg-white p-6 rounded-2xl shadow mb-8">
                    <h3 className="text-xl font-semibold mb-2">Welcome, {staffName}</h3>
                    <p>Email: john.doe@example.com</p>
                    <p>Role: Support Staff</p>
                </section>

                {/* Tab Content */}
                <section>
                    {activeTab === "Assigned Issues" && (
                        <>
                            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Your Assigned Issues</h2>
                            {assignedTasks.length === 0 ? (
                                <p className="text-gray-800">No tasks assigned yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {assignedTasks.map(issue => (
                                        <div key={issue.id} className="bg-white p-4 rounded-lg shadow text-gray-800 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-xl">{issue.name}</h3>
                                                <p><strong>Phone:</strong> {issue.phone}</p>
                                                <p><strong>Email:</strong> {issue.email}</p>
                                                <p><strong>Department:</strong> {issue.department}</p>
                                                <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                <p><strong>Description:</strong> {issue.description}</p>
                                                <p><strong>Submitted On:</strong> {issue.submittedOn}</p>
                                                <p><strong>Status:</strong> {issue.status}</p>
                                            </div>
                                            <select
                                                className="p-2 border rounded-lg"
                                                value={issue.status}
                                                onChange={(e) => handleStatusUpdate(issue.id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "In Progress" && (
                        <>
                            <h2 className="text-2xl font-bold text-emerald-700 mb-4">In Progress Issues</h2>
                            {inProgressTasks.length === 0 ? (
                                <p className="text-gray-800">No in-progress tasks.</p>
                            ) : (
                                <div className="space-y-4">
                                    {inProgressTasks.map(issue => (
                                        <div key={issue.id} className="bg-white p-4 rounded-lg shadow text-gray-800">
                                            <h3 className="font-bold text-xl">{issue.name}</h3>
                                            <p><strong>Phone:</strong> {issue.phone}</p>
                                            <p><strong>Email:</strong> {issue.email}</p>
                                            <p><strong>Department:</strong> {issue.department}</p>
                                            <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                            <p><strong>Description:</strong> {issue.description}</p>
                                            <p><strong>Submitted On:</strong> {issue.submittedOn}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "Completed Issues" && (
                        <>
                            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Completed Issues</h2>
                            {completedTasks.length === 0 ? (
                                <p className="text-gray-800">No completed tasks.</p>
                            ) : (
                                <div className="space-y-4">
                                    {completedTasks.map(issue => (
                                        <div key={issue.id} className="bg-white p-4 rounded-lg shadow text-gray-800">
                                            <h3 className="font-bold text-xl">{issue.name}</h3>
                                            <p><strong>Phone:</strong> {issue.phone}</p>
                                            <p><strong>Email:</strong> {issue.email}</p>
                                            <p><strong>Department:</strong> {issue.department}</p>
                                            <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                            <p><strong>Description:</strong> {issue.description}</p>
                                            <p><strong>Submitted On:</strong> {issue.submittedOn}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default StaffDashboard;
