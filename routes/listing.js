const express = require('express');
const router = express.Router();
const Listing=require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const flash = require('connect-flash');
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');


//index route
router.get('/', wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
})
);

//new route
router.get('/new', isLoggedIn, (req, res) => {    
    res.render("listings/new.ejs");
});


//show route
router.get('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const singleList = await Listing.findById(id).populate("reviews").populate("owner");
    // console.log(singleList);
    if(!singleList){
        req.flash("error", "Doesn't Exists !");
        res.redirect('/listings');
    }
    res.render("listings/show.ejs", { singleList });
})
);

//create route
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    // console.log(newListing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
    })
);


//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Doesn't Exists !");
        res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { listing });
})
);

//update route
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid Data for Listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

router.delete('/:id',  isLoggedIn, isOwner, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletedList= await Listing.findByIdAndDelete(id);
    req.flash("success", "Lsiting Deleted!");
    res.redirect('/listings');
}));

module.exports=router;
