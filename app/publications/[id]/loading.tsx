import { Navigation } from "@/components/navigation"

export default function PublicationDetailLoading() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <div className="relative min-h-[50vh] sm:min-h-[60vh] bg-secondary/30 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="relative z-10 w-full h-full flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32 w-full">
              <div className="h-4 bg-secondary rounded w-32 mb-4" />
              <div className="h-12 bg-secondary rounded w-3/4 mb-4" />
              <div className="h-6 bg-secondary rounded w-1/2" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="space-y-4">
            <div className="h-6 bg-secondary/50 rounded w-full" />
            <div className="h-6 bg-secondary/50 rounded w-5/6" />
            <div className="h-6 bg-secondary/50 rounded w-4/5" />
            <div className="h-6 bg-secondary/50 rounded w-full" />
            <div className="h-6 bg-secondary/50 rounded w-3/4" />
          </div>
        </div>
      </main>
    </>
  )
}
