const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth");
const {
  getUserController,
  getAllUserController,
} = require("../controllers/user");
const router = express.Router();

router.get("/", requireSignIn, getUserController);

module.exports = router;
