"use client";

import { useSession, signOut, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User, LogOut, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
            router.push("/signin");
        }
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session, isPending, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }
        setUpdating(true);
        try {
            const res = await updateUser({ name: name.trim() });
            if (res?.error) {
                toast.error(res.error.message || "আপডেট ব্যর্থ হয়েছে");
            } else {
                toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
            }
        } catch {
            toast.error("আপডেট ব্যর্থ হয়েছে");
        } finally {
            setUpdating(false);
        }
    };

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
            <h1 className="text-2xl font-bold text-gray-800 mb-1">আমার প্রোফাইল</h1>
            <p className="text-sm text-gray-500 mb-8">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

            {/* User Info Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    <LogOut className="w-4 h-4" />
                    সাইন আউট
                </button>
            </div>

            {/* Update Info Form */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-semibold text-gray-800 mb-4">তথ্য</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            নাম
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                            placeholder="আপনার নাম লিখুন"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
}
