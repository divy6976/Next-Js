import React from 'react'


async function page ({params}) {
    const {city} = await  params;

  return (
     <div className="flex items-center justify-center min-h-screen text-center text-blue-100">
      <h1 className="text-2xl font-semibold ">
        {city} is the best city in the world!
      </h1> 
        
     
    </div>
  )
}

export default page
