"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, X, User } from "lucide-react";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";

const categories = [
    { slug: "chal", nameBn: "চাল", icon: "🍚" },
    { slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥚" },
    { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

const getBengaliDate = (): string => {
    const now = new Date();
    const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
    ];
    const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const toBn = (n: number) =>
        n.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);

    const day = days[now.getDay()];
    const date = toBn(now.getDate());
    const month = months[now.getMonth()];
    const year = toBn(now.getFullYear());
    return `${day}, ${date} ${month}, ${year}`;
};

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const todayDate = getBengaliDate();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট সফল হয়েছে");
            setUserMenuOpen(false);
            router.push("/");
        } catch {
            toast.error("সাইন আউট ব্যর্থ হয়েছে");
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 transform-gpu">
            {/* Top Row: Logo + Auth */}
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="বাজার দর - হোম পেজ"
                    className="group inline-flex items-center gap-3 rounded-xl outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4"
                >
                    {/* Logo Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-green-700 text-2xl shadow-sm transition-transform duration-200 group-hover:scale-105">
                        <span aria-hidden="true">🛒</span>
                    </div>

                    {/* Brand Information */}
                    <div className="flex flex-col">
                        <h1 className="text-lg font-extrabold leading-tight tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-green-700 sm:text-xl">
                            বাজার দর
                        </h1>

                        <p className="mt-1 text-xs font-light leading-tight text-gray-500">
                            {todayDate}
                        </p>
                    </div>
                </Link>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg"
                            >
                                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            width={36}
                                            height={36}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-green-600" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {session.user.name}
                                </span>
                            </button>

                            {/* Dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-2 z-50">
                                    <div className="px-3 py-2 border-b border-gray-100">
                                        <p className="font-semibold text-gray-800">
                                            {session.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {session.user.email}
                                        </p>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700"
                                    >
                                        <User className="w-4 h-4" /> আমার
                                        প্রোফাইল
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-lg text-sm text-red-500"
                                    >
                                        <LogOut className="w-4 h-4" /> সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/signin"
                                className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-1.5"
                            >
                                সাইন ইন
                            </Link>
                            <Link
                                href="/signup"
                                className="btn btn-sm bg-green-600 text-white hover:bg-green-700 border-none"
                            >
                                সাইন আপ
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <X className="w-5 h-5" />
                    ) : (
                        <Menu className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Category Links Row (Desktop) */}
            <nav className="hidden md:block bg-gray-50 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
                    {categories.map((cat) => {
                        const isActive = pathname === `/category/${cat.slug}`;
                        return (
                            <Link
                                key={cat.slug}
                                href={`/category/${cat.slug}`}
                                prefetch={true}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors duration-150 ${
                                    isActive
                                        ? "bg-green-600 text-white font-medium"
                                        : "text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameBn}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    {/* Category links */}
                    <div className="px-4 py-3 flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const isActive =
                                pathname === `/category/${cat.slug}`;
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/category/${cat.slug}`}
                                    prefetch={true}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-150 ${
                                        isActive
                                            ? "bg-green-600 text-white font-medium"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.nameBn}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth buttons */}
                    <div className="border-t border-gray-100 px-4 py-3">
                        {session ? (
                            <div className="space-y-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-700"
                                >
                                    <User className="w-4 h-4" /> আমার প্রোফাইল
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-500"
                                >
                                    <LogOut className="w-4 h-4" /> সাইন আউট
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    href="/signin"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-gray-700 text-sm"
                                >
                                    সাইন ইন
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex-1 text-center py-2 rounded-lg bg-green-600 text-white text-sm"
                                >
                                    সাইন আপ
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
