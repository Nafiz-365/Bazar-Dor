import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-bengali",
    subsets: ["bengali", "latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    description:
        "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম ও পরিবর্তন",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bn" data-theme="light" className={hindSiliguri.variable}>
            <body className="font-bengali bg-gray-50 text-gray-900 min-h-screen flex flex-col">
                {/* Navbar */}
                <Navbar />
                {/* Price Ticker */}
                <PriceTicker />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            fontFamily: "var(--font-bengali)",
                        },
                    }}
                />
            </body>
        </html>
    );
}
