let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/projects', indexController.displayProjectsPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contact', indexController.displayContactPage);

//Login

router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

//Register

router.get('/register', indexController.displayRegisterPage);

router.post('/register', indexController.processRegisterPage);

//Logout

router.get('/logout', indexController.performLogout);

module.exports = router;
