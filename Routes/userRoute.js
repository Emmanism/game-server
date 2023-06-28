import express from "express";
import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utills/generateToken.js";
import protect from "../Middleware/authMiddleware.js";

const userRouter = express.Router()


// LOGIN
userRouter.post(
    "/login",asyncHandler(
    async (res, req) =>{
       const { email,  password} = req.body;
           // Validate user input
    if (!(email && password)) {
        res.status(400).send("All input is required");
      }
  
       const user  =  await User.findOne({ email});

       if(user && (await user.matchPassword())){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
           // isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt:user.createdAt
        });
        console.log(user);
       } else{
        req.status(401)
        throw new Error("Invalid Email or Password");
       }
    })
);

//  Profile
userRouter.post(
    "/Profile",
    protect,
    asyncHandler(
    async (res, req) =>{
      // test with postman res.send("User profile");
    const user =  await User.FindById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // isAdmin: user.isAdmin,
            createdAt:user.createdAt
        })
    } else{
        req.status(404)
        throw new Error("User not found");
    }
    })
);

//  register
userRouter.post(
    "/register",
    asyncHandler(
    async (res, req) =>{
        const { name, email,  password} = req.body;
        const userExists  =  await User.findOne({ email});
        if(userExists){
            res.status(400);
            throw new Error("User already exists")
        }

        const user = await User.create({
            name,
            email,
            password
        });
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
               // isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else{
            res.status(400);
            throw new Error("Invalid User Data")
        }

        // test for in postman 3:06:39
    })
);

export default userRouter;