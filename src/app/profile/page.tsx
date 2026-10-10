"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, LogOut, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
            router.push("/signin");
        }
    }, [session, isPending, router]);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("সাইন আউট সফল হয়েছে");
            router.push("/");
        } catch {
            toast.error("সাইন আউট ব্যর্থ হয়েছে");
        }
    };

    if (isPending) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
                <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
                আমার প্রোফাইল
            </h1>
            <p className="text-sm text-gray-500 mb-8">
                আপনার অ্যাকাউন্টের বিবরণ ও সেটিংস।
            </p>

            {/* User Info Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden shrink-0">
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-8 h-8 text-green-600" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-lg">
                                {session.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {session.user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        সাইন আউট
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-gray-800 text-sm">
                            ব্যক্তিগত তথ্য আপডেট
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            আপনার নাম ও প্রোফাইলের তথ্য পরিবর্তন করুন
                        </p>
                    </div>
                    {/* C3: Update Information button linking to /profile/update */}
                    <Link
                        href="/profile/update"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-lg text-sm font-medium transition"
                    >
                        <Edit3 className="w-4 h-4" />
                        তথ্য আপডেট করুন
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
