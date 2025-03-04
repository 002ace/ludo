import React, { useState } from "react";
import ludoking from "../assets/ludoking.png";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sendotp, loginUser } from "../utils/userSlice";  // Updated import
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!phone || !otp) {
      console.log("Phone and OTP are required");
      return;
    }

    console.log("user clicked", { phone, otp });

    // Dispatch loginUser with phone and OTP as parameters
    const trimmedOtp = otp.trim();

    dispatch(loginUser({ phone, otp:trimmedOtp }));

    // Navigate to login page after successful signup
    navigate("/");
  };

  const sendOtp = () => {
    // Implement OTP sending functionality here
    if (!phone.trim()) {
      console.log("Phone number is required");
      return;
    }
     console.log(phone)
    dispatch(sendotp({phone}));
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
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
              value={phone} // Bind phone state
              onChange={(e) => setPhoneNumber(e.target.value)} // Handle phone number input
            />

            {/* OTP Field with Send Button */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-full outline-none border border-white/20 focus:border-[#04B4EF] transition"
                value={otp} // Bind OTP state
                onChange={(e) => setOtp(e.target.value)} // Handle OTP input
              />
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-1 bg-[#04B4EF] px-6 py-3 text-white rounded-full text-sm shadow-md hover:bg-[#038ACD] transition"
                onClick={sendOtp} // Call OTP sending function
              >
                Send <FaPaperPlane />
              </button>
            </div>

            <p className="text-center text-gray-200 drop-shadow-md ">
              Don't have an account?
              <span
                className="text-[#FACD15] cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </span>
            </p>

            {/* Signup Button */}
            <button
              className="ml-2 mb-2 w-[85%] bg-[#04B4EF] text-white py-5 rounded-full shadow-md border border-white/10 hover:bg-[#038ACD] transition text-sm"
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
