const User = require("../models/user.js");


// * Sign up form
module.exports.renderSignUpForm = async (req, res) => {
  res.render("users/signup.ejs");
};

// * Sign up process
module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      req.flash("success", "Welcome to STAYZY");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

// * Log in form
module.exports.renderLogInForm = async (req, res) => {
  res.render("users/login.ejs");
};

// * Log in process
module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome back to STAYZY!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// * Log out process
module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out Successfully!");
    res.redirect("/listings");
  });
};
