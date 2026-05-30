// src/components/TaskTable.jsx

import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskEditForm from "../components/miniComponents/TaskEditForm";
import toast from "react-hot-toast";
import API from "../api/axios";

function TaskTable() {

  const [tasks, setTasks] = useState([]);
  const [modal, setModal]= useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data.tasks;
     

      setTasks(data);
      setModal((prev) => !prev)

    } catch (error) {

      console.error(
        "Error fetching tasks:",
        error
      );

    }

  }
  
  useEffect(() => {

    fetchTasks();

  }, []);

  

  const handleStatusUpdate = async (taskId, status) => {

  try {

    const token = localStorage.getItem("token");

    await API.patch(
      `/api/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Task updated sucessfully");

    // LOCAL STATE UPDATE
    setTasks((prevTasks) =>
      prevTasks.map((task) =>task._id === taskId ? { ...task, status } : task )
    );

  } catch (error) {

    console.error(
      "Error updating status:",
      error
    );
    toast.error("error updating status")

  }

};


  const handleDelete = async (taskId) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.error("Task deleted");

      fetchTasks();

    } catch (error) {

      console.error(
        "Error deleting task:",
        error
      );
      toast.error("Error deleting task")

    }

  };

 
  

  return (

    <div className="bg-white rounded shadow p-4 overflow-x-auto">

      <h3 className="text-xl font-semibold mb-4">
        Tasks
      </h3>

      <table className="w-full min-w-[800px] ">

        <thead>

          <tr className="bg-gray-200">

            <th className=" p-2">
              Title
            </th>

            <th className=" p-2">
              Assignee
            </th>

            <th className=" p-2">
              Status
            </th>

            <th className=" p-2">
              Priority
            </th>

            <th className=" p-2">
              Due
            </th>

            <th className=" p-2">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {tasks.length > 0 ? (

            tasks.map((task) => (

              <tr key={task._id}>

                <td className=" p-2">
                  {task.title}
                </td>

                <td className=" p-2">
                  {task.assignedTo?.name ||
                    "Unassigned"}
                </td>

                <td className=" p-2">

                  {/* EMPLOYEE -> ONLY STATUS */}

                  {(currentUser.role ===
                    "employee" ||

                    task.assignedTo?._id ===
                      currentUser.id) ? (

                    <select
                      className=" p-1 rounded"
                      value={task.status}
                      onChange={(e) =>
                        handleStatusUpdate(
                          task._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="To Do">
                        To Do
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Done">
                        Completed
                      </option>

                      <option value="Closed">
                        Closed
                      </option>

                    </select>

                  ) : (
                    task.status
                  )}

                </td>

                <td className=" p-2">
                  {task.priority}
                </td>

                <td className=" p-2">

                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "—"}

                </td>

                <td className=" p-2 space-x-2">

                  {/* ONLY CREATOR CAN EDIT/DELETE */}

                  {task.assignedBy?._id ===
                    currentUser.id && (

                    <>
                    
                  <TaskEditForm
                         task={task}
                           onTaskUpdated={fetchTasks}
                         />   
    

  

                      <button
                        onClick={() =>
                          handleDelete(
                            task._id
                          )
                        }
                        className="text-red-500 hover:underline"
                      >

                        <FiTrash2 />

                      </button>
                      

                    </>

                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center p-4"
              >

                No tasks found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}

export default TaskTable;