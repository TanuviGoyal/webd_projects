const Course=require("../models/Course");
const Section=require("../models/Section");

//create section

exports.createSection=async(req,res)=>{
    try {
        //data fetch 
        const {sectionName,courseId}=req.body;

        //data validate
        if (!sectionName || !courseId) { 
            return res.status(500).json({
                success:false,
                message:"missing details", 
            })
        }

        //create section 
        const newSection=await Section.create({sectionName});

        //update course
        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        
        //return res
        return res.status(500).json({
            success:true,
            message:"section created successfully", 
            updatedCourseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't create section due to some error", 
        })
    }
}

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		const { sectionId,courseId } = req.params;
		await Section.findByIdAndDelete(sectionId);
        const updatedCourseDetails=await Course.findByIdAndUpdate(
            courseId,
            {
                $pull:{
                    courseContent:sectionId._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

		return res.status(200).json({
			success: true,
			message: "Section deleted",
            updatedCourseDetails,
		});
	} catch (error){
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

//update section 

// exports.updateSection=async(req,res)=>{
//     try {
//         //data fetch 
//         const {sectionName,sectionId}=req.body;

//         //data validate
//         if (!sectionName || !sectionId) {
//             return res.status(500).json({
//                 success:false,
//                 message:"missing details", 
//             })
//         }

//         //update section 

//         const updatedSection=await Section.findByIdAndUpdate(
//             sectionId,
//             {sectionName},
//             {new:true}, 
//         )
        
//         //return res
//         return res.status(500).json({
//             success:true,
//             message:"section updated successfully", 
//             data:updatedSection,
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"can't update section due to some error", 
//         })
//     }
// }
// //delete section

// exports.deleteSection=async(req,res)=>{
//     try {
//         //data id
//         const {sectionId}=req.params;

//         //delete course
//         const deletedSection=await Section.findByIdAndDelete(sectionId);

//         const updatedCourseDetails=await Course.findByIdAndUpdate(
//             sectionId,
//             {
//                 $pull:{
//                     courseContent:deletedSection._id,
//                 }
//             },
//             {new:true},
//         )
        
//         //return res
//         return res.status(500).json({
//             success:true,
//             message:"section deleted successfully", 
//             data:updatedCourseDetails,
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"can't delete section due to some error", 
//         })
//     }
// }