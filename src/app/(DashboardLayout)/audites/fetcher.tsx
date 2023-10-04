'use client';
import { parseCookies } from 'nookies';

// fetcher le data en général //
export  async function fetcher(url:string, option = {}) {

  let response;
  response = await fetch(url, option);
  const data = await response.json();

  return data;
}

 // fetcher tout les audits
export default async function fetchAudit(url :string)  {

    const cookies = parseCookies();
    let fetchedData;


      try {

        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
          cache: 'no-store',
        };

        const response = await fetcher(url, options);
        fetchedData = response;


      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }

    return fetchedData;
  }




