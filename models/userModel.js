import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
      min: [3, "please enter characters greater than 2"],
      max: [50, "You can only enter maximum of 50 characters"],
    },

    email: {
      type: String,
      required: [true, "please enter your email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: [5, "please enter characters greater than 5"],
    },

    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_CONFI,
    {
      expiresIn: process.env.EXPR_DEAD,
    }
  );
};

// below is for during login
userSchema.methods.comparePassword = async function (userpass) {
  const isPassword = await bcrypt.compare(userpass, this.password);
  return isPassword;
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
