const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getSingleUserController,
  getAllUserController,
} = require("../controllers/user");
const router = express.Router();

router.get("/all-users", requireSignIn, isAdmin, getAllUserController);
router.get("/single-user/:id", getSingleUserController);

module.exports = router;
