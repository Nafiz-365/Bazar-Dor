import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/bazar-hero.png";

const getBengaliDate = (): string => {
    return new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
};

const Hero = () => {
    const todayDate = getBengaliDate();
    return (
        <section className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 md:p-12 mt-6 flex flex-col md:flex-row items-center gap-6 md:gap-50">
            {/* Left: Text */}
            <div className="flex-1 w-full">
                <span className="inline-block bg-green-100 text-green-900 text-xs font-light px-3 py-1 rounded-full mb-3 border border-green-200">
                    {todayDate}
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
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

            {/* Right: Hero Image */}
            <div className="w-48 sm:w-56 md:w-80 shrink-0">
                <Image
                    src={heroImage}
                    alt="Hero Image"
                    width={500}
                    height={500}
                    className="w-full h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default Hero;
