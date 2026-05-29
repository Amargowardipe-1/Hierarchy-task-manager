const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
          type: String,
          required: true,
          unique: true
    },
    passwordHash: {
        type : String,
        required: true

    },
    role: {
        type: String,
        enum: ["super-admin", "admin", "manager", "employee"],
        required:true
    },
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;