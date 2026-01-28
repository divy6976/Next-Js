import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";

import { User } from "@/models/usermodel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register API error:", error);

    return Response.json(
      {
        message: "Internal Server Error",
        // in dev, surface the root cause so you can see it in Postman
        error:
          process.env.NODE_ENV !== "production"
            ? String(error?.message ?? error)
            : undefined,
      },
      { status: 500 }
    );
  }
}