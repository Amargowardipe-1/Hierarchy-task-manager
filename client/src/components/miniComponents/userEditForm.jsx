import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

function UserUpdateForm({ user, fetchUsers }) {


  const [showModal, setShowModal] =
    useState(false);

  
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "",
      isActive: true
    });

  
  useEffect(() => {

    if (user && showModal) {

      setFormData({

        name: user.name || "",

        email: user.email || "",

        password: "",

        role: user.role || "",

        isActive:
          user.isActive ?? true

      });

    }

  }, [user, showModal]);

  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.patch(

        `http://localhost:8000/api/users/${user._id}`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      toast.success(
        "User updated successfully"
      );

      setShowModal(false);

      if (fetchUsers) {
        fetchUsers();
      }

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Error updating user"

      );

    }

  };

 
  return (

    <>

      {/* EDIT BUTTON */}

      <button
        onClick={() =>
          setShowModal(true)
        }
        className="text-blue-500"
      >

        <FiEdit size={18} />

      </button>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md p-6 rounded-lg relative">

            {/* CLOSE */}

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >

              <FiX size={22} />

            </button>

            

            <h2 className="text-2xl font-bold mb-5">

              Update User

            </h2>

         

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value
                  })
                }
                className="border p-2 w-full rounded"
              />

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value
                  })
                }
                className="border p-2 w-full rounded"
              />

              {/* PASSWORD */}

              <input
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value
                  })
                }
                className="border p-2 w-full rounded"
              />

              {/* ROLE */}

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value
                  })
                }
                className="border p-2 w-full rounded"
              >

                <option value="admin">
                  Admin
                </option>

                <option value="manager">
                  Manager
                </option>

                <option value="employee">
                  Employee
                </option>

              </select>

              {/* ACTIVE STATUS */}

              <select
                value={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive:
                      e.target.value ===
                      "true"
                  })
                }
                className="border p-2 w-full rounded"
              >

                <option value={true}>
                  Active
                </option>

                <option value={false}>
                  Inactive
                </option>

              </select>

              {/* BUTTON */}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded"
              >

                Update User

              </button>

            </form>

          </div>

        </div>

      )}

    </>

  );

}

export default UserUpdateForm;