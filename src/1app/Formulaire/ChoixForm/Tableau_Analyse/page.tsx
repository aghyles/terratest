'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState , useEffect } from "react";
import fetchAudit from "@/app/Components/fetcher";

export default function Home () {

  const [heureConsoOuverture, setHeureConsoOuverture] = useState< number >(0);
  const [relevet, setRelevet] = useState< string [] >([]);
  const [selectedrelevet, setSelectedRelevet] = useState< string  >('');
  const [consoJourKwh, setConsoJourKwh] = useState< number  >(0);
  const [consoDimancheKwh, setConsoDimancheKwh] = useState< number  >(0);
  const [consoSemaineKwh, setConsoSemaineKwh] = useState< number  >(0);
  const [heuresUtilisationPotentielle, setHeuresUtilisationPotentielle] = useState< number  >(0);
  const [ heureEconomisable, setHeureEconomisable] = useState< number  >(0);
  const [ kwhEconomisableParSemaine , setKwhEconomisableParSemaine] = useState< number  >(0);
  const [ heureutilisationPotentielleDimanche , setHeureutilisationPotentielleDimanche] = useState< number  >(0);
  const [ consoEstimeSemaineKwh, setConsoEstimeSemaineKwh ] = useState< number  >(0);
  const [  pourcentage, setPourcentage ] = useState< number  >(0);
  const [ heureConsoDimanche, setHeureConsoDimanche] = useState< number  >(0);
  


  const cookies = parseCookies();
  

  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                 const tableauData = {
                    Id_releve_consommation:selectedrelevet,
                    Heure_conso_ouverture:heureConsoOuverture,
                    conso_jour_kwh:consoJourKwh,
                    heure_conso_dimanche:heureConsoDimanche,
                    conso_dimanche_kwh:consoDimancheKwh,
                    conso_semaine_kwh:consoSemaineKwh,
                    heures_utilisation_potentielle_jour_ouverture:heuresUtilisationPotentielle,
                    heure_economisable:heureEconomisable,
                    kwh_economisable_par_semaine:kwhEconomisableParSemaine,
                    heure_utilisation_potentielle_dimanche:heureutilisationPotentielleDimanche,
                    conso_estime_semaine_kwh:consoEstimeSemaineKwh,
                    pourcentage:pourcentage
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
  console.log(responseData); 
 
 


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

   console.log(relevet)

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
            {relevet.map((relevet: any) => (
              <option key={relevet.id} value={relevet.id}>
                {relevet.attributes.Circuit}
              </option>
            ))}
          </select>
        </p>


    



         <p> Heures conso actuelle ouverture : <input required onChange={e => setHeureConsoOuverture(parseFloat(e.target.value))} value={heureConsoOuverture} type="number" /> </p>
         <p> Conso jour KWH : <input required onChange={e => setConsoJourKwh(parseFloat(e.target.value))} value={consoJourKwh} type="number" /> </p>
         <p> heure conso dimanche : <input required onChange={e => setHeureConsoDimanche(parseFloat(e.target.value))} value={heureConsoDimanche} type="number" /> </p>
         <p> conso dimanche kwh : <input required onChange={e => setConsoDimancheKwh(parseFloat(e.target.value))} value={consoDimancheKwh} type="number" /> </p>
         <p> conso semaine kwh : <input required onChange={e => setConsoSemaineKwh(parseFloat(e.target.value))} value={consoSemaineKwh} type="number" /> </p>
         <p> Heures d’utilisation potentielle jour d’ouverture  : <input required onChange={e => setHeuresUtilisationPotentielle(parseFloat(e.target.value))} value={heuresUtilisationPotentielle} type="number" /> </p>
         <p> Heure economisable : <input required onChange={e => setHeureEconomisable(parseFloat(e.target.value))} value={heureEconomisable} type="number" /> </p>
         <p> kwh economisable par semaine : <input required onChange={e => setKwhEconomisableParSemaine(parseFloat(e.target.value))} value={ kwhEconomisableParSemaine} type="number" /> </p>
         <p> heure_utilisation_potentielle_dimanche : <input required onChange={e => setHeureutilisationPotentielleDimanche (parseFloat(e.target.value))} value={ heureutilisationPotentielleDimanche } type="number" /> </p>
         <p> conso_estime_semaine_kwh : <input required onChange={e => setConsoEstimeSemaineKwh(parseFloat(e.target.value))} value={ consoEstimeSemaineKwh} type="number" /> </p>
         <p>  pourcentage : <input required onChange={e => setPourcentage(parseFloat(e.target.value))} value={pourcentage} type="number" /> </p>
         
           
         
  
  
       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}

