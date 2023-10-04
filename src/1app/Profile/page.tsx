'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import fetchAudit from "../../app/(DashboardLayout)/audites/fetcher";



export default function Home() {
    const [fetchedData, setFetchedData]:any = useState([]);

    const router = useRouter();
    useEffect(() => {
        async function fetchData() {
          const cookies = parseCookies();
          console.log(cookies.jwt)
          const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
            cache: 'no-store',
          };

          if (!cookies.jwt) {
            console.log('Merde');
            router.push('/');
          }
          else {
            const response = await fetchAudit('http://127.0.0.1:1337/api/users/me');
           setFetchedData(await response)
          }
        }

        fetchData();
        },[])



return (
    <div>
        <h1>Information sur user : </h1>
        <h3> Id: {fetchedData.id} </h3>
        <h3> Email :  {fetchedData.email }</h3>
        <h3> UserName: {fetchedData.username} </h3>
        <h3> Provider: {fetchedData.provider} </h3>

    </div>
)


}
