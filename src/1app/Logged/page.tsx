'use client';
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
export default function Logged() {
    const router = useRouter();
    const logout =()=> {
        destroyCookie(null, 'jwt');
        router.push('/');
    
      }

    return (
        <div>     
         <button onClick={()=>logout()}>Logout</button>
        </div>

    )

    }