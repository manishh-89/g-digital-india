'use client'

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import FloatingActions from "./components/FloatingActions/FloatingActions";
import { EnquiryProvider } from "./context/EnquiryContext";
import "./globals.css"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdmin]);

  return (
    <html lang="en">
      <head>
        <title>G Digital India</title>
        <link rel="icon" href="/images/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <EnquiryProvider>
          {!isAdmin && <Navbar />}
          {children}
          {!isAdmin && <FloatingActions />}
          {!isAdmin && <Footer />}
        </EnquiryProvider>
      </body>
    </html>
  );
}