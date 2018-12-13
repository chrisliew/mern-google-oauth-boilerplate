const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const router = express.Router();

// @route   GET /auth/google
// @desc    Login Page for Google OAuth
// @access  Public
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /auth/google/callback
// @desc    Login Page for Google OAuth
// @access  Public
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

// @route   GET /auth/google/current_user
// @desc    Current User for Google OAuth
// @access  Private
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

// @route   GET /auth/google/logout
// @desc    Current User for Google OAuth
// @access  Private
router.get("/logout", (req, res) => {
  req.logout();
  // Proves that user is logged out
  res.send(req.user);
});

module.exports = router;
