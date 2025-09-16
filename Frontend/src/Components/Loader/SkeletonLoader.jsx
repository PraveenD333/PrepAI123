import React from 'react'

const SkeletonLoader = () => {
  return ( 
    <>
      <div role="status" className="space-y-4 max-w-3xl overflow-hidden">
        <div className="h-6 rounded-md w-1/2 animate-shimmer"></div>

        <div className="space-y-2">
          <div className="h-3 rounded w-full animate-shimmer"></div>
          <div className="h-3 rounded w-11/12 animate-shimmer"></div>
          <div className="h-3 rounded w-10/12 animate-shimmer"></div>
          <div className="h-3 rounded w-9/12 animate-shimmer"></div>
        </div>

        <div className="rounded p-4 space-y-2">
          <div className="h-2.5 rounded w-3/4 animate-shimmer"></div>
          <div className="h-2.5 rounded w-2/3 animate-shimmer"></div>
          <div className="h-2.5 rounded w-1/2 animate-shimmer"></div>
        </div>
      </div>

      <div role="status" className="space-y-4 max-w-3xl mt-10 overflow-hidden">
        <div className="h-4 rounded-md w-1/2 animate-shimmer"></div>

        <div className="space-y-2">
          <div className="h-3 rounded w-full animate-shimmer"></div>
          <div className="h-3 rounded w-11/12 animate-shimmer"></div>
          <div className="h-3 rounded w-10/12 animate-shimmer"></div>
          <div className="h-3 rounded w-9/12 animate-shimmer"></div>
        </div>

        <div className="space-y-2">
          <div className="h-3 rounded w-full animate-shimmer"></div>
          <div className="h-3 rounded w-11/12 animate-shimmer"></div>
          <div className="h-3 rounded w-10/12 animate-shimmer"></div>
          <div className="h-3 rounded w-9/12 animate-shimmer"></div>
        </div>

        <div className="rounded p-4 space-y-2">
          <div className="h-2.5 rounded w-3/4 animate-shimmer"></div>
          <div className="h-2.5 rounded w-2/3 animate-shimmer"></div>
        </div> 

        <div className="h-4 rounded-md w-1/2 mt-8 animate-shimmer"></div>

        <div className="space-y-2">
          <div className="h-3 rounded w-full animate-shimmer"></div>
          <div className="h-3 rounded w-11/12 animate-shimmer"></div>
          <div className="h-3 rounded w-10/12 animate-shimmer"></div>
          <div className="h-3 rounded w-9/12 animate-shimmer"></div>
        </div>
      </div>
    </>
  )
}

export default SkeletonLoader
