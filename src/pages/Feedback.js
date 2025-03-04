import React from 'react'
import { MdRotate90DegreesCcw } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Feedback = () => {
  return (
    <div className='h-[100vh] w-full p-4 flex items-center justify-center'>
      <div className='relative p-4 w-full rounded-sm bg-gradient-to-l border-2 border-[#ecbc3f] shadow-[0px_0px_10px_#ecbc3f] from-[#000e20] to-[#004db7] py-3'>
      <div className='text-center'>
      <h4 class="text-3xl font-bold text-[#ecbc3f] mb-4 text-stroke ">SETTINGS</h4>
      <p className='text-stroke text-white font-bold'>Please Reach Out Us</p>
      </div>
      <textarea name="feadback" className='h-[100px] p-2 text-sm border-none focus:ring-none focus:border-none my-4 w-full' placeholder='Write feedback here ...' id=""></textarea>
      <div class="w-[40%] mx-auto text-stroke rounded-full p-2 border-[3px] border-[#ffc603] shadow-[0px_0px_10px_#ecbc3f] text-base bg-gradient-to-tr from-[#095dc8] to-[#013171] text-white font-bold">Privacy</div>
      </div>
      <Link to='/'  variant="ghost" size="icon" className="absolute bottom-4 left-4 bg-gradient-to-b from-[#0f9bff] to-[#063f79] p-1 rounded shadow-[0px_0px_10px_orange]">
        <MdRotate90DegreesCcw className="w-6 h-6 text-[orange]" />
      </Link>
    </div>
  )
}

export default Feedback
