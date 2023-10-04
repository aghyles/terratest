'use client';

import fetchAudit from "@/app/Components/fetcher";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useEffect, useState } from "react";

export default function Home () {
 
   
  const [circuit, setCircuit] = useState<undefined | string >('');
  const [nombreLuminieux, setNombreLuminieux] = useState<undefined | string  | number>('');
  const [remarque, setRemarque] = useState<undefined | string >('');
  const [eclairageList, setEclairageList] = useState<string[]>([]);
  const [selectedeclairage, setSelectedeclairage] = useState<string | undefined | number >('');
    
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();

                const Circuitdata = {
                    Circuit:circuit,
                   id_eclairage:selectedeclairage,
                   Nombre_luminieux:nombreLuminieux,
                   Remarque:remarque
                                    
                };
          
                
const httpLink = 'http://127.0.0.1:1337/api/Circuits?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: Circuitdata });


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

            useEffect(() => {
                const data= async () => {
                   const eclairageData =await fetchAudit('http://127.0.0.1:1337/api/Eclairages?populate=*')
                   setEclairageList(eclairageData.data);
                   }
                  data();
               },[])

console.log(selectedeclairage)
    return (
        <div>
         <form onSubmit={handleSubmit}>
         <p>
          Sélectionnez l'eclairage:{" "}
          <select
            required
            onChange={(e) => setSelectedeclairage(e.target.value)}
            value={selectedeclairage}
          >
            <option value="" disabled>
              Choisissez un eclairage
            </option>
            {eclairageList.map((audit: any) => (
              <option key={audit.id} value={audit.id}>
                {audit.attributes.Nom}
              </option>
            ))}
          </select>
        </p>


       <p> Circuit:  <textarea required onChange={e=>setCircuit(e.target.value)} value={circuit}  /> </p>
       <p> Nombre Luminieux : <input type="number" onChange={e=>setNombreLuminieux(e.target.value)} value={nombreLuminieux}  />  </p>
       <p> Remarque :  <textarea required onChange={e=>setRemarque(e.target.value)} value={remarque}  /> </p>
       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
