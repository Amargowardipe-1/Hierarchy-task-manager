import {useEffect, useState} from "react";
import axios from "axios";

function TotalTask(){
    const[TotalTasks, setTotalTasks] = useState(0);

    useEffect(()=>{
        const fetchTotalTasks = async()=>{
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:8000/api/tasks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log("Total Tasks Data:", res.data.tasks.length);
                setTotalTasks(res.data.tasks.length);
            } catch (error) {
                console.error("Error fetching total tasks:", error);
            }
        }

        fetchTotalTasks();
    }, [])

    return (
        <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="font-semibold">Total Tasks</h3>
            <p className="text-2xl">{TotalTasks}</p>
        </div>
    );
}

export default TotalTask;