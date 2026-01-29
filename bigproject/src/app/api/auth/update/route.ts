import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import { User } from "@/models/usermodel";
import cloudinaryupload from "@/lib/cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import type { Session } from "next-auth";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any) as Session | null;

    await dbConnect();

    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await request.json();

    let imageUrl = session.user.image || "";

    // If `image` is provided as a string (JSON), upload it (data URL / remote URL)
    // and store Cloudinary's secure URL. Skip if unchanged.
    if (typeof image === "string" && image && image !== imageUrl) {
      const uploaded = await cloudinaryupload(image);
      if (uploaded) imageUrl = uploaded;
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (name) {
      user.name = name;
    }
    user.image = imageUrl;

    await user.save();

    console.log("User updated:", user);

    return Response.json(

      { message: "User updated successfully", imageUrl, name: user.name },
      

      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ message: "Error updating user" }, { status: 500 });
  }
}
