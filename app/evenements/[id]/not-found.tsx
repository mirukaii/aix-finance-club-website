import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="flex min-h-screen items-center bg-[#f6f4ef] px-5 text-[#141414] sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1400px] pt-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">Erreur 404</p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">Événement introuvable</h1>
          <p className="mt-4 max-w-md text-[#4a4a46]">Cet événement n&apos;existe pas ou a été supprimé.</p>
          <Link href="/evenements" className="mt-8 inline-block border border-[#141414] px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#141414] hover:text-[#f6f4ef]">Retour aux événements</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
