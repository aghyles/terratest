'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import fetchAudit from '../Components/fetcher';

export default function Home() {

    // Les hooks doivent etre déclaré dans le début d'un composant //
  const [fetchedData, setFetchedData] = useState([]);
  const router = useRouter();
  const cookies = parseCookies();

  useEffect(() => {

    if (!cookies.jwt) {
      router.push('/');
    } else {


     const data= async () => {
      const Audit=await fetchAudit('http://127.0.0.1:1337/api/audits?populate=*');
     setFetchedData(Audit.data);

     }
    data();
    }

  }, []); // Le tableau vide signifie que cela s'exécutera une fois après le montage initial

  const logout =()=> {
  destroyCookie(null, 'jwt');
  router.push('/');
}

  return (
    <div>
      {fetchedData ?
        fetchedData.map((audit: any) => (
          <div key={audit.id}>
             <h1> Audit {audit.id} </h1>
      <p>  Date d'audit :  {audit.attributes.Date_Audit} </p>
      <p> Superficie :  {audit.attributes.Superficie} m² </p>
      <p> Date de renovation : {audit.attributes.Date_Renovation}  </p>
      <p> Adresse : {audit.attributes.Adresse}  </p>
      <h2> Le client de l'audit {audit.id} :  </h2>
      <p> Le client : { audit.attributes.id_client.data.id } </p>
      <p> Nom : { audit.attributes.id_client.data.attributes.Nom } </p>
      <p> Email : { audit.attributes.id_client.data.attributes.Email } </p>
      <p> Telephone : 0{ audit.attributes.id_client.data.attributes.Telephone } </p>
          </div>
        ))
       : (
        <p>Chargement en cours...</p>
      )}

      <div>
        <button onClick={()=>logout()}>Logout</button>

      </div>
    </div>
  );
}
