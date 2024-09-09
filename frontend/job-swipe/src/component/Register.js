import React from 'react'
import '../styling/register.css';
function Register() {
  return (
    <div><div class="container">
    <form action="#" class="form">
       <h2 class="title">Register</h2>
       <p class="title-message">Signup now and get full access to our app.</p>
       <div class="flex">
         <label>
           <input type="text" placeholder = "first Name" required />
         </label>
         <label>
           <input type="text" placeholder = "last Name" required  />
         </label>
       </div>
       <label>
         <input type="email" placeholder = "Email" required />
       </label>
       <label>
         <input type="password" placeholder = "Password" required />
       </label>
       <label>
         <input type="password" placeholder = "Confirm password" required />
       </label>
       <button class="submit">Submit</button>
       <p class="sign-in">Already have an account ? 
         <a href="#" style="color: #43c7e8">Signin</a>
         </p>
    </form>
 </div></div>
  )
}

export default Register