//============= REFERENCING MONGOOSE ==============
const mongoose = require('mongoose'); 
const nodemon = require('nodemon');
const Schema = mongoose.Schema;

//========== CONNECTING TO THE DATABASE ===========
let db;
async function dbConnect() {
    console.log(">>mongo");
    const url = "mongodb://127.0.0.1:27017/contact2";
    mongoose.connect(url, { useNewUrlParser: true});
    db = mongoose.connection;
    db.once("open", (_) => {
        console.log("Database connected:", url)
    });

    db.on("error", (err) => {
        console.log("connection error:", err);
    })
}

dbConnect();

//========= DEFINING A PERSON SCHEMA  =============
let personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String],
    hometown: String 
})

//========== CREATING A PERSON MODEL ==============
let Person = mongoose.model('Person', personSchema, "list2")
// mongoose.model('model', schema, collection)

// CREATING AND SAVING A RECORD OF THE PREVIOUS MODEL
async function createAndSaveRecord () {
    let mike = new Person({
        name: 'Mike Bamenga', 
        age: 27,
        favoriteFoods: ["Pistache", "Alloco", "Pizza"],
        hometown: 'Abidjan'
    })

    // mike.save((err, personToSave) => {
    //     err ? console.log(err) : done(null, personToSave)
    // })
    await mike.save();
}

//=== CREATING MANY RECORDS WITH model.create() ====
let arrayOfPeople = [
    {
        name: 'Jack Kamani', 
        age: 25,
        favoriteFoods: ["Pistache", "Pizza"],
        hometown: 'Abidjan'
    },
    {
        name: 'Will Okafor', 
        age: 37,
        favoriteFoods: ["Ogbono Soup", "Jollof Rice", "Pizza"],
        hometown: 'Abuja'
    },
    {
        name: 'Didier Koffi', 
        age: 30,
        favoriteFoods: ["N'gbô", "foutou", "Puff-Puff"],
        hometown: 'Bouaké'
    },
    {
        name: 'Matt Yamattoho', 
        age: 22,
        favoriteFoods: ["Burrito", "Sushi", "pizza"],
        hometown: 'Tokyo'
    }
]

let createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, createdPeople) => {
        if(err) {
            console.log(err)
        }else {
            done(null, createdPeople)
        }
    })
    console.log(createdPeople)
}

//USING model.find() TO SEARCH THROUGH THE DATABASE
let findAllThePeopleByAGivenName = (name, done) => {
    Person.find({name: name}, (err, peopleFound) => {
        err ? console.log(err) : done(null, peopleFound)
    })
    console.log(createdPeople)
}

// USING model.findOne() TO RETURN A SINGLE MATCHING DOCUMENT FROM THE DATABASE
let findOnePersonByHisFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, personFound) => {
        if(err) return console.log(err)
        done(null, personFound)
    })
}

// USING model.findById() TO SEARCH THROUGH THE DATABASE BY _ID
let findPersonById = (personId, done) => {
    Person.findById(personId, (err, result) => {
        if(err) {
            console.log(err)
        }else {
            done(null, result)
        }
    })
}

// PERFORMING CLASSIC UPDATES BY RUNNING Find, Edit, THEN Sav
let classicUpdate = (personId, done) => {
    Person.findById(personId, (err, person) => {
        if(err) return console.log(err)
        person.favoriteFoods.push("hamburger")
        person.save((err, data) => {
            if(err) return console.log(err)
            done(null, data) 
        })
    })
}

// PERFORMING NEW UPDATES ON A DOCUMENT USING model.findOneAndUpdate()
let findPersonAndUpdateThem = (personName, done) => {
    Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, 
        (err, updatedPerson) => {
            if(err) return console.log(err)
            done(null, updatedPerson)
        })
}

// DELETING ONE DOCUMENT USING model.findByIdAndRemove 
let deleteSomeoneById = (personId, done) => {
    Person.findOneAndRemove({id: personId}, (err, deletedPerson) => {
        if(err) return console.log(err)
        done(null, deletedPerson)
    })
}

// DELETING MANY DOCUMENTS WITH model.remove()
let deleteMany = (done) => {
    const nameToRemove = "Mary"
    Person.remove(nameToRemove, (err, removedInfo) => {
        done(err, removedInfo)
    })
}

// CHAINING SEARCH QUERY HELPERS TO NARROW SEARCH RESULTS
let chainingSearchQuery = (done) => {
    Person.find({favoriteFoods: "burrito"})
        .sort({name: 'asc'})
        .limit(2)
        .select('-age')
        .exec((err, results) => {
            console.log(results)
            done(err, results)
        })
}