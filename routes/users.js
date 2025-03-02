const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
   

// * Sign up form
router.get(
  "/signup", 
  userController.renderSignUpForm
);

// * Sign up process
router.post(
  "/signup",
  wrapAsync(userController.signUp)
);

// *Log in form
router.get(
  "/login", 
  userController.renderLogInForm
);

// * Log in process
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.logIn
);

// * Log out process
router.get(
  "/logout", 
  userController.logOut
);

module.exports = router;
