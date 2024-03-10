const express = require("express");
const {
  LoginController,
  SignupController,
  VerifyController,
} = require("../controllers/auth");

const { requireSignIn, isAdmin } = require("../middlewares/auth");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", SignupController);
router.get("/verify/:token", VerifyController);
router.post("/login", LoginController);
router.get("/user-auth", requireSignIn, async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  res.status(200).send({ ok: true, user });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
