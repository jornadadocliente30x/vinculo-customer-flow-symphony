
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function SkeletonLoader({ className, children }: SkeletonLoaderProps) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
        "animate-shimmer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <SkeletonLoader className="h-4 w-32" />
        <SkeletonLoader className="h-5 w-5 rounded-full" />
      </div>
      <SkeletonLoader className="h-8 w-20 mb-2" />
      <SkeletonLoader className="h-3 w-24 mb-4" />
      <div className="flex items-end space-x-1 h-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonLoader 
            key={i}
            className="flex-1 min-w-[2px]"
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft">
      <SkeletonLoader className="h-6 w-40 mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <SkeletonLoader className="h-12 w-12 rounded-lg" />
            <div className="flex-1">
              <SkeletonLoader className="h-4 w-32 mb-2" />
              <SkeletonLoader className="h-3 w-24" />
            </div>
            <SkeletonLoader className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
