// src/pages/SuperAdmin.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import axios from "axios";
import UserInScope from "../components/miniComponents/userInScope";
import TotalTask from "../components/miniComponents/totalTask";
import Inprogress from "../components/miniComponents/InProgress";
import OverdueCard from "../components/miniComponents/overDue";
import TaskStatusCard from "../components/miniComponents/TaskStatus";
import TaskPriorityInfo from "../components/miniComponents/TaskPriority";
import UsersCountByRole from "../components/miniComponents/UsersByRole";

export default function SuperAdmin() {


  

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 ml-64 ">
        <Navbar />

        <div className="p-6">
          
          <h2 className="text-2xl font-bold mb-4">Super Admin Dashboard</h2>
          <p className="mb-6">
            Welcome, Super Admin. A clear overview of your hierarchy, tasks, and pipeline state.
          </p>

        
          <div className="grid grid-cols-4 gap-4 mb-6 ">
            <UserInScope />
            <TotalTask />
            <Inprogress />
            <OverdueCard />


            
            
          </div>
      <div className="grid grid-cols-3 gap-2 mb-6">
          <TaskStatusCard />
          <TaskPriorityInfo />
          <UsersCountByRole />
          

          </div>

            
          </div>
        </div>
      </div>
    
  );
}
