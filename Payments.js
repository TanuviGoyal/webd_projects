const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const mongoose=require("mongoose");

//capture payment and initiate the razorpay order
exports.capturePayment=async(req,res)=>{
    //get courseId and userId
    const {course_id}=req.body;
    const userId=req.user.id;

    //valid courseId?
    if (!course_id) {
        return res.status(500).json({
            success:false,
            message:"please provide course id", 
        })
    }

    //valid courseDetail
    let course;
    try {
        course=await Course.findById(course_id);
        if (!course) {
            return res.status(500).json({
                success:false,
                message:"could not find the course", 
            })
        };
        
        //user already paid for the same course

        //convert string(userId) to objectId(uid)
        const uid=new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(500).json({
                success:false,
                message:"student is already enrolled", 
            })
        }
 

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user details fetched", 
        })
    }
    
    //order create
    const amount=course.price;
    const currency="INR";

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try {
        //initiate the payment using razorpay
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(500).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderdId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,

        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"could not initiate order", 
        })
    }
}


//verify Signature of razorpay and server

exports.verifySignature=async(req,res)=>{
    const webhookSecret="12345678";

    const signature=req.headers["x-razorpay-signature"];

    //hash webhooksecret using HMAC(hash algo+secret_key) hw:checkSum

    const shasum=crypto.createHmac("sha256",webhookSecret)
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if (signature===digest) {
        console.log("Payment is authorized");

        const {courseId,userId}=req.body.payload.payment.entity.notes;

        try {
            //fulfill the action
            //find the course and enroll student in 
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },
                {new:true},
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:"course not found", 
                })
            }

            console.log(enrolledCourse);

            //find the user and add the course in its course array

            const enrolledStudent=await User.findByIdAndUpdate(
                {_id:userId},
                {
                    $push:{
                        courses:courseId
                    }
                },
                {new:true}
            );

            console.log(enrolledStudent);

            //send confirmation mail

            const emailResponse=await mailSender(enrolledStudent.email,"enrollment successfull!!","Congratulation, you have been successfully enrolled in a new Course")
            console.log(emailResponse);
            return res.status(500).json({
                success:true,
                message:"signaure verified and course added", 
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"can't verify signature", 
            })
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message:"signature didnt match with digest", 
        })
    }


}