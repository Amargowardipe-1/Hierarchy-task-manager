import {useEffect, useState} from "react";
import TaskTable from "../components/TaskTable";
import TaskHeader from "../components/TaskForm";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Task() {

    return (
        
            <div className="flex">
                  {/* Sidebar */}
                  <Sidebar />
            
                  {/* Main Content */}
                  <div className="flex-1 ml-64">
                    <Navbar />
            
        <div className="p-6">
            <TaskHeader />
          </div>  
            <TaskTable />
        </div>
        </div>
        
    );
}
    
export default Task;
    
                  