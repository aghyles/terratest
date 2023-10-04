'use client'
import '../globals.css';
import { useEffect, useState } from "react";
import fetchAudit from "../../app/(DashboardLayout)/audites/fetcher";
import React from 'react';
import Select, {  MultiValue } from 'react-select';
import { parseCookies } from "nookies";
import { useRouter } from 'next/navigation';

    export default function Creer() {
    const today = new Date().toISOString().split('T')[0];

    const [DateAudit, SetDate] = useState<string>(today);

    const [Superficie, SetSuperficie] = useState<number| undefined | string >(1);
    const [Adresse, setAdresse] = useState<undefined | string >('');

    const [DateRenovation , setDateRenovation]=useState<string >(DateAudit)

    const [ClientList, setClientList] = useState<string[]>([]);
    const [selectedClient, setSelectedClient] = useState<string | undefined | number >('');

    const [AuditeurList, setAuditeurList] = useState<string[]>([]);

    // MultiValue le type utilisé par react-select pour représenter une option sélectionnée ou plusieurs options sélectionnées //
    const [selectedAuditeur, setSelectedAuditeur] = useState<MultiValue<any> >([])



    const router=useRouter();

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const cookies = parseCookies();

       const auditData = {
  Superficie,
  Date_Audit: DateAudit,
  Date_Renovation: DateRenovation,
  Adresse: Adresse,
  id_auditeur: selectedAuditeur.map(auditeur => auditeur.value) ,
  id_client: selectedClient
                        };

const httpLink = 'http://127.0.0.1:1337/api/audits?populate=*';

const headerss = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${cookies.jwt}`,
};

  const body = JSON.stringify({ data: auditData });

    try {
      const response = await fetch(httpLink, {
        method: 'POST',
        headers: headerss,
        body: body,
    });

    const responseData = await response.json();
    router.push("/Logged")
  } catch (error) {
      console.error(error);
  }


    }


    useEffect(() => {
     const data= async () => {
        const Client =await fetchAudit('http://127.0.0.1:1337/api/Clients?populate=*')
        setClientList(Client.data);
         setAuditeurList(await fetchAudit('http://127.0.0.1:1337/api/users?populate=*'))
        }
       data();
    },[])

return (
   <>
    <form onSubmit={handleSubmit}>
            <p>
          Sélectionnez le Client :{" "}
          <select
            required
            onChange={(e) => setSelectedClient(e.target.value)}
            value={selectedClient}
          >
            <option value="" disabled>
              Choisissez un client
            </option>
            {ClientList.map((audit: any) => (
              <option key={audit.id} value={audit.id}>
                {audit.attributes.Nom}
              </option>
            ))}
          </select>
        </p>



        <div className="dd">
          Sélectionnez les Auditeurs :{" "}
          <Select
            isMulti
            options={AuditeurList.map((auditeur: any) => ({
              value: auditeur.id,
              label: auditeur.username,
            }))}
            onChange={(newValue: MultiValue<any[]>) =>  setSelectedAuditeur(newValue)}
            value={selectedAuditeur}
          />
        </div>


        <p>Date de l'audit : <input type="date" min={today} required onChange={e => SetDate(e.target.value)} value={DateAudit} /></p>
        <p>Superficie : <input type="number"  required onChange={e => SetSuperficie(e.target.value)} value={Superficie} /></p>
        <p> Adresse : <input type="text" placeholder="Adresse de l'audit " required onChange={e=>setAdresse(e.target.value)} value={Adresse} /></p>
        <p>Date de Renovation : <input type="date" min={DateAudit} required onChange={e => setDateRenovation(e.target.value)} value={DateRenovation} /></p>

            <p><button type="submit">Confirmer </button></p>
          </form>

   </>
)
}
