'use client'
import { useState } from "react";
import React from 'react';
import "../globals.css"
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export default function Creer() {

  const [username, SetUserName] = useState<string>("");
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  
   
  const router = useRouter();
  const handleSubmit = async (event: any) => {


    event.preventDefault();
    const cookies = parseCookies();

    const auditeurData = {
      username: username,
      email: email,
      password: password,
      confirmed: "1",
      role: 1
    };

    const httpLink = 'http://127.0.0.1:1337/api/users';

    const headerss = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.jwt}`,
    };

    const body = JSON.stringify(auditeurData);

    try {
      const response = await fetch(httpLink, {
        method: 'POST',
        headers: headerss,
        body: body,
      });

      const responseData = await response.json();

      router.push("/Logged")

    } catch (error) {
      console.error(error);
    }


  }



  return (
    <>
      <form onSubmit={handleSubmit}>


        <p>Username : <input type="text" required onChange={e => SetUserName(e.target.value)} value={username} /></p>
        <p>Email  : <input type="email" required onChange={e => SetEmail(e.target.value)} value={email} /></p>
        <p>Password  : <input type="password" required onChange={e => SetPassword(e.target.value)} value={password} /></p>

        <p><button type="submit">Confirmer </button></p>
      </form>

    </>
  )
}
