"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Lock, Loader2, Eye, EyeOff, ShoppingCart, ArrowLeft } from "lucide-react";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!name.trim()) {
            setErrorMsg("আপনার পুরো নাম লিখুন");
            return;
        }

        if (!email.trim()) {
            setErrorMsg("আপনার ইমেইল ঠিকানা লিখুন");
            return;
        }

        if (password.length < 8) {
            const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
            setErrorMsg(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        try {
            const res = await signUp.email({ name: name.trim(), email: email.trim(), password });
            if (res?.error) {
                const msg = res.error.message || "রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি";
                setErrorMsg(msg);
                toast.error(msg);
            } else {
                toast.success("স্বাগতম! অ্যাকাউন্ট তৈরি হয়েছে।");
                router.push("/");
                router.refresh();
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "রেজিস্ট্রেশন ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।";
            setErrorMsg(msg);
            toast.error(msg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = async (provider: "google" | "github") => {
        setErrorMsg(null);
        setSocialLoading(provider);
        try {
            const res = await signIn.social({ provider, callbackURL: "/" });
            if (res?.error) {
                const msg = `${provider === "google" ? "গুগল" : "গিটহাব"} দিয়ে সাইন আপ করতে সমস্যা হয়েছে`;
                setErrorMsg(msg);
                toast.error(msg);
            }
        } catch {
            const msg = `${provider === "google" ? "Google" : "GitHub"} সাইন আপ বর্তমানে কনফিগার করা নেই। দয়া করে ফর্ম পূরণ করে রেজিস্টার করুন।`;
            setErrorMsg(msg);
            toast.error(msg);
        } finally {
            setSocialLoading(null);
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-10 bg-linear-to-b from-emerald-50/40 via-white to-gray-50/60">
            <div className="w-full max-w-md">
                {/* Back Link */}
                <div className="mb-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-700 transition font-medium"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 relative overflow-hidden">
                    {/* Top Decorative Header */}
                    <div className="text-center mb-7">
                        <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-green-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-green-600/20 group-hover:scale-105 transition">
                                <ShoppingCart className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-xl text-gray-900 tracking-tight">
                                বাজার দর
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            অ্যাকাউন্ট তৈরি করুন
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                            সম্পূর্ণ বিনামূল্যে সাইন আপ করে বাজার মনিটরিং শুরু করুন
                        </p>
                    </div>

                    {/* Inline Error Message */}
                    {errorMsg && (
                        <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 text-red-600 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-200">
                            <span className="shrink-0 font-bold text-sm leading-none mt-0.5">⚠️</span>
                            <span className="leading-relaxed">{errorMsg}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                                আপনার নাম (Name)
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition placeholder:text-gray-400"
                                    placeholder="যেমন: রহিম উদ্দিন"
                                    required
                                    minLength={2}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                                ইমেইল ঠিকানা
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition placeholder:text-gray-400"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold text-gray-700">
                                    পাসওয়ার্ড
                                </label>
                                <span className="text-[11px] text-gray-400">
                                    কমপক্ষে ৮ অক্ষর
                                </span>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-11 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-sm transition placeholder:text-gray-400"
                                    placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-0.5"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl transition font-semibold text-sm shadow-md shadow-green-600/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                                </>
                            ) : (
                                <span>অ্যাকাউন্ট তৈরি করুন</span>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-100"></div>
                        <span className="px-3 text-xs text-gray-400 font-medium">
                            অথবা সোশ্যাল মিডিয়া
                        </span>
                        <div className="flex-1 h-px bg-gray-100"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleSocial("google")}
                            disabled={socialLoading === "google"}
                            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 py-2.5 rounded-xl transition text-xs font-semibold text-gray-700 disabled:opacity-60 cursor-pointer shadow-xs"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocial("github")}
                            disabled={socialLoading === "github"}
                            className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 py-2.5 rounded-xl transition text-xs font-semibold text-gray-700 disabled:opacity-60 cursor-pointer shadow-xs"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {/* Footer Toggle */}
                    <div className="mt-8 text-center text-xs text-gray-500">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="text-green-600 font-bold hover:text-green-700 transition"
                        >
                            সাইন ইন করুন
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
