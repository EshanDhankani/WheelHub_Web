const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wheelHub";

if (!dbURI) {
  throw new Error("MONGO_URI is not defined in .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
