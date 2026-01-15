
import "./globals.css";
import { Poppins } from "next/font/google";

import NavBar from "./NavBar/page";

const poppins= Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});


export const metadata = {
  title: "Your Travel Guide",
  description: "Explore the world with our comprehensive travel guide website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
