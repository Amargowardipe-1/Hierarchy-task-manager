import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function SideBar() {

  const [currUser, setCurrUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (currentUser) {
      setCurrUser(currentUser);
    }

  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" md:hidden absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen bg-gray-800 text-white p-4
          flex flex-col justify-between overflow-y-auto
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >

        {/* Close Button Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4"
        >
          <FiX size={24} />
        </button>

        <div>
          <h2 className="text-xl font-bold mb-6">
            HTMS Task Hierarchy
          </h2>

          <ul className="space-y-4">

            {currUser?.role === "super-admin" && (
              <li>
                <Link to="/superadmin">
                  Dashboard
                </Link>
              </li>
            )}

            {currUser?.role === "admin" && (
              <li>
                <Link to="/admin">
                  Dashboard
                </Link>
              </li>
            )}

            {currUser?.role === "manager" && (
              <li>
                <Link to="/manager">
                  Dashboard
                </Link>
              </li>
            )}

            {currUser?.role === "employee" && (
              <li>
                <Link to="/employee">
                  Dashboard
                </Link>
              </li>
            )}

            <li><Link to="/task">Tasks</Link></li>
            <li><Link to="/user">Users</Link></li>
            <li><Link to="/orgchart">Org Chart</Link></li>
            <li><Link to="/profile">Profile</Link></li>

          </ul>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 px-4 py-2 rounded w-full"
        >
          Logout
        </button>

      </div>
    </>
  );
}