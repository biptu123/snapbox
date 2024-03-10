const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getUserController,
  getCardInfoController,
  getPaymentsController,
} = require("../controllers/user");
const router = express.Router();

router.get("/cardinfo/:username", getCardInfoController);
router.get("/payments/:id", getPaymentsController);
router.get("/", requireSignIn, getUserController);

module.exports = router;
