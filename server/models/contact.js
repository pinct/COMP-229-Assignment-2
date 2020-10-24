/*
  contact.js
  Michael Courneya
  301106259
  10/25/2020
*/

let mongoose = require('mongoose');

//Create model class
let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);