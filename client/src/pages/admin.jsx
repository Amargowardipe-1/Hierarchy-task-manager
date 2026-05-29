// src/pages/SuperAdmin.jsx
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import UserForm from "../components/UserForm";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import axios from "axios";
import UserInScope from "../components/miniComponents/UserInScope";
import TotalTask from "../components/miniComponents/TotalTask";
import InProgress from "../components/miniComponents/InProgress";
import OverDue from "../components/miniComponents/OverDue";
import TaskStatus from "../components/miniComponents/TaskStatus";
import TaskPriority from "../components/miniComponents/TaskPriority";
import UsersByRole from "../components/miniComponents/UsersByRole";

 function Admin() {


  

  return (
    <div className="flex">

      <SideBar />

      <div className="flex-1 ml-64 ">
        <NavBar />

        <div className="p-6">
          
          <h2 className="text-2xl font-bold mb-4"> Admin Dashboard</h2>
          <p className="mb-6">
            Welcome, Admin. A clear overview of your hierarchy, tasks, and pipeline state.
          </p>

        
          <div className="grid grid-cols-4 gap-4 mb-6 ">
            <UserInScope />
            <TotalTask />
            <InProgress />
            <OverDue />


            
            
          </div>
      <div className="grid grid-cols-3 gap-2 mb-6">
          <TaskStatus />
          <TaskPriority />
          <UsersCountByRole />
          

          </div>

            
          </div>
        </div>
      </div>
    
  );
}

export default Admin;
