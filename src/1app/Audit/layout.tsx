import Link from "next/link";

export default function layout({children}:any) {
    return (
      <div>
         <p> <Link href={'/Logged'}> Home Page </Link> </p>
         <p> <Link href={'/Profile'}> Profile Page </Link> </p>
         <p><Link href={"/Formulaire"}>Remplir les Formulaires </Link></p>
         <p><Link href={"/Creation_Audit"}>Creation des audits </Link></p>
        <h1> Listes des audits </h1>
        {children}
      </div>
    )
  }