// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title:{ 
     type:String,
     required: true
  },
  description:{
    type: String,
    required :true
  },
  priority: {
     type: String, enum: ["low", "medium", "high"],
      default: "medium"
     },
  status: { 
    type: String, 
    enum: ["To Do", "In Progress", "Done", "Closed"],
     default: "To Do"
     },
  dueDate: Date,
  assignedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
    },
    createdAt : {
        type: Date,
        default: Date.now,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        default: null
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
