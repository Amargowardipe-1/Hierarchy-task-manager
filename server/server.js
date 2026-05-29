const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");


const app = express();
// Connect to MongoDB
connectDB();


// Middleware
app.use(cors({
   origin: "https://hierarchy-task-manager.vercel.app",

   credentials: true }));
app.use(express.json());




app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);




app.listen(8000, ()=> {
    console.log('server is running on port 8000');
})
