import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_API_Key,
  api_secret: process.env.Cloudinary_API_Secret,
});

const cloudinaryupload = async (input: Blob | string): Promise<string | null> => {
  if (!input) return null;

  try {
    // If client sends JSON, image will be a string (data URL or remote URL)
    if (typeof input === "string") {
      // Reject browser-only blob: URLs (Cloudinary can't fetch those)
      if (input.startsWith("blob:")) return null;

      const result = await cloudinary.uploader.upload(input, { resource_type: "image" });
      return result?.secure_url || null;
    }

    // Otherwise, handle real file (Blob) via upload_stream
    const arrayBuffer = await input.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || null);
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default cloudinaryupload;