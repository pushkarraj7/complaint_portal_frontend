import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [filter, setFilter] = useState("All");
    const [activePage, setActivePage] = useState("AllIssues");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [taskFilter, setTaskFilter] = useState("All");

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

    const [staffList, setStaffList] = useState([
        { id: 1, name: "John", email: "john@example.com", department: "Support" },
        { id: 2, name: "Jane", email: "jane@example.com", department: "Billing" },
        { id: 3, name: "Sarah", email: "sarah@example.com", department: "Tech" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setIssues(prev =>
            prev.map(issue =>
                issue.id === id ? { ...issue, status: newStatus } : issue
            )
        );
    };

    const handleAssign = (id, staff) => {
        setIssues(prev =>
            prev.map(issue =>
                issue.id === id ? { ...issue, assignedTo: staff } : issue
            )
        );
    };

    const getTasksByStaff = (staffName) => {
        return issues.filter(issue =>
            issue.assignedTo === staffName &&
            (taskFilter === "All" || issue.status === taskFilter)
        );
    };

    const filteredIssues = issues.filter(issue =>
        filter === "All" ? true : issue.status === filter
    );

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login state (if you store it in localStorage or sessionStorage)
        localStorage.removeItem('isLoggedIn');  // Or sessionStorage.removeItem('isLoggedIn');

        // Redirect to the /admin page
        navigate('/admin');
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-rose-100 to-rose-300 flex">
            <aside className="w-64 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-rose-600">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    <button onClick={() => setActivePage("AllIssues")} className="hover:font-bold text-gray-700 text-left">All Issues</button>
                    <button onClick={() => setActivePage("ViewAllStaff")} className="hover:font-bold text-gray-700 text-left">View All Staff</button>
                    <button onClick={() => setActivePage("CreateStaff")} className="hover:font-bold text-gray-700 text-left">Create Staff</button>
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
                    <>
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

                        <div className="space-y-4">
                            {filteredIssues.map(issue => (
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
                                        <p><strong>Assigned To:</strong> {issue.assignedTo || "Unassigned"}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <select
                                            className="p-2 border rounded-lg"
                                            value={issue.status}
                                            onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>

                                        <select
                                            className="p-2 border rounded-lg"
                                            value={issue.assignedTo}
                                            onChange={(e) => handleAssign(issue.id, e.target.value)}
                                        >
                                            <option value="">Assign Staff</option>
                                            {staffList.map(staff => (
                                                <option key={staff.id} value={staff.name}>
                                                    {staff.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activePage === "ViewAllStaff" && (
                    <div>
                        <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">Staff Members List</h1>
                        {staffList.map(staff => (
                            <div key={staff.id} className="bg-white p-4 rounded-lg shadow text-gray-800 mb-2">
                                <p><strong>Name:</strong> {staff.name}</p>
                                <p><strong>Email:</strong> {staff.email}</p>
                                <p><strong>Department:</strong> {staff.department}</p>
                                <p><strong>Total Tasks:</strong> {issues.filter(issue => issue.assignedTo === staff.name).length}</p>
                                <button
                                    onClick={() => setSelectedStaff(selectedStaff === staff.name ? null : staff.name)}
                                    className="text-sm text-rose-600 underline"
                                >
                                    {selectedStaff === staff.name ? "Hide Tasks" : "View Tasks"}
                                </button>

                                {selectedStaff === staff.name && (
                                    <div className="mt-4">
                                        <h2 className="text-xl font-bold text-rose-600 mb-2">Tasks for {staff.name}</h2>
                                        <div className="flex gap-2 mb-4">
                                            {["All", "Pending", "In Progress", "Completed"].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => setTaskFilter(status)}
                                                    className={`px-3 py-1 rounded ${taskFilter === status ? "bg-white border-2 border-rose-600 text-rose-600 font-bold" : "bg-rose-600 text-white"}`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                        {getTasksByStaff(staff.name).map(task => (
                                            <div key={task.id} className="bg-rose-100 p-3 rounded mb-2 text-gray-900">
                                                <p><strong>Name:</strong> {task.name}</p>
                                                <p><strong>Email:</strong> {task.email}</p>
                                                <p><strong>Department:</strong> {task.department}</p>
                                                <p><strong>Issue Type:</strong> {task.issueType}</p>
                                                <p><strong>Description:</strong> {task.description}</p>
                                                <p><strong>Submitted On:</strong> {task.submittedOn}</p>
                                                <p><strong>Status:</strong> {task.status}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activePage === "CreateStaff" && (
                    <div className="flex justify-center">
                        <div>
                            <h1 className="text-3xl font-bold text-rose-600 mb-6 text-center">Create New Staff</h1>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const name = e.target.name.value;
                                    const email = e.target.email.value;
                                    const password = e.target.password.value;
                                    const department = e.target.department.value;

                                    const newStaff = {
                                        id: staffList.length + 1,
                                        name,
                                        email,
                                        department,
                                    };

                                    setStaffList([...staffList, newStaff]);
                                    e.target.reset();
                                    alert("Staff created successfully!");
                                    setActivePage("ViewAllStaff");
                                }}
                                className="bg-white p-6 rounded shadow-md max-w-md text-black"
                            >
                                <input type="text" name="name" placeholder="Name" className="w-full mb-3 p-2 border rounded placeholder-black" required />
                                <input type="email" name="email" placeholder="Email" className="w-full mb-3 p-2 border rounded placeholder-black" required />
                                <input type="password" name="password" placeholder="Password" className="w-full mb-3 p-2 border rounded placeholder-black" required />

                                <select name="department" className="w-full mb-3 p-2 border rounded text-black" required>
                                    <option value="" disabled selected>Select Department</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Billing">Billing</option>
                                    <option value="General">General</option>
                                </select>

                                <div className="flex justify-center">
                                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 hover:cursor-pointer hover:font-bold">
                                        Create Staff
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
