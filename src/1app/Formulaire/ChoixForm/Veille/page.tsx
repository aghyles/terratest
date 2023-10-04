'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";

export default function Home () {
 
   
  const [veille, setVeille] = useState<undefined | string >('');
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id
                const Routine = {
                    veille,
                   Id_audit:id
                                    
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/veilles?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: Routine });


  try {
    const response = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  
  const responseData = await response.json();
  router.push("/Formulaire/ChoixForm")
  console.log(responseData); 
} catch (error) {
    console.error(error);
}
   


            }

    return (
        <div>
         <form onSubmit={handleSubmit}>
         
       <p> Veille :  <input required onChange={e=>setVeille(e.target.value)} value={veille} type="text" /> </p>
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
