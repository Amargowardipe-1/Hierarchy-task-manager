const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");
const TaskLog = require("../models/TaskLog");


const createTask = async (req, res) => {
    const { title, description, assignedTo, dueDate, status, priority } = req.body;
    const userId = req.user.id;

    try{
        const assignedUser = await User.findById(assignedTo);

        if (!assignedUser){
            return res.status(400).json({message: "Invalid assignedTo user"});
        }

        const task = new Task({
            title,
            description,
            priority,
            assignedTo: assignedUser._id,
            assignedBy: userId,
            dueDate,
            status

        });

        await task.save();
        res.status(201).json({message: "Task created successfully", task});
    } catch (error) {

   console.log(error);

   res.status(500).json({
      message: error.message
   });

}
};



const getTasks = async (req, res) => {

    const userId = req.user.id;
    const userRole = req.user.role;

    try {

        let tasks = [];

        

        if (userRole === "super-admin") {

            tasks = await Task.find()

                .populate(
                    "assignedTo",
                    "name role"
                )

                .populate(
                    "assignedBy",
                    "name role"
                );

        }

       

        else if (userRole === "admin") {

            // MANAGERS UNDER ADMIN
            const managers =
                await User.find({
                    reportsTo: userId,
                    role: "manager"
                }).select("_id");

            const managerIds =
                managers.map(
                    (m) => m._id
                );

            // EMPLOYEES UNDER MANAGERS
            const employees =
                await User.find({
                    reportsTo: {
                        $in: managerIds
                    },
                    role: "employee"
                }).select("_id");

            const employeeIds =
                employees.map(
                    (e) => e._id
                );

            // ALL ACCESSIBLE IDS
            const allIds = [
                userId,
                ...managerIds,
                ...employeeIds
            ];

            tasks = await Task.find({

                $or: [

                    // task assigned TO them
                    {
                        assignedTo: {
                            $in: allIds
                        }
                    },

                    // task assigned BY them
                    {
                        assignedBy: {
                            $in: allIds
                        }
                    }

                ]

            })

                .populate(
                    "assignedTo",
                    "name role"
                )

                .populate(
                    "assignedBy",
                    "name role"
                );

        }

        

        else if (userRole === "manager") {

            // EMPLOYEES UNDER MANAGER
            const employees =
                await User.find({
                    reportsTo: userId,
                    role: "employee"
                }).select("_id");

            const employeeIds =
                employees.map(
                    (e) => e._id
                );

            const allIds = [
                userId,
                ...employeeIds
            ];

            tasks = await Task.find({

                $or: [

                    {
                        assignedTo: {
                            $in: allIds
                        }
                    },

                    {
                        assignedBy: {
                            $in: allIds
                        }
                    }

                ]

            })

                .populate(
                    "assignedTo",
                    "name role"
                )

                .populate(
                    "assignedBy",
                    "name role"
                );

        }

       

        else if (userRole === "employee") {

            tasks = await Task.find({

                $or: [

                    {
                        assignedTo: userId
                    },

                    {
                        assignedBy: userId
                    }

                ]

            })

                .populate(
                    "assignedTo",
                    "name role"
                )

                .populate(
                    "assignedBy",
                    "name role"
                );

        }

       
        return res.status(200).json({

            message:
                "Tasks retrieved successfully",

            tasks

        });

    } catch (error) {

        return res.status(500).json({

            message:
                "Error retrieving tasks",

            error: error.message

        });

    }

};

const updateTask = async (req, res) => {

    const { id } = req.params;

    const { title, description, assignedTo,  dueDate, status, priority } = req.body;

    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        // FIND TASK

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

       

        if (userRole === "super-admin") {

            if (assignedTo) {

                const assignedUser = await User.findById(assignedTo);

                if (!assignedUser) {
                    return res.status(400).json({
                        message: "Assigned user not found"
                    });
                }

                task.assignedTo = assignedTo;
            }

            if (title) task.title = title;

            if (description) task.description = description;

            if (dueDate) task.dueDate = dueDate;

            if (priority) task.priority = priority;

            if (status) {

                const oldStatus = task.status;

                task.status = status;

                await TaskLog.create({
                    taskId: task._id,
                    changedBy: userId,
                    oldStatus,
                    newStatus: status
                });
            }
        }

       

        else if (task.assignedBy.toString() === userId) {

            if (assignedTo) {

                const assignedUser = await User.findById(assignedTo);

                if (!assignedUser) {
                    return res.status(400).json({
                        message: "Assigned user not found"
                    });
                }

                task.assignedTo = assignedTo;
            }

            if (title) task.title = title;

            if (description) task.description = description;

            if (dueDate) task.dueDate = dueDate;

            if (priority) task.priority = priority;

            if (status) {

                const oldStatus = task.status;

                task.status = status;

                await TaskLog.create({
                    taskId: task._id,
                    changedBy: userId,
                    oldStatus,
                    newStatus: status
                });
            }
        }
        

        else if (task.assignedTo.toString() === userId) {

            if (!status) {
                return res.status(403).json({
                    message: "You can only update task status"
                });
            }

            const allowedStatuses = [
                "To Do",
                "In Progress",
                "Done",
                "Closed"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }

            const oldStatus = task.status;

            task.status = status;

            await TaskLog.create({
                taskId: task._id,
                changedBy: userId,
                oldStatus,
                newStatus: status
            });

        }
        // UNAUTHORIZED User
        else {

            return res.status(403).json({
                message: "Forbidden"
            });

        }
      

        await task.save();

        const updatedTask = await Task.findById(task._id)
              .populate("assignedTo", "name role")
              .populate("assignedBy", "name role");


        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error updating task",
            error: error.message
        });

    }

};

// DELETE TASK

    const deleteTask = async (req, res) => {

    const { id } = req.params;

    const userId = req.user.id;

    const userRole = req.user.role;

    try {

        // FIND TASK

        const task = await Task.findById(id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        // ============================================
        // SUPER ADMIN -> CAN DELETE ANY TASK
        // ============================================

        if (userRole === "super-admin") {

            await Task.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Task deleted successfully"
            });

        }

        // ============================================
        // TASK CREATOR -> CAN DELETE
        // ============================================

        if (
            task.assignedBy.toString() ===
            userId
        ) {

            await Task.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Task deleted successfully"
            });

        }

       
        return res.status(403).json({
            message: "You are not allowed to delete this task"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });

    }

};



module.exports = { updateTask , getTasks, createTask, deleteTask};