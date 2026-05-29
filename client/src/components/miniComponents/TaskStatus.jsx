// src/components/TaskStatusCard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/axios";

function TaskStatusCard() {

  const [stats, setStats] = useState({
    todo: 0,
    inProgress: 0,
    done: 0,
    closed: 0
  });

  useEffect(() => {

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

        const tasks = res.data.tasks || [];

       

        const todo = tasks.filter((task) => task.status === "To Do").length;

        const inProgress = tasks.filter(
          (task) => task.status === "In Progress"
        ).length;

        const done = tasks.filter(
          (task) => task.status === "Done"
        ).length;

        const closed = tasks.filter(
          (task) => task.status === "Closed"
        ).length;

        setStats({
          todo,
          inProgress,
          done,
          closed
        });

      } catch (error) {

        console.error(
          "Error fetching tasks",
          error
        );

      }

    };

    fetchTasks();

  }, []);

  

  const totalTasks =
    stats.todo +
    stats.inProgress +
    stats.done +
    stats.closed;

  
  const getWidth = (count) => {

    if (totalTasks === 0) return "0%";

    return `${(count / totalTasks) * 100}%`;

  };

  return (

    <div className="bg-white mt-10 p-6 rounded shadow w-full max-w-sm ">

      {/* TITLE */}
      <h3 className="text-xs tracking-[5px] text-gray-500 font-semibold mb-6 uppercase">

        Tasks By Status

      </h3>

      {/* TO DO */}
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            To Do
          </span>

          <span>
            {stats.todo}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(stats.todo)
            }}
          />

        </div>

      </div>

      {/* IN PROGRESS */}
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            In Progress
          </span>

          <span>
            {stats.inProgress}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(stats.inProgress)
            }}
          />

        </div>

      </div>

      {/* DONE */}
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Done
          </span>

          <span>
            {stats.done}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(stats.done)
            }}
          />

        </div>

      </div>

      {/* CLOSED */}
      <div>

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Closed
          </span>

          <span>
            {stats.closed}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(stats.closed)
            }}
          />

        </div>

      </div>

    </div>

  );

}

export default TaskStatusCard;