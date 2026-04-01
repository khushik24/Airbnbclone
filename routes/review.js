const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js")

// CREATE Review
router.post("/", isLoggedIn, wrapAsync(reviewController.createReview ))

// DELETE Review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
