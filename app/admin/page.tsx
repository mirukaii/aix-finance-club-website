import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "./actions"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) redirect("/admin/login")

  return <AdminDashboard />
}
