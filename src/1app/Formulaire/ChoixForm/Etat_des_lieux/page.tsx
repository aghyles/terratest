'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import {  useState } from "react";
import Select from 'react-select';

export default function Home () {
    const daysOfWeek = [
        { value: 'dimanche', label: 'Dimanche' },
        { value: 'lundi', label: 'Lundi' },
        { value: 'mardi', label: 'Mardi' },
        { value: 'mercredi', label: 'Mercredi' },
        { value: 'jeudi', label: 'Jeudi' },
        { value: 'vendredi', label: 'Vendredi' },
        { value: 'samedi', label: 'Samedi' },
      ];
      const [selectedDays, setSelectedDays] = useState([]);

    const [remarque , setRemarque] = useState<undefined | string>(' Rien à signaler')

    const [ouverturCollaborateur1 , setOuvertureCollaborateur1] = useState<string >("")
    const [ouverturCollaborateur2 , setOuvertureCollaborateur2] = useState<string >("")
    const [fermetureCollaborateur1 , setFermetureCollaborateur1] = useState<string >("")
    const [fermetureCollaborateur2 , setFermetureCollaborateur2] = useState<string >("")
     
    const [ouverturclient1 , setOuvertureClient1] = useState<string >("")
    const [fermetureclient1 , setFermetureClient1] = useState<string >("")
    const [ouverturclient2 , setOuvertureClient2] = useState<string >("")
    const [fermetureclient2 , setFermetureClient2] = useState<string >("")
    
    const jour =JSON.stringify(selectedDays);
 
    const router=useRouter();

                const handleSubmit =async (event:any)=> {
                event.preventDefault();
            
                const formattedTimeStringOuverturCollaborateur1 = formatTimeToHHMMSS(ouverturCollaborateur1);
                const formattedTimeStringOuverturCollaborateur2 = formatTimeToHHMMSS(ouverturCollaborateur2);
                const formattedTimeStringFermetureCollaborateur1 = formatTimeToHHMMSS(fermetureCollaborateur1);
                const formattedTimeStringFermetureCollaborateur2 = formatTimeToHHMMSS(fermetureCollaborateur2);
                
                const formattedTimeStringOuvertureClient1=formatTimeToHHMMSS(ouverturclient1);
                const formattedTimeStringFermetureClient1 = formatTimeToHHMMSS(fermetureclient1);
                const formattedTimeStringOuvertureClient2 = formatTimeToHHMMSS(ouverturclient2);
                const formattedTimeStringFermetureClient2 = formatTimeToHHMMSS(fermetureclient2);
                
                

                 //  Amplitude Collaborateur Total // 
                 const amplitudeCollaborateur1Data:any = calculateAmplitude(ouverturCollaborateur1, fermetureCollaborateur1);
                 let   amplitudeCollaborateur2Data:any = amplitudeCollaborateur2();
                 const totalAmplitudeCollaborateurs = amplitudeCollaborateur1Data + amplitudeCollaborateur2Data;
                 const totalHoursCollaborateurs = Math.floor(totalAmplitudeCollaborateurs / 60);
                 const remainingMinutesCollaborateurs = totalAmplitudeCollaborateurs % 60;
            
                 const formattedTotalTimeCollaborateurs = `${totalHoursCollaborateurs.toString().padStart(2, '0')}:${remainingMinutesCollaborateurs.toString().padStart(2, '0')}`;
             
                 const formattedTimeStringAmplitudeTotaleCollaborateur =formatTimeToHHMMSS(formattedTotalTimeCollaborateurs);
                    

                 const amplitudeClient1 = calculateAmplitude(ouverturclient1, fermetureclient1);                 
                 let   amplitudeClient2Data:any = amplitudeClient2();
                 const totalAmplitudeClients = amplitudeClient1 + amplitudeClient2Data;
                 const totalHoursClients = Math.floor(totalAmplitudeClients / 60);
                 const remainingMinutesClients = totalAmplitudeClients % 60;
                 const totalAmplitudeFormatted = `${totalHoursClients.toString().padStart(2, '0')}:${remainingMinutesClients.toString().padStart(2, '0')}`;
                 

                 const formattedTimeStringAmplitudeTotaleClient = formatTimeToHHMMSS(totalAmplitudeFormatted)



                const cookies = parseCookies();
                
                const etatDesLieuData = {
                    Id_Audit:cookies.id,
                    Remarque:remarque,
                    Ouverture_Collab_1:formattedTimeStringOuverturCollaborateur1,
                    Fermeture_Collab_1:formattedTimeStringFermetureCollaborateur1,
                    Ouverture_Collab_2:formattedTimeStringOuverturCollaborateur2                                           ,
                    Fermeture_Collab_2:formattedTimeStringFermetureCollaborateur2,
                    Ouverture_Client_1:formattedTimeStringOuvertureClient1,
                    Fermeture_Client_1:formattedTimeStringFermetureClient1,
                    Ouverture_Client_2:formattedTimeStringOuvertureClient2,
                    Fermeture_Client_2:formattedTimeStringFermetureClient2,
                    Amplitude_Collab:formattedTimeStringAmplitudeTotaleCollaborateur,
                    Amplitude_Client:formattedTimeStringAmplitudeTotaleClient,
                    Jour:jour

                };
                 
                
const httpLink = 'http://127.0.0.1:1337/api/etat-de-lieus?populate=*';

const headerss = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.jwt}`,
  };

  const body = JSON.stringify({ data: etatDesLieuData });


  try {
    const response = await fetch(httpLink, {
      method: 'POST',
      headers: headerss,
      body: body,
  });
  
const responseData = await response.json();

console.log(responseData)
router.push("/Formulaire/ChoixForm")
  
} catch (error) {
    console.error(error);
}
   


            }
          

            const convertTimeStringToTime = (timeString: string) => {
                const [hours, minutes] = timeString.split(":").map(Number);
                const time = new Date();
                time.setUTCHours(hours); // Utiliser setUTCHours pour éviter les décalages horaires
                time.setUTCMinutes(minutes); // Utiliser setUTCMinutes pour éviter les décalages horaires
                return time;
              };

              


              function convertTimeStringToMinutes(timeString:string) {
                if (!timeString) {
                    return 0;
                }
                
                const [hours, minutes] = timeString.split(":").map(part => parseInt(part));
                return hours * 60 + minutes;
            }
            
            


            function calculateAmplitude(openingTime:string, closingTime:string) {
                const openingMinutes = convertTimeStringToMinutes(openingTime);
                const closingMinutes = convertTimeStringToMinutes(closingTime);
                return closingMinutes - openingMinutes;
            }


            function amplitudeCollaborateur2 ():any {
                let amplitudeCollaborateur2=0
                if (ouverturCollaborateur2 !== null && fermetureCollaborateur2 !== null) {
                    amplitudeCollaborateur2 = calculateAmplitude(ouverturCollaborateur2, fermetureCollaborateur2);
                }
              return (amplitudeCollaborateur2)
            }
      
            function amplitudeClient2 ():any {
                let amplitudeClient2 = 0;
                if (ouverturclient2 !== null && fermetureclient2 !== null) {
                    amplitudeClient2 = calculateAmplitude(ouverturclient2, fermetureclient2);
                }
                
              return (amplitudeClient2)
            }


           
            // Calculer l'amplitude totale pour les clients
           
            function formatTimeToHHMMSS(timeString:any) {
                if (!timeString) {
                  return null; // Ou une valeur par défaut appropriée si nécessaire
                }
              
                const formattedTime = convertTimeStringToTime(timeString);
                return formattedTime.toISOString().substr(11, 8);
              }



    return (
        <div>
         <form onSubmit={handleSubmit}>
            <div>
            Sélectionnez les jours de la semaine :{' '}
      <Select
        isMulti
        options={daysOfWeek}
        onChange={(newValue:any) => setSelectedDays(newValue)}
        value={selectedDays}
      />
       </div>


     <p>   
<label htmlFor="appt">Ouverture Collaborateur 1 : </label>
<input type="time" id="appt" name="appt"  required  onChange={e=> setOuvertureCollaborateur1(e.target.value)} value={ouverturCollaborateur1} />
</p>
<p>
<label htmlFor="appt">Fermeture Collaborateur 1 : </label>
<input type="time" id="appt" name="appt"  required onChange={e=> setFermetureCollaborateur1(e.target.value)} value={fermetureCollaborateur1} />
</p>

<p>
<label htmlFor="appt">Ouverture Collaborateur 2 : </label>
<input type="time" id="appt" name="appt"   onChange={e=> setOuvertureCollaborateur2(e.target.value)} value={ouverturCollaborateur2} />
</p>
<p>
<label htmlFor="appt">Fermeture Collaborateur 2 : </label>
<input type="time" id="appt" name="appt"   onChange={e=> setFermetureCollaborateur2(e.target.value)} value={fermetureCollaborateur2} />
</p>


<p>   
<label htmlFor="appt">Ouverture Client 1 : </label>
<input type="time" id="appt" name="appt"  required onChange={e=> setOuvertureClient1(e.target.value)} value={ouverturclient1} />
</p>

<p>   
<label htmlFor="appt">Fermeture Client 1 : </label>
<input type="time" id="appt" name="appt"  required onChange={e=> setFermetureClient1(e.target.value)} value={fermetureclient1} />
</p>

<p>   
<label htmlFor="appt">Ouverture Client 2 : </label>
<input type="time" id="appt" name="appt"   onChange={e=> setOuvertureClient2(e.target.value)} value={ouverturclient2} />
</p>


<p>   
<label htmlFor="appt">Fermeture Client 2 : </label>
<input type="time" id="appt" name="appt"   onChange={e=> setFermetureClient2(e.target.value)} value={fermetureclient2} />
</p>



<p> Remarque : <textarea required onChange={e => setRemarque(e.target.value)} value={remarque} /> </p>


    
       <p> <button type="submit" >Confirmer</button></p>
         </form>
        </div>
    )
}
