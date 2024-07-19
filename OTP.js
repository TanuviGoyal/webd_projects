const mongoose=require("mongoose");
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema=new mongoose.Schema(
    {
        otp:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:5*60,
        },
    }
);

//pre save middleware
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse=await mailSender(email,"Verification Email from StudyNotion",emailTemplate(otp));
        console.log("Email sent Successfully:",mailResponse);
        
    } catch (error) {
        console.log("error occured while sending mails:",error);
    }
}

OTPSchema.pre("save",async function(next){
    //only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;