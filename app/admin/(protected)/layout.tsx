import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return <AdminShell email={session.user.email ?? ''}>{children}</AdminShell>
}
