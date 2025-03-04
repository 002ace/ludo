const  mongoose  =  require("mongoose");

const dbConnect = ()=>{

    mongoose.connect("mongodb://127.0.0.1:27017/ludo")
    .then(()=>{console.log("db connection successfully")})
    .catch(()=>{console.log("failed to connect db")})

}


module.exports  =  dbConnect