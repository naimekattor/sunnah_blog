import type { Metadata } from "next";
import Providers from "@/components/Providers";
// @ts-expect-error: Allow side-effect import of global CSS without type declarations
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog Platform",
  description: "Blog with Admin Approval System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <ToastContainer />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
