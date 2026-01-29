import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


const PUBLIC_ROUtES=[
    "/login",
    "/register",
    "/favicon.ico",
    "/_next",
    "/next"

]


export default async function proxy(req:NextRequest){

    const {pathname}=req.nextUrl;

    if(PUBLIC_ROUtES.includes(pathname) || pathname.startsWith("/api/auth") || pathname.startsWith("/_next") || pathname.startsWith("/public")){

        return NextResponse.next();
    }

    const token= await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET,
    })

    if(!token){
        return NextResponse.redirect(
  new URL(`/login?callbackUrl=${pathname}`, req.url)
);

       
    }

    return NextResponse.next();




}

export const config={
    matcher:"/((?!api/auth|_next/static|_next/image|favicon.ico).*)",



    }

