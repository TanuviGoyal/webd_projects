const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require ("dotenv").config();
const Profile=require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

//send otp

//route handler
exports.sendOTP=async(req,res)=>{
    
    try {
        //fetch email from request body
        const {email}=req.body;

        //check if user already exists
        const checkUserPresent=await User.findOne({email});

        //if user already exists, then return a response, sign up already done
        if (checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User already registered for the given email-id"
            })
        }
        console.log(checkUserPresent);

        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("mera otp-",otp);

        //checking if otp unique or not by comparing otp with other otps in db schema
        const result=await OTP.findOne({otp: otp});

        while (result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result=await OTP.findOne({otp: otp});
        }

        const otpPayload={email,otp};

        //db entry
        const otpBody=await OTP.create(otpPayload);
        console.log("body of otp-",otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })

    } catch (error) {
        return res.status(200).json({
            success:false,
            message:"Can't send OTP due to some error",
        })
    }
}

//signup

exports.signup=async(req,res)=>{

    try {
    //data fetch from request body
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp}=req.body;

    //validation for complete data
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"Please fill all the details."
        });
    }

    //match password and confirm password
    if (password!==confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"Both the passwords do not match, please try again"
        });
    }

    //check if user already exists or not
    const existingUser=await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({
            success:false,
            message:"User is already registered for this email id"
        });
    }

    //find the most recent otp that is stored in db for the given email
    const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    
    //validate otp
    if (recentOtp.length===0) {
        //right now there is no otp for this email id
        return res.status(400).json({
            success:false,
            message:"OTP not found",
        });
    }
    if (otp!==recentOtp[0].otp) {
        return res.status(400).json({
            success:false,
            message:"Incorrect otp!"
        });
    }

    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

    //entry in db

    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })

    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType: accountType,
        contactNumber,
        approved: approved,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    })

    return res.status(200).json({
        success:true,
        message:"User registered successfully!",
    });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"User cannot be registered, please try gain"
        });
    }
}

//login

exports.login=async(req,res)=>{
    try {
        //get data from req body
        const {email,password}=req.body;

        //validate data
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            });
        }

        //user check exist or not 
        const user=await User.findOne({email}).populate("additionalDetails");
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"User has not registered, please sign up first"
            });
        }

        //generate jwt after password checking
        if (await bcrypt.compare(password,user.password)) {
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });

            user.token=token;
            user.password=undefined;

            //create cookie and send response 
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            };

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"incorrect password"
            });
        }

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"login failure"
        });
    }
}

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};


// //changepassword
// exports.changePassword=async(req,res)=>{
//     try {
//         //get data from request body
//         const {password,email,newPassword}=req.body;

//         //compare newpassword and old password
//         const user=await User.findOne({email:email});
//         if (!user) {
//             return res.status(400).json({
//                 success:false,
//                 message:"invalid email"
//             });
//         }

//         //validate
//         if (await bcrypt.compare(password,user.password)) {
//             const updatedDetails=await User.findOneAndUpdate({email:email},{
//                 password:newPassword,
//             },{new:true});
            
//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"password incorrect",
//             });
//         }
    
//         //send mail
//         await mailSender(email,"Your password is changed",`New password is-${newPassword}`);

//         //return password
//         return res.status(400).json({
//             success:true,
//             message:"password changed successfully",
//         });
//     } catch (error) {
//         return res.status(400).json({
//             success:false,
//             message:"cannot change password due to some error"
//         });
//     }
// }

