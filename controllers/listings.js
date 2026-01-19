//store all the callback here 

const Listing = require('../models/listing');

module.exports.index= async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {    
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const singleList = await Listing.findById(id).populate({path: "reviews", populate:{path:"author"}}).populate("owner");
    // console.log(singleList);
    if(!singleList){
        req.flash("error", "Doesn't Exists !");
        res.redirect('/listings');
    }
    res.render("listings/show.ejs", { singleList });
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    // console.log(newListing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Doesn't Exists !");
        res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid Data for Listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing= async(req,res)=>{
    let {id} = req.params;
    let deletedList= await Listing.findByIdAndDelete(id);
    req.flash("success", "Lsiting Deleted!");
    res.redirect('/listings');
};

