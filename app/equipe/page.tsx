import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { getTeamMembers, type TeamMemberItem } from "@/lib/public-data"

export const revalidate = 60

function initials(m: TeamMemberItem) {
  return `${m.first_name?.[0] || ""}${m.last_name?.[0] || ""}`.toUpperCase()
}

function Photo({ m, className }: { m: TeamMemberItem; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#e8e4da] ${className}`}>
      {m.photo_url ? (
        <img src={m.photo_url} alt={`${m.first_name} ${m.last_name}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 20%" }} />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-[#6b6b66]">{initials(m)}</span>
      )}
    </div>
  )
}

export default async function EquipePage() {
  const members = await getTeamMembers()
  const president = members.find((m) => m.display_order === 0)
  const others = members.filter((m) => m.id !== president?.id)

  return (
    <>
      <Navigation />
      <main className="bg-[#f6f4ef] text-[#141414]">
        <PageHeader label="L'équipe" title="Notre équipe" intro="Une équipe passionnée et engagée pour faire vivre l'association et développer vos compétences en finance." />

        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-end justify-between border-b border-[#141414] pb-3">
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Bureau exécutif</h2>
              {members.length > 0 && <p className="text-xs uppercase tracking-[0.15em] text-[#6b6b66]">{members.length} membres</p>}
            </div>

            {members.length === 0 && <p className="py-10 text-[#4a4a46]">Aucun membre à afficher pour le moment.</p>}

            {president && (
              <div className="grid grid-cols-1 gap-8 border-b border-[#dcd8cf] py-10 sm:py-14 lg:grid-cols-12 lg:gap-12">
                <Photo m={president} className="aspect-[4/5] lg:col-span-4" />
                <div className="flex flex-col justify-end lg:col-span-8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b6b66]">{president.role}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">{president.first_name} {president.last_name}</h3>
                  {president.linkedin_url && <Link href={president.linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-6 text-xs uppercase tracking-[0.15em] underline decoration-[#141414]/30 underline-offset-4 hover:decoration-[#141414]">LinkedIn →</Link>}
                </div>
              </div>
            )}

            {others.length > 0 && (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 pt-10 sm:pt-14 md:grid-cols-3 lg:grid-cols-4">
                {others.map((m) => (
                  <div key={m.id}>
                    <Photo m={m} className="aspect-[4/5]" />
                    <h3 className="mt-4 font-serif text-xl leading-snug">{m.first_name} {m.last_name}</h3>
                    <p className="mt-1 text-sm text-[#6b6b66]">{m.role}</p>
                    {m.linkedin_url && <Link href={m.linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[11px] uppercase tracking-[0.15em] underline decoration-[#141414]/30 underline-offset-4 hover:decoration-[#141414]">LinkedIn →</Link>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
