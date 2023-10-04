"use client";

import { useEffect, useState } from "react";
import fetchAudit from "../../app/(DashboardLayout)/audites/fetcher";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

export default function Home() {
  const [auditList, setauditList] = useState<string[]>([]);
  const [selectedaudit, setSelectedaudit] = useState<string  >('');
  const router = useRouter();


  useEffect(() => {
    const data= async () => {
       const audit =await fetchAudit('http://127.0.0.1:1337/api/Audits?populate=*')
       setauditList(audit.data);
       }
      data();
   },[])

const handleSubmit =(event:any)=> {
console.log("Bien choisi")
event.preventDefault();
setCookie(null, 'id', selectedaudit, {
  path: '/',
  sameSite: 'strict', // Cookies de session //
});
console.log(selectedaudit)
router.push('/Formulaire/ChoixForm');
}

// console.log(auditList)

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <p>
          Sélectionnez l'audit :{" "}
          <select
            required
            onChange={(e) => setSelectedaudit(e.target.value)}
            value={selectedaudit}
          >
            <option value="" disabled>
              Choisissez un audit
            </option>
            {auditList.map((audit: any) => (
              <option key={audit.id} value={audit.id}>
                {audit.attributes.Adresse}
              </option>
            ))}
          </select>
        </p>
        <p> <button type="submit">Confirmer</button>  </p>
        </form>

    </div>
  )
}
