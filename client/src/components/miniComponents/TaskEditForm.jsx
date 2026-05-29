import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../api/axios";

function TaskEditForm({ task, onTaskUpdated }) {

  

  const [modalOpen, setModalOpen] = useState(false);

  const [users, setUsers] = useState([]);

  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: ""
  });

  
  useEffect(() => {

    if (task && modalOpen) {

      setFormData({

        title: task.title || "",

        description: task.description || "",

        priority: task.priority || "medium",

        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : "",

        assignedTo:
          task.assignedTo?._id || ""

      });

    }

  }, [task, modalOpen]);

  

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUsers(res.data.users || res.data);

      } catch (error) {

        console.error(
          "Error fetching users:",
          error
        );

      }

    };

    if (modalOpen) {
      fetchUsers();
    }

  }, [modalOpen]);

  

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.patch(

        `/api/tasks/${task._id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      console.log(
        "Task updated:",
        res.data
      );

      

      if (onTaskUpdated) {

        onTaskUpdated(res.data.task);

      }

      toast.success("Task updated successfully");

      setModalOpen(false);

    } catch (error) {

      console.error(
        "Error updating task:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Error updating task"
      );

    }

  };



  return (

    <div>

      
      <FiEdit
        onClick={() => setModalOpen(true)}
        className="cursor-pointer text-blue-500 text-lg"
      />

      {modalOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          {/* MODAL BOX */}
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">

            {/* CLOSE BUTTON */}
            <FiX
              onClick={() =>
                setModalOpen(false)
              }
              className="absolute top-4 right-4 cursor-pointer text-xl text-gray-500 hover:text-red-500"
            />

            <h2 className="text-2xl font-bold mb-5">
              Edit Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

             
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value
                  })
                }
                className="border w-full p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
                className="border w-full p-2 rounded"
                rows={4}
              />

             
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value
                  })
                }
                className="border w-full p-2 rounded"
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

              {/* DUE DATE */}
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value
                  })
                }
                className="border w-full p-2 rounded"
              />

              {/* ASSIGNED TO */}
              <select
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignedTo: e.target.value
                  })
                }
                className="border w-full p-2 rounded"
              >

                <option value="">
                  Select User
                </option>

                {users.map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name} ({user.role})

                  </option>

                ))}

              </select>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              >

                Update Task

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default TaskEditForm;