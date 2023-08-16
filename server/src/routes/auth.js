const router = require("express").Router();
const passport = require("../configs/passport");
const controller = require("../controllers/auth");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",

  function (req, res, next) {
    passport.authenticate("google", (err, profile) => {
      if (profile) {
        req.user = profile;
        next();
      } else {
        return res.redirect(`${process.env.CLIENT_URL}/user/login?message=0`);
      }
    })(req, res, next);
  },
  controller.loginGoogle
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], session: false })
);

router.get(
  "/facebook/callback",
  function (req, res, next) {
    passport.authenticate("facebook", (err, profile) => {
      if (profile) {
        req.user = profile;
        next();
      } else {
        return res.redirect(`${process.env.CLIENT_URL}/user/login?message=0`);
      }
    })(req, res, next);
  },
  controller.loginFacebook
);

module.exports = router;
