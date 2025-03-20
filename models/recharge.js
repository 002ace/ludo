const mongoose = require("mongoose");


const  recharge  =   new mongoose.Schema({
    
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
      },
       rechargeType:{
          type : String ,
       },
       amount:{
           type:Number,
       },
       utrNo:{
            type:String ,
       },
       time: {
        type: String, // Store as a formatted string
        default: () => new Date().toLocaleString("en-US", { 
            month: "long", day: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: false 
        })
      },
       orderId:{
           type:String,
       },
       status:{
          type:String ,
          enum:["pending" , "accepted" , "rejected"],
          default:"pending"
       },
       action:{
           type:String ,
           enum:["accepted" , "rejected" , "pending"],
           default:"pending"
       }




})


module.exports =   mongoose.model("Reacharge" , recharge);



//Transaction->  userID , amount  ,  remark ,  data 
//addBank userId  , username  , baknk name  , account  , IFSC  , upiId , dataTime 
//