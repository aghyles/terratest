'use client';

import fetchAudit from "@/app/Components/fetcher";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useEffect, useState } from "react";


export default function Home () {
 
    const [routineList, setRoutineList] = useState<string[]>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<string  >('');

    const [appareil, setAppareil] = useState<undefined | string >('');
    const [nombre , setNombre] =useState<undefined | number | string>(1)
    const [miseEnPlace , setMiseEnPlace] = useState<undefined | string>(' Rien à signaler')
    const [service , setService] = useState<undefined |  string>(' Rien à signaler')
    const [entreService , setEntreService] = useState<undefined |  string>(' Rien à signaler')
    const [apreService , setApreService] = useState<undefined | string>(' Rien à signaler')
    const [off , setOff] = useState<undefined |  string>(' Rien à signaler')
    const [ regulation , setRegulation] = useState<undefined | string>('')
    
    const [isChecked, setIsChecked] = useState(false);
    
    
    
    const router=useRouter();

                const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const appareilData = {
                   Id_routine_de_travail:selectedRoutine,
                   Nom_Appareil:appareil,
                   Nombre:nombre,
                   Regulation:isChecked,
                   Type_regulation:regulation,
                   Mise_en_place:miseEnPlace,
                   Service:service,
                   Entre_Service:entreService,
                   Apre_Service:apreService,
                   Off:off
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/appareils?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: appareilData });


  try {
    const response = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  
  const responseData = await response.json();
  router.push("/Formulaire/ChoixForm")

} catch (error) {
    console.error(error);
}
   


            }




            const handleToggle = () => {
                setIsChecked(!isChecked);

              };



              useEffect(() => {
                const data= async () => {
                   const audit =await fetchAudit('http://127.0.0.1:1337/api/routine-de-travails?populate=*')
                   setRoutineList(audit.data);
                
                   }
                  data();
                  
               },[])


    return (
        <div>
         <form onSubmit={handleSubmit}>
         <p>
          Sélectionnez la routine de travail :{" "}
          <select
            required
            onChange={(e) => setSelectedRoutine(e.target.value)}
            value={selectedRoutine}
          >
            <option value="" disabled>
              Choisissez une routine
            </option>
            {routineList.map((routine: any) => (
              <option key={routine.id} value={routine.id}>
                {routine.attributes.Type}
              </option>
            ))}
          </select>
        </p>

      <p> Nom de l'appareil : <input required onChange={e => setAppareil(e.target.value)} value={appareil} type="text" /> </p>
<p> Nombre : <input required onChange={e => setNombre(e.target.value)} value={nombre} /> </p>
<p> Mise en place : <textarea required onChange={e => setMiseEnPlace(e.target.value)} value={miseEnPlace} /> </p>
<p> Service : <textarea required onChange={e => setService(e.target.value)} value={service} /> </p>
<p> Entre service : <textarea required onChange={e => setEntreService(e.target.value)} value={entreService} /> </p>
<p> Apre service : <textarea required onChange={e => setApreService(e.target.value)} value={apreService} /> </p>
<p> Off : <textarea required onChange={e => setOff(e.target.value)} value={off} /> </p>

       <label htmlFor="toggle">
       Régulation :
        <input
          type="checkbox"
          id="toggle"
          checked={isChecked}
          onChange={handleToggle}
        />
        
      {isChecked && ( // Condition pour afficher le paragraphe uniquement si isChecked est vrai
        <p>
          Type de régulation :{' '}
          <input
            onChange={(e) => setRegulation(e.target.value)}
            value={regulation}
          />
        </p>
      )}


      </label>
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
