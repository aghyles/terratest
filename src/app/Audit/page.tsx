'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import fetcher from '../Components/Audits';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import Link from "next/link";
export default function Home() {
  const [fetchedData, setFetchedData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const cookies = parseCookies();

      if (!cookies.jwt) {
        console.log('Merde');
        router.push('/');
      } else {
        try {
          
          const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
            cache: 'no-store',
          };
          const response = await fetcher('http://127.0.0.1:1337/api/audits?populate=*', options);
          const fetchedData = response.data;

          setFetchedData(fetchedData);
        } catch (error) {
          console.error("Une erreur s'est produite :", error);
        }
      }
      
    }

    fetchData();
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
       <p> <Link href={'/'}> Home Page </Link> </p>
       <p> <Link href={'/Profile'}> Profile Page </Link> </p>
      </div>
    </div>
  );
}
