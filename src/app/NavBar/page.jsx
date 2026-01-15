import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-white px-8 py-1 shadow-sm text-black">
      
      {/* LEFT: Logo + Title */}
      <div className="flex items-center gap-3">
        <Image
          src="https://as1.ftcdn.net/jpg/01/22/08/30/1000_F_122083028_KPrLnNthSOudu9cj4DBjymcPkwNc0YgB.jpg"
          alt="Earth"
          width={50}
          height={50}
        />
        <h1 className="text-xl font-semibold text-black">
          Travel Guide
        </h1>
      </div>

      {/* RIGHT: Navigation Links */}
      <ul className="flex gap-8 font-medium text-black">
        <Link href="/"><li className="cursor-pointer hover:text-blue-600">Home</li></Link>
        <Link href="/Destination"><li className="cursor-pointer hover:text-blue-600">Destination</li></Link>
        <Link href="/Contact"><li className="cursor-pointer hover:text-blue-600">Contact</li></Link>
      </ul>

    </nav>
  );
}

export default NavBar;
