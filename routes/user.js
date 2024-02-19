const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getUserController,
  getAllUserController,
} = require("../controllers/user");
const router = express.Router();

router.get("/:id", getUserController);
router.get("/all-users", requireSignIn, isAdmin, getAllUserController);

module.exports = router;
