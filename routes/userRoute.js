const express  =  require("express");

const  router =  express.Router();
const{sendOtp , signup  , login , logout ,getAllUser , getUserById , updateUserDetails,getGameDetails}  =  require("../controllers/userAuth.js/registerUser")
const{auth}  =  require("../middleware/auth");


router.post("/sendotp" , sendOtp)
router.post("/signup" , signup)
router.post("/login", login)
router.post("/logout" , logout)
router.post("/update" , updateUserDetails)



router.get("/getalluser"  , getAllUser)
router.get("/getbyid" ,auth , getUserById)



router.get("/gamedetails",auth,getGameDetails)






module.exports =  router