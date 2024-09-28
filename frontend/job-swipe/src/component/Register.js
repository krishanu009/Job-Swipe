import React, { useState } from 'react'
import '../styling/register.css';
import axios from 'axios';
import {Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
function Register() {

  const navigate = useNavigate();
    const [register,setRegister] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleClick = (event) =>
    {
     setRegister(!register);
    };
    const registerAction = (event) => {
        event.preventDefault();
        let payload = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "password":password,
            "phone":phone
          }
          console.log(payload);
      
      setIsSubmitting(true)
      setErrorText('');
      
      axios.post(process.env.REACT_APP_REGISTER_USER, payload ).then((res)=>{
        setIsSubmitting(false);
        console.log("y",res.data);
        localStorage.setItem('token', res.data.accesToken)
        navigate("/dashboard");
      }).catch((e)=> {
        setIsSubmitting(false);
        // alert(e.data.errors);
        console.log("N",e.response.data.message);
        setErrorText(e.response.data.message);
      })
    };


  return (
    <div><div class="container">
    <form onSubmit={(e) => registerAction(e)} class="form">
       <h2 class="title">Register</h2>
       <p class="title-message">Signup now and get full access to our app.</p>
       <div class="flex">
         <label>
           <input type="text" placeholder = "first Name" required value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}  />
         </label>
         <label>
           <input type="text" placeholder = "last Name" required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}  />
         </label>
       </div>
       <label>
         <input type="email" placeholder = "Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
       </label>
       <label>
         <input type="phone" placeholder = "Phone" required value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
       </label>
       <label>
         <input type="password" placeholder = "Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
       </label>
       {/* <label>
         <input type="password" placeholder = "Confirm password" required />
       </label> */}
       <button disabled={isSubmitting} class="submit">Submit</button>
       <p class="sign-in">Already have an account ? 
         <a href="/" style={{color:"#43c7e8"}}>Log in</a>
         <p className="text-red-500">{errorText}</p>
         </p>
    </form>
 </div></div>
  )
}

export default Register