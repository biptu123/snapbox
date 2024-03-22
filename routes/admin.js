const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getSingleUserController,
  getAllUserController,
  getUnverifiedPaymentsController,
  getVerifiedPaymentsController,
  makeAdminController,
  getDetailsController,
} = require("../controllers/user");
const router = express.Router();

router.get("/all-users", requireSignIn, isAdmin, getAllUserController);
router.get(
  "/unverified-payments",
  requireSignIn,
  isAdmin,
  getUnverifiedPaymentsController
);
router.get(
  "/verified-payments",
  requireSignIn,
  isAdmin,
  getVerifiedPaymentsController
);
router.get("/single-user/:id", getUnverifiedPaymentsController);

router.get("/make-admin/:_id", requireSignIn, isAdmin, makeAdminController);
router.get("/get-details", requireSignIn, isAdmin, getDetailsController);

module.exports = router;
