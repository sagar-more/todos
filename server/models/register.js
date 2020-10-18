const { Schema, model } = require("mongoose");

const registerSchema = new Schema({
    userEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

registerSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
});

module.exports = model("register", registerSchema);
