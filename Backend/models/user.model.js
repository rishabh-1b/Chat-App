const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
			type: String,
			required: true,
			enum: ["male", "female"]
		},
		profilePic: {
			type: String,
			required: true
		}
  },
  {
    timestamps: true
  }
)

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;