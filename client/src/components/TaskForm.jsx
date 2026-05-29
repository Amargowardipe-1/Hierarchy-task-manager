// src/components/TaskHeader.jsx

import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../api/axios";

 function TaskForm() {


  const [showModal, setShowModal] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: ""
  });
  const [currUser, sertCurrUser]= useState({});

  

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const [availableUsers, setAvailableUsers] = useState([]);

  // FETCH USERS
  useState(() => {

    const fetchUsers = async () => {
      try{
        const currUser= JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setAvailableUsers(res.data);
        sertCurrUser(currUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {
    

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
toast.success("Task created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        assignedTo: ""
      });

      setShowModal(false);

    } catch (error) {

      console.error(error);

      toast.error( err.response?.data?.message ||"Something went wrong");

    }
 

  };


  return (

    <>
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Task Management
        </h1>
      {(currUser?.role==="super-admin"|| currUser?.role==="admin" ||currUser?.role==="manager")&&(
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow">
           <FiPlus />Create Task
        </button>
        )}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-5">
              Create Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="border p-3 w-full rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-3 w-full rounded"
                rows="4"
                required
              />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border p-3 w-full rounded"
              >

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-3 w-full rounded"
              >

                <option value="To Do">
                  To Do  
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Done">
                  Done
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>


              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="border p-3 w-full rounded"
                required
              />

              
             <select name="assignedTo" value={formData.assignedTo} onChange={(e) =>
                 setFormData({
                ...formData,
                assignedTo: e.target.value
             })
            }
             className="border p-3 w-full rounded" required >

              <option value=""> Select Assigned To </option>

                  {availableUsers.map((user) => (

               <option key={user._id} value={user._id}>

                {user.name} ({user.role})
               </option>
            ))}
           </select>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded w-full"
              >
                Create Task
              </button>

            </form>

          </div>

        </div>

      )}

    </>

  );

}

export default TaskForm;