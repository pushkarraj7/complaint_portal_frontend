import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllStaff = () => {
    const [staffList, setStaffList] = useState([]);
    const [issues, setIssues] = useState([]); // Assuming issues data is fetched similarly
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [taskFilter, setTaskFilter] = useState("All");

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const staffResponse = await axios.get("/api/staff"); // Replace with your actual API endpoint
                setStaffList(staffResponse.data);

                // Fetch issues data (you should replace this with the correct endpoint for issues)
                const issuesResponse = await axios.get("/api/issues");
                setIssues(issuesResponse.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };

        fetchStaffData();
    }, []);

    const getTasksByStaff = (staffName) => {
        return issues.filter((issue) => issue.assignedTo === staffName);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-rose-600 mb-4 text-center">Staff Members List</h1>
            {staffList.map(staff => (
                <div key={staff.id} className="bg-white p-4 rounded-lg shadow text-gray-800 mb-4">
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

                            {getTasksByStaff(staff.name)
                                .filter(task => taskFilter === "All" || task.status === taskFilter)
                                .map(task => (
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
    );
};

export default ViewAllStaff;
