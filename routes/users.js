const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
router
  .route("/signup")
  .post(validateBody(schemas.signUpSchema), UsersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.signInSchema),
    passportSignIn,
    UsersController.signIn
  );

router.route("/signout").get(passportJWT, UsersController.signOut);
router.route("/oauth/google/signin").post(UsersController.googleOAuthsignin);
router.route("/oauth/google/signup").post(UsersController.googleOAuthsignup);
router.route("/update").post(passportJWT, UsersController.updateuser);
router.route("/profile").get(passportJWT, UsersController.profile);
router.route("/employes").get(passportJWT, UsersController.getallemployes);
router.route("/checkauth").get(passportJWT, UsersController.checkAuth);
router.route("/getmeeting").get(passportJWT, UsersController.getmeeting);
router.route("/delete").post(UsersController.deletemeeting);
router.route("/addmeeting").post(passportJWT, UsersController.postmeeting);

router
  .route("/auth/linkedin/signup")
  .get(passport.authenticate("linkedin", { state: "77133" }), function(
    req,
    res
  ) {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  });

router.route("/auth/linkedin/callback/signup").get(
  passport.authenticate("linkedin", {
    failureRedirect: "http://localhost:3000/signup?valu=unsccessful"
  }),
  UsersController.addlinkedinprofile
);

router
  .route("/auth/linkedin/signin")
  .get(passport.authenticate("linkedinn", { state: "77133" }), function(
    req,
    res
  ) {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  });

router.route("/auth/linkedin/callback/signin").get(
  passport.authenticate("linkedinn", {
    failureRedirect: "http://localhost:3000/signin?valu=unsccessful"
  }),
  UsersController.checklinkedinprofile
);
module.exports = router;
