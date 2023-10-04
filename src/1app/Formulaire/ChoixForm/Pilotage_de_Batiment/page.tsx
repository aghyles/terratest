'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";

export default function Home () {
 
  // à propos l'attribut PB j'ai pas encore compris comment il fonctionne //
  
  const [ pb , setPb] = useState<undefined | string>('')    
  const [isChecked, setIsChecked] = useState(false);
  const [typeChauffage, setTypeChauffage] = useState<string | undefined >("");
  const [temperateurChaude, setTemperateurChaude] = useState<string | number |undefined >("");
  const [temperateurFroide, setTemperateurFroide] = useState<string | number |undefined >("");
  const [typeRegulation1,setTypeRegulation1]=useState<string | undefined >("");
  const [typeRegulation2,setTypeRegulation2]=useState<string | undefined >("");
  const [remarque,setRemarque]=useState<string | undefined >("");

   const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id

                const PilotageBatimentData = {
                    Systeme_Pilotage:isChecked,
                    Type_chauffage:typeChauffage,
                    Temperateur_chaud:temperateurChaude,
                    Temperateur_froid:temperateurFroide,
                    Type_regulation_1:typeRegulation1,
                    Type_regulation_2:typeRegulation2,
                    Remarque:remarque,
                   Id_Audit:id
                                    
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/pilotage-de-batiments?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: PilotageBatimentData });


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

            const handleToggle = () => {
                setIsChecked(!isChecked);

              };
   console.log(typeChauffage)
   console.log(isChecked)
    return (
        <div>
         <form onSubmit={handleSubmit}>
         
         <label htmlFor="toggle">
       Systeme de piloage :
        <input
          type="checkbox"
          id="toggle"
          checked={isChecked}
          onChange={handleToggle}
        />
      </label>

                     <p>
                     Sélectionnez le type de chauffage  :{" "}
                    <select
                     required
                      onChange={(e) => setTypeChauffage(e.target.value)}
                       value={typeChauffage}
                          >
                    <option value="" disabled>
                    Choisissez un type de chauffage :
                   </option>
                   <option value="GAZ">
                     GAZ
                     </option>
                    <option value="Pac air / air ">
                      Pac air / air 
                    </option>
                    <option value=" Pac air / eau ">
                    Pac air / eau 
                    </option>
                    <option value="Electrique">
                    Electrique  
                    </option>
                    <option value="Fioul">
                    Fioul
                    </option>
                    
                    </select>

                    </p>

                <p> Temperateur chaude  :  <input required onChange={e=>setTemperateurChaude(e.target.value)} value={temperateurChaude} type="number" /> </p>
                <p> Temperateur froide  :  <input required onChange={e=>setTemperateurFroide(e.target.value)} value={temperateurFroide} type="number" /> </p>
                <p> Type de regulation 1  :  <input required onChange={e=>setTypeRegulation1(e.target.value)} value={typeRegulation1} type="text" /> </p>
                <p> Type de regulation 2  :  <input required onChange={e=>setTypeRegulation2(e.target.value)} value={typeRegulation2} type="text" /> </p>
                <p> Remarque :  <textarea  onChange={e=>setRemarque(e.target.value)} value={remarque}  />  </p>
               


       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
