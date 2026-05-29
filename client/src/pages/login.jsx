// src/pages/Login.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../api/axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

    const role = user.role;
    if(role === "super-admin"){
        navigate("/SuperAdmin");
    }
    else if(role === "admin"){
        navigate("/Admin");
    }
    else if(role === "manager"){
        navigate("/Manager");
    }
    else if(role === "employee"){
        navigate("/Employee");
    }
    else {
      error("Invalid user role");
        console.error("Invalid user role");
    }
    } catch (err) {
      toast.error(
  err.response?.data?.message ||
  "Invalid email or password"
);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="email" name="email" placeholder="Email"
          className="border p-2 w-full rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input type="password" name="password" placeholder="Password"
          className="border p-2 w-full rounded"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
