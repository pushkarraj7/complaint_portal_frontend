import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CreateStaff from './CreateStaff'; // 🔥 import the page
import { toast } from "react-toastify";


const AdminDashboard = () => {
    const [filter, setFilter] = useState("All");
    const [activePage, setActivePage] = useState("AllIssues");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [taskFilter, setTaskFilter] = useState("All");
    const [issues, setIssues] = useState([]); // State for issues
    const [staffList, setStaffList] = useState([]); // Empty initially, will be populated from API
    const navigate = useNavigate();

    const [visibleTasks, setVisibleTasks] = useState({});
    const [staffFilter, setStaffFilter] = useState({});

    const handleToggleTasks = (staffId) => {
        setVisibleTasks(prev => ({
            ...prev,
            [staffId]: !prev[staffId], // Toggle visibility for the specific staff member
        }));
    };

    // 🔥 Check if user is logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            toast.error('You need to login first!');
            navigate('/admin');
        }
    }, [navigate]);

    const handleFilterChange = (staffId, filter) => {
        setStaffFilter(prev => ({
            ...prev,
            [staffId]: filter, // Set filter for this particular staff member
        }));
    };

    // Fetch issues data from the backend API
    useEffect(() => {
        const fetchIssuesData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/issues'); // Fetch issues from the API
                const data = await response.json();
                setIssues(data);  // Set issues data to state
            } catch (error) {
                console.error("Error fetching issues data:", error);
            }
        };

        fetchIssuesData(); // Call the fetch function
    }, []);  // Empty dependency array means this runs once on mount

    // Fetch staff data from the backend API
    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/staff/all'); // Update this URL with your backend server URL
                const data = await response.json();
                setStaffList(data);  // Set staff data to state
            } catch (error) {
                console.error("Error fetching staff data:", error);
            }
        };

        fetchStaffData(); // Call the fetch function
    }, []);  // Empty dependency array means this runs once on mount

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin'); // Redirect to login if not logged in
        }
    }, []);
    
    const handleLogout = () => {
        // Clear login state (if you store it in localStorage or sessionStorage)
        localStorage.removeItem('isLoggedIn');  // Or sessionStorage.removeItem('isLoggedIn');
        navigate('/admin'); // Redirect to the admin login page
    };

    // Format submittedOn date to a human-readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Example: "4/26/2025, 12:59:39 PM"
    };

    // Handle status update for the issue
    const handleStatusChange = async (issueId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/issues/${issueId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedIssue = await response.json();
                setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? updatedIssue : issue));
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating issue status:", error);
        }
    };

    // Handle task assignment to staff
    const handleAssignStaff = async (issueId, staffId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/issues/${issueId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assignedStaff: staffId }),
            });

            if (response.ok) {
                const updatedIssue = await response.json();
                setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? updatedIssue : issue));
            } else {
                console.error("Failed to assign staff");
            }
        } catch (error) {
            console.error("Error assigning staff to issue:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-rose-100 to-rose-300 flex">
            <aside className="w-64 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-rose-600">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    <button
                        onClick={() => setActivePage("AllIssues")}
                        className={`hover:font-bold text-gray-700 text-left cursor-pointer rounded-lg px-4 py-2 ${activePage === "AllIssues" ? "bg-rose-600 text-white font-bold" : ""}`}
                    >
                        All Issues
                    </button>
                    <button
                        onClick={() => setActivePage("ViewAllStaff")}
                        className={`hover:font-bold text-gray-700 text-left cursor-pointer rounded-lg px-4 py-2 ${activePage === "ViewAllStaff" ? "bg-rose-600 text-white font-bold" : ""}`}
                    >
                        View All Staff
                    </button>
                    <button
                        onClick={() => setActivePage("CreateStaff")}
                        className={`hover:font-bold text-gray-700 text-left cursor-pointer rounded-lg px-4 py-2 ${activePage === "CreateStaff" ? "bg-rose-600 text-white font-bold" : ""}`}
                    >
                        Create Staff
                    </button>
                </nav>
            </aside>

            <div className="flex-1 p-8 text-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-rose-600">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-rose-600 rounded-lg shadow-md hover:scale-105 hover:bg-rose-700 transition-all hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                {activePage === "AllIssues" && (
                    <div>
                        {/* Filter Buttons */}
                        <div className="flex space-x-4 mb-6">
                            {["All", "Pending", "In Progress", "Completed"].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg ${filter === status ? "bg-white text-rose-600 font-bold" : "bg-rose-600 hover:bg-rose-700 hover:cursor-pointer"}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">All Issues</h1>
                        {issues.length > 0 ? (
                            issues.filter(issue => filter === "All" || issue.status === filter).map(issue => (
                                <div key={issue._id} className="bg-white p-4 rounded-lg shadow text-gray-800 mb-2 flex justify-between items-start">
                                    <div className="w-2/3">
                                        <p><strong>Name:</strong> {issue.name}</p>
                                        <p><strong>Phone:</strong> {issue.phone}</p>
                                        <p><strong>Department:</strong> {issue.department}</p>
                                        <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                        <p><strong>Description:</strong> {issue.description}</p>
                                        <p><strong>Submitted On:</strong> {formatDate(issue.submittedOn)}</p>
                                    </div>

                                    <div className="w-1/3 pl-6">
                                        <div className="mb-4">
                                            <strong>Status:</strong>
                                            <select
                                                value={issue.status}
                                                onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                                                className="ml-2 p-2 border rounded-md w-full"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>

                                        <div>
                                            <strong>Assigned Staff:</strong>
                                            <select
                                                value={issue.assignedStaff || ""}
                                                onChange={(e) => handleAssignStaff(issue._id, e.target.value)}
                                                className="ml-2 p-2 border rounded-md w-full"
                                            >
                                                <option value="">Select Staff</option>
                                                {staffList.map(staff => (
                                                    <option key={staff._id} value={staff._id}>{staff.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No issues found.</p>
                        )}
                    </div>
                )}

                {activePage === "ViewAllStaff" && (
                    <div>
                        <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">Staff Members List</h1>

                        {staffList.length > 0 ? (
                            staffList.map(staff => {
                                const currentFilter = staffFilter[staff._id] || "All"; // Default filter for staff is "All"

                                return (
                                    <div key={staff._id} className="bg-white p-4 rounded-lg shadow text-gray-800 mb-4">
                                        <p><strong>Name:</strong> {staff.name}</p>
                                        <p><strong>Email:</strong> {staff.email}</p>
                                        <p><strong>Department:</strong> {staff.department}</p>

                                        {/* Display total assigned tasks */}
                                        <p><strong>Total Assigned Tasks:</strong> {
                                            issues.filter(issue => issue.assignedStaff === staff._id).length
                                        }</p>

                                        {/* Toggle Tasks Button */}
                                        <button
                                            onClick={() => handleToggleTasks(staff._id)}
                                            className="text-sm text-rose-600 underline cursor-pointer"
                                        >
                                            {visibleTasks[staff._id] ? "Hide Tasks" : "View Tasks"}
                                        </button>

                                        {/* Show tasks and filter options only if tasks are visible */}
                                        {visibleTasks[staff._id] && (
                                            <div className="mt-4">
                                                <h2 className="text-xl font-bold text-rose-600 mb-2">Tasks for {staff.name}</h2>

                                                {/* Filter buttons */}
                                                <div className="flex gap-2 mb-4">
                                                    {["All", "Pending", "In Progress", "Completed"].map(status => (
                                                        <button
                                                            key={status}
                                                            onClick={() => handleFilterChange(staff._id, status)}
                                                            className={`px-3 py-1 rounded-lg cursor-pointer ${currentFilter === status ? "bg-white border-2 border-rose-600 text-rose-600 font-bold" : "bg-rose-600 text-white"}`}
                                                        >
                                                            {status}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Display tasks assigned to this staff member */}
                                                <div className="mt-4">
                                                    {/* <h3 className="text-lg font-semibold text-gray-700">Assigned Tasks:</h3> */}
                                                    {/* Filter tasks based on status */}
                                                    {issues
                                                        .filter(issue => issue.assignedStaff === staff._id)  // Filter issues for this staff
                                                        .filter(issue => currentFilter === "All" || issue.status === currentFilter) // Apply task status filter
                                                        .length > 0 ? (
                                                        issues
                                                            .filter(issue => issue.assignedStaff === staff._id)  // Filter issues for this staff
                                                            .filter(issue => currentFilter === "All" || issue.status === currentFilter) // Apply task status filter
                                                            .map(issue => (
                                                                <div key={issue._id} className="bg-gray-100 p-4 rounded-lg shadow text-gray-800 mb-2">
                                                                    <p><strong>Issue Type:</strong> {issue.issueType}</p>
                                                                    <p><strong>Description:</strong> {issue.description}</p>
                                                                    <p><strong>Status:</strong> {issue.status}</p>
                                                                    <p><strong>Submitted On:</strong> {formatDate(issue.submittedOn)}</p>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <p className="text-gray-500">No tasks assigned to this staff member.</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-500">No staff members found.</p>
                        )}
                    </div>
                )}
                {activePage === "CreateStaff" && <CreateStaff setActivePage={setActivePage} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
