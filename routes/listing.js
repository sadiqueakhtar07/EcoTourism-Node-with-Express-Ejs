const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const flash = require('connect-flash');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');


//require ccontrollers
const listingController = require('../controllers/listings.js');

//implements router.route for similar path
router.route('/')
    .get(wrapAsync(listingController.index))        //index Route
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));             //create route

//new route
router.get('/new', isLoggedIn, listingController.renderNewForm);


router.route('/:id')
    .get(isLoggedIn, wrapAsync(listingController.showListing)) //show  route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))      //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));                //delete route

    
//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
