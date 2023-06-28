import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// verify the token
const protect = asyncHandler(
    async(req,res,next) =>{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("bearer"))
        // suppose to show in console,but it's not showing will solve it later
       // console.log("token found");
        {
            try{
                token = req.headers.authorization.split(" ") [1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
             // test in postman console.log(decoded);
             req.user = await User.findById(decoded.id).select("-password");
             next();
            }catch{
                console.log(error);
                res.status(401)
                throw new Error("Not authorized, token failed")
            }
        }
        if (!token) {
            res.status (401)
            throw new Error("Not authorized, no token")
          }else {
            res.status(401);
            throw new Error("Not authorized, no token");
          }
    });

export default protect;