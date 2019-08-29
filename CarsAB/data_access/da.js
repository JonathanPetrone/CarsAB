const Person = require('../models/person');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/CarsAB',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    bcrypt.hash(p1.password, 10, function(err, hash){
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating customers" + err)
            }
            cb(err);
        });
    });
}


function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }}
                      ]
    }, function(err, customers){
        cb(err, customers);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting customers" + err);
       }
       cb(err);
    });
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, customers) {
        if(err) {
            console.log('Error getting customers' + err);
        }
        cb(err, customers);
    });
}



module.exports = {
    savePersonFromForm: savePerson,
    findPersons: getAllPersons,
    search: search,
    deleteUser: deleteUser,
};