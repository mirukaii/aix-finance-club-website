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
        {/* Hero */}
        <section className="min-h-[40vh] sm:min-h-[50vh] flex items-center px-4 sm:px-6 lg:px-8 bg-background pt-20">
          <div className="w-full max-w-5xl mx-auto py-16 sm:py-24">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4 sm:mb-6 block">
              L&apos;équipe
            </span>
            <h1 className="font-serif font-medium text-foreground mb-6 sm:mb-8">
              Notre équipe
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light">
              Une équipe passionnée et engagée pour faire vivre l&apos;association et développer vos compétences en finance.
            </p>
          </div>
        </section>

        {/* Bureau */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="w-full max-w-7xl mx-auto">
            <div className="mb-10 sm:mb-16">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-3 sm:mb-4 block">
                Direction
              </span>
              <h2 className="font-serif font-medium text-foreground">Bureau Exécutif</h2>
            </div>

            {/* President Card - Featured (if exists) */}
            {presidentMember && (
              <div className="flex justify-center mb-12 sm:mb-20">
                <div className="group text-center max-w-sm">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden ring-4 ring-background shadow-2xl bg-secondary flex items-center justify-center">
                      {presidentMember.photo_url ? (
                        <img
                          src={presidentMember.photo_url}
                          alt={`${presidentMember.first_name} ${presidentMember.last_name}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl sm:text-5xl font-bold text-accent">
                          {getInitials(presidentMember.first_name, presidentMember.last_name)}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
                    {presidentMember.first_name} {presidentMember.last_name}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{presidentMember.role}</p>
                  {presidentMember.linkedin_url && (
                    <a
                      href={presidentMember.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors group/link"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Bureau Members - Simple grid */}
            {bureauMembers.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                {bureauMembers.map((member) => (
                  <div key={member.id} className="group text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden bg-secondary ring-2 ring-background flex items-center justify-center">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={`${member.first_name} ${member.last_name}`}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-2xl sm:text-3xl font-bold text-accent">
                            {getInitials(member.first_name, member.last_name)}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                      {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{member.role}</p>
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium text-foreground hover:text-muted-foreground transition-colors group/link"
                      >
                        <Linkedin className="h-3 w-3" />
                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">LinkedIn</span>
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
