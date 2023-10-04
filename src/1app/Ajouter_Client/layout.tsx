import Link from "next/link";

export default function layout({children}:any) {
    return (
      <div>
          
          <p><Link href={"/Logged"}>Home</Link></p>
         <p><Link href={"/Audit"}>Liste des Audit</Link></p>
        <p><Link href={"/Creation_Audit"}>Creation des audits </Link></p>
        <p><Link href={"/Profile"}>Profile</Link></p>
        <p><Link href={"/Formulaire"}>Remplir les Formulaires </Link></p>
        <p><Link href={"/Ajouter_Client"}>Ajouter des clients </Link></p>
        <p><Link href={"/Ajouter_Auditeur"}>Ajouter des auditeurs </Link></p>
        
         <h1> Ajouter des Clients : </h1>
        {children}
      </div>
    )
  }