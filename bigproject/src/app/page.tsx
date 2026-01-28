'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import insaan from '../../public/insaan.png'
function page() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>

      <h1 className="text-3xl font-bold text-center mt-10 text-blue-900">Welcome to the Home Page {session?.user?.name}</h1>

       <p>Here is your email: {session?.user?.email}</p>
       <p>Here is your image:</p>
       {session?.user?.image ? (
         <Image src={session?.user?.image} alt="User Image" width={100} height={100} />
       ) : (
         <Image src={insaan} alt="Default Image" width={100} height={100} />
       )}


      
    </div>
  )
}

export default page
