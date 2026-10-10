import React from "react";

const loading = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb skeleton */}
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>

            {/* Summary skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-gray-100 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mt-10 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-100 p-5 h-28 animate-pulse"
                    ></div>
                ))}
            </div>

            {/* Table skeleton */}
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mt-10 mb-4"></div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-full bg-gray-100 rounded animate-pulse"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default loading;
