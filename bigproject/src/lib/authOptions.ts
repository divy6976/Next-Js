import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import { User } from "@/models/usermodel";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";

type SessionCallbackParams = { session: Session; token: JWT };

async function sessionCallback(params: SessionCallbackParams): Promise<Session> {
  const { session: sessionData, token } = params;
  await dbConnect();
  const user = await User.findOne({ email: sessionData.user?.email ?? token.email });
  sessionData.user.id = token.id as string;
  sessionData.user.name = (user?.name ?? token.name) as string;
  sessionData.user.email = (token.email as string) ?? sessionData.user?.email ?? "";
  sessionData.user.image = (user?.image ?? token.image) as string;
  return sessionData;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};

          if (!email || !password) {
            console.log("Auth: Missing email or password");
            return null;
          }

          console.log("Auth: Attempting login for email:", email);
          await dbConnect();

          const user = await User.findOne({ email });
          console.log("Auth: User found:", user ? "Yes" : "No");

          if (!user) {
            console.log("Auth: User not found with email:", email);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log("Auth: Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Auth: Invalid password for email:", email);
            return null;
          }

          console.log("Auth: Login successful for:", email);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),

    Google({
      clientId:process.env.Client_ID as string,
      clientSecret:process.env.Client_Secret as string
    })

  ],
  callbacks: {

    async signIn({user,account}: {user: {name?: string; email?: string; image?: string; id?: string}; account: any}){
      if(account?.provider==="google"){
        try{
          await dbConnect();
          const existingUser=await User.findOne({email:user.email});
          if(!existingUser){
           const existingUser=await User.create({
              name:user.name,
              email:user?.email,
              
           })

           user.id=existingUser._id.toString();

           
          } 
          return true;
        }catch(error){
          console.error("Google sign-in error:",error);
          return false;
        }
      }
      return true;
    },

    // Ensure JWT and session reflect updates from `useSession().update(...)`
    async jwt({
      token,
      user,
      trigger,
      session
    }: {
      token: JWT;
      user?: any;
      trigger?: "signIn" | "update";
      session?: any;
    }) {
      // On initial sign-in, copy data from user into the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      // When `useSession().update()` is called, merge the new values into the token
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name;
        if (session.email !== undefined) token.email = session.email;
        if (session.image !== undefined) token.image = session.image;
      }

      return token;
    },

    session: sessionCallback,
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
}
export { authOptions };



