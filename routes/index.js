const router = require("express").Router();
const authRoutes = require("./auth");
const User = require("../models/User.model");

/* //! Cloudinary Setup - START
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "react-cloudinary-setup",
  },
});

const upload = multer({ storage });
//! Cloudinary Setup - END */

const upload = require("../middleware/cloudinary");

router.post("/uploadPicture/:id", upload.single("profilePic"), (req, res) => {
  console.log(req);
  const profilePic = req.file.path;
  const id = req.params.id;

  User.findByIdAndUpdate(id, { profilePic })
    .then(() => {
      res.json({ picFromServer: profilePic });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
