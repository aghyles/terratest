'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";


export default function Home () {
 
   
    const [Type, setType] = useState<undefined | string >('');
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id
                const Routine = {
                   Type,
                   audit:id
                                    
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/routine-de-travails?populate=*';

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
         
       <p> Type :  <input required onChange={e=>setType(e.target.value)} value={Type} type="text" /> </p>
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
