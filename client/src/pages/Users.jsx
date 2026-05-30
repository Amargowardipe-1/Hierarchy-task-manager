// src/pages/Users.jsx

import { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import UserForm from "../components/UserForm";
import toast from "react-hot-toast";
import UserEditForm from "../components/miniComponents/UserEditForm";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin3Fill } from "react-icons/ri";
import API from "../api/axios";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // FETCH USERS
  const currUser = JSON.parse(localStorage.getItem('user'));
  

 

    const fetchUsers = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

       
        // backend returns direct array
        setUsers(res.data);

      } catch (err) {

        console.error("Error fetching users", err);

      } finally {

        setLoading(false);

      }

    };

     useEffect(() => {

    fetchUsers();

  },[]);

  
  // DELETE USER
  

  const deleteUser = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // remove deleted user from UI
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      toast.error("User deleted successfully");

    } catch (err) {

      console.error("Error deleting user", err);

      toast.error("Failed to delete user");

    }

  };

  
  // LOADING
  

  if (loading) {

    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading users...
      </div>
    );

  }

  // UI
  

  return (

    <div className="flex min-h-screen bg-gray-100">

  {/* Sidebar */}
  <SideBar />

  {/* Main Content */}
  <div className="flex-1 md:ml-64">

    <NavBar />

    {/* Content */}
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-2xl md:text-3xl font-bold">
          Users Management
        </h1>

        <UserForm fetchUserss={fetchUsers} />

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full min-w-[700px] border-collapse">

          <thead>

            <tr className="bg-gray-200 text-left">

              <th className="p-3 border text-sm md:text-base">
                Name
              </th>

              <th className="p-3 border text-sm md:text-base">
                Email
              </th>

              <th className="p-3 border text-sm md:text-base">
                Role
              </th>

              <th className="p-3 border text-sm md:text-base">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {Array.isArray(users) && users.length > 0 ? (

              users.map((user) => (

                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition"
                >

                  <td
                    className={`p-3 border text-sm md:text-base ${
                      !user.isActive ? "opacity-50" : ""
                    }`}
                  >
                    {user.name}
                  </td>

                  <td
                    className={`p-3 border text-sm md:text-base ${
                      !user.isActive ? "opacity-50" : ""
                    }`}
                  >
                    {user.email}
                  </td>

                  <td
                    className={`p-3 border capitalize text-sm md:text-base ${
                      !user.isActive ? "opacity-50" : ""
                    }`}
                  >
                    {user.role}
                  </td>

                  <td className="p-3 border">

                    <div className="flex items-center gap-3">

                      <UserEditForm
                        user={user}
                        fetchUsers={fetchUsers}
                      />

                      {(currUser?.role === "super-admin" ||
                        currUser?.role === "admin" ||
                        currUser?.role === "manager") && (

                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-500 hover:underline"
                        >
                          <RiDeleteBin3Fill />
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No users found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>
  );

}