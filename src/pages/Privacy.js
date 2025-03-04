import React from 'react'
import { MdRotate90DegreesCcw } from 'react-icons/md'
import { Link } from 'react-router-dom'
import audio from '../assets/goti.mp4'

const Privacy = () => {
    const playsound = () => {
        const sound = new Audio(audio); 
        sound.play();
      };
  return (
    <div className=' w-full bg-white relative'>
      <div class="p-2 h-[100vh]  overflow-auto text-justify">
      <p class="w-[40%] text-center text-stroke rounded-md mx-auto p-2 border-[2px] border-[#ffc603] text-base bg-gradient-to-tr from-[#095dc8] to-[#013171] text-white font-bold">Privacy</p>
  <p class="mb-4 text-sm">
    This Privacy Policy covers how Gametion Technologies Pvt. Ltd. or any of its subsidiaries or affiliates (collectively “Gametion Technologies Pvt. Ltd.”) treats personal information that Gametion
    Technologies Pvt. Ltd. collects and receives in connection with your use of www.gametion.com and/or the games and applications offered by Gametion Technologies Pvt. Ltd. This includes software
    that you have downloaded or are about to download, any software that you have embedded on a website or are about to embed (“Gametion Technologies Pvt. Ltd. Games”), any applications created by
    Gametion Technologies Pvt. Ltd. and available through social networking sites (“SNS Apps”), any applications created by Gametion Technologies Pvt. Ltd. and available through mobile devices
    (“Mobile Apps”), any software running on Gametion Technologies Pvt. Ltd. servers, (“Gametion Technologies Pvt. Ltd. Software”), content, related documentation, information on the Gametion
    Technologies Pvt. Ltd. domain, and information made available by users to each other through the Gametion Technologies Pvt. Ltd. Software (collectively, the “Service”). Your privacy is important
    to us and, as described in this Privacy Policy, we have designed the Service to protect information about you from unauthorized disclosure to others. This Privacy Policy explains how we collect,
    use and, in certain circumstances, share your personally identifying information. Please read this Privacy Policy carefully, and if you have any questions, feel free to contact us.
  </p>
  <p class="mb-4 text-sm">
    This Privacy Policy is framed in view of the Information Technology Act, 2000 read with Regulation 4 of the Information technology (Reasonable Security Practices and Procedures and Sensitive
    Personal Data or Information) Rules, 2011. By registering for, accessing, and/or downloading any Service, you agree to Gametion Technologies Pvt. Ltd. ' Privacy Policy and that you will abide by
    Gametion Technologies Pvt. Ltd. ' Terms of Service. Among other things, you consent to the collection and use of your personal information as outlined in this Privacy Policy, as such policy may be
    amended from time to time. We may update the Privacy Policy and if we do, we will post a notice that changes have been made on the website
    <a href="https://www.gametion.com" class="text-primary">www.gametion.com</a>. You should visit this page periodically to review any updates.
  </p>
</div>
   <Link to='/' onClick={playsound} variant="ghost" size="icon" className="absolute bottom-4 left-4 bg-gradient-to-b from-[#0f9bff] to-[#063f79] p-1 rounded shadow-[0px_0px_10px_orange]">
        <MdRotate90DegreesCcw className="w-6 h-6 text-[orange]" />
      </Link>
<div>
      </div>
    </div>
  )
}

export default Privacy
