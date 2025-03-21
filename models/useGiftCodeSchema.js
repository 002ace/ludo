const  mongoose =  require("mongoose");

const   usedGiftCode =  new  mongoose.Schema({
     
          user:{
                   type: mongoose.Schema.Types.ObjectId,
                   ref: "User", 
                   required: true,
            },
            giftCode: [
                {
                    code: { type: String, required: true },
                    amount: { type: Number, required: true }
                }
            ]


      

})


module.exports = mongoose.model("UsedGiftCode" , usedGiftCode);
