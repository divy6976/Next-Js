"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Page() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <span className="text-xl font-semibold">StartupHunt</span>
      </div>

      {/* Navigation */}
      <ul className="flex items-center gap-6 text-gray-700">
        <Link href="/"><li className="cursor-pointer hover:text-blue-600">Home</li></Link>
        <Link href="/launches"><li className="cursor-pointer hover:text-blue-600">Launches</li></Link>
        <Link href="/about"><li className="cursor-pointer hover:text-blue-600">About</li></Link>
      </ul>

    </nav>
  );
}

export default Page;
