const Listing = require("../models/listing");
const Review = require("../models/reviews");


module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found!");

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("New review saved:", newReview);
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    console.log("Review deleted");
    res.redirect(`/listings/${id}`);
};