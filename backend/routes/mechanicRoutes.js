const express = require("express");
const mechanicController = require("../controllers/mechanicController");
const auth = require("../middleware/auth");

const mechanicRouter = express.Router();

mechanicRouter.get("/getallmechanics", mechanicController.getallmechanics);

mechanicRouter.get("/getnotmechanics", auth, mechanicController.getnotmechanics);

mechanicRouter.post("/applyformechanic", auth, mechanicController.applyformechanic);

mechanicRouter.put("/deletemechanic", auth, mechanicController.deletemechanic);

mechanicRouter.put("/acceptmechanic", auth, mechanicController.acceptmechanic);

mechanicRouter.put("/rejectmechanic", auth, mechanicController.rejectmechanic);

module.exports = mechanicRouter;
