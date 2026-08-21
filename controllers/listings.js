const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig/cloudinary");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    console.log("📸 Multer File Object:", req.file);
    console.log("📝 Form Data:", req.body.listing);

    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };

    }

    await listing.save();
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("❌ Error creating listing:", err);
    next(err);
  }
};


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings",{listing });
  }

  let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
   res.render("listings/edit.ejs", { listing, originalImageUrl })
};

module.exports.updateListing = async (req, res) => {
    try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Handle new image upload (if any)
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("❌ Error updating listing:", err);
    req.flash("error", "Error updating listing!");
    res.redirect("/listings");
  }};


module.exports.destroyListings = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  console.log(deletedListing);
  res.redirect("/listings");
};

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});

    console.log("NUMBER OF LISTINGS:", allListings.length);

    res.render("listings/index.ejs", { allListings });
};