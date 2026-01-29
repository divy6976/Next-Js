'use client'
import React from 'react'
import Link from 'next/link';
import axios from 'axios';


function page() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await axios.post('/api/auth/register', { name, email, password });
      console.log(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1419]">
      <div className="bg-[#1A202C] p-8 rounded-lg shadow-lg w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Register</h1>
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Enter Name" 
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-white/50 focus:outline-none focus:border-white text-white placeholder:text-gray-400" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter Email" 
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-white/50 focus:outline-none focus:border-white text-white placeholder:text-gray-400" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter Password" 
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-0 py-2 bg-transparent border-0 border-b border-white/50 focus:outline-none focus:border-white text-white placeholder:text-gray-400" 
            />
          </div>

          <button type="submit" className="w-full bg-white text-gray-900 py-3 px-4 rounded-md font-bold hover:bg-gray-100 focus:outline-none transition duration-200">Register</button>
          
          <p className="text-center text-sm text-white mt-4">
            Already have an account? <Link href="/login" className="underline">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default page;
