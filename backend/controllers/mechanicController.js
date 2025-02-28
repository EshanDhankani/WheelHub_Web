

const mechanic = require("../models/mechanicModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getallmechanics = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await mechanic.find({ ismechanic: true }).populate("userId");
    } else {
      docs = await mechanic.find({ ismechanic: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get mechanics");
  }
};

const getnotmechanics = async (req, res) => {
  try {
    const docs = await mechanic.find({ ismechanic: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non mechanics");
  }
};

const applyformechanic = async (req, res) => {
  try {
    

    const alreadyFound = await mechanic.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }



    const updatedUser = await User.findByIdAndUpdate(
      req.locals, 
      { ismechanic:true }, 
      { new: true } 
    );
    if (!updatedUser) {
      console.log("User not found");
      return null;
    }

    console.log("Updated User:", updatedUser);
    const mechanic1 = mechanic({ ...req.body.formDetails, userId: req.locals });
    const result = await mechanic1.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    console.log(error)
    res.status(500).send("Unable to submit application");
  }
};

const acceptmechanic = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { ismechanic: true, status: "accepted" }
    );

    const mechanic1 = await mechanic.findOneAndUpdate(
      { userId: req.body.id },
      { ismechanic: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectmechanic = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { ismechanic: false, status: "rejected" }
    );
    const delDoc = await mechanic.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletemechanic = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      ismechanic: false,
    });
    const removeDoc = await mechanic.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("mechanic deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete mechanic");
  }
};

module.exports = {
  getallmechanics,
  getnotmechanics,
  deletemechanic,
  applyformechanic,
  acceptmechanic,
  rejectmechanic,
};
