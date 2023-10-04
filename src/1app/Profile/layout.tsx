import Link from "next/link";

export default function layout({children}:any) {
    return (
      <div>
           <p><Link href={"/Logged"}>Home</Link></p>
         <p><Link href={"/Audit"}>Liste des Audit</Link></p>
        <p><Link href={"/Creation_Audit"}>Creation des audits </Link></p>
        <p><Link href={"/Profile"}>Profile</Link></p>
        <p><Link href={"/Formulaire"}>Remplir les Formulaires </Link></p>

        {children}
      </div>
    )
  }