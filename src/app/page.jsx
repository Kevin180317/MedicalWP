"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const addUser = async () => {
    if (!validateEmail(newUser.email)) {
      setError("Invalid email address");
      return;
    }

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_CREATE_USER,
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log("User added:", data);
      setNewUser({ name: "", email: "", password: "" }); // Clear form
      setError(""); // Clear error if successful
    } catch (e) {
      console.error("Error adding user:", e);
      setError("Error adding user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Add New User</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={addUser}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
    </div>
  );
}

export default Page;
