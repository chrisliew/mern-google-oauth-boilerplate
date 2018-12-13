const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// This pulls model FROM mongoose,
const User = mongoose.model("users");

// After confirm that we have user, have to serialize user to pull cookie out from it. Done is the callback to nudge along passport
passport.serializeUser((user, done) => {
  // This is NOT the Google user id.  This is the MONGO id. This is because if we don't have just Google, if we use Facebook or something else, we can still pull this user.id out.
  done(null, user.id);
});

// This is to convert the user back to the model schema
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // Looks to see if googleId
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // We already have a record with the given ID
          done(null, existingUser);
        } else {
          // We don't have a user record with this ID, make a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
