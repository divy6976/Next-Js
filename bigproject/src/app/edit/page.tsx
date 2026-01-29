'use client'
import React from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function page() {
  const { data: session,update } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const router = useRouter();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (!file) {
      setPreviewUrl(session?.user?.image || "");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // If user selected a file, convert it to a data URL string.
      // The API route can upload this string to Cloudinary.
      const image =
        imageFile ? await fileToDataUrl(imageFile) : (session?.user?.image ?? "");

      const res = await axios.put("/api/auth/update", {
        name,
        image,
      });

      // Refresh session so home page shows updated values immediately
      await update({
        name,
        image: res.data?.imageUrl ?? session?.user?.image,
      });

      router.push("/");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPreviewUrl(session.user.image || "");
    }
  }, [session]);
  return (
    <div className="min-h-screen bg-[#0F1419] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Edit Profile</h1>
          <p className="text-gray-400 text-lg mt-2">Update your account information</p>
        </div>

        {/* Edit Form Card */}
        {session?.user ? (
          <div className="bg-[#1A202C] rounded-lg shadow p-8 border border-white">
            {/* Form Title */}
            <h2 className="text-2xl font-bold text-white mb-8">Account Settings</h2>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/50 rounded-lg focus:outline-none focus:border-white text-white placeholder:text-gray-500 transition-colors"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Profile Image</label>
                <div className="mb-4">
                  <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Current Profile Picture</p>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-white">
                    <Image 
                      src={previewUrl || '/default.png'}
                      alt="Current Profile" 
                      fill
                      sizes="(max-width: 768px) 100vw, 128px"
                      className="object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full px-4 py-3 bg-transparent border border-white/50 rounded-lg focus:outline-none focus:border-white text-white placeholder:text-gray-500 transition-colors file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer file:mr-4"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  type="button"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Info Section */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0F1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-semibold uppercase mb-2">Current Email</p>
                  <p className="text-white text-sm">{session?.user?.email}</p>
                </div>
                <div className="bg-[#0F1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs font-semibold uppercase mb-2">Account Status</p>
                  <p className="text-white text-sm">Active</p>
                </div>
              </div>
            </div>
          </div>
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
