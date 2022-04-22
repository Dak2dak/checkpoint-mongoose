const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/name_of_the_database", () => {
        console.log("connected")
    }, (e) => console.error(e)
)