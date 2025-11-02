const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn} = require("../middleware.js")

//index
router.get("/",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});



//New Route
router.get("/new",isLoggedIn, (req,res)=>{
   return res.render("listings/new.ejs");
})

//Show route
router.get("/:id", async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
});

//Create Route
router.post("/",wrapAsync(async (req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
     
}));


//Edit route
router.get("/:id/edit",isLoggedIn, async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
});

//update route
router.put("/:id",isLoggedIn, async(req,res)=>{
    let { id }= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", " Listing Updated!");
    res.redirect(`/listings/${id}`);
});

// delete route
router.delete("/:id",isLoggedIn,async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    console.log(deletedListing);
    res.redirect("/listings");
});

// router.use((req, res, next) => {
//     console.log("Unmatched route:", req.method, req.originalUrl);
//     next(new ExpressError(404, "Page Not Found!"));
// });


// router.use((err, req, res, next) => {
//     let { statusCode = 500, message = "Something went wrong" } = err;
//     res.status(statusCode).render("error.ejs", { message });
// });


module.exports=router;