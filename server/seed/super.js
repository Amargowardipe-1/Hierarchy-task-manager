const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../.env" });

const connectDB = require("../config/db");
const User = require("../models/User");

const seedSuperAdmin = async () => {

    try {

        await connectDB();
        const existingAdmin = await User.findOne({
            role: "employee"
        });

        if (existingAdmin) {
            console.log(" Employee already exists");
            process.exit();
        }

        

        const hashedPassword = await bcrypt.hash("Employee@123", 10);

        await User.insertOne({

            name: "Employee",

            email: "employee@gmail.com",

            passwordHash: hashedPassword,

            role: "employee"

        });

        console.log("Employee Created");

        process.exit();

    } catch (error) {

        console.log(error);

      

    }

};

seedSuperAdmin();