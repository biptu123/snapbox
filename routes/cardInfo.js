const express = require("express");
const { requireSignIn } = require("../middlewares/auth");
const {
  uploadImagesController,
  updateBasicController,
  updateServiceController,
  updateScheduleController,
  updateCardController,
} = require("../controllers/cardInfo");
const router = express.Router();

router.post("/upload", requireSignIn, uploadImagesController);
router.post("/basic", requireSignIn, updateBasicController);
router.post("/services", requireSignIn, updateServiceController);
router.post("/schedule", requireSignIn, updateScheduleController);
router.post("/update", requireSignIn, updateCardController);

module.exports = router;
