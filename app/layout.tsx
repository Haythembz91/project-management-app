import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from "@/scripts/Bootstrap";
import {UserProvider} from "@/contexts/UserContext";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Project Management App",
  description: "Project Management App",
  icons:{
    icon:"https://res.cloudinary.com/dmgfsayir/image/upload/v1770070255/ChatGPT_Image_Feb_2_2026_11_06_15_PM-modified_pioxta.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Bootstrap></Bootstrap>
          <Header></Header>
          <main>
            {children}
          </main>
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
