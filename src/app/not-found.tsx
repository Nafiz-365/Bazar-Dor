import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="text-7xl mb-6">🔍</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">৪০৪</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                পৃষ্ঠাটি পাওয়া যায়নি
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
                আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
                অনুগ্রহ করে হোম পেজে ফিরে যান।
            </p>
            <Link
                href="/"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}
