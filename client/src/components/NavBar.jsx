

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {

  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="w-full bg-gray-100 shadow px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3">

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold text-center md:text-left">
        HTMS Task Hierarchy
      </h1>

      {/* User Info + Logout */}
      <div className="flex flex-col sm:flex-row items-center gap-3">

        {user && (
          <div className="text-gray-700 text-sm md:text-base text-center">
            <span className="font-semibold">{user.name}</span> ({user.role})
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Logout
        </button>

      </div>

    </div>

  );

}