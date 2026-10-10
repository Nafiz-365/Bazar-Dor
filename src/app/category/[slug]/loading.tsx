export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-[60vh]">
            {/* Header skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0"></div>
                <div className="space-y-2 flex-1">
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-48 bg-gray-100 rounded"></div>
                </div>
            </div>

            {/* Sort bar skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 mb-5 flex items-center justify-between animate-pulse">
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
                <div className="h-8 w-28 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-100 p-4 h-48 animate-pulse flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                            <div className="w-14 h-5 bg-gray-100 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-1/3 bg-gray-100 rounded" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-3 w-16 bg-gray-100 rounded" />
                            <div className="h-6 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
