const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getSingleUserController,
  getAllUserController,
  getUnverifiedPaymentsController,
} = require("../controllers/user");
const router = express.Router();

router.get("/all-users", requireSignIn, isAdmin, getAllUserController);
router.get(
  "/unverified-payments",
  requireSignIn,
  isAdmin,
  getUnverifiedPaymentsController
);
router.get("/single-user/:id", getUnverifiedPaymentsController);

module.exports = router;
