const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

//create course

exports.createCourse=async(req,res)=>{
    try {
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,category,status,tags,instructions}=req.body;

        //get thumbnail
        const thumbnail=req.files.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || !thumbnail) {
            return res.status(500).json({
                success:false,
                message:"kindly fill all the details", 
            })
        }

        //check id the user is an instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId,{
            accountType:"Instructor",
        });

        if (!instructorDetails) {
            return res.status(500).json({
                success:false,
                message:"instructor details not found", 
            })
        }

        //check given tag valid or not 
        const categoryDetails=await Category.findById(category);

        if (!categoryDetails) {
            return res.status(500).json({
                success:false,
                message:"Category details not found", 
            })
        }

        //upload image on cloudinary
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tags,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status,
            instructions,
        });

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                courses:newCourse._id,
                }
            },
            {new:true},
        );

        //do the same for category 
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                courses:newCourse._id,
                }
            },
            {new:true},
        );

        //res
        return res.status(500).json({
            success:true,
            message:"new course created", 
            data:newCourse,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't create course due to error",
        })
    }

}

//get all courses

exports.getAllCourses=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("instructor")
        .exec();

        return res.status(500).json({
            success:true,
            message:"all courses fetched",
            data:allCourses,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't get all courses due to error",
        })
    }
}

//get all course details and populate entirely, show all sections and subsections

exports.getCourseDetails=async(req,res)=>{
   try {
     //fetch course id
     const {courseId}=req.body;
     //find course details
     const courseDetails=await Course.find({_id:courseId})
                                     .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            },
                                        }
                                     )
                                     .populate("category")
                                     //.populate("ratingAndReviews")
                                     .populate(
                                        {
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        }
                                     )
                                     .exec();
        if (!courseDetails) {
            return res.status(500).json({
                success:false,
                message:"can't get course details with this courseId",
            })
        } 
        return res.status(500).json({
            success:true,
            message:"course details fetched successfully",
            data:courseDetails,
        })                              
     
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"can't get course details due to error",
    })
   }

}