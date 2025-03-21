const mongoose  =  require("mongoose");

const  giftCodeSchema =  new mongoose.Schema({
        // giftcodeCount,giftCodeAmount,recharge
        giftCode:{
             type:String,
        },
        giftCodeAmount:{
             type:Number,
        },
        recharge:{
             type:Number,
        },
        giftcodeCount:{
             type:Number,
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


module.exports   =   mongoose.model("Giftcode" , giftCodeSchema);

