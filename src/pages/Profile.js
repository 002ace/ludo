import React, { useEffect } from 'react'
import { BiCoin } from 'react-icons/bi'
import { FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6'
import { GiTrophy } from 'react-icons/gi'
import { LuSwords } from 'react-icons/lu'
import { MdRotate90DegreesCcw } from 'react-icons/md'
import { RiCoinsLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import audio from '../assets/goti.mp4'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../utils/userSlice";

const Profile = () => {
  const  dispatch =  useDispatch();
  const user  = useSelector((store) =>  store?.user)
 

  useEffect(()=>{

      dispatch(getUser())
      console.log("inside use - effect")

  } , [])
  
 
  console.log("it is store",user)
  console.log("this is  userName",user?.user?.userDetails?.userName);
  console.log("this is  store",user?.user?.user?.userName);


    const playsound = () => {
        const sound = new Audio(audio); 
        sound.play();
      };
  return (
    <div className='w-full'>
      <div className="h-screen w-full bg-[#00000086] flex flex-col items-center justify-center p-4">
      <div className="w-[80%] mx-auto   rounded-sm bg-gradient-to-l border-2 border-[orange] shadow-[0px_0px_10px_orange] from-[#000e20] to-[#004db7] py-3">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-2xl font-bold text-yellow-500 text-center text-stroke">
            STATISTICS
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 overflow-hidden object-cover bg-green-600 flex items-center justify-center text-2xl font-bold text-white rounded-lg">
              <img src="https://images.statusfacebook.com/profile_pictures/stylish-girls/stylish-girls-profile-pictures-06.jpg" className='h-full w-full  object-cover' alt="" />
            </div>
            <div className="flex-1">
              <div className="text-white text-lg font-semibold mb-2 p-2 bg-gradient-to-l  from-[#000e2000] to-[#001025]" >
                {user?.user?.userDetails?.userName}
              </div>
              <div className="flex items-center gap-2 rounded-md bg-[#8d0000] border border-[yellow] px-4">
            <span className='text-yellow-500'><RiCoinsLine /></span>
                <span className="text-white font-bold">1,400</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="">
             <FaStar className='h-6 w-6 text-yellow-500' />
              </div>
              <div className="flex-1 h-5 bg-blue-900 rounded-full border border-yellow-500 overflow-hidden">
                <div className="w-0 h-full bg-yellow-500" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="text-white text-center">0/180</div>
          </div>

          {/* VS Computer Stats */}
          <div className="space-y-2">
            <div className="text-yellow-500 text-base font-bold bg-[#001025] p-1">vs Computer</div>
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center bg-[#001025] p-2">
            <FaThumbsUp className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
              <div className="flex flex-col items-center bg-[#001025] p-2">
              <FaThumbsDown  className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
            </div>
          </div>

          {/* Online Multiplayer Stats */}
          <div className="space-y-2">
            <div className="text-yellow-500 text-base font-bold bg-[#001025]">Online Multiplayer</div>
            <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center bg-[#001025] p-2">
            <FaThumbsUp className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
              <div className="flex flex-col items-center bg-[#001025] p-2">
              <FaThumbsDown  className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
              <div className="flex flex-col items-center bg-[#001025] p-2">
              <GiTrophy  className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
              <div className="flex flex-col items-center bg-[#001025] p-2">
              <LuSwords  className='text-yellow-500 text-2xl' />
                <span className="text-white">0</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
        
            <Link onClick={playsound} to='/' variant="ghost" size="icon" className="absolute bottom-4 left-4 bg-gradient-to-b from-[#0f9bff] to-[#063f79] p-1 rounded shadow-[0px_0px_10px_orange]">
        <MdRotate90DegreesCcw className="w-6 h-6 text-[orange]" />
      </Link>
          </div>
        </div>
        
      </div>
      <div onClick={playsound}
              className="w-[40%] mx-auto mt-4 bg-gradient-to-t from-[#000e20] to-[#004db7] border-2 border-[orange] shadow-[0px_0px_10px_orange] text-white font-semibold py-2 rounded-full transition duration-200"
            >
              Logout
            </div>
    </div>
    </div>
  )
}

export default Profile
