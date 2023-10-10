const mongoose = require('mongoose')
const schema = mongoose.Schema;
const userSchmea = new schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // mobile: {
        //     type: String,
        //     required: [true, "Mobile Number Required"],
        //     unique: [true, "Mobile already Exists"],
        //     validate: [(val) => val.length === 10, "Mobile Number should 10 digit."],
        // },
        address: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Mobile Number Required"],
            unique: [true, "Mobile already Exists"],
        },
        password: {
            type: String, required: true
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        otp: {
            type: String,
            default: null,
        },
        token: {
            type: String,
            default: null,
        },
        imageName: {
            type: String,
        },
        url: {
            type: String,
        },

    },
    { timestamps: true, collection: "user" }
)
module.exports = mongoose.model("user", userSchmea)