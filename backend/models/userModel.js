const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const messageModel = mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },

});