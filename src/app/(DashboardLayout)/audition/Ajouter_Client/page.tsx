'use client'
import {  useState } from "react";
import React from 'react';
import "../globals.css"
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

    export default function Creer() {
    
    const [enseigne, SetEnseigne] = useState<string>("");
    const [nom, SetNom] = useState<string>("");
    const [email, SetEmail] = useState<string>("");
    const [telephone, SetTelephone] = useState<string>("");
    const [adresse, SetAdresse] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    
      
    
    const router=useRouter();
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const cookies = parseCookies();
       
       const clientData = {
        Nom:nom,
        Enseigne:enseigne,
        Email:email,
        Telephone:telephone,
        Logo:selectedFile,
        Adresse_Siege_social:adresse

                        };

const httpLink = 'http://127.0.0.1:1337/api/clients?populate=*';

const headerss = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${cookies.jwt}`,
};

  const body = JSON.stringify({ data: clientData });

    try {
      const response = await fetch(httpLink, {
        method: 'POST',
        headers: headerss,
        body: body,
    });
    
    const responseData = await response.json();

    console.log(responseData)

    if (selectedFile) {
        const formData = new FormData();
        formData.append("ref", "api::client.client");
        formData.append("refId", responseData.data.id); // Use the ID of the newly created tuple
        formData.append("field", "Logo");
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

      
      router.push("/Logged")
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
   <>
    <form onSubmit={handleSubmit}>
            
        
        <p>Nom  : <input type="text" required onChange={e => SetNom(e.target.value)} value={nom} /></p>
        <p>Enseigne  : <input type="text" required onChange={e => SetEnseigne(e.target.value)} value={enseigne} /></p>
        <p>Email  : <input type="email" required onChange={e => SetEmail(e.target.value)} value={email} /></p>
        <p>Telephone  : <input type="number" required onChange={e => SetTelephone(e.target.value)} value={telephone} /></p>
        <p>Adresse siege social  : <input type="text" required onChange={e => SetAdresse(e.target.value)} value={adresse} /></p>
        <p> Télécharger une photo : <input type="file" accept="image/*" onChange={handleFileChange} /> </p>

            <p><button type="submit">Confirmer </button></p>
          </form>

   </>
)
}
