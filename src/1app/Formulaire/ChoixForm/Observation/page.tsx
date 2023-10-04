'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";


export default function Home () {
 

    const [demandeClient , setDemandeClient] = useState<undefined | string>(' Rien à signaler')
    const [demandeCollaborateur , setDemandeCollaborateur] = useState<undefined |  string>(' Rien à signaler')
    const [observation , setObservation ] = useState<undefined |  string>(' Rien à signaler')
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    
     
    
    const router=useRouter();

                const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                const observationData = {
                    
                    Demande_Client:demandeClient,
                    Demande_Collaborateur:demandeCollaborateur,
                    Observation:observation,
                    Photo:selectedFile,
                    Id_audit:cookies.id
                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/observations?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: observationData });


  try {
    const response = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  
  const responseData = await response.json();
  console.log()
  if (selectedFile) {
    const formData = new FormData();
    formData.append("ref", "api::observation.observation");
    formData.append("refId", responseData.data.id); // Use the ID of the newly created tuple
    formData.append("field", "Photo");
    formData.append("files", selectedFile);
    
    try {
      const fileResponse = await fetch("http://127.0.0.1:1337/api/upload/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${cookies.jwt}`,
        },
        body: formData,
      });

      const fileData = await fileResponse.json();
      console.log("Uploaded file data:", fileData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }


  router.push("/Formulaire/ChoixForm")
  
} catch (error) {
    console.error(error);
}
   


            }
            const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files.length > 0) {
                  setSelectedFile(event.target.files[0]);
                  
                }
              };

    return (
        <div>
         <form onSubmit={handleSubmit}>
        

<p> Demande de client : <textarea required onChange={e => setDemandeClient(e.target.value)} value={demandeClient} /> </p>
<p> Demande collaborateur : <textarea required onChange={e => setDemandeCollaborateur(e.target.value)} value={demandeCollaborateur} /> </p>
<p> Observation : <textarea required onChange={e => setObservation (e.target.value)} value={observation } /> </p>
<p> Télécharger une photo : <input type="file" accept="image/*" onChange={handleFileChange} /> </p>


    
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
