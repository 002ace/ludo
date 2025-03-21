const  mongoose =  require("mongoose");




const  addBank  =   new  mongoose.Schema({

      user:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "User", 
             required: true,
             
      },
      userName:{
            type:String,
      },
      bankName:{
          type:String ,
      },
      ifscCode:{
          type:String,
      },
      accountNumber:{
         type:String,
      }

      

})


module.exports =   mongoose.model("Bank" , addBank);
