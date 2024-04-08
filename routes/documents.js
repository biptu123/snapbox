const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { requireSignIn } = require("../middlewares/auth");
const {
  uploadDocumentController,
  getUserDocuments,
  deleteDocumentController,
} = require("../controllers/document");

// Enable file uploads middleware
router.use(fileUpload());

// POST route to upload documents
router.post("/get-documents", getUserDocuments);
router.post("/upload", requireSignIn, uploadDocumentController);
router.delete("/:_id", requireSignIn, deleteDocumentController);

module.exports = router;
