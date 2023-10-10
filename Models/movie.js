const mongoose = require('mongoose')
const schema = mongoose.Schema;
const movieSchmea = new schema({
    name: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: true
    },
    rating: {
        type: Number
    },
    cast: {
        type: Array,
        default: null
    },
    language: {
        type: String, enum: [' HINDI', "ENGLISH"]
    }
    ,
    imageUrl: {
        type: String
    }
},
    { timestamps: true, collection: "movies" }
)
module.exports = mongoose.model("movies", movieSchmea)