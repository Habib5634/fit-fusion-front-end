import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fit Fusion",
  description: "Fitness Guidence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className="font-serif">
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
