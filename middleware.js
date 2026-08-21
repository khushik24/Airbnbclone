const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // Save last page user tried to access
        req.flash("error", "You must be logged in to do that!");
        return res.redirect("/login");
    }
    next();
};

// ✅ Middleware: Save redirect URL (after successful login)
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.redirectUrl = req.session.returnTo;
        delete req.session.returnTo; // Clean up session
    }
    next();
};

// ✅ Middleware: Verify Listing Owner
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to modify this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// ✅ Middleware: Verify Review Author
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ExpressError(404, "Review not found!");
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to delete this review!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
