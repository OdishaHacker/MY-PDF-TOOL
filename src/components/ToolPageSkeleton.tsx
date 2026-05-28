'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function ToolPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Back button skeleton - alone on its own row */}
      <div className="pt-4 mb-6">
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>

      {/* Tool name + logo skeleton - below back button */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
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
