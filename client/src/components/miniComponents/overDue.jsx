import { useEffect, useState } from "react";
import axios from "axios";

function OverdueCard() {

  const [overdueTasks, setOverdueTasks] = useState(0);

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const tasks = res.data.tasks;

        console.log("Tasks:", tasks);

        
        const overdueCount = tasks.filter((task) => {

          return (

            task.dueDate &&

            new Date(task.dueDate) < new Date() &&

            task.status !== "Done" &&

            task.status !== "Closed"

          );

        }).length;

        console.log("overdue", overdueCount);

        setOverdueTasks(overdueCount);

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

    <div className="bg-red-100 p-4 rounded shadow">

      <h3 className="font-semibold">
        Overdue
      </h3>

      <p className="text-2xl">
        {overdueTasks}
      </p>

    </div>

  );

}

export default OverdueCard;