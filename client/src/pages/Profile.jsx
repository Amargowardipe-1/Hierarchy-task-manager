// src/pages/Profile.jsx

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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

        
        const taskRes = await axios.get(
          "http://localhost:8000/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const tasks =
          taskRes.data.tasks || [];

        
        const userRes = await axios.get(
          "http://localhost:8000/api/users",
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

      
      <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900">
        <Sidebar />
      </div>

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-8">

          <p className="uppercase tracking-[5px] text-gray-500 text-sm font-bold mb-2">
            Profile
          </p>

          <h1 className="text-5xl font-bold mb-10">
            My Profile
          </h1>

          
          <div className="bg-white rounded-xl shadow border p-8 flex items-center gap-6 mb-10">

            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">

              {user?.name?.charAt(0)}

            </div>

            {/* USER INFO */}
            <div>

              <h2 className="text-3xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-500 text-lg">
                {user?.email}
              </p>

              <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-4 py-1 rounded-full capitalize">

                {user?.role}

              </span>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* TOTAL TASKS */}
            <div className="bg-white p-6 rounded-xl shadow border">

              <h3 className="text-gray-500 font-semibold mb-2">
                Total Tasks
              </h3>

              <p className="text-4xl font-bold">
                {stats.totalTasks}
              </p>

            </div>

            {/* COMPLETED */}
            <div className="bg-white p-6 rounded-xl shadow border">

              <h3 className="text-gray-500 font-semibold mb-2">
                Completed Tasks
              </h3>

              <p className="text-4xl font-bold text-green-500">
                {stats.completedTasks}
              </p>

            </div>

            {/* PENDING */}
            <div className="bg-white p-6 rounded-xl shadow border">

              <h3 className="text-gray-500 font-semibold mb-2">
                Pending Tasks
              </h3>

              <p className="text-4xl font-bold text-yellow-500">
                {stats.pendingTasks}
              </p>

            </div>

            {/* USERS */}
            <div className="bg-white p-6 rounded-xl shadow border">

              <h3 className="text-gray-500 font-semibold mb-2">
                Total Users
              </h3>

              <p className="text-4xl font-bold text-blue-500">
                {stats.totalUsers}
              </p>

            </div>

          </div>

          {/* ACTIVITY */}
          <div className="bg-white mt-10 rounded-xl shadow border p-8">

            <h2 className="text-2xl font-bold mb-6">
              Work Summary
            </h2>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between border-b pb-3">

                <span>
                  Tasks Created
                </span>

                <span className="font-bold">
                  {stats.totalTasks}
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>
                  Tasks Completed
                </span>

                <span className="font-bold text-green-500">
                  {stats.completedTasks}
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>
                  Pending Tasks
                </span>

                <span className="font-bold text-yellow-500">
                  {stats.pendingTasks}
                </span>

              </div>

              <div className="flex justify-between">

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