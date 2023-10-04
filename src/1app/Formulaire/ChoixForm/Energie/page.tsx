'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState , useEffect } from "react";
import fetchAudit from "@/app/Components/fetcher";

export default function Home () {

  const [mois, setMois] = useState< string  >("");
  const [qteKwh, setQteKwh] = useState< number >(0);
  const [prixhpeKwh, setPrixHpeKwh] = useState< number >(0);
  const [prixhceKwh, setPrixHceKwh] = useState< number >(0);
  const [prixhphKwh, setPrixHphKwh] = useState< number >(0);
  const [prixhchKwh, setPrixHchKwh] = useState< number >(0);
  const [prixAcheminement, setPrixAcheminement] = useState< number >(0);
  const [taxes, setTaxes] = useState< number >(0);
  const [abonnement, setAbonnement] = useState< number >(0);
  

  const [hpHcList, setHpHcList] = useState<string []>([]);
  const cookies = parseCookies();
  

  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                var hpPourcent:number=0;
                var hcPourcent:number=0;
                var total:number=0;

                hpHcList.forEach((item:any) => {
                  if (item.id == cookies.id) { 
                    // La base // 
                    item.attributes.remplissage_hp_hcs.data.forEach((remplissage : any) => {
                      console.log(remplissage.attributes.Total_HP_HC )
                      hpPourcent = hpPourcent + remplissage.attributes.Pourcent_HP;
                      hcPourcent = hcPourcent  + remplissage.attributes.Pourcent_HC;
                      total=item.attributes.remplissage_hp_hcs.data.length;

                    });
  
                  }
                  
                });
              

                hpPourcent=hpPourcent/total;
                hcPourcent=hcPourcent/total
                
                 const totalFixe=((hpPourcent/100)*prixhphKwh*qteKwh)+((hcPourcent/100)*qteKwh*prixhchKwh)+(prixAcheminement * qteKwh ) + ( taxes * qteKwh ) + abonnement;
                 const energieData = {
                    audit:cookies.id,
                    Qte_kwh:qteKwh,
                    Prix_HPE_kwh:prixhpeKwh,
                    Prix_HCE_kwh:prixhceKwh,
                    Prix_HPH_kwh:prixhphKwh,
                    Prix_HCH_kwh:prixhchKwh,
                    Prix_Acheminement:prixAcheminement,
                    Taxes:taxes,
                    Abonnement:abonnement,
                    Pourcent_HP:hpPourcent,
                    Pourcent_HC:hcPourcent,
                    Totale:totalFixe,
                    Mois:mois
                };
          
                

const httpLink = 'http://127.0.0.1:1337/api/energies?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: energieData });


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
                   const audit =await fetchAudit(`http://127.0.0.1:1337/api/audits?populate=*`)
                   setHpHcList(audit.data );
                   }
                  data();
               
               },[])

   console.log(hpHcList)
    return (
        <div>
         <form onSubmit={handleSubmit}>
       

         <p>
  Sélectionnez le mois :{" "}
  <select
    required
    onChange={(e) => setMois(e.target.value)}
    value={mois}
  >
    <option value="" disabled>
      Choisissez un mois :
    </option>
    <option value="janvier">Janvier</option>
    <option value="février">Février</option>
    <option value="mars">Mars</option>
    <option value="avril">Avril</option>
    <option value="mai">Mai</option>
    <option value="juin">Juin</option>
    <option value="juillet">Juillet</option>
    <option value="août">Août</option>
    <option value="septembre">Septembre</option>
    <option value="octobre">Octobre</option>
    <option value="novembre">Novembre</option>
    <option value="décembre">Décembre</option>
  </select>
</p>



         <p> Quantité Kwh  : <input required onChange={e => setQteKwh(parseFloat(e.target.value))} value={qteKwh} type="number" /> </p>
         <p> Prix hpe Kwh  : <input required onChange={e => setPrixHpeKwh(parseFloat(e.target.value))} value={prixhpeKwh} type="number" /> </p>
         <p> Prix hce Kwh  : <input required onChange={e => setPrixHceKwh(parseFloat(e.target.value))} value={prixhceKwh} type="number" /> </p>
         <p> Prix hph Kwh  : <input required onChange={e => setPrixHphKwh(parseFloat(e.target.value))} value={prixhphKwh} type="number" /> </p>
         <p> Prix hch Kwh  : <input required onChange={e => setPrixHchKwh(parseFloat(e.target.value))} value={prixhchKwh} type="number" /> </p>
         <p> Prix acheminement  : <input required onChange={e => setPrixAcheminement(parseFloat(e.target.value))} value={prixAcheminement} type="number" /> </p>
         <p> taxes  : <input required onChange={e => setTaxes(parseFloat(e.target.value))} value={taxes} type="number" /> </p>
         <p> Abonnement  : <input required onChange={e => setAbonnement(parseFloat(e.target.value))} value={abonnement} type="number" /> </p>
          
       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}

