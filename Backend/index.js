const { app, server } = require("./socket/socket");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./config/dbConnect");
const userRouter = require("./routes/user.route");
const messageRouter = require("./routes/message.route");
require("dotenv").config();

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

dbConnect();

app.use("/user", userRouter);
app.use("/message", messageRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(process.env.PORT);