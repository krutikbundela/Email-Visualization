import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/user.js";
import  errorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser = catchAsyncError(async (req,res,next) => {
    const { name , email , password } = req.body;

    const user = await User.create({
        name,email,password
    })

    sendToken(user, 200, res);
});
export const loginUser = catchAsyncError(async(req,res,next) =>{
    const { email, password } = req.body;
    console.log("loginUser ~  email, password:",  email, password);

    if (!email || !password) {
      return next(new errorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new errorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new errorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

export const loadUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id); 

    res.status(200).json({
      success: true,
      user,
    });
});

export const logout = catchAsyncError(async (req,res,next) =>{
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
});