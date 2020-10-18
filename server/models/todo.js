const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = model("todo", todoSchema)
