import Link from "next/link";

function getBengaliDate(): string {
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
        n
            .toString()
            .replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);

    const day = days[now.getDay()];
    const date = toBn(now.getDate());
    const month = months[now.getMonth()];
    const year = toBn(now.getFullYear());
    return `${day}, ${date} ${month}, ${year}`;
}

export default function Hero() {
    const todayDate = getBengaliDate();
    return (
        <section className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-8">
            {/* Left: Text */}
            <div className="flex-1 w-full">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {todayDate}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
                    পরিবর্তন এক জায়গায়।
                </p>

                <Link
                    href="#সব-পণ্য"
                    className="inline-block bg-green-600 text-white hover:bg-green-700 font-medium px-5 py-2.5 rounded-lg mt-6 transition"
                >
                    সব পণ্য দেখুন
                </Link>
            </div>

            {/* Right: Illustration */}
            <div className="w-48 md:w-64 shrink-0">
                <svg
                    viewBox="0 0 300 250"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    {/* Basket */}
                    <path
                        d="M60 130 L240 130 L220 230 L80 230 Z"
                        fill="#8B5A2B"
                        stroke="#5D3A1A"
                        strokeWidth="2"
                    />
                    <rect
                        x="55"
                        y="120"
                        width="190"
                        height="20"
                        rx="4"
                        fill="#A0522D"
                        stroke="#5D3A1A"
                        strokeWidth="2"
                    />
                    {/* Basket lines */}
                    <line
                        x1="90"
                        y1="130"
                        x2="85"
                        y2="230"
                        stroke="#5D3A1A"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />
                    <line
                        x1="120"
                        y1="130"
                        x2="115"
                        y2="230"
                        stroke="#5D3A1A"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />
                    <line
                        x1="150"
                        y1="130"
                        x2="150"
                        y2="230"
                        stroke="#5D3A1A"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />
                    <line
                        x1="180"
                        y1="130"
                        x2="185"
                        y2="230"
                        stroke="#5D3A1A"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />
                    <line
                        x1="210"
                        y1="130"
                        x2="215"
                        y2="230"
                        stroke="#5D3A1A"
                        strokeWidth="1.5"
                        opacity="0.5"
                    />

                    {/* Fruits/Vegetables */}
                    {/* Tomato - red */}
                    <circle cx="115" cy="100" r="24" fill="#EF4444" />
                    <path
                        d="M115 78 Q118 70 125 72"
                        stroke="#16A34A"
                        strokeWidth="3"
                        fill="none"
                    />

                    {/* Green apple */}
                    <circle cx="180" cy="90" r="28" fill="#22C55E" />
                    <path
                        d="M180 62 L182 68 M180 62 L178 68"
                        stroke="#166534"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Orange */}
                    <circle cx="155" cy="115" r="20" fill="#F97316" />
                    <circle cx="152" cy="110" r="2" fill="#EA580C" />
                    <circle cx="160" cy="118" r="2" fill="#EA580C" />

                    {/* Purple fruit (eggplant/brinjal) */}
                    <ellipse
                        cx="95"
                        cy="115"
                        rx="15"
                        ry="20"
                        fill="#A855F7"
                        transform="rotate(-20 95 115)"
                    />

                    {/* Yellow-orange fruit */}
                    <circle cx="215" cy="110" r="18" fill="#FB923C" />
                </svg>
            </div>
        </section>
    );
}
