// src/components/UserForm.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../api/axios";

export default function UserForm({fetchUserss}) {

  
  const [showModal, setShowModal] = useState(false);

  
  const [availableUsers, setAvailableUsers] = useState([]);

  

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    reportsTo: ""
  });

 

  

    const fetchUsers = async () => {

      try {

        const token = localStorage.getItem("token");

        // GET USERS API
        const res = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const allUsers = res.data.users || res.data;

        let filteredUsers = [];

        

        if (currentUser.role === "super-admin") {

          filteredUsers = allUsers.filter((user) =>
              user.role === "super-admin" ||
              user.role === "admin" ||
              user.role === "manager"
          );

        }

        
        else if (currentUser.role === "admin") {

          filteredUsers = allUsers.filter(
            (user) =>
              user._id === currentUser.id ||
              (
                user.role === "manager" &&
                user.reportsTo === currentUser.id
              )
          );

        }

        else if (currentUser.role === "manager") {

          filteredUsers = allUsers.filter(
            (user) =>
              user._id === currentUser.id
          );

        }

        setAvailableUsers(filteredUsers);

      } catch (error) {

        console.error(
          "Error fetching users",
          error
        );

      }

    };
    useEffect(() => {

    fetchUsers();

  }, []);

  
  // HANDLE SUBMIT
  

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/api/auth/register",
        {
          ...formData,
          createdBy: currentUser.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

     toast.success("User created successfully");

      // RESET FORM

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
        reportsTo: ""
      });

      
     fetchUserss();
      // CLOSE MODAL

      setShowModal(false);

     

    } catch (err) {

      console.error(err);

      toast.error(
      err.response?.data?.message ||
      "Error creating user"
    );

    }

  };

  

  return (

    <>

      {/* BUTTON */}

      <div className="mr-4">

  {(currentUser?.role === "super-admin" ||
    currentUser?.role === "admin" ||
    currentUser?.role === "manager") && (

    <button
      onClick={() => setShowModal(true)}
      className="
        flex items-center justify-center gap-2
        bg-green-500 hover:bg-green-600
        text-white
        px-4 py-2
        rounded
        text-sm md:text-base
      "
    >
      <FiPlus />
      Create User
    </button>

  )}

</div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          {/* BOX */}

          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

            {/* CLOSE */}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >

              <FiX size={22} />

            </button>

            {/* TITLE */}

            <h2 className="text-2xl font-bold mb-5">
              Create User
            </h2>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}

              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                required
              />

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
                required
              />

              {/* PASSWORD */}

              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="border p-2 w-full rounded"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
                required
              />

              {/* ROLE */}

              <select
                className="border p-2 w-full rounded"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value
                  })
                }
              >

                {/* SUPER ADMIN CAN CREATE */}
                {currentUser.role === "super-admin" && (
                  <>
                    <option value="admin">
                      Admin
                    </option>

                    <option value="manager">
                      Manager
                    </option>

                    <option value="employee">
                      Employee
                    </option>
                  </>
                )}

                {/* ADMIN CAN CREATE */}
                {currentUser.role === "admin" && (
                  <>
                    <option value="manager">
                      Manager
                    </option>

                    <option value="employee">
                      Employee
                    </option>
                  </>
                )}

                {/* MANAGER CAN CREATE */}
                {currentUser.role === "manager" && (
                  <option value="employee">
                    Employee
                  </option>
                )}

              </select>

              {/* REPORTS TO */}

              <select
                className="border p-2 w-full rounded"
                value={formData.reportsTo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reportsTo: e.target.value
                  })
                }
                required
              >

                <option value="">
                  Select Reports To
                </option>

                {availableUsers.map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name} ({user.role})

                  </option>

                ))}

              </select>

              {/* SUBMIT */}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
              >

                Create User

              </button>

            </form>

          </div>

        </div>

      )}

    </>

  );

}