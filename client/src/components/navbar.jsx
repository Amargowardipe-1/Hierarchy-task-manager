// src/components/Navbar.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="w-full bg-gray-100 shadow p-4 flex justify-between items-center">
      {/* Left side: Title */}
      <h1 className="text-xl font-bold">HTMS Task Hierarchy</h1>

      {/* Right side: User info + Logout */}
      <div className="flex items-center space-x-4">
        {user && (
          <div className="text-gray-700">
            <span className="font-semibold">{user.name}</span> ({user.role})
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
