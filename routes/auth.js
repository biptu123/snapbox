const express = require("express");
const {
  LoginController,
  SignupController,
  VerifyController,
} = require("../controllers/auth");

const { requireSignIn, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", SignupController);
router.get("/verify/:token", VerifyController);
router.post("/login", LoginController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
