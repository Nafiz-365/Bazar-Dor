"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);
        try {
            const res = await signIn.email({ email, password });
            if (res?.error) {
                const msg = res.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
                setErrorMsg(msg);
                toast.error(msg);
            } else {
                toast.success("সাইন ইন সফল হয়েছে");
                router.push("/");
                router.refresh();
            }
        } catch (err: any) {
            const msg = err?.message || "সাইন ইন ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।";
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
                const msg = `${provider === "google" ? "গুগল" : "গিটহাব"} দিয়ে সাইন ইন করতে সমস্যা হয়েছে। অনুগ্রহ করে পরিবেশ ভেরিয়েবল (Client ID/Secret) চেক করুন।`;
                setErrorMsg(msg);
                toast.error(msg);
            }
        } catch (err: any) {
            const msg = `${provider === "google" ? "Google" : "GitHub"} সাইন ইন বর্তমানে কনফিগার করা নেই। দয়া করে ইমেইল/পাসওয়ার্ড দিয়ে সাইন ইন করুন।`;
            setErrorMsg(msg);
            toast.error(msg);
        } finally {
            setSocialLoading(null);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    সাইন ইন
                </h1>
                <p className="text-sm text-gray-500 text-center mt-1">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে
                    ঢুকুন।
                </p>

                {errorMsg && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            ইমেইল
                        </label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        {loading ? "লোড হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-3 text-xs text-gray-400">অথবা</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={() => handleSocial("google")}
                        disabled={socialLoading === "google"}
                        className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700 disabled:opacity-60"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        onClick={() => handleSocial("github")}
                        disabled={socialLoading === "github"}
                        className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700 disabled:opacity-60"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="text-center text-sm mt-6 text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="text-green-600 font-medium hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
                <p className="text-center text-sm mt-3">
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </div>
    );
}
