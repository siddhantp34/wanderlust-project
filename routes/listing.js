const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings");

// 1. Import Multer and your Cloudinary Storage
const multer = require('multer');
const { storage } = require("../cloudConfig.js"); // This connects to Cloudinary
const upload = multer({ storage }); // Multer now uses Cloudinary instead of 'uploads/' folder

// Grouping Index and Create routes
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.createListing)
    );

// New Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Grouping Show, Update, and Delete routes
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;