const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mechanic = require("../models/mechanicModel");
const Appointment = require("../models/appointmentModel");
const FormDataModel = require("../models/public/FormData");
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find()
      .find({ _id: { $ne: req.locals } })
      .select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    console.log("This is api");

    const profilePresent = await FormDataModel.findOne({
      email: req.body.email,
    });

    if (profilePresent) {
      if (
        profilePresent.password == req.body.password &&
        profilePresent.verified == true
      ) {
        const emailPresent = await User.findOne({ email: req.body.email });

        if (!emailPresent) {
          return res.status(400).send("Incorrect credentials");
        }
        const verifyPass = await bcrypt.compare(
          req.body.password,
          emailPresent.password
        );
        if (!verifyPass) {
          return res.status(400).send("Incorrect credentials");
        }
        let name = emailPresent.firstname + emailPresent.lastname;
        req.session.user = emailPresent;

        const token = jwt.sign(
          {
            userId: emailPresent._id,
            isAdmin: emailPresent.isAdmin,
            isMechanic: emailPresent.ismechanic,
            name: name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2 days",
          }
        );

        return res
          .status(201)
          .send({
            msg: "User logged in successfully",
            token: token,
            isAdmin: emailPresent.isAdmin,
            isMechanic: emailPresent.ismechanic,
          });
      } else {
        return res.status(400).send("Incorrect 12 credentials");
      }
    }
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  console.log(req.body);
  let userId = "";

  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      userId = emailPresent._id;

      let result = await new mechanic({
        userId: userId,
        location: req.body.location,
        phoneNumber: req.body.phone,
        timingFrom: req.body.timingFrom,
        timingTo: req.body.timingTo,
        experience: req.body.experience,
        ismechanic: true,
      }).save();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ismechanic: true },
        { new: true }
      );
      if (!result) {
        return res.status(500).send("Unable to register user");
      }
      return res.status(201).send("User registered successfully");
    } else {
      const hashedPass = await bcrypt.hash(req.body.password, 10);

      let usr = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
        ismechanic: true,
      });
      let userobject = await usr.save();

      const newUser = new FormDataModel({
        email: req.body.email,
        password: req.body.password,
        name: `${req.body.firstname} ${req.body.lastname}`,
        verified: true,
      });

      await newUser.save();
      let result = await new mechanic({
        userId: userobject._id,
        location: req.body.location,
        phoneNumber: req.body.phone,
        timingFrom: req.body.timingFrom,
        timingTo: req.body.timingTo,
        experience: req.body.experience,
        ismechanic: true,
      }).save();
      if (!result) {
        return res.status(500).send("Unable to register user");
      }
      console.log("Inserted");

      return res.status(201).send("User registered successfully");
    }
  } catch (error) {
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    );
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await mechanic.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
