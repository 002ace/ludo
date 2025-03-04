// import React, { useState } from "react";
// import ludoking from "../assets/ludoking.png";
// import { FaPaperPlane } from "react-icons/fa";
// import axios from "axios";
// import  {useDispatch,  useSelector}  from "react-redux"
// import { userDetails } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//           const[userName  ,  setusername]  =  useState("");
//           const[phone  ,  setphonenumber]  =   useState("");
//           const[otp ,  setOtp] =  useState("");
//           const dispatch =  useDispatch();
//           const navigate =  useNavigate()

//           const  handlesignup = ()=>{
             
//                       if(!userName || !phone || !otp)
//                       {
//                           return ;
//                       }
//                       console.log("user clicked")

//                       // dispatch(userDetails({userName ,phone , parseInt(otp)}))
//                       dispatch(userDetails({ userName, phone, otp: parseInt(otp) }));

//                       navigate("/login")
                     
              
              

//           }


          
//   return (
//     <div className="bg-[#4468B4] bg-opacity-15 h-[99.5vh] w-[59.3vh]">
//       {/* Header */}
//       <div className="bg-[#4468B4] border-b-2 border-[#FACD15] h-8 flex items-center justify-center text-white">
//         Hello, how are you?
//       </div>

//       <div className="flex flex-col mx-auto justify-center items-center mt-10 space-y-10">
//         {/* Logo */}
//         <img src={ludoking} height={357} width={257} alt="Ludo King" />

//         {/* Signup Form */}   
//         <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl p-6 w-full h-96 max-w-sm">
//           {/* Header */}
//           <div className="text-center text-white text-lg font-semibold mb-6">
//             Create an Account
//           </div>

//           {/* Logo */}
          

//           {/* Input Fields */}
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Username"
//               className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
//               onChange={(e) => setusername(e.target.value)}
//             />

//             <input
//               type="text"
//               placeholder="Phone Number"
//               className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
//               onChange={(e)=>setphonenumber(e.target.value)}
//             />


//             {/* OTP Field with Button */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
//               />
//               <button className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-1 bg-[#04B4EF] px-6 py-3 text-white rounded-full text-sm shadow-md hover:bg-[#038ACD] transition  ">
//                 Send <FaPaperPlane />
//               </button>
//             </div>


//             <p className="text-center text-gray-200  drop-shadow-md ">
//              Already have an account?
//             <span className="text-[#FACD15] cursor-pointer hover:underline">
//               Sign in here
//             </span>
//           </p>


//             {/* Signup Button */}
//             <button className=" ml-2 mb-2 w-[85%] bg-[#04B4EF] text-white py-5 rounded-full shadow-md border border-white/10 hover:bg-[#038ACD] transition  text-sm"   onClick={handlesignup}>
//               Sign Up
//             </button>
            
//           </div>

//           {/* Already Have an Account? */}
         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;





import React, { useState } from "react";
import ludoking from "../assets/ludoking.png";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sendotp, userDetails } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!userName || !phone || !otp) {
      console.log("All fields must be filled out");
      return;
    }

    console.log("user clicked", { userName, phone, otp });

    // Dispatch user details with OTP parsed as an integer
    dispatch(userDetails({ userName, phone, otp:otp }));

    // Navigate to login page after successful signup
    navigate("/");
  };

  const sendOtp = () => {
    // You can implement OTP sending functionality here
     if(!otp)
     {
          return ;
     }
     dispatch(sendotp(phone))
  };



  return (
    <div className="bg-[#4468B4] bg-opacity-15 h-[99.5vh] w-[59.3vh]">
      {/* Header */}
      <div className="bg-[#4468B4] border-b-2 border-[#FACD15] h-8 flex items-center justify-center text-white">
        Hello, how are you?
      </div>

      <div className="flex flex-col mx-auto justify-center items-center mt-10 space-y-10">
        {/* Logo */}
        <img src={ludoking} height={357} width={257} alt="Ludo King" />

        {/* Signup Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl p-6 w-full h-96 max-w-sm">
          {/* Header */}
          <div className="text-center text-white text-lg font-semibold mb-6">
            Create an Account
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
              value={userName}  // Bind userName state
              onChange={(e) => setUserName(e.target.value)}  // Handle username input
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
              value={phone}  // Bind phone state
              onChange={(e) => setPhoneNumber(e.target.value)}  // Handle phone number input
            />

            {/* OTP Field with Send Button */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
                value={otp}  // Bind OTP state
                onChange={(e) => setOtp(e.target.value)}  // Handle OTP input
                
              />
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-1 bg-[#04B4EF] px-6 py-3 text-white rounded-full text-sm shadow-md hover:bg-[#038ACD] transition"
                onClick={sendOtp} // Call OTP sending function
              >
                Send <FaPaperPlane />
              </button>
            </div>

            <p className="text-center text-gray-200  drop-shadow-md ">
              Already have an account?
              <span className="text-[#FACD15] cursor-pointer hover:underline">
                Sign in here
              </span>
            </p>

            {/* Signup Button */}
            <button
              className=" ml-2 mb-2 w-[85%] bg-[#04B4EF] text-white py-5 rounded-full shadow-md border border-white/10 hover:bg-[#038ACD] transition  text-sm"
              onClick={handleSignup} // OnClick handler
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;









