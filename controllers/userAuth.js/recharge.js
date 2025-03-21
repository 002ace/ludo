
const   Recharge    =  require("../../models/recharge");
const User  =  require("../../models/userSchema");
const  Transaction = require("../../models/transaction");
const { findById } = require("../../models/gameSchema");
const Bank    = require("../../models/bankSchema");
const Withdrawl  =  require("../../models/withdrawl");

exports.recharge  = async(req,res)=>{
     try
     {
           const{rechargeType,amount,utrNo, orderId} = req.body  ;

           const userId = req.user._id  ;

           if(!userId || !rechargeType || !amount || !utrNo || !orderId)
           {
               return res.status(400).json({
                message: "All field required",
              });
           }

           const  details = await  User.findById(userId).select("userName");

           if(!details)
           {  
               return res.status(400).json({
                message: "User does not exist",
              });
                
           }

           const  rechargeDone  =  await Recharge.create({
                                        user:userId,
                                        rechargeType:rechargeType,
                                        amount:amount,
                                        utrNo:utrNo,
                                        orderId:orderId

                                    })

           return  res.status(200).json({
                success:true,
                 data:rechargeDone,
                 name:details
               
           })


     }
     catch(error)
     {  
        return res.status(500).json({
            message: "Recharge failed",
            error: error.message,
          });

     }
}


exports.getAllrecharge  =  async(req,res) =>{
    try
    {    
           const  allRecharge  =  await  Recharge.find({});

           if(!allRecharge)
           {
                return res.status(400).json({
                    success:false,
                    message:"details does not exist" ,
                })
           }

           return  res.status(200).json({
                success:true,
                data:allRecharge
            })
   

    }
    catch(error)
    {   
        return res.status(500).json({
            message: "failed to get  user details",
            error: error.message,
          });

    }
}


exports.acceptOrReject  = async(req,res)=>{
    try
    {  
          const{status,requestId} =  req.params ;

          console.log(status , requestId)

         
           
           
           const details =  await  Recharge.findOne({user:requestId});

           console.log("userdetails" , details) ;

           if(!details)
           {
                 return  res.status(400).json({
                      success:false,
                      message:"user does not exist"
                 })
           
           }
           
           const  request  =    await  Recharge.findOneAndUpdate({
                                  user:requestId,
                                  status:"pending"

                                } , {status : status}  , {new :  true})
            let  updateAmount
            if(status == "accepted"){
                updateAmount =  await  User.findOneAndUpdate({_id:requestId} , { $inc: { money:+details.amount } }, {new:true});
                const  name =  updateAmount.userName
                console.log("name" , name);
                await Transaction.create({
                                          user:requestId,
                                          userName:name,
                                          amount:details.amount,
                                          remark:"deposit",
                                          
                    
                                     })
                
            }
            if(!updateAmount)
            {
                return res.status(400).json({
                      success:false,
                      message:"update amount request failed"
                })
            }
           
            if(!request)
            {  
                  return res.status(400).json({
                      message:"request not found"
                  })
                  
            }

            return res.status(200).json({
                  success:true,
                  data:request
            })

    }
    catch(error)
    {  
        return res.status(500).json({
            message: "failed request",
            error: error.message,
          });
   
    }
}


//register Bank  Schema 

exports.addBankDetails = async(req,res)=>{
    try
    {   
             const userId = req.user._id  ;
             const{bankName, ifscCode,accountNumber} = req.body;

             if(!userId || !bankName || !ifscCode || !accountNumber )
             {
                   return res.status(400).json({
                        success:false,
                        message:"all field are required"
                        
                   })
             }
             const  details = await  User.findById(userId).select("userName");

             const  bankDetails =  await  Bank.create({
                                    user:userId,
                                    bankName:bankName,
                                    ifscCode:ifscCode,
                                    accountNumber:accountNumber,
                                    userName:details.userName
                                   })
            
            return  res.status(200).json({
                  success:true,
                  data:bankDetails,
                  message:"bank details register successfully"
            })


    }
    catch(error)
    {
        return res.status(500).json({
            message: "failed request",
            error: error.message,
          });
    
    }
}




//--->withdrawl api 




exports.withdrawl   = async(req,res)=>{
     try 
     {     
          const userId = req.user._id ;
         
          const{amount} = req.body ;
          const details = await User.findById(userId);
          const bankDetails = await Bank.findOne({ user: userId });

          if(!bankDetails)
          {
               return res.status(400).json({
                    success:false,
                    message:"bankDetails  does not exist "
               })
         }


          if(!details){
                return res.status(200).json({
                       success:false,
                        message:"user does not exist"
                })
          }


          if(amount > details.money)
          {     
                 return res.status(200).json({
                   success:false,
                    message:"Low  balance"
                })
                
          }

          const  updateAmount =  await  User.findOneAndUpdate({_id:userId} , { $dec: { money:-details.amount } }, {new:true});
           const  name =  updateAmount.userName
          console.log("name" , name);
          await Transaction.create({
                                    user:userId,
                                    userName:name,
                                    amount:details.amount,
                                    remark:"withdrawl",
                                    
              
                               })
            await Withdrawl.create({
                                   user:userId,
                                   userName:name,
                                   bankName:bankDetails.bankName,
                                   ifscCode:bankDetails.ifscCode,
                                   accountNumber:bankDetails.accountNumber,
                                   amount:amount,



                                 })
            
            
            return  res.status(200).json({
                 success:true,
                 message:"withdrawl successfully"

            })




           

     }
     catch(error)
     {   
        return res.status(500).json({
            message: "failed request",
            error: error.message,
          });

     }
}




//adminwithdrawl 
exports.withdrawlRequest  = async(req,res)=>{
     try
     {     
            const role  =  req.user.role  ;
            const{status , requestId} = req.params ;
            console.log("this is role" , role);

            if(role  !== "admin")
            { 
                  return res.status(200).json({
                        success:false,
                        message:"This is protected route for admin"
                  })
                
            }

            const withdrawlDetails  = await Withdrawl.findOne({user:requestId});

            if(!withdrawlDetails)
            {
                  return res.status.json({
                        success:false,
                        message:"withdrawlDetails does not exist"
                  })
            }
            
            if(status === "accepted")
            {  
                await Withdrawl.findOneAndUpdate({user:requestId, status:"pending"} , {status:status} , {new:true});
                await Transaction.create({user:requestId,userName:withdrawlDetails.userName,amount:withdrawlDetails.amount,remark:"withdrawl-accepted",})
            }
            else if(status === "rejected"){
                await Withdrawl.findOneAndUpdate({user:requestId, status:"pending"} , {status:status} , {new:true});
                await  User.findOneAndUpdate({_id:requestId} , { $inc: { money:+withdrawlDetails.amount } }, {new:true});
                await Transaction.create({user:requestId,userName:withdrawlDetails.userName,amount:withdrawlDetails.amount,remark:"withdrawl-rejected",})

            }


            return res.status(200).json({
                   success:true,
                   message:`request ${status}`
            })   
            
     }
     catch(error)
     {   
        return res.status(500).json({
            message: "failed request",
            error: error.message,
          });

     }
}




