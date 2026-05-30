// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import axios from "axios";

import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import API from "../api/axios";

function Profile() {

  

  const [user, setUser] = useState(null);

  
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalUsers: 0
  });

  
  useEffect(() => {

    const fetchProfileData = async () => {

      try {

        const token = localStorage.getItem("token");

        const currentUser =JSON.parse(localStorage.getItem("user") );

        setUser(currentUser);

        
        const taskRes = await API.get(
          "/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const tasks =
          taskRes.data.tasks || [];

        
        const userRes = await API.get(
          "/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const users =
          userRes.data.users ||
          userRes.data ||
          [];


        const completed =
          tasks.filter(
            (task) =>
              task.status === "Done" ||
              task.status === "Closed"
          ).length;

        const pending =
          tasks.filter(
            (task) =>
              task.status !== "Done" &&
              task.status !== "Closed"
          ).length;

        setStats({

          totalTasks: tasks.length,

          completedTasks: completed,

          pendingTasks: pending,

          totalUsers: users.length

        });

      } catch (error) {

        console.error(
          "Error fetching profile:",
          error
        );

      }

    };

    fetchProfileData();

  }, []);

  return (

    <div className="flex bg-gray-100 min-h-screen">

  <SideBar />

  <div className="flex-1 md:ml-64">

    <NavBar />

    <div className="p-4 md:p-8">

      {/* Header */}
      <p className="uppercase tracking-[3px] md:tracking-[5px] text-gray-500 text-xs md:text-sm font-bold mb-2">
        Profile
      </p>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10">
        My Profile
      </h1>

      {/* Profile Card */}
      <div
        className="
          bg-white
          rounded-xl
          shadow
          border
          p-4 md:p-8
          flex flex-col sm:flex-row
          items-center
          gap-6
          mb-10
        "
      >

        {/* Avatar */}
        <div
          className="
            w-20 h-20
            md:w-24 md:h-24
            rounded-full
            bg-blue-500
            text-white
            flex items-center justify-center
            text-3xl md:text-4xl
            font-bold
          "
        >
          {user?.name?.charAt(0)}
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left">

          <h2 className="text-2xl md:text-3xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500 text-sm md:text-lg break-all">
            {user?.email}
          </p>

          <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full capitalize">
            {user?.role}
          </span>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Total Tasks */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">

          <h3 className="text-gray-500 font-semibold mb-2">
            Total Tasks
          </h3>

          <p className="text-3xl md:text-4xl font-bold">
            {stats.totalTasks}
          </p>

        </div>

        {/* Completed */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">

          <h3 className="text-gray-500 font-semibold mb-2">
            Completed Tasks
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-green-500">
            {stats.completedTasks}
          </p>

        </div>

        {/* Pending */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">

          <h3 className="text-gray-500 font-semibold mb-2">
            Pending Tasks
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-yellow-500">
            {stats.pendingTasks}
          </p>

        </div>

        {/* Users */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow border">

          <h3 className="text-gray-500 font-semibold mb-2">
            Total Users
          </h3>

          <p className="text-3xl md:text-4xl font-bold text-blue-500">
            {stats.totalUsers}
          </p>

        </div>

      </div>

      {/* Work Summary */}
      <div className="bg-white mt-10 rounded-xl shadow border p-4 md:p-8">

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          Work Summary
        </h2>

        <div className="space-y-4 text-sm md:text-lg">

          <div className="flex justify-between items-center border-b pb-3">

            <span>
              Tasks Created
            </span>

            <span className="font-bold">
              {stats.totalTasks}
            </span>

          </div>

          <div className="flex justify-between items-center border-b pb-3">

            <span>
              Tasks Completed
            </span>

            <span className="font-bold text-green-500">
              {stats.completedTasks}
            </span>

          </div>

          <div className="flex justify-between items-center border-b pb-3">

            <span>
              Pending Tasks
            </span>

            <span className="font-bold text-yellow-500">
              {stats.pendingTasks}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <span>
              Managed Users
            </span>

            <span className="font-bold text-blue-500">
              {stats.totalUsers}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>
  );
}

export default Profile;