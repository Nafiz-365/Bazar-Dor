export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">বাজার দর</span>{" "}
                    — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-xs text-gray-400 text-center sm:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত
                    হয়।
                </p>
            </div>
        </footer>
    );
}
