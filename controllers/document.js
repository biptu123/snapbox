const User = require("../models/User");
const CardInfo = require("../models/CardInfo");
const Payment = require("../models/Payment");
const slugify = require("slugify");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { comparePassword } = require("../helpers/auth");

const uploadDocumentController = async (req, res) => {
  try {
    const cardInfo = await CardInfo.findOne({ user: req.user._id });
    const files = Array.isArray(req.files.documents)
      ? req.files.documents
      : [req.files.documents];

    for (const file of files) {
      // Convert file data to readable stream
      const stream = streamifier.createReadStream(file.data);

      const documentResult = await new Promise((resolve, reject) => {
        // Pipe the stream to Cloudinary upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "documents",
            resource_type: "auto", // Let Cloudinary detect the resource type
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.pipe(uploadStream);
      });

      if (!documentResult || !documentResult.secure_url) {
        return res.status(500).send({
          success: false,
          message: "Failed to upload one or more documents",
        });
      }

      cardInfo.documents.push({
        name: file.name,
        url: documentResult.secure_url,
        public_id: documentResult.public_id,
        file_type: file.mimetype, // Save the type based on the mimetype
      });
    }

    await cardInfo.save();

    return res.status(200).send({
      success: true,
      message: "Documents uploaded successfully",
      cardInfo,
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// const User = require("../models/User");
// const CardInfo = require("../models/CardInfo");
// const Payment = require("../models/Payment");
// const slugify = require("slugify");
// const fs = require("fs");
// const path = require("path");

// const uploadDocumentController = async (req, res) => {
//   try {
//     const cardInfo = await CardInfo.findOne({ user: req.user._id });
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send({
//         success: false,
//         message: "No files uploaded",
//       });
//     }

//     const uploadedDocuments = [];

//     const files = Array.isArray(req.files.documents)
//       ? req.files.documents
//       : [req.files.documents];

//     for (const file of files) {
//       const fileName = slugify(file.name);
//       const filePath = path.join(__dirname, "..", "uploads", fileName);

//       // Save the file to a temporary location on your server
//       await file.mv(filePath);

//       // Upload the file to HostGator storage
//       // Use FTP or cPanel File Manager depending on your hosting plan
//       // Here, we assume you have FTP credentials to upload the file

//       // Example using FTP library (you need to install an FTP library like basic-ftp)
//       const ftp = require("basic-ftp");
//       const client = new ftp.Client();
//       await client.access({
//         host: process.env.DOMAIN_HOST,
//         user: process.env.DOMAIN_USER,
//         password: process.env.DOMAIN_PASSWORD,
//       });
//       await client.uploadFrom(filePath, "/public_html/uploads/" + fileName);
//       await client.close();

//       // Clean up: remove the temporary file from your server
//       fs.unlinkSync(filePath);

//       // Update cardInfo with the uploaded document's details
//       cardInfo.documents.push({
//         name: file.name,
//         url: `https://yourdomain.com/uploads/${fileName}`, // Update with your actual domain
//         // Add other details like public_id if needed
//       });
//     }

//     await cardInfo.save();

//     return res.status(200).send({
//       success: true,
//       documents: uploadedDocuments,
//       message: "Documents uploaded successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
const deleteDocumentController = async (req, res) => {
  try {
    const { _id: documentId } = req.params;
    const cardInfo = await CardInfo.findOne({ user: req.user._id });

    // Find the document to delete based on its ID
    const documentToDelete = cardInfo.documents.find((document) =>
      document._id.equals(documentId)
    );

    if (!documentToDelete) {
      return res.status(404).send({
        success: false,
        message: "Document not found",
      });
    }

    // Remove the document from Cloudinary using its public ID
    await cloudinary.uploader.destroy(documentToDelete.public_id);

    // Filter out the document to delete based on its ID
    cardInfo.documents = cardInfo.documents.filter(
      (document) => document._id.toString() !== documentId
    );

    // Save the updated cardInfo without the deleted document
    await cardInfo.save();

    return res.status(200).send({
      success: true,
      message: "Document deleted successfully",
      cardInfo,
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserDocuments = async (req, res) => {
  try {
    const { user: userId, password } = req.body;

    const user = await User.findById(userId);

    if (!(await comparePassword(password, user.password))) {
      return res
        .status(500)
        .json({ success: false, message: "Unauthorized Access" });
    }

    // Fetch documents for the user from the database
    const userDocuments = await CardInfo.findOne({ user: userId }).select(
      "documents"
    );

    if (!userDocuments) {
      return res
        .status(404)
        .json({ success: false, message: "No documents found for the user" });
    }

    // Return the documents in the response
    return res
      .status(200)
      .json({ success: true, documents: userDocuments.documents });
  } catch (error) {
    console.error("Error fetching user documents:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getUserDocuments,
  uploadDocumentController,
  deleteDocumentController,
};
