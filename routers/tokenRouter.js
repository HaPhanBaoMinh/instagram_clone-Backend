const express = require("express");
const { createNewAccressTokenController } = require("../controllers/tokenController");

const tokenRouter = express.Router();

tokenRouter.post("/accesstoken", createNewAccressTokenController);

module.exports = tokenRouter 