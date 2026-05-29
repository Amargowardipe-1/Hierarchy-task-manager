const mongoose = require("mongoose");

const taskLogSchema = new mongoose.Schema({

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },

    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    oldStatus: {
        type: String,
        required: true
    },

    newStatus: {
        type: String,
        required: true
    },

    changedAt: {
        type: Date,
        default: Date.now
    }

});

const TaskLog = mongoose.model("TaskLog", taskLogSchema);

module.exports = TaskLog;