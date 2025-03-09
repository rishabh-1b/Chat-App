const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json(
        {
          success: false,
          message: "Please fill all the details"
        }
      )
    }
    if (await userModel.findOne({ username })) {
      return res.status(400).json(
        {
          success: false,
          message: "The username is not available"
        }
      )
    }
    if (await userModel.findOne({ email })) {
      return res.status(400).json(
        {
          success: false,
          message: "The email address is already exist"
        }
      )
    }
    if (password.length < 8) {
      return res.status(400).json(
        {
          success: false,
          message: "Password must be at least 8 characters long"
        }
      );
    }
    if (password != confirmPassword) {
      return res.status(400).json(
        {
          success: false,
          message: "Password and confirm password should be same"
        }
      )
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const profilePic = gender === "male" ?
      `https://avatar.iran.liara.run/public/boy?username=${username}` :
      `https://avatar.iran.liara.run/public/girl?username=${username}`
      ;

    await userModel.create({
      fullName,
      username,
      email,
      password: bcryptPassword,
      gender,
      profilePic
    })

    res.status(201).json(
      {
        success: true,
        message: "Profile created successfully"
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "User cannot signup, please try again later",
        error: error.message
      }
    )
  }
}

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json(
        {
          success: false,
          message: "Please fill all the details"
        }
      )
    }

    const user = await userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json(
        {
          success: false,
          message: "User does not exist"
        }
      )
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(
        {
          success: false,
          message: "Password is incorrect"
        }
      )
    }

    const token = jwt.sign({_id: user._id,}, process.env.JWT_SECRET, { expiresIn: "30d" })

    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    res.status(200).json(
      {
        success: true,
        message: "User login successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          gender: user.gender,
          profilePic: user.profilePic,
          joinOn: user.createdAt
        }
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "User cannot login, please try again later",
        error: error.message
      }
    )
  }
}

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json(
      {
        success: true,
        message: "User logout successfully"
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "User cannot logout, please try again later",
        error: error.message
      }
    )
  }
}

exports.fetchUser = async (req, res) => {

  const user = await userModel.findOne({ _id: req.user._id });

  try {
    res.status(200).json(
      {
        success: "true",
        message: "User fetched successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          gender: user.gender,
          profilePic: user.profilePic,
          joinOn: user.createdAt
        }
      }
    )
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Something went wrong, please try again later",
        error: error.message
      }
    )
  }
}

exports.fetchAllUsers = async (req, res) => {
  try {
    const loginUser = req.user._id;

    const users = await userModel.find({
      _id: { $ne: loginUser }
    }).select("-password");

    res.status(200).json({
      success: true,
      messages: "All users fetch successfully",
      users
    });
  }
  catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Something went wrong, please try again later",
        error: error.message
      }
    )
  }
}