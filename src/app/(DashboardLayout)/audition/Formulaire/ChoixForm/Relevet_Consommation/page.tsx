'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState } from "react";

export default function Home () {
 
  const [dijoncteur, setDijoncteur] = useState<undefined | string >('');
  const [ ampere, setAmpere] = useState<  number > (0);
  const [ volt, setVolt] = useState<  number >(0);
  const [circuit, setCircuit] = useState<undefined | string >('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const router=useRouter();

            const handleSubmit =async (event:any)=> {
                event.preventDefault();
                const cookies = parseCookies();
                 const puissance:number=(ampere*volt*1.732)/1000
                   
                const relevetData = {
                    audit:cookies.id,
                    Ampere:ampere.toFixed(2),
                    Volt:volt.toFixed(2),
                    Circuit:circuit,
                    Photo:selectedFile,   
                    Nom_Dijoncteur:dijoncteur,
                    Puissance:puissance.toFixed(2)

                };
          
                
const httpLink = 'http://127.0.0.1:1337/api/releve-consommations?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: relevetData });


  try {
    const response = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  
  const responseData = await response.json();
  router.push("/Formulaire/ChoixForm")
  console.log(responseData); 
 
  if (selectedFile) {
    const formData = new FormData();
    formData.append("ref", "api::releve-consommation.releve-consommation");
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
      
         <p> Nom de dijoncteur : <input required onChange={e => setDijoncteur(e.target.value)} value={dijoncteur} type="text" /> </p>
         <p> Ampere: <input type="number" onChange={e => setAmpere(parseFloat(e.target.value))} value={ampere}  />  </p>
         <p> Volt: <input type="number" onChange={e => setVolt(parseFloat(e.target.value))} value={volt}  />  </p>
         <p> Circuit : <input required onChange={e => setCircuit(e.target.value)} value={circuit} type="text" /> </p>
         <p> Télécharger une photo : <input type="file" accept="image/*" onChange={handleFileChange} /> </p>
        

       
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
