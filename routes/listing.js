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
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//index route
router.get('/', wrapAsync(listingController.index));

//new route
router.get('/new', isLoggedIn, listingController.renderNewForm);


//show route
router.get('/:id', isLoggedIn, wrapAsync(listingController.showListing));

//create route
router.post('/', isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.editListing));

//update route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
