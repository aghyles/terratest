'use client';
import { useState } from "react";
import { setCookie } from 'nookies'
export default  function Home() {
  const [Email,SetEmail]=useState('')  
  const [Password,SetPassword]=useState('')

   async function data() {
    
    const loginInfo = {
      identifier: Email,
      password: Password
  }

    const optionlogin = {
      method:"POST",
      headers : {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(loginInfo)
    }



    const login=await fetch("http://127.0.0.1:1337/api/auth/local",optionlogin)
   const Responselogin=await login.json()
    console.log(Responselogin.jwt)
    setCookie(null, 'jwt', Responselogin.jwt , {
      maxAge: 1 * 24 * 60 * 60,
      path: '/',
  })


   }
  

  return (
    <div>
      <h1>Login Page </h1>
      <form>
        <p> Email : <input type="email" onChange={e => SetEmail(e.target.value) } value={Email} /> </p>
        <p> Password : <input type="password"  onChange={e => SetPassword(e.target.value) } value={Password}  /></p>
        <p> <button type="button" onClick={() => data() } >Login</button></p>
      </form>
    </div>
  );
}
