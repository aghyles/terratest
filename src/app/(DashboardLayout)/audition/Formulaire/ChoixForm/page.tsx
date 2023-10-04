'use client';

import Link from "next/link";

export default function Home () {
      
    return (
        <div>
       <h1>Choix de formulaire à remplir  </h1>
       <p><Link href={"/Formulaire/ChoixForm/Routine_Travail"}> Formulaire de routine de travail </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Appareil"}> Formulaire de l'Appareil </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Veille"}> Formulaire de veille </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Eclairage"}> Formulaire de l'eclairge </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Circuit"}> Formulaire de circuit </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Exploitation"}> Formulaire d'exploitation </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Pilotage_de_Batiment"}> Formulaire de pilotage de batiment </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Routine_Exploitation"}> Formulaire de routine d'exploitation </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Production_eau_chaude"}> Formulaire de production d'eau chaude </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Observation"}> Formulaire d'observation </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Etat_des_lieux"}> Formulaire d'etat des lieux </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Remplissage_HP_HC"}> Formulaire de remplissage HP HC </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Relevet_Consommation"}> Formulaire de relevet de consommation </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Energie"}> Formulaire d'Energie </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Tableau_Analyse"}> Formulaire de tableau d'analyse  </Link> </p>
       <p><Link href={"/Formulaire/ChoixForm/Ajouter_typologie"}>Ajouter les typologie </Link></p>
       <p><Link href={"/Formulaire/ChoixForm/Total"}>Calculer le total </Link></p>
        
       
        </div>
    )
}