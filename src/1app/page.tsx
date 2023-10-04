'use client';
import { useEffect, useState } from "react";
import { destroyCookie, setCookie } from 'nookies'
import Link from 'next/link'
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation'; // Import de next/router au lieu de next/navigation

export default function Home() {
  const [Email, SetEmail] = useState<string | undefined>('');
  const [Password, SetPassword] = useState<string| undefined  >('');
  const [isLogged,SetLogged]=useState(false);
  const router = useRouter();
  const cookies = parseCookies();

   



  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const loginInfo = {
      identifier: Email,
      password: Password
    }

    const optionlogin = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    }
    if (!cookies.jwt) {
      const login = await fetch("http://127.0.0.1:1337/api/auth/local", optionlogin);
    const Responselogin = await login.json();
    console.log(Responselogin.jwt);
     
    setCookie(null, 'jwt', Responselogin.jwt, {
      path: '/',
      sameSite: 'strict', // Cookies de session // 
    });
    SetLogged(true)
    router.push('/Logged');
   
    } 
  };

  useEffect(() => {
    if (cookies.jwt) {
      router.push('/Logged');
    } 
  }, [cookies.jwt]);

  const logout =()=> {
  
    destroyCookie(null, 'jwt');
    router.push('/');

  }



  return (
    <div>
        <>
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <p>Email : <input type="email" required onChange={e => SetEmail(e.target.value)} value={Email} /></p>
            <p>Password : <input type="password" required minLength={8} onChange={e => SetPassword(e.target.value)} value={Password} /></p>
            <p><button type="submit">Login</button></p>
          </form>
       
        </>
    </div>
  );
}
