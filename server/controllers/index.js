let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Enable JWT
let jwt = require('jsonwebtoken');
let DB = require('../config/db')

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('../views/index', {title: 'Home', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('../views/about', {title: 'About', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('../views/projects', {title: 'Projects', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('../views/services', {title: 'Services', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('../views/contact', {title: 'Contact', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        if (!user)
        {
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 //1 Week
            });

            /* res.json({success: true, msg: "User logged in successfully.", user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken}); */

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err)
        {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });
        }
        else
        {
            //res.json({success: true, msg: "User Registered Successfully!"});

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}