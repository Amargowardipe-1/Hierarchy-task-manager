const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../.env" });

const connectDB = require("../config/db");
const User = require("../models/User");
const Task = require("../models/Task");

const TaskData= async ()=>{

    try {
        await connectDB();

        userTo = await User.findOne({ role: "admin" });
        userBy = await User.findOne({ role: "super-admin" });


      const tasks = await Task.insertMany([
            {
                title: "Design Homepage",
                description: "Create a responsive homepage design",
                priority: "High",
                status: "To Do",
                dueDate: new Date("2024-12-01"),
                assignedBy: userBy._id,
                assignedTo: userTo._id,
               
            },
            {
                title: "Implement Authentication",
                description: "Set up user authentication with JWT",
                priority: "Medium",
                status: "To Do",
                dueDate: new Date("2024-12-01"),
                assignedBy: userBy._id,
                assignedTo: userTo._id,
            
            }

        ])

        console.log("Task Data Seeded");

        process.exit();

    }
    catch (error) {
        console.log(error);
    }
}

TaskData();