"use client";
import fetchAudit from "@/app/Components/fetcher";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Creer() {  
    const [typologieList, setTypologieList] = useState<string[]>([]);
    const [cookies , setcookie] = useState<any> ((parseCookies()));
    
    const router=useRouter();
        var ampereTypologie=0;
        var voltTypologie=0;
        var puissanceTypologie=0;
        var heureConsoouvertureTypologie=0;
        var consoJourKwhTypologie =0 
        var heureConsoDimancheTypologie =0
        var consoDimancheKwhTypologie =0
        var consoSemaineKwhTypologie =0
        var heuresUtilisationPotentielleJourOuvertureTypologie=0
        var heureEconomisableTypologie = 0
        var kwhEconomisableParSemaineTypologie=0
        var heureUtilisationPotentielleDimancheTypologie =0
        var consoEstimeSemaineKwhTypologie=0
        var pourcentageTypologie=0
        var id:any;
        var noValue:boolean=false;
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        
          const filteredTypologieList = typologieList.filter((item: any) => {
    

            return item.attributes.audit.data.id==cookies.id;
          });
          

          if( filteredTypologieList.length==0) {
            noValue=true;
          }
        for (let index = 0; index < filteredTypologieList.length; index++) {
            const element:any = typologieList[index];
            console.log(element.attributes)

            if (element.attributes.Nom !="total" ) {
              if(!element.attributes.Ampere || !element.attributes.Volt || !element.attributes.Puissance || !element.attributes.Heure_conso_ouverture || !element.attributes.conso_jour_kwh || !element.attributes.heure_conso_dimanche ||  !element.attributes.conso_dimanche_kwh || 
                !element.attributes.conso_semaine_kwh || !element.attributes.heures_utilisation_potentielle_jour_ouverture || !element.attributes.heure_economisable ||  !element.attributes.kwh_economisable_par_semaine || !element.attributes.heure_utilisation_potentielle_dimanche 
                || !element.attributes.conso_estime_semaine_kwh  ) {
                  noValue=true;

                }
                else {
            ampereTypologie=ampereTypologie+element.attributes.Ampere;
            voltTypologie=voltTypologie+element.attributes.Volt;
            puissanceTypologie=puissanceTypologie+element.attributes.Puissance;
            heureConsoouvertureTypologie=heureConsoouvertureTypologie+element.attributes.Heure_conso_ouverture;
            consoJourKwhTypologie=consoJourKwhTypologie+element.attributes.conso_jour_kwh;
            heureConsoDimancheTypologie=heureConsoDimancheTypologie+element.attributes.heure_conso_dimanche;
            consoDimancheKwhTypologie= consoDimancheKwhTypologie+element.attributes.conso_dimanche_kwh;
            consoSemaineKwhTypologie = consoSemaineKwhTypologie+ element.attributes.conso_semaine_kwh;
            heuresUtilisationPotentielleJourOuvertureTypologie = heuresUtilisationPotentielleJourOuvertureTypologie + element.attributes.heures_utilisation_potentielle_jour_ouverture;
            heureEconomisableTypologie =heureEconomisableTypologie +element.attributes.heure_economisable;
            kwhEconomisableParSemaineTypologie=kwhEconomisableParSemaineTypologie+element.attributes.kwh_economisable_par_semaine;
            heureUtilisationPotentielleDimancheTypologie=heureUtilisationPotentielleDimancheTypologie+element.attributes.heure_utilisation_potentielle_dimanche; 
            consoEstimeSemaineKwhTypologie=consoEstimeSemaineKwhTypologie+element.attributes.conso_estime_semaine_kwh;
            pourcentageTypologie=pourcentageTypologie+ element.attributes.pourcentage;
          }

        } else {
            id=element.id;
             
        }

  
                        }

                        const totalData = {
                            audit:cookies.id,
                            Nom:"total",
                            Ampere:ampereTypologie.toFixed(2),
                            Volt:voltTypologie.toFixed(2),
                            Puissance:puissanceTypologie.toFixed(2),
                            Heure_conso_ouverture:heureConsoouvertureTypologie.toFixed(2),
                            conso_jour_kwh:consoJourKwhTypologie.toFixed(2),
                            heure_conso_dimanche:heureConsoDimancheTypologie.toFixed(2),
                            conso_dimanche_kwh:consoDimancheKwhTypologie.toFixed(2),
                            conso_semaine_kwh:consoSemaineKwhTypologie.toFixed(2),
                            heures_utilisation_potentielle_jour_ouverture:heuresUtilisationPotentielleJourOuvertureTypologie.toFixed(2),
                            heure_economisable:heureEconomisableTypologie.toFixed(2),
                            kwh_economisable_par_semaine:kwhEconomisableParSemaineTypologie.toFixed(2),
                            heure_utilisation_potentielle_dimanche: heureUtilisationPotentielleDimancheTypologie.toFixed(2),
                            conso_estime_semaine_kwh:consoEstimeSemaineKwhTypologie.toFixed(2),
                            pourcentage:((kwhEconomisableParSemaineTypologie*100)/consoSemaineKwhTypologie).toFixed(2),
                        
                                                };
                                                
 
  
  
                           const body = JSON.stringify({ data: totalData }); 
                           if (noValue==false) {
   if(!id) {
                                                      
const httpLink = 'http://127.0.0.1:1337/api/typologies?populate=*';
       
const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  try {
    const responseT = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  router.push("/Logged")
   
  }
  catch (error) {
    console.error(error);
  
  }
} else {
   
   
                                                  
        const httpLinkR = `http://127.0.0.1:1337/api/typologies/${id}?populate=*`;
       
        const headerssR = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`,
                         };

    
try {
    const response = await fetch(httpLinkR, {
      method: 'PUT',
      headers: headerssR,
      body: body,
  });
  router.push("/Logged")
          }
  
          catch (error) {
            console.error(error);
          
          }




}
}
else {
  console.log('pas de valeur');
}

}


    useEffect(() => {
        const data= async () => {
            const typologie =await fetchAudit('http://127.0.0.1:1337/api/typologies?populate=*')
            setTypologieList(typologie.data);
        }
     data();

    },[]) 
    return (
        <>
         <form onSubmit={handleSubmit}>
                 
                 <p><button type="submit">Calculer </button></p>
               </form>
     
        </>
     )

}