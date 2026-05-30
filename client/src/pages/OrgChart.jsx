// src/pages/OrgChart.jsx

import { useEffect, useState } from "react";
import axios from "axios";

import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import API from "../api/axios";

function OrgChart() {

  

  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState(null);

  

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const token = localStorage.getItem("token");

        const currentUser = JSON.parse(
          localStorage.getItem("user")
        );

        console.log("Current User:", currentUser);

        setCurrUser(currentUser);

        const res = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data =
          res.data.users || res.data;

        console.log("All Users:", data);

        setUsers(data);

      } catch (error) {

        console.error(
          "Error fetching users:",
          error
        );

      }

    };

    fetchUsers();

  }, []);


  const getChildren = (parentId) => {

    return users.filter((user) => {

      if (!user.reportsTo)
        return false;

      // reportsTo populated object
      if (typeof user.reportsTo ==="object") {

        return (
          user.reportsTo._id?.toString() ===
          parentId.toString()
        );

      }

      // reportsTo direct id
      return (
        user.reportsTo.toString() ===
        parentId.toString()
      );

    });

  };

  
  let rootUsers = [];

  console.log("currUser ID:", currUser?.id);

users.forEach((user) => {
  console.log("USER ID:", user._id);
});

  if (currUser) {

    if (
      currUser.role ===
      "super-admin"
    ) {

      rootUsers = users.filter(
        (user) =>
          user.role ===
          "super-admin"
      );

    }

    else {

      rootUsers = users.filter(
        (user) =>
          user._id?.toString() ===
          currUser.id?.toString()
      );

    }

  }

  console.log("Root Users:", rootUsers);

  
  const UserCard = ({
    user,
    level = 0
  }) => {

    const children =
      getChildren(user._id);

    return (

     <div className="ml-2 md:ml-8">

      {/* USER ROW */}
      <div className="flex items-start gap-3 md:gap-4 mb-6">

        {level !== 0 && (
          <div className="text-gray-400 mt-2 shrink-0">
            └
          </div>
        )}

        {/* AVATAR */}
        <div className="
          w-10 h-10 md:w-12 md:h-12
          rounded-full
          bg-blue-100
          border
          flex
          items-center
          justify-center
          font-bold
          uppercase
          shrink-0
        ">
          {user.name?.charAt(0)}
        </div>

        {/* USER INFO */}
        <div className="min-w-0">

          <h3 className="font-bold text-base md:text-lg break-words">
            {user.name}
          </h3>

          <p className="uppercase tracking-[2px] md:tracking-[3px] text-[10px] md:text-xs text-gray-500">
            {user.role}
          </p>

          <p className="text-xs md:text-sm text-gray-600 break-all">
            {user.email}
          </p>

        </div>

      </div>

      {/* CHILDREN */}
      {children.length > 0 && (

        <div className="ml-3 md:ml-6 border-l border-gray-300 pl-3 md:pl-6">

          {children.map((child) => (

            <UserCard
              key={child._id}
              user={child}
              level={level + 1}
            />

          ))}

        </div>

      )}

    </div>

  );

};

  
  // UI
 

  return (

    <div className="flex bg-gray-50 min-h-screen">

  <SideBar />

  <div className="flex-1 md:ml-64">

    <NavBar />

    {/* PAGE */}
    <div className="p-4 md:p-8">

      <p className="uppercase tracking-[3px] md:tracking-[5px] text-xs md:text-sm font-bold text-gray-500 mb-2">
        Hierarchy
      </p>

      <h1 className="text-2xl md:text-4xl font-bold mb-3">
        Organisation Chart
      </h1>

      <p className="text-gray-600 mb-6 md:mb-10 text-sm md:text-lg">
        Live reporting hierarchy of users.
      </p>

      {/* CHART */}
      <div className="bg-white rounded shadow border p-4 md:p-8 min-h-[500px] overflow-x-auto">

        {rootUsers.length > 0 ? (

          rootUsers.map((user) => (

            <UserCard
              key={user._id}
              user={user}
            />

          ))

        ) : (

          <p className="text-gray-500">
            No hierarchy found
          </p>

        )}

      </div>

    </div>

  </div>

</div>

  );

}

export default OrgChart;