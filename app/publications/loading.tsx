import { Navigation } from "@/components/navigation"

export default function PublicationsLoading() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Skeleton */}
        <div className="pt-20">
          <div className="relative min-h-[70vh] sm:min-h-[80vh] bg-secondary/30 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="relative z-10 w-full h-full flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 w-full">
                <div className="max-w-3xl">
                  <div className="flex gap-3 mb-6">
                    <div className="h-8 bg-secondary rounded-full w-24" />
                    <div className="h-8 bg-secondary rounded-full w-32" />
                  </div>
                  <div className="h-16 bg-secondary rounded w-3/4 mb-6" />
                  <div className="h-6 bg-secondary rounded w-1/2 mb-8" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-secondary rounded w-20" />
                    <div className="h-4 bg-secondary rounded w-24" />
                    <div className="h-4 bg-secondary rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="h-3 bg-secondary rounded w-16 mb-2" />
                <div className="h-10 bg-secondary rounded w-48" />
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-secondary rounded-full w-32" />
                <div className="h-10 bg-secondary rounded-full w-40" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-secondary" />
                  <div className="p-6">
                    <div className="h-3 bg-secondary rounded w-20 mb-3" />
                    <div className="h-6 bg-secondary rounded w-3/4 mb-3" />
                    <div className="h-4 bg-secondary rounded w-full mb-4" />
                    <div className="flex gap-3">
                      <div className="h-3 bg-secondary rounded w-16" />
                      <div className="h-3 bg-secondary rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
