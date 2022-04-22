const mongoose = require('mongoose')

const Schema = mongoose

const clientSchema = new Schema({
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


