'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState , useEffect } from "react";
import fetchAudit from "@/app/Components/fetcher";

export default function Home () {

  const [heureConsoOuverture, setHeureConsoOuverture] = useState< number >(0);
  const [relevet, setRelevet] = useState< string [] >([]);
  const [selectedrelevet, setSelectedRelevet] = useState< string  >('');
  const [heuresUtilisationPotentielle, setHeuresUtilisationPotentielle] = useState< number  >(0);
  const [ heureutilisationPotentielleDimanche , setHeureutilisationPotentielleDimanche] = useState< number  >(0);
  const [ heureConsoDimanche, setHeureConsoDimanche] = useState< number  >(0);
  
  const cookies = parseCookies();
  

  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();

                const relevetselected =await fetchAudit(`http://127.0.0.1:1337/api/releve-consommations/${selectedrelevet}?populate=*`)
                const relevetData=relevetselected.data
                


                 const tableauData = {
                    Id_releve_consommation:selectedrelevet,
                    Heure_conso_ouverture:heureConsoOuverture,
                    conso_jour_kwh:(relevetData.attributes.Puissance*heureConsoOuverture).toFixed(2),
                    heure_conso_dimanche:heureConsoDimanche,
                    conso_dimanche_kwh:(relevetData.attributes.Puissance*heureConsoDimanche).toFixed(2),
                    conso_semaine_kwh:(((heureConsoOuverture*6)+heureConsoDimanche)*relevetData.attributes.Puissance).toFixed(2),
                    heures_utilisation_potentielle_jour_ouverture:heuresUtilisationPotentielle,
                    heure_economisable:(((heureConsoOuverture*6)+heureConsoDimanche)-((heuresUtilisationPotentielle*6)+heureutilisationPotentielleDimanche)).toFixed(2),
                    kwh_economisable_par_semaine:((((heureConsoOuverture*6)+heureConsoDimanche)*relevetData.attributes.Puissance)-((heuresUtilisationPotentielle*6)+heureutilisationPotentielleDimanche)*relevetData.attributes.Puissance).toFixed(2),
                    heure_utilisation_potentielle_dimanche:heureutilisationPotentielleDimanche,
                    conso_estime_semaine_kwh:(((heuresUtilisationPotentielle*6)+heureutilisationPotentielleDimanche)*relevetData.attributes.Puissance).toFixed(2),
                    
                };
          
                

const httpLink = 'http://127.0.0.1:1337/api/tableau-analyses?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: tableauData });


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
              useEffect(() => {
                const data= async () => {
                   const relevetData =await fetchAudit(`http://127.0.0.1:1337/api/releve-consommations?populate=*`)
                   setRelevet(relevetData.data );
                   }
                  data();
               
               },[])


    return (
        <div>
         <form onSubmit={handleSubmit}>
       
         <p>
          Sélectionnez le relevet de consommation adéquat  :{" "}
          <select
            required
            onChange={(e) => setSelectedRelevet(e.target.value)}
            value={selectedrelevet}
          >
            <option value="" disabled>
              Choisissez un relevet
            </option>
            {relevet.filter((List: any) => !List.attributes.tableau_analyse.data  && List.attributes.audit.data.id==  cookies.id  ).map((relevet: any) => (
              <option key={relevet.id} value={relevet.id}>
                {relevet.attributes.Circuit}
              </option>
            ))}
          </select>
        </p>

         <p> Heures conso actuelle ouverture : <input required onChange={e => setHeureConsoOuverture(parseFloat(e.target.value))} value={heureConsoOuverture} type="number" /> </p>
         <p> heure conso dimanche : <input required onChange={e => setHeureConsoDimanche(parseFloat(e.target.value))} value={heureConsoDimanche} type="number" /> </p>
         <p> Heures d’utilisation potentielle jour d’ouverture  : <input required onChange={e => setHeuresUtilisationPotentielle(parseFloat(e.target.value))} value={heuresUtilisationPotentielle} type="number" /> </p>
         <p> heure_utilisation_potentielle_dimanche : <input required onChange={e => setHeureutilisationPotentielleDimanche (parseFloat(e.target.value))} value={ heureutilisationPotentielleDimanche } type="number" /> </p>
         
  
  
       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}

