const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// * Index Route
router.get(
  "/", 
  listingController.index
);

// * New Route
router.get(
  "/new", 
  isLoggedIn, 
  wrapAsync(listingController.renderNewForm)
);

// * Show Route
router.get(
  "/:id", 
  wrapAsync(listingController.showListings)
);

// * Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing, 
  wrapAsync(listingController.createListings)
);

// * Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// * Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListings)
);

// * Delete Listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListings)
);

module.exports = router;
