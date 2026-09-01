"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogout } from "@/app/admin/actions"
import { EventsManager } from "./events-manager"
import { PublicationsManager } from "./publications-manager"
import { PagesManager } from "./pages-manager"
import { TeamMembersManager } from "./team-members-manager"
import { PartnersManager } from "./partners-manager"
import { CandidaturesManager } from "./candidatures-manager"
import { CalendarDays, FileText, LogOut, Users, FileJson, Handshake, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "events" | "publications" | "pages" | "team" | "partners" | "candidatures"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("events")
  const router = useRouter()

  async function handleLogout() {
    await adminLogout()
    router.push("/admin/login")
    router.refresh()
  }

  const tabs = [
    { id: "events", label: "Événements", icon: CalendarDays },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "pages", label: "Pages", icon: FileJson },
    { id: "team", label: "Équipe", icon: Users },
    { id: "partners", label: "Partenaires", icon: Handshake },
    { id: "candidatures", label: "Candidatures", icon: ClipboardList },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">Admin</h1>
            <span className="text-sm text-muted-foreground">Aix Finance Club</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Deconnexion
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap",
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "events" && <EventsManager />}
        {activeTab === "publications" && <PublicationsManager />}
        {activeTab === "pages" && <PagesManager />}
        {activeTab === "team" && <TeamMembersManager />}
        {activeTab === "partners" && <PartnersManager />}
        {activeTab === "candidatures" && <CandidaturesManager />}
      </div>
    </div>
  )
}
