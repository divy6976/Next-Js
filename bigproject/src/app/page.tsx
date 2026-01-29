'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import insaan from '../../public/insaan.png'
import { useRouter } from 'next/navigation';

function page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  console.log(session);

  const handlesignout=async() =>{
    try {
      setLoading(true);
      await signOut();
      setLoading(false);
      
    } catch (error) {
      console.error("Sign out failed:", error);
      setLoading(false);
      
    }



  }

  return (
    <div className="min-h-screen bg-[#0F1419] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 text-lg mt-2">Here's your account information</p>
          </div>
          
          {/* Sign Out Button */}
          {session?.user && (
            <button 
              onClick={handlesignout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200">
              Sign Out
            </button>
          )}
        </div>

       

        {/* User Info Card */}
        {session?.user ? (
          <>
            {/* Main Profile Card */}
            <div className="bg-[#1A202C] rounded-lg shadow p-8 mb-8 border border-white relative">
              {/* Edit Button */}
              <button
                onClick={() => router.push("/edit")}
              
              className="absolute top-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                {/* Avatar */}
                <div>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-white">
                    {session?.user?.image ? (
                      <Image 
                        src={session?.user?.image} 
                        alt="User Image" 
                        fill
                        sizes="(max-width: 768px) 100vw, 128px"
                        className="object-cover"
                        loading="eager"
                      />
                    ) : (
                      <Image 
                        src={insaan} 
                        alt="Default Image" 
                        fill
                        sizes="(max-width: 768px) 100vw, 128px"
                        className="object-cover"
                        loading="eager"
                      />
                    )}
                  </div>
                </div>

                {/* User Details */}
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-white mb-2">{session?.user?.name}</h2>
                  <p className="text-gray-400 text-lg mb-6">{session?.user?.email}</p>
                  
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Active</span>
                    <span className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - Status */}
              <div className="bg-[#1A202C] rounded-lg shadow p-6 border border-white">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Status</h3>
                <p className="text-2xl font-bold text-white">Active</p>
                <p className="text-gray-400 text-sm mt-2">Your account is active</p>
              </div>

              {/* Card 2 - Account Type */}
              <div className="bg-[#1A202C] rounded-lg shadow p-6 border border-white">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Account Type</h3>
                <p className="text-2xl font-bold text-white">User</p>
                <p className="text-gray-400 text-sm mt-2">Full access granted</p>
              </div>

              {/* Card 3 - Verification */}
              <div className="bg-[#1A202C] rounded-lg shadow p-6 border border-white">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wide mb-2">Verification</h3>
                <p className="text-2xl font-bold text-white">Verified</p>
                <p className="text-gray-400 text-sm mt-2">Identity confirmed</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#1A202C] rounded-lg shadow p-12 text-center border border-white">
            <p className="text-xl text-gray-300">Loading ...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
