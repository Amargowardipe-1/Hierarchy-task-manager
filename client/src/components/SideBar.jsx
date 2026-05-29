// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";


export default function SideBar() {

  const [currUser, setCurrUser] = useState(null);

useEffect(() => {

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  if (currentUser) {
    setCurrUser(currentUser);
  }

}, []);
    
  
  




  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4  flex flex-col justify-between fixed left-0 top-0  overflow-y-auto">
      {/* Logo / Title */}
      <div>
        <h2 className="text-xl font-bold mb-6">HTMS Task Hierarchy</h2>
        <ul className="space-y-4">

        {currUser?.role === "super-admin" && (
          <li> <Link to="/superadmin" className="hover:text-blue-300"> Dashboard</Link></li>
             )}
        {currUser?.role === "admin" && (
              <li> <Link to="/admin" className="hover:text-blue-300"> Dashboard </Link> </li>
             )}
           {currUser?.role === "manager" && (
              <li> <Link to="/manager" className="hover:text-blue-300"> Dashboard </Link> </li>
             )}
         {currUser?.role === "employee" && (
              <li> <Link to="/employee" className="hover:text-blue-300"> Dashboard </Link> </li>
             )}
          <li><Link to="/task" className="hover:text-blue-300">Tasks</Link></li>
          <li><Link to="/user" className="hover:text-blue-300">Users</Link></li>
          <li><Link to="/orgChart" className="hover:text-blue-300">Org Chart</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300">Profile</Link></li>
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
