const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create subsection

exports.createSubSection=async(req,res)=>{
    try {
        //fetch data from req body
        const {sectionId,title,description}=req.body;

        //extract video
        const video=req.files.videoFile;

        //validate
        if(!sectionId || !title || !description || !video){
            return res.status(500).json({
                success:false,
                message:"missing details", 
            })
        }

        //upload video to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create subsection
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })

        //push id of subsection in section ka array 
        const updatedSection=await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true},
        )
        .populate("subSection")

        //res
        res.status(500).json({
            success:true,
            message:"subsection created successfully", 
            updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"can't create subsection", 
            })
    }
}

//update sub-section 

exports.updateSubSection=async(req,res)=>{
    try {
        //new data fetch 
        const {subSectionId,title,description}=req.body;
        const video=req.files.videoFile;

        //data validate
        if (!subSectionId || !title || !timeDuration || !description || !video) {
            return res.status(500).json({
                success:false,
                message:"missing details", 
            })
        }
        //check old videoUrl and new videoUrl, if they are same then no need to upload new videoUrl to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);


        //update section 

        const updatedSubSection=await SubSection.findByIdAndUpdate(
            subSectionId,
            {title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url},
            {new:true}, 
        )
        
        //return res
        return res.status(500).json({
            success:true,
            message:"sub-section updated successfully", 
            data:updatedSubSection,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't update sub-section due to some error", 
        })
    }
}
//delete section

exports.deleteSubSection=async(req,res)=>{
    try {
        //data id
        const {subSectionId,sectionId}=req.params;

        //delete course
        const deletedSubSection=await SubSection.findByIdAndDelete({_id:subSectionId});

        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:deletedSubSection._id,
                }
            },
            {new:true},
        )
        
        //return res
        return res.status(500).json({
            success:true,
            message:"sub-section deleted successfully", 
            data:updatedCourseDetails,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't delete sub-section due to some error", 
        })
    }
}