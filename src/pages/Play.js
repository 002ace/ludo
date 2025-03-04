import React, { useEffect, useState } from 'react'
import { FaCoins, FaMinus, FaPlus, FaPlusMinus } from 'react-icons/fa6'
import { MdRotate90DegreesCcw } from 'react-icons/md'
import { RiCoinsFill, RiCoinsLine } from 'react-icons/ri'

import Header from '../Components/Header'
import { GoDotFill } from 'react-icons/go'
import { Form, Link } from 'react-router-dom'

import blue from '../assets/ludo button(blue ring).png'
import red from '../assets/ludo button(red ring).png'
import green from '../assets/ludo button(green ring).png'
import yellow from '../assets/ludobuttonyellowring.png'
import audio from '../assets/goti.mp4'
import {   useSelector , useDispatch } from 'react-redux' 
import { getUser } from "../utils/userSlice";
import  wss from   '../pages/socket'


const Play = () => {
  
   
  const[ws ,  setWs] =  useState()
  const dispatch = useDispatch();
  
  const user  = useSelector((store) =>  store?.user)
  console.log(user);
  const playerId   = user?.user?.userDetails?._id;
  console.log(playerId   , "THIS  iS  PLAYERid");
  // const[username  ,  setUserName] = useState(user?.user?.userDetails?.userName)
  // const [phone  , setPhone ] =  useState(user?.user?.userDetails?.phone)
  

  const username  =  user?.user?.userDetails?.userName 
  const  phone  =    user?.user?.userDetails?.phone 

  console.log(username , "this  is player username ")
  console.log(phone , "this  is  player phone number" );

  const timestamp = Date.now();

// Convert the timestamp into a Date object
  const date = new Date(timestamp);

// Extract the time part (hours, minutes, and seconds)
  const time = date.toLocaleTimeString();

  useEffect(()=>{
    

   
    // const wss  =  new WebSocket("ws://localhost:8080")

    dispatch(getUser())
    setWs(wss)

    wss.onopen = () => {
      console.log('WebSocket connection opened');
    };

   


  } , [])
  //payload.message.selectedColor
  const sendMess = ()=>{
    console.log("send message work")
     ws?.send(JSON.stringify({
           type:"chat",
           roomCode:"room002",
           payload:{
              message:{

                   "username": username,
                   "playerId":playerId,
                   "phone": phone,
                   "selectedColor": selectedColor,
                   "time":time,
                   "amount":entryAmount


                     
              }
           }
     }))
  }

  const colors = [
   
    {
      color:'red',
      image: red,
    },
    {
      color: 'green',
      image: green,
    },
    {
      color: 'yellow',
      image: yellow,
    },
    {
      color: 'blue',
      image: blue,
    },
  ]; 
  const [selectedColor, setSelectedColor] = useState('blue'); 
  const [selectedPlayer, setSelectedPlayer] = useState(''); 

  console.log("selectedColor11",selectedColor)

  const handleSelection = (color) => {
    setSelectedColor(color);
    // console.log(selectedColor);
  };
  const handleplayer = (count) => {
    setSelectedPlayer(count);
  };

    const [entryAmount, setEntryAmount] = useState(500);
    const winAmount = entryAmount * 5; 
  
    const increment = () => {
      setEntryAmount(prev => prev + 100);
      playsound();
    };
  
    const decrement = () => {
      if (entryAmount > 100) {
        setEntryAmount(prev => prev - 100);
        playsound();
      }
    };

    const playsound = () => {
      const sound = new Audio(audio); 
      sound.play();
    };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#2f2f2f8e] to-[#00000094]">
    <div className=" mx-auto space-y-6">
      <Header />

      {/* Main Menu Card */}
      <div className=" w-[80%] mx-auto space-y-6">
        {/* Color Selection */}
        <div className="space-y-2 rounded-sm bg-gradient-to-l border-2 border-[orange] shadow-[0px_0px_10px_orange] from-[#000e20] to-[#004db7] py-3">
  <h2 className="text-yellow-400 font-bold text-xl text-center text-stroke">SELECT YOUR COLOR</h2>
  <div className="flex justify-around gap-1">
    {colors.map((item, index) => (
      <div key={index} className="flex flex-col items-center gap-1">
        <img
          src={item.image} 
          alt="img"
          className="w-16 h-16"
        />
        <input
          type="checkbox"
          onClick={playsound}
          value={item.color}
          checked={selectedColor === item.color}
          onChange={() => handleSelection(item.color)}
          style={{
            backgroundColor: selectedColor === item.color ? item.color : 'transparent', 
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            appearance: 'none', 
            border: `3px solid ${item.color}`,
            borderRadius: '50%',
          }}
        />
      </div>
    ))}
  </div>
</div>


        {/* Player Selection */}
        <div className="space-y-2  rounded-sm bg-gradient-to-l border-2 border-[orange] shadow-[0px_0px_10px_orange] from-[#000e20] to-[#004db7] py-3">
          <h2 className="text-yellow-400 font-bold text-xl text-center text-stroke">SELECT PLAYER</h2>
          <div defaultValue="2" className="space-y-2">
            {[2, 4].map((count) => (
              <form key={count} className="flex items-center justify-center gap-2">
                <input type='radio' onClick={playsound} value={count.toString()} id={`players-${count}`} checked={selectedPlayer === count} onChange={() => handleplayer(count)} />
                <label
                  htmlFor={`players-${count}`}
                  className="text-white text-2xl font-bold text-stroke"
                >
                  {count} PLAYERS
                </label>
              </form>
            ))}
          </div>
        </div>

        {/* Game Selection */}
        <div className="space-y-2  rounded-sm bg-gradient-to-l border-2 border-[orange] shadow-[0px_0px_10px_orange] from-[#000e20] to-[#004db7] py-3">
          <h2 className="text-yellow-400 font-bold text-xl text-center text-stroke">SELECT GAME</h2>
          <div className=" p-4 ">
          <div className='flex justify-between items-center'>
          <div
                onClick={decrement}
                className="bg-blue-600  text-white border h-6 w-6 rounded-sm border-white flex items-center justify-center"
              >
                <FaMinus className="" />
              </div>
              <div className='bg-[orange] rounded-md w-[10rem] p-2'>
              <div className='bg-gradient-to-b from-[#c9ca96] to-[#5e5f48] flex flex-col py-2 rounded-md'>
              <div className='text-xl font-bold text-white text-stroke'>WIN</div>
              <p className="text-sm font-bold text-white bg-[#434332] w-[6rem] mx-auto rounded ">{winAmount.toLocaleString()}</p>
              </div>
              <p className='text-center text-black text-lg font-bold'>Entry: 500</p>
              </div>
              <div 
                onClick={increment}
                className="bg-blue-600  text-white border h-6 w-6 rounded-sm border-white flex items-center justify-center"
              >
                <FaPlus className="" />
              </div>
              </div>
            <div className="flex items-center flex-col justify-between text-center">  
              {/* onClick={playsound} */}
            <p className='flex items-center text-white font-semibold text-sm gap-1 mb-2 text-center'><span className='text-green-500'><GoDotFill /></span>27000 Player Online</p>
 <Link to={`/game?color=${selectedColor}`} onClick={sendMess}  className="w-[10rem] text-stroke rounded-lg p-1 border-2 border-orange-400 shadow-[0px_0px_10px_orange] text-base bg-gradient-to-b from-[#0f9bff] to-[#063f79] text-white font-bold"  >
          PLAY  
        </Link>
            </div>
          </div>
        </div>
        
      </div>


      <Link to='/' onClick={playsound} variant="ghost" size="icon" className="absolute bottom-4 left-4 bg-gradient-to-b from-[#0f9bff] to-[#063f79] p-1 rounded shadow-[0px_0px_10px_orange]">
        <MdRotate90DegreesCcw className="w-6 h-6 text-[orange]" />
      </Link>
    </div>
  </div>
  )
}

export default Play
