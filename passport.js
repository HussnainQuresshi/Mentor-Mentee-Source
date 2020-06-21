const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const config = require("./configuration");
const User = require("./models/user");
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

//linked in

passport.use(
  "linkedin",
  new LinkedinStrategy(
    {
      clientID: "81tbswt0biyb51",
      clientSecret: "vHTwTwuCUENV5ZRu",
      callbackURL: "http://localhost:5000/users/auth/linkedin/callback/signup",
      scope: ["r_liteprofile", "r_emailaddress"],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...

      process.nextTick(function() {
        // console.log(res);
        // To keep the example simple, the user's Linkedin profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Linkedin account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);
passport.use(
  "linkedinn",
  new LinkedinStrategy(
    {
      clientID: "81tbswt0biyb51",
      clientSecret: "vHTwTwuCUENV5ZRu",
      callbackURL: "http://localhost:5000/users/auth/linkedin/callback/signin",
      scope: ["r_liteprofile", "r_emailaddress"],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...

      process.nextTick(function() {
        // console.log(res);
        // To keep the example simple, the user's Linkedin profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Linkedin account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);
// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.JWT_SECRET,
      passReqToCallback: true
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        req.user = user;

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ email: email });

        // If not, handle it
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
