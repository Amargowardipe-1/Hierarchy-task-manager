import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../api/axios";

function UsersCountByRole(){

    const [UsersRole, setUsersRole]= useState({
        superAdmin: 0,
        admin:0,
        manager:0,
        employee:0
    });

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try{
            const token= localStorage.getItem('token');
            const res = await API.get("/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const users= res.data;
            console.log("users by role",users);

            const superAdmin = users.filter((user)=> user.role==="super-admin").length;
            const admin = users.filter((user)=> user.role==="admin").length;
            const manager = users.filter((user)=> user.role==="manager").length;
            const employee = users.filter((user)=> user.role==="employee").length;
          
            setUsersRole({
                superAdmin,
                admin,
                manager,
                employee
            });
        }catch(error){
            console.error("userrole fetching error", error);
        }
    }
        fetchUsers();
    },[])


const TotalUsers= UsersRole.superAdmin+ UsersRole.admin+UsersRole.manager+UsersRole.employee;

function getWidth(count){
    if(!count) return "0";
    return `${(count/TotalUsers)*100}%`;
}

return(
    <div className="bg-white mt-10 p-6 rounded shadow w-full max-w-sm ">

      
      <h3 className="text-xs tracking-[5px] text-gray-500 font-semibold mb-6 uppercase">

        User By Role

      </h3>

      
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Super-Admin
          </span>

          <span>
            {UsersRole.superAdmin}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">
         
          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(UsersRole.admin)
            }}
          />

        </div>
        

      </div>

      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Admin
          </span>

          <span>
            {UsersRole.admin}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(UsersRole.admin)
            }}
          />

        </div>

      </div>

      
      <div className="mb-5">

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Manager
          </span>

          <span>
            {UsersRole.manager}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(UsersRole.manager)
            }}
          />

        </div>

      </div>

      {/* CLOSED */}
      <div>

        <div className="flex justify-between mb-1">

          <span className="font-medium">
            Employee
          </span>

          <span>
            {UsersRole.employee}
          </span>

        </div>

        <div className="w-full bg-gray-200 h-1.5 rounded">

          <div
            className="bg-blue-500 h-1.5 rounded"
            style={{
              width: getWidth(UsersRole.employee)
            }}
          />

        </div>

      </div>

    </div>

  );

}

export default UsersCountByRole;
