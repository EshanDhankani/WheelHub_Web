const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/route");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const mechanicRouter = require("./routes/mechanicRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");
const FormDataModel = require("./models/public/FormData");
const usedCar = require("./routes/usedCarRoutes");
const accessory = require("./routes/AccessoryRoute");
const paymentRoutes = require("./routes/paymentRoutes");

app.use(express.json());
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded({ limit: "10mb", extended: true }));

const client_id =
  "467364977483-n6ace55lvjoif05bjv4enqbusb91clir.apps.googleusercontent.com";
const secret_id = "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";

app.use("/uploads", express.static("uploads"));
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(
  session({
    secret: "1523675367asghjefdAdcav",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eshankumar037@gmail.com",
    pass: "ozgz rweg rcvk aoxx",
  },
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: client_id,
      clientSecret: secret_id,
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await FormDataModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await FormDataModel.findOne({ email: profile.email });

          if (user) {
            user.googleId = profile.id;
            await user.save();
            console.log("Existing user found by email, updated googleId.");
          } else {
            const fullName = `${profile.name.givenName} ${profile.name.familyName}`;
            user = new FormDataModel({
              googleId: profile.id,
              name: fullName,
              email: profile.email,
            });
            await user.save();
            console.log("New user created with Google login.");
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("Error during Google OAuth:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const port = process.env.PORT || 4000;

app.use("/api/user", userRouter);
app.use("/api/mechanic", mechanicRouter);
app.use("/api/usedCar", usedCar);
app.use("/api/accessory", accessory);
app.use("/api/appointment", appointRouter);
app.use("/api/payment", paymentRoutes);

app.use("/api/notification", notificationRouter);
app.use("", router);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
