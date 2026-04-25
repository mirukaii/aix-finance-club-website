export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <section className="relative h-[60vh] min-h-[400px] bg-secondary/30 animate-pulse" />

      {/* Events grid skeleton */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-12 space-y-4">
            <div className="h-4 bg-secondary rounded w-20 animate-pulse" />
            <div className="h-10 bg-secondary rounded w-1/3 animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-6 p-8 bg-background rounded-xl border border-border/50 animate-pulse">
                <div className="w-2/5 aspect-video bg-secondary rounded-lg" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-secondary rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded w-1/2" />
                    <div className="h-4 bg-secondary rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
