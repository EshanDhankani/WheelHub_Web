const express = require("express");
const auth = require("../middleware/auth");
const usedCarRouter = express.Router();
const usedCar=require('../controllers/usedCars');

usedCarRouter.get("/get-used-cars-by-user",auth,usedCar.getUsedCarsByUser);

module.exports=usedCarRouter;