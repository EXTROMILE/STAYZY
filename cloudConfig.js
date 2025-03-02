const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// * configuring cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRECT,
});

// * defining cloud storage for uploading images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Stayzy_Dev",
    allowedFormat: ["png","jpg","jpeg","pdf"],
  },
});

module.exports = {
    CloudinaryStorage,
    storage,
};