'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";
import Select , {  MultiValue } from 'react-select';
import "@/app/globals.css"
export default function Home () {
 

  const [descriptionPb, setDescriptionPb] = useState<string | undefined>(""); 
  const [isChecked, setIsChecked] = useState(false);
  const [typeChauffage, setTypeChauffage] = useState<string | undefined >("");
  const [temperateurChaude, setTemperateurChaude] = useState<string | number |undefined >("");
  const [temperateurFroide, setTemperateurFroide] = useState<string | number |undefined >("");
  const [selectedType1, setSelectedType1] = useState<MultiValue<any> >([]);
  const [selectedType2, setSelectedType2] = useState<MultiValue<any> >([]);
  const [remarque,setRemarque]=useState<string | undefined >("");



   const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const id=cookies.id

                const PilotageBatimentData = {
                    Systeme_Pilotage:isChecked,
                    PB:descriptionPb,
                    Type_chauffage:typeChauffage,
                    Temperateur_chaud:temperateurChaude,
                    Temperateur_froid:temperateurFroide,
                    Type_regulation_1:selectedType1,
                    Type_regulation_2:selectedType2,
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
console.log(selectedType1)
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
         {isChecked && ( // Condition pour afficher le paragraphe uniquement si isChecked est vrai
        <p>
       Description du systeme de Pilotage :{' '}
          <input
            onChange={(e) => setDescriptionPb(e.target.value)}
            value={descriptionPb}
          />
        </p>
      )}

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
                
    
             <div className="dd">

             Sélectionnez le type de régulation 1 :
            <Select
             isMulti
             options={[
             { value: 'Thermostat', label: 'Thermostat' },
             { value: 'Vanne', label: 'Vanne' },
             { value: 'Thermostatique', label: 'Thermostatique' },
             { value: 'Aucune', label: 'Aucune' },

                ]}

            onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map((option) => option.value);
            setSelectedType1(selectedValues); // Utilisez setSelectedType1 au lieu de setTypeChauffage
                                 }}                     
            
            value={selectedType1.map((value) => ({ value, label: value }))}

             />

            </div>

               
             <div className="dd">

             Sélectionnez le type de régulation 2 :
            <Select
             isMulti
             options={[
             { value: 'Plannifié', label: 'Plannifié' },
             { value: 'Connectée', label: 'Connectée' },
             { value: 'Capteurs', label: 'Capteurs' },
             { value: 'Aucune', label: 'Aucune' },

                ]}

            onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map((option) => option.value);
            setSelectedType2(selectedValues); // Utilisez setSelectedType1 au lieu de setTypeChauffage
                                 }}                     
            
            value={selectedType2.map((value) => ({ value, label: value }))}

             />

            </div>
                

                <p> Remarque :  <textarea  onChange={e=>setRemarque(e.target.value)} value={remarque}  />  </p>
               


       <p> 
        <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
