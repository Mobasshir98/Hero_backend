import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
export const sendToken = (res, user, message, statusCode = 200) => {

 const token = jwt.sign({_id:user._id},process.env.SECRET_KEY)
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    message,
    user,
  });
};
