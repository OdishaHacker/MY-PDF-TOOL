'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function ToolPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Back button + Title area */}
      <div className="pt-4 mb-8">
        <div className="flex items-center gap-3">
          {/* Back button skeleton */}
          <Skeleton className="h-9 w-20 rounded-xl" />
          {/* Icon skeleton */}
          <Skeleton className="h-9 w-9 rounded-lg" />
          {/* Title skeleton */}
          <Skeleton className="h-8 w-48" />
        </div>
        {/* Description skeleton */}
        <div className="mt-2 ml-[52px] space-y-1.5">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Dropzone skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-56 w-full rounded-xl" />
        {/* Button skeleton */}
        <Skeleton className="h-11 w-40 rounded-lg" />
      </div>
    </div>
  )
}
