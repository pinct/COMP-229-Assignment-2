let mongoose = require('mongoose');

//Create model class
let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "assignment2"
});

module.exports = mongoose.model('Contact', contactModel);