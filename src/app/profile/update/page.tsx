"use client";

import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, User } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [name, setName] = useState(() => session?.user?.name ?? "");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            toast.error("তথ্য পরিবর্তন করতে সাইন ইন করুন");
            router.push("/signin");
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
            // Better-auth update user
            const res = await updateUser({ name: name.trim() });
            if (res?.error) {
                toast.error(res.error.message || "আপডেট ব্যর্থ হয়েছে");
            } else {
                toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
                router.push("/profile");
                router.refresh();
            }
        } catch {
            toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setUpdating(false);
        }
    };

    if (isPending) {
        return (
            <div className="max-w-xl mx-auto px-4 py-12">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition"
            >
                <ArrowLeft className="w-4 h-4" />
                প্রোফাইলে ফিরে যান
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            তথ্য আপডেট করুন
                        </h1>
                        <p className="text-xs text-gray-500">
                            আপনার পরিবর্তিত নামটি এখানে লিখুন
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">
                            নাম (Name)
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:border-green-500 text-sm"
                                placeholder="আপনার পূর্ণ নাম লিখুন"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500 block mb-1.5">
                            ইমেইল (পরিবর্তনযোগ্য নয়)
                        </label>
                        <input
                            type="email"
                            value={session.user.email}
                            disabled
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Link
                            href="/profile"
                            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center"
                        >
                            বাতিল
                        </Link>
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-60 flex items-center justify-center gap-2 text-sm cursor-pointer"
                        >
                            {updating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {updating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
