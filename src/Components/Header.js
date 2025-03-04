import React from "react";
import { FaPlus, FaStar } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdMail, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import audio from '../assets/goti.mp4'

const header = () => {
  const playsound = () => {
    const sound = new Audio(audio); 
    sound.play();
  };
  return (
    <div className="">
      <div className="flex items-center justify-between bg-gradient-to-b from-[#0f9bff] to-[#063f79] text-white  border-b-[3px] border-yellow-400">
        <div className="flex items-center gap-2">
          {/* Profile Section */}
          <div className="relative w-[80px] ">
            <Link to='/profile' onClick={playsound} className="absolute -top-5 -left-0 rounded bg-gradient-to-b from-[#0f9bff] to-[#063f79] px-2 py-2">
              <img
                src="https://images.statusfacebook.com/profile_pictures/stylish-girls/stylish-girls-profile-pictures-06.jpg"
                alt="Profile"
                className="h-[50px] w-[50px] overflow-hidden rounded-sm object-cover"
              />

              <div className="relative w-[50px] mt-1">
                {/* Star Icon */}
                <div className="absolute top-1/2 left-[-5px] transform -translate-y-1/2 text-[#ffd500] z-10">
                  <FaStar />
                </div>

                {/* Custom Progress Bar */}
                <div className="relative w-full h-[10px] bg-transparent border border-[#e5b409] rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#e5b409] transition-all"
                    style={{ width: "50%" }} // Replace with dynamic value as needed
                  ></div>
                </div>
              </div>
            </Link>
          </div>

          {/* Action Icons */}
        </div>

        {/* Resources */}
        <div className="flex items-center justify-center gap-3 overflow-hidden">
          <div className="flex items-center gap-4">
            <Link
              to="/setting"
              className="rounded-full p-1.5 hover:bg-white/10"
            >
              <IoSettings onClick={playsound} className="h-6 w-6" />
            </Link>
            <div onClick={playsound} className="rounded-full p-1.5 text-[#e5b409]">
              <MdMail className="h-7 w-7" />
            </div>
          </div>
          {/* Coins */}
          <div className="flex items-center gap-1">
            <div className="flex items-center  bg-[#09114f] px-1 w-[70px] justify-end rounded-sm ">
              <span className="mr-1 font-semibold text-sm">100</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-sm  bg-gradient-to-br from-[#66ff48] to-[#116001]">
                <FaPlus className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1">
            <div className="flex items-center  bg-[#09114f] px-1 w-[90px] justify-end rounded-sm ">
              <span className="mr-1 font-semibold text-sm">22</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-gradient-to-br from-[#66ff48] to-[#116001]">
                <FaPlus className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Search */}
          <div className=" rounded p-1.5 bg-gradient-to-b from-[#0f9bff] to-[#013a73] shadow-md mr-2">
            <MdOutlineSearch className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default header;
