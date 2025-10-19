import Providers from "@/components/Providers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export const metadata = {
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
