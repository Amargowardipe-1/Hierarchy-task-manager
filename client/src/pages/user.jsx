// src/pages/Users.jsx

import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import toast from "react-hot-toast";
import UserUpdateForm from "../components/miniComponents/userEditForm";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin3Fill } from "react-icons/ri";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // FETCH USERS
  const currUser = JSON.parse(localStorage.getItem('user'));
  

 

    const fetchUsers = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/users",
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

      await axios.delete(
        `http://localhost:8000/api/users/${id}`,
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

      
      <Sidebar />

    
      <div className="flex-1 ml-64">

        
        <Navbar />

        {/* Content */}
        <div className="p-6">

        <div className="user-header  flex flex-row" >
          <h1 className="text-3xl font-bold mb-6">
            Users Management
          </h1>
          <div className="create-user ml-200">
          <UserForm  fetchUserss={fetchUsers} />
          </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">

            <table className="w-full border-collapse">

              {/* TABLE HEAD */}
              <thead>

                <tr className="bg-gray-200 text-left">

                  <th className="p-3 border">
                    Name
                  </th>

                  <th className="p-3 border">
                    Email
                  </th>

                  <th className="p-3 border">
                    Role
                  </th>

                  <th className="p-3 border">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {Array.isArray(users) && users.length > 0 ? (

                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition" >

                      <td
                      className={`p-3 border ${
                       !user.isActive
                        ? "opacity-50"
                         : ""
                        }`}
                        >
                        {user.name}
                        </td>

                       <td
                        className={`p-3 border ${
                          !user.isActive
                           ? "opacity-50"
                           : ""
                          }`}
                           >
                              {user.email}
                        </td>

                        <td
                              className={`p-3 border capitalize ${
                               !user.isActive
                              ? "opacity-50"
                               : ""
                              }`} >
                            {user.role}
                         </td>

                      <td className="p-3 border space-x-3">

                       <UserUpdateForm user={user} fetchUsers={fetchUsers} />

                    {(currUser?.role==="super-admin" || currUser?.role==="admin" || currUser?.role==="manager")&&(
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-500 hover:underline"
                        >
                        <RiDeleteBin3Fill />
                        </button>
                        )}

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