export default function Loading() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Chargement de l'événement...</p>
      </div>
    </div>
  )
}
