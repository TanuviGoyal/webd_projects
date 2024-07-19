const User=require("../models/User");
const jwt = require("jsonwebtoken");
require ("dotenv").config();

//auth

exports.auth=async(req, res, next)=>{
    try {
        //extract token
        const token=req.header("Authorization").replace("Bearer ", "");  //req.cookies.token || req.body.token || 
       
        //if token is missing return response
        if (!token) {
            return res.status(400).json({
                success:false,
                message:"token is missing",
            });
        }
        
        //verify the token
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;    
            console.log("account type is-",req.user.accountType); 
                       
        } catch (err) {
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"auth failed",
        });
    }
}

//student

exports.isStudent=async(req,res,next)=>{
    try {
        if (req.user.accountType!=="Student") {
            return res.status(400).json({
                success:false,
                message:"welcome to the protected route of students",
            });
        }
        next();
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"this is protected route for students only",
        });
    }
}

exports.isInstructor=async(req,res,next)=>{
    try {
        if (req.user.accountType!=="Instructor") {
            return res.status(400).json({
                success:false,
                message:"welcome to the protected route of instructors",
            });
        }
        next();
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"this is protected route for instructors only",
        });
    }
}

exports.isAdmin=async(req,res,next)=>{
    try {
        if (req.user.accountType!=="Admin") {
            return res.status(400).json({
                success:false,
                message:"welcome to the protected route of admins",
            });
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"this is protected route for admins only",
        });
    }
}