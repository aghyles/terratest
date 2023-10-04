import Link from "next/link"

export default function layout({children}:any) {
    return (
      <div>
       <p><Link href={"/Logged"}>Home</Link></p>
      <p><Link href={"/Audit"}>Liste des Audit</Link></p>
        <p><Link href={"/Profile"}>Profile</Link></p>
        <h1>Formulaire </h1>
        {/* <p><Link href={"/Formulaire/Routine_Travail"}>Formulaire de Routine de Travail </Link></p> */}
        {children}

      </div>
    )
  }