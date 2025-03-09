const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message.controller");
const { verifyUser } = require("../middlewares/verifyUser");

const messageRouter = express.Router();

messageRouter.post("/send/:id",verifyUser,sendMessage);
messageRouter.get("/get/:id",verifyUser,getMessages);

module.exports = messageRouter;