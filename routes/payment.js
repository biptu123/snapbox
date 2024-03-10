const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  freeSubscribeController,
  paidSubscribeController,
  approvePaymentController,
  rejectPaymentController,
} = require("../controllers/payment");
const router = express.Router();

router.get("/free", requireSignIn, freeSubscribeController);
router.post("/paid", requireSignIn, paidSubscribeController);
router.get("/approve/:id", requireSignIn, isAdmin, approvePaymentController);
router.get("/reject/:id", requireSignIn, rejectPaymentController);
module.exports = router;
