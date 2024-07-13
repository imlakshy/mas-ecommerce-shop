import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Más - Luxury Redefined",
  description: "Más - Luxury Redefined: Exclusive, premium shopping for discerning tastes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
