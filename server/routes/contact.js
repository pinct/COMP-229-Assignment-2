let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let contactController = require('../controllers/contact');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//Get Route for contact list page
router.get('/', contactController.displayContactList);

//Get Route for displaying Add page

router.get('/add', requireAuth, contactController.displayAddPage);

//Post route for processing Add page

router.post('/add',  requireAuth, contactController.processAddPage);

//Get Route for displaying Edit page

router.get('/edit/:id',  requireAuth, contactController.displayEditPage);

//Post route for processing Edit page

router.post('/edit/:id',  requireAuth, contactController.processEditPage);

//Get Route for perform Delete

router.get('/delete/:id',  requireAuth, contactController.performDelete);

module.exports = router;