import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



//Password encrypt krvaaaaaaa
// / jyaare jyaare schema save thse tyaare aa call thsee
userSchema.pre("save", async function (next) {  //arrow function ni unrr this use nai thaai etle function
  
  //evrry time userSchema update thse to password b hash thaya jj krse etle
  //  ene avoid krvaa maate if...
  if (!this.isModified("password")) {
    next();//password modified nathi so password hash nai krvaa no ...direct next
  }

  this.password = await bcrypt.hash(this.password, 10);
});



// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;
