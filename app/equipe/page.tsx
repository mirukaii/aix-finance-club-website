import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Linkedin, ArrowUpRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

interface TeamMember {
  id: string
  first_name: string
  last_name: string
  role: string
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

export default async function EquipePage() {
  const supabase = await createClient()
  const { data: members = [] } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true })

  const allMembers = (members as TeamMember[]) || []
  
  // Separate president (display_order = 0) from bureau members
  const presidentMember = allMembers.find((m) => m.display_order === 0)
  const bureauMembers = allMembers.filter((m) => m.display_order > 0)

  return (
    <>
      <Navigation />
      <main>
        {/* Hero - Premium */}
        <section className="min-h-[45vh] sm:min-h-[55vh] flex items-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] pt-24 sm:pt-28 relative overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-accent/[0.03] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[30vw] max-w-[400px] h-[30vw] max-h-[400px] bg-accent/[0.02] rounded-full blur-[80px]" />
          </div>
          
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-5 sm:mb-7 block">
              L&apos;équipe
            </span>
            <h1 className="font-serif font-medium text-white mb-7 sm:mb-9">
              Notre équipe
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/40 leading-relaxed max-w-3xl font-light">
              Une équipe passionnée et engagée pour faire vivre l&apos;association et développer vos compétences en finance.
            </p>
          </div>
        </section>

        {/* Bureau - Premium */}
        <section className="py-24 sm:py-32 lg:py-44 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          
          <div className="w-full max-w-7xl mx-auto">
            <div className="mb-14 sm:mb-20">
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase text-accent mb-4 sm:mb-5 block">
                Direction
              </span>
              <h2 className="font-serif font-medium text-white">Bureau Exécutif</h2>
            </div>

            {/* President Card - Featured (if exists) */}
            {presidentMember && (
              <div className="flex justify-center mb-16 sm:mb-24">
                <div className="group text-center max-w-sm">
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden ring-2 ring-white/[0.06] shadow-2xl shadow-black/50 bg-white/[0.02] flex items-center justify-center">
                      {presidentMember.photo_url ? (
                        <img
                          src={presidentMember.photo_url}
                          alt={`${presidentMember.first_name} ${presidentMember.last_name}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <span className="text-4xl sm:text-5xl font-bold text-accent/60">
                          {getInitials(presidentMember.first_name, presidentMember.last_name)}
                        </span>
                      )}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {presidentMember.first_name} {presidentMember.last_name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/40 mb-5 sm:mb-7">{presidentMember.role}</p>
                  {presidentMember.linkedin_url && (
                    <a
                      href={presidentMember.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase text-white/60 hover:text-white hover:border-white/10 hover:bg-white/[0.06] transition-all duration-300 group/link"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Bureau Members - Premium grid */}
            {bureauMembers.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                {bureauMembers.map((member) => (
                  <div key={member.id} className="group text-center">
                    <div className="relative mb-5 sm:mb-7">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden bg-white/[0.02] ring-1 ring-white/[0.06] flex items-center justify-center group-hover:ring-accent/30 transition-all duration-500">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={`${member.first_name} ${member.last_name}`}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <span className="text-2xl sm:text-3xl font-bold text-accent/50">
                            {getInitials(member.first_name, member.last_name)}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                      {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-[11px] sm:text-[13px] text-white/35 mb-4 sm:mb-5 line-clamp-2">{member.role}</p>
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-white/40 hover:text-accent transition-colors duration-300 group/link"
                      >
                        <Linkedin className="h-3 w-3" />
                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">LinkedIn</span>
                      </a>
                    )}
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
