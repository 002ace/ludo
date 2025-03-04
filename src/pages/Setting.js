import React, { useEffect, useRef, useState } from 'react'
import { MdRotate90DegreesCcw } from 'react-icons/md'
import { Link, Links } from 'react-router-dom'
import Header from '../Components/Header'
import audio from '../assets/goti.mp4'
import music from '../assets/music.mp3'


const Setting = () => {
    const [musicOn, setMusicOn] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const audioRef = useRef(null);
    // audio.loop = true;
  
    useEffect(() => {
      
      audioRef.current = new Audio(music);
      audioRef.current.loop = true;
    }, []);
  
    useEffect(() => {
      const savedState = localStorage.getItem("isPlaying");
  
      if (savedState === "true") {
        setMusicOn(true);
        audioRef.current.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      } else {
        setMusicOn(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0; 
      }
    }, []);
  
    const toggleSound = () => {
      setMusicOn((prev) => {
        const newState = !prev;
  
        if (newState) {
          audioRef.current.play().catch((err) => {
            console.error("Audio play failed:", err);
          });
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
  
        localStorage.setItem("isPlaying", newState ? "true" : "false");
  
        return newState;
      });
    };
    const playsound = () => {
      const sound = new Audio(audio); 
      sound.play();
    };
  return (
    <div className=' h-[100vh] w-full bg-[#00000094]'>
    <Header />
    <div className='p-4 flex flex-col justify-center items-center h-full'>
      <div className="flex justify-center gap-4 p-2">
        <Link href="#" className="w-[45%] h-[10vh]">
          <img
            src="https://www.pngall.com/wp-content/uploads/10/Google-Play-Logo-PNG-Image.png"
            alt="Get it on Google Play "
            className="object-contain h-[10vh]  w-full"
          />
        </Link>
        <Link href="#" className="w-40 h-[45%] ">
          <img
            src="https://digitopoly.org/wp-content/uploads/2016/06/app-store-logo.png"
            alt="Download on the App Store"
            className="object-contain h-[10vh] w-full"
          />
        </Link>
      </div>

      {/* Settings Content */}
      <div className="relative w-full rounded-sm bg-gradient-to-l border-2 border-[#ecbc3f] shadow-[0px_0px_10px_#ecbc3f] from-[#000e20] to-[#004db7] py-3">
      <div class=" text-center space-y-4">
  <h4 class="text-3xl font-bold text-[#ecbc3f] mb-4 text-stroke ">SETTINGS</h4>

  <div className="flex justify-around items-center mb-4">
      <span className="text-2xl font-bold text-white text-stroke">Music</span>
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={musicOn}
            onChange={toggleSound}
            className="sr-only peer"
          />
          <div className="group peer bg-none rounded-full duration-300 w-12 h-6 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-[2px] after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-5 peer-hover:after:scale-95"></div>
        </label>
      </div>
    </div>

  <div className="flex justify-around items-center mb-6">
    <span className="text-2xl font-bold text-white text-stroke">Sound</span>
    <div className="flex items-center">
    <label className="relative inline-flex items-center cursor-pointer">
  <input onClick={playsound} type="checkbox" className="sr-only peer" value="" />
  <div
    className="group peer bg-none rounded-full duration-300 w-12 h-6 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-5 after:w-5 after:top-[2px] after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-5 peer-hover:after:scale-95"
  ></div>
</label>
    </div>
  </div>

  <div className="flex justify-around">
    <Link to='/privacy' 
  onClick={playsound} className="w-[40%] text-stroke rounded-full p-2 border-[3px] border-[#ffc603] shadow-[0px_0px_10px_#ecbc3f] text-base bg-gradient-to-tr from-[#095dc8] to-[#013171] text-white font-bold">Privacy</Link>
    <Link to='/feedback' onClick={playsound} className="w-[40%] text-stroke rounded-full p-2 border-[3px] border-[#ffc603] shadow-[0px_0px_10px_#ecbc3f] text-base bg-gradient-to-tr from-[#095dc8] to-[#013171] text-white font-bold">Feedback</Link>
  </div>
</div>
      </div>
      <div className='flex w-full justify-center p-8'>
      <div onClick={playsound} className="w-[60%] text-stroke rounded-full p-2 border-[4px] border-[#ffc603] shadow-[0px_0px_10px_#ecbc3f] text-base bg-gradient-to-tl from-[#0f9bff] to-[#012e5c] text-white font-bold">HOST LUDO KING <br/> ON YOUR WEBSITE</div>

      </div>



      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center">
      <Link to='/' onClick={playsound}  variant="ghost" size="icon" className=" bg-gradient-to-b from-[#0f9bff] to-[#063f79] p-1 rounded shadow-[0px_0px_10px_#ecbc3f]">
        <MdRotate90DegreesCcw className="w-6 h-6 text-[#ecbc3f]" />
      </Link>
        <span className="text-gray-400 text-sm">v1.0.7.287</span>
      </div>
      </div>
    </div>
  )
}

export default Setting
