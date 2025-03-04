import React , { useEffect } from 'react'
import Header from '../Components/Header'
import { GoDotFill } from "react-icons/go";
import { RiFullscreenFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import audio from '../assets/goti.mp4'
import { useSelector , useDispatch } from 'react-redux';
import { getUser } from '../utils/userSlice';



const Home = () => {

  //  const user  = useSelector((store) =>  store?.user)
  //  console.log("it is store",user)
  //  console.log("this is  store",user?.user?.user?.userName);

  // const  dispatch =  useDispatch();
  // const user  = useSelector((store) =>  store?.user)
  // console.log("it is store",user)
  // console.log("this is  store",user?.user?.user?.userName);

  // useEffect(()=>{

  //     dispatch(getUser())
  //     console.log("inside useeffect")

  // } , [])
  // console.log("this is  store",user?.user?.user?.userName);

  const playsound = () => {
    const sound = new Audio(audio); 
    sound.play();
  };
  
  return (
   <div className='h-[100vh] w-full relative'>
   <Header /> 
   <div onClick={playsound} className='flex flex-col gap-3 items-center overflow-hidden justify-center mt-[30px] w-[70%] mx-auto'>
<div><img src="https://webassets.mongodb.com/_com_assets/cms/Ludo%20King-j1h0g56nga.png" className=' h-[20vh] mx-auto' alt="logo" /></div>
<Link to='/play' className=' bg-gradient-to-b from-[#ffd746] to-[#ffb400]  rounded-3xl p-2 w-[70%] shadow-[0px_0px_20px_#ac6528] border border-[#ff7b00]'>
    <div className='h-[100px] w-full bg-gradient-to-b from-[#0f9bff] to-[#063f79] border-4 border-[#644800] shadow-[0px_0px_20px_#644800] rounded-2xl'><img src="https://cdn-icons-png.flaticon.com/512/7509/7509961.png" className='h-[90px] mt-[5px] w-auto mx-auto  object-cover overflow-hidden' alt="" /></div>
    <p className='text-center font-bold text-lg text-white text-stroke'>ONLINE <br />MULTIPLAYER</p>
</Link>
<p className='flex items-center text-white font-semibold text-sm gap-1 mb-2'><span className='text-green-500'><GoDotFill /></span>27000 Player Online</p>
<Link to='/play' onClick={playsound} className='bg-gradient-to-b from-[#ffd746] to-[#ffb400] rounded-3xl p-2 w-[70%] shadow-[0px_0px_20px_#ac6528] border border-[#ff7b00]'>
    <div className='h-[100px] w-full bg-gradient-to-b from-[#0f9bff] to-[#063f79] border-4 border-[#644800] shadow-[0px_0px_20px_#644800] rounded-2xl'><img src="https://cdn-icons-png.flaticon.com/512/7509/7509961.png" className='h-[90px] mt-[5px] w-auto mx-auto  object-cover overflow-hidden' alt="" /></div>
    <p className='text-center font-bold text-lg text-white boxShadow text-stroke'>COMPUTER</p>
</Link>
   </div>
   <div className='absolute bottom-0 left-2 flex flex-col items-center'>
    <img src="https://freepngimg.com/download/youtube/77758-logo-live-computer-youtube-icons-png-download-free.png" className='h-[40px] w-auto  z-10' alt="" />
    <p className='bg-black border-[#ffb400] border-2 px-1 text-sm w-full text-white'>+100 coins</p>
   </div>
   <div className='absolute bottom-0 right-2 flex justify-center items-center border border-[#2d2dff] h-[40px] w-[40px] bg-gradient-to-b from-[#0f9bff] to-[#063f79] rounded-lg'>
   <RiFullscreenFill className='text-white h-7 w-7' />
   
   </div>
   </div>
  )
}

export default Home
