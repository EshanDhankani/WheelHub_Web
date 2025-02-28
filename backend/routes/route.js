const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ResetToken = require("../models/public/ResetPassword");
const CarAdModel = require("../models/public/CarAd");
const AccessoryAdModel = require("../models/public/AccessoryAd");
const FormDataModel = require("../models/public/FormData");
const MessageModel = require("../models/public/Message");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eshankumar037@gmail.com",
    pass: "ozgz rweg rcvk aoxx",
  },
});
async function sendVerificationEmail(email, token) {
  const mailOptions = {
    from: '"WheelHub Support" <eshankumar037@gmail.com>',
    to: email,
    subject: "Verify your email",
    text: `Click the following link to verify your email: http://localhost:3000/verify-email?token=${token}`,
    html: `<p>Click the following link to verify your email:</p><a href="http://localhost:3000/verify-email?token=${token}">Verify Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", email);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("http://localhost:3000/UsedCars");
  }
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/messages", async (req, res) => {
  const { carAdId, receiverId, message, fontColor, fontSize, fontStyle } =
    req.body;

  try {
    const newMessage = new MessageModel({
      senderId: req.body.senderId,
      receiverId,
      carAdId,
      message,
      fontColor,
      fontSize,
      fontStyle,
    });

    const savedMessage = await newMessage.save();
    res
      .status(201)
      .json({ message: "Message sent successfully", newMessage: savedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
});

// Get Messages for a carAd
router.get("/messages/:carAdId", async (req, res) => {
  const { carAdId } = req.params;

  try {
    const messages = await MessageModel.find({ carAdId })
      .populate("senderId", "name email")
      .populate("receiverId", "name email");
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
});

router.get("/carAds", async (req, res) => {
  try {
    console.log("Fetching car ads...");
    const carAds = await CarAdModel.find();
    console.log("Car ads fetched:", carAds);
    res.json(carAds);
  } catch (error) {
    console.error("Error fetching car ads:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching car ads", error: error.message });
  }
});

router.get("/suggest-car", async (req, res) => {
  console.log(req.query);

  try {
    const { Price, City, Color, Mileage } = req.query;
    let price = Price.split("=")[1];
    let city = City.split("=")[1];
    let color = Color.split("=")[1];
    let mileage = Mileage.split("=")[1];

    let orConditions = [];

    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      orConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
    }

    if (city) {
      orConditions.push({ city: city });
    }

    if (color) {
      orConditions.push({ exteriorColor: color });
    }

    if (mileage) {
      orConditions.push({ mileage: mileage });
    }

    const query = orConditions.length > 0 ? { $or: orConditions } : {};

    const carAds = await CarAdModel.find(query);

    res.json(carAds);
  } catch (error) {
    console.error("Error fetching car ads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/postAd", upload.array("images", 3), async (req, res) => {
  console.log("Session:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const {
      city,
      carInfo,
      year,
      registeredIn,
      exteriorColor,
      mileage,
      price,
      adDescription,
      mobileNumber,
    
    } = req.body;
    const images = req.files.map((file) => file.path);

    const newAd = new CarAdModel({
      userId: req.session.user._id,
      city,
      carInfo,
      year,
      registeredIn,
      exteriorColor,
      mileage,
      price,
      adDescription,
      mobileNumber,
      images,
   
    });

    await newAd.save();
    res.status(201).json({ message: "Ad posted successfully", ad: newAd });
  } catch (error) {
    res.status(500).json({ message: "Error posting ad", error: error.message });
  }
});

router.post("/postAccessoryAd", upload.array("images", 3), async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const {
      city,
      accessoryInfo,
      category,
      condition,
      price,
      accessoryDescription,
      mobileNumber,
    } = req.body;
    console.log("Form data:", req.body);
    console.log("Uploaded files:", req.files);

    const images = req.files.map((file) => file.path);

    const newAccessoryAd = new AccessoryAdModel({
      userId: req.session.user._id,
      city,
      accessoryInfo,
      category,
      condition,
      price,
      accessoryDescription,
      mobileNumber,
      images,
    });

    await newAccessoryAd.save();
    res.status(201).json({
      message: "Accessory ad posted successfully",
      ad: newAccessoryAd,
    });
  } catch (error) {
    console.error("Error posting accessory ad:", error.message);
    res
      .status(500)
      .json({ message: "Error posting accessory ad", error: error.message });
  }
});

router.get("/myAds", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const carAds = await CarAdModel.find({ userId: req.session.user._id });
    const accessoryAds = await AccessoryAdModel.find({
      userId: req.session.user._id,
    });

    res.json({
      message: "Success",
      carAds: carAds,
      accessoryAds: accessoryAds,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ads", error: error.message });
  }
});

router.get("/api/accessories", async (req, res) => {
  try {
    const accessories = await AccessoryAdModel.find();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accessories", error });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    let user = await FormDataModel.findOne({ email });
    if (user) {
      console.log("Email is Already Registered");

      return res.status(400).json({ message: "Already registered" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new FormDataModel({
      email,
      password,
      name: `${firstName} ${lastName}`,
      verified: false,
      verificationToken,
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationToken);
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    let usr = new User({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: hashedPass,
    });
    let userobject = await usr.save();

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email is already registered" });
    } else {
      console.error("Error registering user:", err.message);
      res
        .status(500)
        .json({ message: "Error registering user", error: err.message });
    }
  }
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await FormDataModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying email", error: error.message });
  }
});

router.get("/test", async (req, res) => {
  res.send("sdfsdf");
});
router.post("/logs", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    res.status(200).json("Success");
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Login error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No records found!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    req.session.user = user;
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await FormDataModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    await new ResetToken({ userId: user._id, token }).save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: '"WheelHub Support" <eshankumar037@gmail.com>',
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Please click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const resetToken = await ResetToken.findOne({ token });

    if (!resetToken) {
      console.log("Invalid or expired token");
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const user = await FormDataModel.findById(resetToken.userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save();

    await ResetToken.deleteOne({ _id: resetToken._id });

    console.log("Password updated successfully for user:", user.email);
    return res
      .status(200)
      .json({ message: "Your password has been updated successfully!" });
  } catch (error) {
    console.error("Server error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error logging out", error: err.message });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/currentUser", (req, res) => {
  console.log("Current session user:", req.session.user);
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.put("/updateProfile", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    const updatedUser = await FormDataModel.findByIdAndUpdate(
      req.session.user._id,
      { firstName, lastName, email, password },
      { new: true, runValidators: true }
    );

    req.session.user = updatedUser;

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

router.delete("/deleteProfile", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    await FormDataModel.findByIdAndDelete(req.session.user._id);

    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging out", error: err.message });
      }

      res.clearCookie("connect.sid");
      res.json({ message: "Profile deleted successfully" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting profile", error: error.message });
  }
});

router.get("/carAds/:id", async (req, res) => {
  try {
    const carAd = await CarAdModel.findById(req.params.id).populate(
      "userId",
      "name"
    );
    if (!carAd) {
      return res.status(404).json({ message: "Car ad not found" });
    }
    res.json(carAd);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching car ad", error: error.message });
  }
});

router.put("/carAds/:id", async (req, res) => {
  try {
    const updatedAd = await CarAdModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedAd);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating car ad", error: error.message });
  }
});

router.delete("/carAds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAd = await CarAdModel.findByIdAndDelete(id);

    if (!deletedAd) {
      return res.status(404).json({ message: "Car ad not found" });
    }

    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting car ad", error: error.message });
  }
});

/////
router.put("/accessoryAds/:id", upload.array("images", 3), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      city,
      accessoryInfo,
      category,
      condition,
      price,
      accessoryDescription,
      mobileNumber,
    } = req.body;

    const images =
      req.files.length > 0
        ? req.files.map((file) => file.path)
        : req.body.images;

    const updatedAd = await AccessoryAdModel.findByIdAndUpdate(
      id,
      {
        city,
        accessoryInfo,
        category,
        condition,
        price,
        accessoryDescription,
        mobileNumber,
        images,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAd) {
      return res.status(404).json({ message: "Accessory ad not found" });
    }
    res.json({ message: "Ad updated successfully", ad: updatedAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating accessory ad", error: error.message });
  }
});

////
router.delete("/accessoryAds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAd = await AccessoryAdModel.findByIdAndDelete(id);

    if (!deletedAd) {
      return res.status(404).json({ message: "Accessory ad not found" });
    }

    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Accessory ad", error: error.message });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("http://localhost:3000/UsedCars");
  }
);

router.post("/messages", upload.array("images", 8), async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { carAdId, receiverId, message, fontColor, fontSize, fontStyle } =
    req.body;
  const imageUrls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  );

  try {
    const newMessage = new MessageModel({
      senderId: req.session.user._id,
      receiverId,
      carAdId,
      message,
      fontColor,
      fontSize,
      fontStyle,
      imageUrl: imageUrls,
      isSeen: false,
    });

    const savedMessage = await newMessage.save();
    res
      .status(201)
      .json({ message: "Message sent successfully", newMessage: savedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
});

//

router.patch("/markAsSold/:id", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const { id } = req.params;

    // Find the ad by ID and mark it as sold
    const carAd = await CarAdModel.findOneAndUpdate(
      { _id: id, userId: req.session.user._id },
      { sold: true }, // Add a sold field to mark the car as sold
      { new: true }
    );

    if (!carAd) {
      return res.status(404).json({ message: "Car ad not found" });
    }

    res.json({ message: "Car ad marked as sold", carAd });
  } catch (error) {
    res.status(500).json({ message: "Error marking car as sold", error: error.message });
  }
});
//

router.get("/messages/:carAdId", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { carAdId } = req.params;

  try {
    const messages = await MessageModel.find({ carAdId })
      .populate("senderId", "name email")
      .populate("receiverId", "name email");
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
});

module.exports = router;
