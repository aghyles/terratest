'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";

export default function Home () {
 
   
  const [eclairge, setEclairge] = useState<undefined | string >('');
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id
                const eclairageData = {
                    Nom:eclairge,
                   audit:id
                                    
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/eclairages?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: eclairageData });


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
console.log(eclairge)
    return (
        <div>
         <form onSubmit={handleSubmit}>
         
         <p>
                     Sélectionnez l'eclairage  :{" "}
                    <select
                     required
                      onChange={(e) => setEclairge(e.target.value)}
                       value={eclairge}
                          >
                    <option value="" disabled>
                    Choisissez un type d'eclairage :
                   </option>
                   <option value="Salle">
                   Salle
                     </option>
                    <option value="Cuisine">
                    Cuisine
                    </option>
                    <option value="Back  Office ">
                    Back  Office 
                    </option>
                    <option value="Sanitaires">
                    Sanitaires  
                    </option>
                    
                    
                    </select>

                    </p>






       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
