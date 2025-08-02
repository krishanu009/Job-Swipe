import React from 'react'
import '../styling/landing.css'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const navigateToCandidateLogin = () => {
    navigate('/candidateLogin');
  };
  const navigateToHrLogin = () => {
    navigate('/recruiterLogin');
  };


  return (
    <div class="h-screen grid grid-cols-2 gap-1 w-screen">
  <div className='flex items-center justify-center'>
  
   <button onClick={navigateToCandidateLogin} className='button-text'>
   I am a Developer
</button>
  </div>
 
  <div className='bg-sky-400 flex items-center justify-center' >
    
    <button onClick={navigateToHrLogin} class="btn">
    <b>I am a Recruiter</b>
    </button>
  </div>
</div>
  )
}

export default LandingPage