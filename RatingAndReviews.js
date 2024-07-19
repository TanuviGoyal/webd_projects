const { default: mongoose } = require("mongoose");
const Course=require("../models/Course");
const RatingAndReview=require("../models/RatingAndReview");

//createRating

exports.createRating=async(req,res)=>{
    try {
        //get user id
        const userId=req.user.id;

        //fetch data from req body
        const {rating,review,courseId}=req.body;

        //check if user enrolled or not 
        const courseDetails=await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq: userId}},
            }
        )
        
        if (!courseDetails) {
            return res.status(500).json({
                success:false,
                message:"user has not enrolled in the course", 
            })
        }

        //check if already reviewed?
        const alreadyReviewed=await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId,
            }
        )

        if (!alreadyReviewed) {
            return res.status(500).json({
                success:false,
                message:"course already reviewed by user", 
            })
        }

        //create review
        const ratingAndReviews=await RatingAndReview.create({rating,review,course:courseId,user:userId});

        //add review to course rating array
        const updatedCourseDetails= await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingAndReviews._id,
                }
            },
            {new:true},
        )

        console.log(updatedCourseDetails);

        return res.status(500).json({
            success:true,
            message:"rating and review added successfully", 
            ratingAndReviews,
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't add the rating and review due to error", 
        })
    }
}

//getAverageRating

exports.getAverageRating=async(req,res)=>{
    try {
        //get courseId
        const courseId=req.body.courseId;

        //calc avg rating
        const result=await RatingAndReview.aggregate([
            //using match, find all the ratings of the course using courseId
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        //return rating
        if (result.length>0) {
            return res.status(500).json({
                success:true,
                message:"average rating fetched successfully",
                averageRating:result[0].averageRating, 
            })
        }

        return res.status(500).json({
            success:true,
            message:"no ratings given till now", 
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't get rating due to error", 
        })
    }
}

//getAllRating

exports.getAllRating=async(req,res)=>{
    try {
        const allReviews=await RatingAndReview.find({})
                                              .sort({rating:"desc"})
                                              .populate({
                                                path:"user",
                                                select:"firstname lastName email image",
                                              })
                                              .populate({
                                                path:"course",
                                                select:"courseName",
                                              }).exec();

        return res.status(500).json({
            success:true,
            message:"all reviews fetched", 
            data:allReviews,
        })                                                                        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"cant get ratings due to error", 
        })
    }
}
