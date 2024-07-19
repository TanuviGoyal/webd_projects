const Category=require("../models/Category");

//create tag

exports.createCategory=async(req,res)=>{
    try {
        //fetch name and desp from req body
        const {name,description}=req.body;

        //validate
        if (!name) {
            return res.status(500).json({
                success:false,
                message:"kindly fill all the details",
            })
        }

        //create entry in db
        const categoryDetails=await Category.create({
            name:name,
            description:description,
        })
        console.log(categoryDetails);

        //return res
        return res.status(500).json({
            success:true,
            message:"Category created successfully",
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't create Category due to error"
        })
    }
}

//get all Category 

exports.getAllCategory=async(req,res)=>{
    try {
        const allCategory=await Category.find({},{name:true,description:true});
        return res.status(500).json({
            success:true,
            message:"all Categorys displayed successfully",
            allCategory,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"can't get Category due to error"
        })
    }
}

//category page details
 
exports.categoryPageDetails=async(req,res)=>{
    try {
        //get category id
        const {categoryId}=req.body;

        //get all courses corresponding to this category id
        const selectedCategory=await Category.findById(categoryId)
                                             .populate("courses").exec();
        
        //validate
        if (!selectedCategory) {
            return res.status(500).json({
                success:false,
                message:"data not found", 
            })   
        }

        //get course for diff categories 
        const differentCategory=await Category.find({_id:{$ne:categoryId}})
                                              .populate("courses").exec(); 
        //get top courses
        //hw

        //res
        return res.status(500).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
            }
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in getting category page", 
        })   
    }
}