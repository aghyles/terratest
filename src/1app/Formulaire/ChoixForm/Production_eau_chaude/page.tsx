'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";

export default function Home () {
 
   
  const [mode, setMode] = useState<undefined | string >('');
  const [type, setType] = useState<string | undefined >("");
  const [option, setOption] = useState<string | undefined >("");
  const [quantite, setQuantite] = useState<string | undefined >("");
  const [litrage , setLitrage] = useState<string | undefined>("")
  const [utilisationEauChaude , setUtilisationEauChaude] = useState<string | undefined>("")
  const [isChecked, setIsChecked] = useState(false);
  const [descriptionSl, setDescriptionSl] = useState<string | undefined>("");
  const [remarque,setRemarque]=useState<string | undefined >("");

  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id
                const productionEauChaudeData = {
                    Litrage:litrage,
                    Quantite:quantite,
                    Type:type,
                    Option:option,
                    Mode:mode,
                    Utilisation_eau_chaude:utilisationEauChaude,
                    Systeme_limitation:isChecked,
                    Description_SL:descriptionSl,
                    Remarque:remarque,
                    audit:id
                                        
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/production-eau-chaudes?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: productionEauChaudeData });


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


    return (
        <div>
         <form onSubmit={handleSubmit}>
         
       <p> Litrage :  <input required onChange={e=>setLitrage(e.target.value)} value={litrage} type="number" /> </p>
       <p> Quantite :  <input required onChange={e=>setQuantite(e.target.value)} value={quantite} type="number" /> </p>
                       <p>
                     Sélectionnez l'option   :{" "}
                    <select
                     required
                      onChange={(e) => setOption(e.target.value)}
                       value={option}
                          >
                    <option value="" disabled>
                    Choisissez un option  :
                   </option>
                   <option value="Accumulation">
                     Accumulation
                     </option>
                    
                    <option value="instant">
                    instant
                    </option>

                    </select>

                    </p>

                    <p>
                     Sélectionnez le mode   :{" "}
                    <select
                     required
                      onChange={(e) => setMode(e.target.value)}
                       value={mode}
                          >
                    <option value="" disabled>
                    Choisissez un mode  :
                   </option>
                   <option value="régulation">
                    régulation
                     </option>
                    
                    <option value="Jour/Nuit">
                    Jour/Nuit
                    </option>

                    </select>

                    </p>
       

                    <p>
                     Sélectionnez le type   :{" "}
                    <select
                     required
                      onChange={(e) => setType(e.target.value)}
                       value={type}
                          >
                    <option value="" disabled>
                    Choisissez un type  :
                   </option>
                   <option value="GAZ">
                     GAZ
                     </option>
                    
                    <option value="Electrique">
                    Electrique  
                    </option>

                    </select>

                    </p>
                 
                    <p>
                     Sélectionnez une utilisation d'eau chaude    :{" "}
                    <select
                     required
                      onChange={(e) => setUtilisationEauChaude(e.target.value)}
                       value={utilisationEauChaude}
                          >
                    <option value="" disabled>
                    Choisissez une utilisation  :
                   </option>
                   <option value="Sanitaire client">
                   Sanitaire client
                     </option>
                    
                    <option value="Sanitaire collaborateur">
                    Sanitaire collaborateur
                    </option>

                    </select>
                   
                    </p> 

                    <label htmlFor="toggle">
                    Systeme de limitation :
        <input
          type="checkbox"
          id="toggle"
          checked={isChecked}
          onChange={handleToggle}
        />
        
      {isChecked && ( // Condition pour afficher le paragraphe uniquement si isChecked est vrai
        <p>
       Description du systeme de limitation :{' '}
          <input
            onChange={(e) => setDescriptionSl(e.target.value)}
            value={descriptionSl}
          />
        </p>
      )}


      </label>


      <p> Remarque :  <textarea  onChange={e=>setRemarque(e.target.value)} value={remarque}  />  </p>
               

       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}

