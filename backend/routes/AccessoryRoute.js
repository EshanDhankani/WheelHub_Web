const express = require("express");
const auth = require("../middleware/auth");
const accessoryRouter = express.Router();
const accessory=require('../controllers/AccessoryController');

accessoryRouter.get("/get-accessory-by-user",accessory.getAccessoryByUser);

module.exports=accessoryRouter;