const mongoose =   require("mongoose");

const  withdrawlSchema =  new mongoose.Schema({
       
        user:{
                       type: mongoose.Schema.Types.ObjectId,
                       ref: "User", 
                       required: true
        },
          userName:{
                     
                     type:String ,
          },
          bankName:{
            type:String ,
        },
        ifscCode:{
            type:String,
        },
        accountNumber:{
           type:String,
        },
        time:{
            type: String, // Store as a formatted string
            default: () => new Date().toLocaleString("en-US", { 
                month: "long", day: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
                hour12: false 
            })
          },
        



})

module.exports =  mongoose.model('Withdrawl', withdrawlSchema) ;
