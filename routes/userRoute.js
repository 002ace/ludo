const express  =  require("express");

const  router =  express.Router();
const{sendOtp , signup  , login , logout ,getAllUser , getUserById , updateUserDetails,getGameDetails}  =  require("../controllers/userAuth.js/registerUser")
const{auth}  =  require("../middleware/auth");
const {recharge , getAllrecharge , acceptOrReject,addBankDetails,withdrawl,withdrawlRequest,createGiftCode,useGiftCode,increaseOrdecrease}  = require("../controllers/userAuth.js/recharge");


router.post("/sendotp" , sendOtp)
router.post("/signup" , signup)
router.post("/login", login)
router.post("/logout" , logout)
router.post("/update" , updateUserDetails)



router.get("/getalluser"  , getAllUser)
router.get("/getbyid" ,auth , getUserById)



router.get("/gamedetails",auth,getGameDetails)


//-->RechargeRoute


router.post("/recharge" ,auth,recharge);

router.get("/rechargedetails" , getAllrecharge);

router.post("/status/:status/:requestId",acceptOrReject);


router.post("/withdrawl",auth,withdrawl)

router.post("/bankdetails",auth ,addBankDetails);


router.post('/withdrawlrequest/:status/:requestId' ,auth,withdrawlRequest);


//create gift code api 
router.post('/creategiftcode' ,auth, createGiftCode);


router.post('/usegiftcode',auth,useGiftCode);

router.post('/increaseordecrease',increaseOrdecrease);

module.exports =  router