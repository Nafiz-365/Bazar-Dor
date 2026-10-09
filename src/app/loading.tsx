export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero skeleton */}
            <div className="bg-gray-100 rounded-2xl h-64 mt-6 animate-pulse"></div>

            {/* Risers skeleton */}
            <div className="mt-12">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-5"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 rounded-xl h-44 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>

            {/* Fallers skeleton */}
            <div className="mt-12">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-5"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 rounded-xl h-44 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>

            {/* All products skeleton */}
            <div className="mt-14">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-5"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 rounded-xl h-44 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
