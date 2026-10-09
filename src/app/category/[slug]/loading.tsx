export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header skeleton */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-gray-100 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Sort bar skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 mb-5 h-14 animate-pulse"></div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-100 rounded-xl h-44 animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    );
}
