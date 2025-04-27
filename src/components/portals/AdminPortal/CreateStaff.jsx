import React from "react";
import { toast } from "react-toastify";

const CreateStaff = ({ setActivePage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const department = e.target.department.value;

    try {
      const res = await fetch("http://localhost:5000/api/staff/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, department }),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("Staff created successfully!"); // ✅ success toast
        setActivePage("ViewAllStaff");
      } else {
        toast.error(data.message || "Failed to create staff"); // ✅ error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error"); // ✅ error toast
    }

    e.target.reset();
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold text-rose-600 mb-6 text-center">
          Create New Staff
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md max-w-md text-black"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded placeholder-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded placeholder-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded placeholder-black"
            required
          />
          <select
            name="department"
            defaultValue=""
            className="w-full mb-3 p-2 border rounded text-black"
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
          </select>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 hover:cursor-pointer hover:font-bold"
            >
              Create Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;
