const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

//require controller
const userController = require('../controllers/user.js');

//implements router.route for same path
router.route('/signup')
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signup));

router.route('/login')
    .get(userController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.login);            //for authencation


router.get('/logout', userController.logout);

module.exports = router;