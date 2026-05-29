const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});
const RefreshToken = mongoose.model("RefreshToken",refreshTokenSchema);
module.exports = RefreshToken;