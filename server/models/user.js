/*
  user.js
  Michael Courneya
  301106259
  10/25/2020
*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: "Username is required"
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "Email address is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

//Configure options for user model

let options = ({missingPasswordError: "Wrong/Missing Password"});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User);