const mongoose=require("mongoose");

require ("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("db connection success")})
    .catch((error)=>{
        console.log("issue with db connection")
        console.error(error.message);
        process.exit(1);
    });
}
module.exports=dbConnect;