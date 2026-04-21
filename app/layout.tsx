'use client'

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import "./globals.css"
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <FloatingActions />}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}