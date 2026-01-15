import Link from "next/link";


function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100 text-black">
      
      <h1 className="text-2xl font-semibold mb-4 text-black">
        Choose your Destinations
      </h1>

      <div className="flex gap-6">
        <Link href="/Destination/Paris">
          <div className="bg-white p-6 rounded-lg  hover:text-blue-900 shadow-md w-40 text-center text-black">
            Paris
          </div>
        </Link>

        <Link href="/Destination/NewYork">
          <div className="bg-white p-6  hover:text-blue-900 rounded-lg shadow-md w-40 text-center text-black">
            New York
          </div>
        </Link>

        <Link href="/Destination/Tokyo">
          <div className="bg-white p-6  hover:text-blue-900 rounded-lg shadow-md w-40 text-center text-black">
            Tokyo
          </div>
        </Link>
      </div>
      
    </div>
  );
}

export default Page;
