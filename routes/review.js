const express = require('express');
const router = express.Router({mergeParams:true});
const Review=require('../models/review.js');
const Listing=require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

//require controller
const reviewController = require('../controllers/review.js');

//reviews: POST route
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//reviews: DELETE route
router.delete('/:reviewId',isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports=router;