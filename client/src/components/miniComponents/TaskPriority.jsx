import {useEffect, useState} from "react"
import axios from "axios";
import API from "../../api/axios";


function TaskPriorityInfo(){

    const [Priority, setPriority]= useState({
        low:0,
        medium:0,
        high:0
    })

    useEffect(()=>{
       const fetchTask= async()=>{
        try{
        const token= localStorage.getItem('token');
        const res= await API.get("/api/tasks",
            {
                headers : {
                    Authorization:`Bearer ${token}`
                }
            }
        );
        
        const tasks = res.data.tasks || [];
        console.log("priorityTasks", tasks);

        const low = tasks.filter((task)=> task.priority==="low").length;

        const medium = tasks.filter((task)=> task.priority==="medium").length;

        const high = tasks.filter((task)=> task.priority==="high").length;

        setPriority({
            low, 
            medium, 
            high
        })
       }catch(error){
        console.error("error fetching task", error);
       }
    }

       fetchTask();
    },[])

    const TotalTask = Priority.low+ Priority.medium+ Priority.high;

    const getWidth = (count)=>{
        if(count===0) return "0%";
        return `${(count/TotalTask)*100}%`
    }

    return (
        <div className="bg-white mt-10 p-6 rounded shadow w-full max-w-sm ">

      {/* TITLE */}
      <h3 className="text-xs tracking-[5px] text-gray-500 font-semibold mb-6 uppercase">

        Tasks By Priority

      </h3>

      {/* low */}
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Low
          </span>

          <span>
            {Priority.low}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(Priority.low)
            }}
          />

        </div>

      </div>

      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Medium
          </span>

          <span>
            {Priority.medium}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(Priority.medium)
            }}
          />

        </div>

      </div>

      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            High
          </span>

          <span>
            {Priority.high}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(Priority.high)
            }}
          />

        </div>

      </div>
      </div>


    )
}

export default TaskPriorityInfo;