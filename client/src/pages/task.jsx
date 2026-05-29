import {useEffect, useState} from "react";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

function Task() {

    return (
        
            <div className="flex">
                  {/* Sidebar */}
                  <SideBar />
            
                  {/* Main Content */}
                  <div className="flex-1 ml-64">
                    <NavBar />
            
        <div className="p-6">
            <TaskForm />
          </div>  
            <TaskTable />
        </div>
        </div>
        
    );
}
    
export default Task;
    
                  