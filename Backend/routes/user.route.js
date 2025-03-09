const express = require("express");
const { signup, login, logout, fetchUser, fetchAllUsers } = require("../controllers/user.controller");
const { verifyUser } = require("../middlewares/verifyUser");

const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/logout",verifyUser,logout);
userRouter.get("/getUser",verifyUser,fetchUser)
userRouter.get("/getAllUsers",verifyUser,fetchAllUsers);

module.exports = userRouter;