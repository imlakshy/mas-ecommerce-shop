import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Más - Luxury Redefined",
  description: "Más - Luxury Redefined: Exclusive, premium shopping for discerning tastes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AuthProvider>
        {children}
        <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
