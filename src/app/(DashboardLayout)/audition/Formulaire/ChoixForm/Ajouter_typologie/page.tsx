'use client'
import {  useEffect, useState } from "react";
import React from 'react';
import "@/app/globals.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import Select, {  MultiValue } from 'react-select';
import fetchAudit from "src/app/(DashboardLayout)/audition/Components/fetcher";

export default function Creer() {

    const [nom, SetNom] = useState<string>("");
    const [relevetList, setrelevetList] = useState<string[]>([]);
    const [selectedrelevet, setSelectedrelevet] = useState<MultiValue<any> >([])
    const [cookies , setcookie] = useState<any> ((parseCookies()));


    const router=useRouter();
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        let ampereTypologie=0;
        let voltTypologie=0;
        let puissanceTypologie=0;
        let heureConsoouvertureTypologie=0;
        let consoJourKwhTypologie =0
        let heureConsoDimancheTypologie =0
        let consoDimancheKwhTypologie =0
        let consoSemaineKwhTypologie =0
        let heuresUtilisationPotentielleJourOuvertureTypologie=0
        let heureEconomisableTypologie = 0
        let kwhEconomisableParSemaineTypologie=0
        let heureUtilisationPotentielleDimancheTypologie =0
        let consoEstimeSemaineKwhTypologie=0


        for (let index = 0; index < selectedrelevet.length; index++) {
            const element = selectedrelevet[index];

            const relevet=await fetchAudit(`http://127.0.0.1:1337/api/releve-consommations/${element.value}?populate=*`);


            ampereTypologie=ampereTypologie+relevet.data.attributes.Ampere;
            voltTypologie=voltTypologie+relevet.data.attributes.Volt;
            puissanceTypologie=puissanceTypologie+relevet.data.attributes.Puissance
            heureConsoouvertureTypologie=heureConsoouvertureTypologie+relevet.data.attributes.tableau_analyse.data.attributes.Heure_conso_ouverture;
            consoJourKwhTypologie=consoJourKwhTypologie+relevet.data.attributes.tableau_analyse.data.attributes.conso_jour_kwh;
            heureConsoDimancheTypologie=heureConsoDimancheTypologie+relevet.data.attributes.tableau_analyse.data.attributes.heure_conso_dimanche;
            consoDimancheKwhTypologie= consoDimancheKwhTypologie+relevet.data.attributes.tableau_analyse.data.attributes.conso_dimanche_kwh;
            consoSemaineKwhTypologie = consoSemaineKwhTypologie+ relevet.data.attributes.tableau_analyse.data.attributes.conso_semaine_kwh
            heuresUtilisationPotentielleJourOuvertureTypologie = heuresUtilisationPotentielleJourOuvertureTypologie + relevet.data.attributes.tableau_analyse.data.attributes.heures_utilisation_potentielle_jour_ouverture
            heureEconomisableTypologie =heureEconomisableTypologie +relevet.data.attributes.tableau_analyse.data.attributes.heure_economisable
            kwhEconomisableParSemaineTypologie=kwhEconomisableParSemaineTypologie+relevet.data.attributes.tableau_analyse.data.attributes.kwh_economisable_par_semaine
            heureUtilisationPotentielleDimancheTypologie=heureUtilisationPotentielleDimancheTypologie+relevet.data.attributes.tableau_analyse.data.attributes.heure_utilisation_potentielle_dimanche
            consoEstimeSemaineKwhTypologie=consoEstimeSemaineKwhTypologie+relevet.data.attributes.tableau_analyse.data.attributes.conso_estime_semaine_kwh



            const typologieTableau = {
                id:element.value,
                Type_Typologie:nom,


                                };

            const httpLinkR =`http://127.0.0.1:1337/api/releve-consommations/${element.value}?populate=*`;



            const headerssR = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.jwt}`,
            };
  const bodyR = JSON.stringify({ data: typologieTableau });

  try {
    const response = await fetch(httpLinkR, {
      method: 'PUT',
      headers: headerssR,
      body: bodyR,
  });

          }

          catch (error) {
            console.error(error);

          }



                              };

        const typologieData = {
        audit:cookies.id,
        Nom:nom,
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
        releve_consommations: selectedrelevet.map(relevet => relevet.value)
        }

const httpLink = 'http://127.0.0.1:1337/api/typologies?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };
  const body = JSON.stringify({ data: typologieData });


try {
    const responseT = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });

  console.log(responseT)

  }
  catch (error) {
    console.error(error);

  }


    }
    useEffect(() => {
        const data= async () => {
        const relevetConso =await fetchAudit('http://127.0.0.1:1337/api/releve-consommations?populate=*')
        setrelevetList(relevetConso.data);

    }
    data();

    },[])

return (
   <>
    <form onSubmit={handleSubmit}>


        <p>Nom de la typologie  : <input type="text"  onChange={e => SetNom(e.target.value)} value={nom} /></p>
        <div className="dd">
        Sélectionnez les circuit de cette typologie :{" "}
        {relevetList.length === 0 ? (
          <p>Aucun circuit disponible</p>
        ) : (
          <Select
          isMulti
          options={relevetList
            .filter((relevet: any) => !relevet.attributes.typologie.data && relevet.attributes.audit.data.id==  cookies.id )
            .map((relevet: any) => ({
              value: relevet.id,
              label: relevet.attributes.Nom_Dijoncteur,
            }))}
          onChange={(newValue: MultiValue<any[]>) => setSelectedrelevet(newValue)}
          value={selectedrelevet}
        />





        )}
      </div>

            <p><button type="submit">Confirmer </button></p>
          </form>

   </>
)
}


