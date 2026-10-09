import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
    weight: ["400", "500", "600", "700"],
    variable: "--font-hind-siliguri",
    subsets: ["latin", "bengali"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    description:
        "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক দাম ও পরিবর্তন",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${hindSiliguri.className} h-full antialiased`}
        >
            <body className="font-bengali bg-gray-50 min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
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
