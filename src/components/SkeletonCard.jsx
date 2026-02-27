import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw] h-[60vh] flex-shrink-0 perspective-1000">
            {/* Skeleton Card Content */}
            <div className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-3xl border-[3px] border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-pulse">

                {/* Skeleton Media Area */}
                <div className="relative h-[55%] overflow-hidden bg-gradient-to-br from-zinc-900/50 to-zinc-800/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                    {/* Skeleton Tags */}
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <div className="w-16 h-6 bg-white/10 rounded-full" />
                        <div className="w-20 h-6 bg-white/10 rounded-full" />
                    </div>
                </div>

                {/* Skeleton Text Content */}
                <div className="p-8 flex flex-col flex-1 relative z-20 space-y-4">
                    {/* Title Skeleton */}
                    <div className="space-y-3">
                        <div className="h-8 bg-white/10 rounded-lg w-3/4" />
                        <div className="h-8 bg-white/10 rounded-lg w-1/2" />
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="flex-1 h-12 bg-white/10 rounded-xl" />
                        <div className="flex-1 h-12 bg-purple-600/30 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
