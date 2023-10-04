'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function Home () {
 
   
  const [ hpKwh, setHpKwh] = useState<  number > (0);
  const [ hcKwh, setHcKwh] = useState<  number >(0);
  
    
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();

                const pourcentageHp = parseFloat(((hpKwh * 100) / (hpKwh + hcKwh)).toFixed(2));
                const pourcentageHc = parseFloat(((hcKwh * 100) / (hpKwh + hcKwh)).toFixed(2));                
                const hpHcData = {
                    Id_audit:cookies.id,
                    HP_kwh:hpKwh,
                    HC_kwh:hcKwh,
                    Total_HP_HC:(hpKwh+hcKwh).toFixed(2),
                    Pourcent_HP:pourcentageHp,
                    Pourcent_HC:pourcentageHc         
                };
          
                
const httpLink = 'http://127.0.0.1:1337/api/remplissage-hp-hcs?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: hpHcData });


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
      

         <p> Nombre de kwh HP: <input type="number" onChange={e => setHpKwh(parseFloat(e.target.value))} value={hpKwh}  />  </p>
         <p> Nombre de kwh HC: <input type="number" onChange={e => setHcKwh(parseFloat(e.target.value))} value={hcKwh}  />  </p>
     

       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
