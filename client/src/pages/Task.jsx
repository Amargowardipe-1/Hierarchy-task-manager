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
  <div className="flex-1 md:ml-64">

    <NavBar />

    <div className="p-4 md:p-6">

      <TaskForm />

      <div className="mt-6">
        <TaskTable />
      </div>

    </div>

  </div>

</div>
        
    );
}
    
export default Task;
    
                  