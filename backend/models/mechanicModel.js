const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    timingFrom: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(v); // 24-hour time format
        },
        message: (props) => `${props.value} is not a valid time`,
      },
    },
    timingTo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(v); // 24-hour time format
        },
        message: (props) => `${props.value} is not a valid time`,
      },
    },
    experience: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: (props) => `${props.value} is not a valid number`,
      },
    },
    ismechanic: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);

const Mechanic = mongoose.model("Mechanic", schema);

module.exports = Mechanic;
