const mongoose = require('mongoose') 

const clientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: {
        type: [String],
        required: true
    },
    meta: {
        votes: Number,
        favs:  Number
    }
})


