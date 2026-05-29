import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/axios";

function InProgress() {

  const [inProgressTask, setInProgressTask] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await API.get("/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const tasks = res.data.tasks;

        console.log("Tasks:", tasks);

        setTasks(tasks);

        

        const count = tasks.filter(
          (task) => task.status === "In Progress"
        ).length;

        setInProgressTask(count);

      } catch (error) {

        console.error(
          "Tasks fetching error",
          error
        );

      }

    };

    fetchTasks();

  }, []);

  return (

    <div className="bg-green-100 p-4 rounded shadow">

      <h3 className="font-semibold">
        In Progress
      </h3>

      <p className="text-2xl">
        {inProgressTask}
      </p>

    </div>

  );

}

export default InProgress;