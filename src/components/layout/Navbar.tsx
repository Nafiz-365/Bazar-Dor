"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [bengaliDate, setBengaliDate] = useState("");

    useEffect(() => {
        // 2. Safely compute the date after hydration in the browser
        const formattedDate = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
        const timeoutId = window.setTimeout(() => {
            setBengaliDate(formattedDate);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
            {/* Top Navbar Row */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
                {/* Logo & Bengali Date */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative flex size-11 items-center justify-center rounded-xl bg-emerald-600 shadow-sm text-white text-xl transition-transform group-hover:scale-105">
                        <span aria-hidden="true">🛒</span>
                    </div>
                    <div className="leading-tight">
                        <span className="block text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                            বাজার দর
                        </span>
                        <span className="block text-xs font-medium text-slate-500">
                            {bengaliDate || "লোড হচ্ছে..."}
                        </span>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
