const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getUserController,
  getCardInfoController,
  getPaymentsController,
  updateUserController,
  applyController,
} = require("../controllers/user");
const router = express.Router();

router.post("/apply", applyController);
router.get("/cardinfo/:username", getCardInfoController);
router.get("/payments/:id", getPaymentsController);
router.get("/", requireSignIn, getUserController);
router.put("/", requireSignIn, updateUserController);

module.exports = router;
