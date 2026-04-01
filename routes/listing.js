const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig/cloudinary");

// ✅ Multer setup
const upload = multer({ storage });

// ✅ Routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"), // IMPORTANT: "image" must match the input name in your form
    wrapAsync(listingController.createListing)
  );

// New form route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show route
router.get("/:id", wrapAsync(listingController.showListing));

// Edit form route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner,upload.single("image"), wrapAsync(listingController.updateListing));

// Delete route
router.delete("/:id", isLoggedIn, isOwner,wrapAsync(listingController.destroyListings));

module.exports = router;
