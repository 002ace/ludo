const User = require("../../models/userSchema");
const dotenv  = require("dotenv");
const jwt  = require("jsonwebtoken");
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

dotenv.config();

let generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};



exports.sendOtp = async (req, res) => {              
  const { phone } = req.body;
  try {
    console.log(phone);
    if (!phone || typeof phone !== "string") {
      return res.status(400).json({
        message: "Phone number is required and must be a valid string",
      });
    }

    let generatedOtp = generateOTP();

    let otpEntry = await User.findOne({ phone });

    if (otpEntry) {
      otpEntry.otp = generatedOtp;
      await otpEntry.save();
    } else {
      otpEntry = await User.create({ phone, otp: generatedOtp });
    }

    return res.status(200).json({
      message: "OTP sent successfully",
      otp: generatedOtp, // Remove this in production (only for debugging)
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { userName, phone, otp } = req.body;

    if (( !userName || !phone || !otp)) {
      return res.status(500).json({
        message: "all field are required",
      });
    }

    const userExist = await User.findOne({ phone });
    console.log(userExist);

    const payload  = {
        role:userExist.role,
        _id:userExist._id
    }

    if (userExist.status ==='0') {
        
         if(userExist.otp === otp)
         {  

          const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });
          
          let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }); // Expires in 24 hours
          
          const updatedUser = await User.findOneAndUpdate(
            { phone: phone },
            {
              userName: userName,
              status: '1',
              userId : lastUser.userId + 1,
              token:token
            },
            { new: true } // Returns the updated document
          );

          const option = {
            expires : new Date( Date.now() + 3 *24 *60*60*1000),
            httpOnly : true
         }
      
          return res.cookie('token' , token , option).status(200).send({
            message: "User signup successfully",
            user: updatedUser,
            token
          });

          

         }
         else 
         {
              return res.status(400).json({
                  message :"otp did not match"
              })
         }
        
     
    }
    else
    {  
          return res.status(400).json({
           message :"user already exist "
         })
         
    }



    

   
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};


//login
exports.login   = async(req,res)=>{
  try{  

         const {phone , otp}  =  req.body;

         if(!phone || !otp)
         {
                return res.status.json({
                      message :  "all field required",
                      success:false,
                })
         }

         const userExist  =  await User.findOne({phone});
         console.log(userExist)

        if(userExist.status === '0'  | userExist === null)
         {
               return res.status(400).json({
                   meassage:"user does not exist"
                   
               })
         }
         
          
         if(userExist.otp  !== otp)
         {   
               return res.status(400).json({
                   message:"otp did not match  please enter valid otp"
               })

         }


         const payload  = {
             role  :  userExist.role,
             _id :  userExist._id
         }

         let token  =  jwt.sign(payload , process.env.JWT_SECRET , { expiresIn: '24h' } );

         const updateToken  =  await User.findOneAndUpdate(
                               {phone : phone},
                               {token :  token},
                               { new: true } 

                               )
          
          const option =  {
                                expires : new Date( Date.now() + 3 *24 *60*60*1000),
                                httpOnly : true
                          }
                          
          return res.cookie('token' , token , option).status(200).send({
                                message: "User login successfully",
                                user: updateToken,
                                token
                              });

        



  }
  catch(error)
  {    
       return res.status(400).json({
          message:"failed to login",
          success:false 
      })

  }

}



//logout
exports.logout   = async(req,res)=>{
  try{  
        

        const option = {
              expires : new Date( Date.now() ),
       
        }
        res.cookie('token' , null , option).status(200).json({
              success:true,
              message:"user logedout in successfully"
          })

          
  }
  catch(error)
  {  
      return res.status(400).json({
          message: "failed to  log out",
          error: error.message,
        })

  }
}



//getAllUser
exports.getAllUser  = async(req , res) =>{
     try
     {     
          
             const userDetails  =  await User.find({status:"1"});

             if(!userDetails)
             {
                  return res.status(400).json({
                      message:"user does not exist",
                      success:false,
                       
                  })
             }

             return res.status(200).json({

                 message: "successfully",
                 details:userDetails

             })






        

     }
     catch(error)
     {  

         return res.status(400).json({
          message: "failed to get details",
           error: error.message,
         })

     }
}


exports.getUserById  =  async(req  , res) =>{
     
       try
       {      
        
               const id  = req.params.id
               console.log(id);
              const userDetails =  await User.findById(req.user._id);

              if(!userDetails)
              {
                     return res.status(400).json({
                         message:"user does not exist with this  user id"

                     })
              }


              return res.status(200).json({
                  message :"user details fetched successfully ",
                  success:true ,
                  userDetails

              })

            

       }
       catch(error)
       {    
             return res.status(400).json({
              message: "failed to get details",
              error: error.message,
            })   
        
           

       }


  }


exports.updateUserDetails = async (req, res) => {
    try {
        const { userName, phone } = JSON.parse(req.body.data);
        console.log({ phone, userName });

        // Check if file exists

        const file = req.files.file;
        console.log("files", file);

        // Convert file to Base64 (not necessary for imgBB upload, but you could use it for other purposes)
 

        // ImgBB API Key
        const apiKey = "8d1cb51ab63b5d86b27ad991a01a6bcf";

        // Prepare FormData for upload (we now use the correct method for handling file uploads)
        const form = new FormData();
        form.append('image', fs.createReadStream(file.tempFilePath), file.name);

        // Upload to ImgBB
        const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
            headers: {
                ...form.getHeaders(),
            }
        });

        // Extract Image URL from the response
        const imageUrl = imgbbResponse.data.data ? imgbbResponse.data.data.url : "no-image";

        // Update User Details
        const findDetails = await User.findOneAndUpdate(
            { phone: phone, status: "1" },
            { userName: userName, image: imageUrl },
            { new: true }
        );

        if (!findDetails) {
            return res.status(400).json({
                message: "Failed to update user details",
                success:false,
                findDetails,
            });
        }

        return res.status(200).json({
            message: "User details updated successfully",
            findDetails,
        });
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        return res.status(400).json({
            message: "Failed to update details",
            error: error.response?.data || error.message,
        });
    }
};


//-------->

const Game  =  require("../../models/gameSchema")

exports.getGameDetails  = async(req,res) =>{ 
  
      try
      {   
            const id = req.user._id  ;

            console.log("this is user - madara-uchiha id" , id);

            const  game  = await Game.findOne({ "players.id": id });
            if (!game) {
              return res.status(404).json({
                  success: false,
                  message: "Game not found for this player"
              });
            }

            const playerDetails = game.players.find(player => player.id === id.toString());
            return res.status(200).json({
                   playerDetails:playerDetails,
                   gameDetails:game

                  
            })

      }
      catch(error)
      {    
           return  res.status(500).json({
                 success:false,
                 error:error.message
           })

      }
      
}





