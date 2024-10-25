"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

function Page() {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const addUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/create/user",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log("User added:", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Add New User</h2>
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
        <Button
          onClick={addUser}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add User
        </Button>
      </div>
    </div>
  );
}

export default Page;
