const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      default: 1000,
    },
    userName: {
      type: String,
      unique : true 
    },
    phone: {
      type: String,
      unique: true,
    },
    money: {
      type: Number,
      default: 0,
    },
    withdrawl: {
      type: Number,
    },
    code: {
      type: Number,
    },
    inviteCode: {
      type: Number,
    },
    otp: {
      type: String,
    },
    status:{
        
       type : String ,
       default:0
    }, 
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
      
    },
    image:{
        type:String
    },
    token:{
        type:String,
    },
    betAmount : {
         type:String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
