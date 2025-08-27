import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from "@/scripts/Bootstrap";
import {UserProvider} from "@/contexts/UserContext";
export const metadata: Metadata = {
  title: "Construction Project Management App",
  description: "Construction Project Management App",
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
      </body>
    </html>
  );
}
