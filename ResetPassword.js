const User=require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset password token(sending link to change password through mail)
exports.resetPasswordToken=async(req,res)=>{
     try {
        //get email from request body
        const {email}=req.body;

        //email validation
        const user=await User.findOne({email:email});
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"invalid email"
            });
        }

        //generate token
        const token=crypto.randomUUID();

        //update user by adding token and expiration time
        const updatedDetails=await User.findOneAndUpdate({email:email},{
            token:token, 
            resetPasswordExpires:Date.now()+5*60*1000,
        },{new:true});

        //create url
        const url=`http://localhost:3000/update-password/${token}`;

        //send mail having url
        await mailSender(email,"Password rest link",url);

        //return response
        return res.status(400).json({
            success:true,
            message:"email send successfully, change the password using the url"
        });

     } catch (error) {
        return res.status(400).json({
            success:false,
            message:"can't send reset password link"
        });
     }
}

//reset password using link sent on mail

exports.resetPassword=async(req,res)=>{
    try {
        //data fetch
        const {password,confirmPassword,token}=req.body;

        //validate
        if (password!==confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"passwords do not match"
            });
        }

        //get userdetails from token
        const userdetails=await User.findOne({token:token});

        //if no token exists
        if (!userdetails) {
            return res.status(400).json({
                success:false,
                message:"no such token exists "
            });
        }

        //if token time expires
        if (userdetails.resetPasswordExpires<Date.now()) {
            return res.status(400).json({
                success:false,
                message:"token expired"
            });
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        )
        //return response 
        return res.status(400).json({
            success:true,
            message:"password reset successfull"
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"can't reset password"
        });
    }
}