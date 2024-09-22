
import React, { useState, useContext, useEffect,useRef } from 'react'


import axios from 'axios';
import {Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [emailButtonText, setEmailButtonText] = useState('Copy');
    const [passwordButtonText, setPasswordButtonText] = useState('Copy');
 useEffect(() => {
  fetchAndSetLocalData();
 },[])

    
    const loginAction = (event) => {
        event.preventDefault();
        let payload = {
            "email":email,
            "password":password
          }
          //console.log(payload);
      
      setIsSubmitting(true)
      setErrorText('');
      
      axios.post(process.env.REACT_APP_LOGIN_USER, payload ).then((res)=>{
        setIsSubmitting(false);
        console.log("y",res.data);
        localStorage.setItem('token', res.data.accesToken)
        
        navigate("/dashboard");
      }).catch((e)=> {
        setIsSubmitting(false);
        // alert(e.data.errors);
        console.log("N",e);
        setErrorText(e.response.data.message);
      })
    };

    const fetchAndSetLocalData = () => {
      let localInfo = JSON.parse(localStorage.getItem('userInfo'));
       if(localInfo)
        {
          console.log("localinfo",localInfo);
          // setTheme(localInfo.theme);
  
        }
    }

    const textRef = useRef(null);

   
  
    const copyToClipboard = (text, setButtonText) => {
      navigator.clipboard.writeText(text).then(() => {
        setButtonText('Copied');
        setTimeout(() => {
          setButtonText('Copy');
        }, 3000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    };
  return (
    <div><div class="container">
    <form onSubmit={(e) => loginAction(e)} class="form">
       <h2 class="title">Login</h2>
       <p class="title-message">Login now and get full access to our app.</p>
      
       <label>
         <input type="email" placeholder = "Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
       </label>
       
       <label>
         <input type="password" placeholder = "Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
       </label>
       {/* <label>
         <input type="password" placeholder = "Confirm password" required />
       </label> */}
       <button disabled={isSubmitting} class="submit">Submit</button>
       <p class="sign-in">New User? 
         <a href="/register" style={{color:"#43c7e8"}}>Register here</a>
         </p>
    </form>
 </div></div>
  )
}

export default Login