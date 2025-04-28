import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [staff, setStaff] = useState(JSON.parse(localStorage.getItem("staff"))); // Get staff data from localStorage
    const [activeTab, setActiveTab] = useState("Assigned Issues");
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/issues')
            .then(response => {
                // Log the fetched issues for debugging
                // console.log(response.data);

                // Filter issues based on assigned staff id
                const staffIssues = response.data.filter(issue => issue.assignedStaff === staff.id);

                // Log filtered issues for debugging
                // console.log(staffIssues);

                setIssues(staffIssues);
            })
            .catch(error => {
                console.error('Error fetching issues:', error);
            });
    }, [staff.id]);


    const handleStatusUpdate = (id, newStatus) => {
        setIssues(prev =>
            prev.map(issue =>
                issue._id === id ? { ...issue, status: newStatus } : issue
            )
        );
        // Optionally, update status in the backend
        axios.put(`http://localhost:5000/api/issues/${id}`, { status: newStatus })
            .catch(error => {
                console.error('Error updating issue status:', error);
            });
    };

    const handleLogout = () => {
        // Remove relevant localStorage data on logout
        localStorage.removeItem('staff');
        navigate('/staff');
    };

    // Filter issues based on their status and active tab
    const assignedTasks = issues.filter(issue => issue.assignedStaff === staff.id);
    const inProgressTasks = assignedTasks.filter(issue => issue.status === "In Progress");
    const completedTasks = assignedTasks.filter(issue => issue.status === "Completed");
    const pendingTasks = assignedTasks.filter(issue => issue.status === "Pending");

    // Determine which tasks to display based on the active tab
    let tasksToDisplay = [];
    if (activeTab === "Assigned Issues") {
        tasksToDisplay = assignedTasks;
    } else if (activeTab === "In Progress") {
        tasksToDisplay = inProgressTasks;
    } else if (activeTab === "Completed Issues") {
        tasksToDisplay = completedTasks;
    } else if (activeTab === "Pending") {
        tasksToDisplay = pendingTasks;
    }

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
                <button
                    className={`text-left p-2 rounded-lg ${activeTab === "Pending" ? "bg-white text-emerald-700" : "hover:bg-emerald-600"} cursor-pointer`}
                    onClick={() => setActiveTab("Pending")}
                >
                    Pending Issues
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
                    <h3 className="text-xl font-semibold mb-2">Welcome, {staff?.name}</h3>
                    <p>Email: {staff?.email}</p>
                    <p>Department: {staff?.department}</p>
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
                                    {assignedTasks
                                        .filter(issue => issue.assignedStaff === staff.id)
                                        .map(issue => (
                                            <div key={issue._id} className="bg-white p-4 rounded-lg shadow text-gray-800 flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-bold text-xl">{issue.name}</h3>
                                                    <p><strong>Phone:</strong> {issue.phone}</p>
                                                    <p><strong>Department:</strong> {issue.department}</p>
                                                    <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                    <p><strong>Description:</strong> {issue.description}</p>
                                                    <p><strong>Submitted On:</strong> {new Date(issue.submittedOn).toLocaleString()}</p>
                                                    <p><strong>Status:</strong> {issue.status}</p>
                                                </div>
                                                <select
                                                    className="p-2 border rounded-lg"
                                                    value={issue.status}
                                                    onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
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
                                        <div key={issue._id} className="bg-white p-4 rounded-lg shadow text-gray-800 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-xl">{issue.name}</h3>
                                                <p><strong>Phone:</strong> {issue.phone}</p>
                                                <p><strong>Department:</strong> {issue.department}</p>
                                                <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                <p><strong>Description:</strong> {issue.description}</p>
                                                <p><strong>Submitted On:</strong> {new Date(issue.submittedOn).toLocaleString()}</p>
                                                </div>
                                            <select
                                                className="p-2 border rounded-lg"
                                                value={issue.status}
                                                onChange={(e) => handleStatusUpdate(issue._id, e.target.value)} // Ensure you're using _id
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

                    {activeTab === "Completed Issues" && (
                        <>
                            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Completed Issues</h2>
                            {completedTasks.length === 0 ? (
                                <p className="text-gray-800">No completed tasks.</p>
                            ) : (
                                <div className="space-y-4">
                                    {completedTasks.map(issue => (
                                        <div key={issue._id} className="bg-white p-4 rounded-lg shadow text-gray-800 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-xl">{issue.name}</h3>
                                                <p><strong>Phone:</strong> {issue.phone}</p>
                                                <p><strong>Department:</strong> {issue.department}</p>
                                                <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                <p><strong>Description:</strong> {issue.description}</p>
                                                <p><strong>Submitted On:</strong> {new Date(issue.submittedOn).toLocaleString()}</p>
                                                </div>
                                            <select
                                                className="p-2 border rounded-lg"
                                                value={issue.status}
                                                onChange={(e) => handleStatusUpdate(issue._id, e.target.value)}
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

                    {activeTab === "Pending" && (
                        <>
                            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Pending Issues</h2>
                            {pendingTasks.length === 0 ? (
                                <p className="text-gray-800">No pending tasks.</p>
                            ) : (
                                <div className="space-y-4">
                                    {pendingTasks.map(issue => (
                                        <div key={issue._id} className="bg-white p-4 rounded-lg shadow text-gray-800 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-xl">{issue.name}</h3>
                                                <p><strong>Phone:</strong> {issue.phone}</p>
                                                <p><strong>Department:</strong> {issue.department}</p>
                                                <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                <p><strong>Description:</strong> {issue.description}</p>
                                                <p><strong>Submitted On:</strong> {new Date(issue.submittedOn).toLocaleString()}</p>
                                                </div>
                                            <select
                                                className="p-2 border rounded-lg"
                                                value={issue.status}
                                                onChange={(e) => handleStatusUpdate(issue._id, e.target.value)} // Ensure you're using _id
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

                </section>
            </main>
        </div>
    );
};

export default StaffDashboard;
