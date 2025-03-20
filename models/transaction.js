const  mongoose  =  require("mongoose");
const  User =  require("../models/userSchema");

//userID , amount  ,  remark ,  time
const   transactionDetails =   new mongoose.Schema({
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true
          },
          userName:{
             type:String,
          },
          amount:{
               type:Number,
          },
          remark:{
              
              type:String,
              enum:["withdrawl" , "deposit"]

          },
          time: {
            type: String, // Store as a formatted string
            default: () => new Date().toLocaleString("en-US", { 
                month: "long", day: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit",
                hour12: false 
            })
          }

})

module.exports = mongoose.model("Transaction",transactionDetails);



