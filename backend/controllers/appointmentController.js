const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getallappointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { mechanicId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("mechanicId")
      .populate("userId");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  try {
    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      mechanicId: req.body.mechanicId,
      userId: req.locals,
    });

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${req.body.mechanicname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const mechanicnotification = Notification({
      userId: req.body.mechanicId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await mechanicnotification.save();

    const result = await appointment.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const markAppointmentCompleted = async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const user = await User.findById(req.locals);
    const userNotification = new Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.mechanicName} has been completed.`,
    });
    await userNotification.save();

    const mechanicNotification = new Notification({
      userId: req.body.mechanicId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed.`,
    });
    await mechanicNotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to mark appointment as completed");
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointid, status, mechanicId } = req.body;
    const userId = req.locals;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointid },
      { status: status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    const user = await User.findById(userId);
    const userNotification = new Notification({
      userId: userId,
      content: `Your appointment with ${mechanicId} has been ${status.toLowerCase()}.`,
    });
    await userNotification.save();

    const mechanicNotification = new Notification({
      userId: mechanicId,
      content: `Your appointment with ${user.firstname} ${
        user.lastname
      } has been ${status.toLowerCase()}.`,
    });
    await mechanicNotification.save();

    return res.status(200).json({
      message: `Appointment status updated to ${status} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Failed to update appointment status:", error);
    res.status(500).send("Unable to update appointment status");
  }
};

module.exports = {
  getallappointments,
  bookappointment,
  markAppointmentCompleted,
  updateAppointmentStatus,
};
