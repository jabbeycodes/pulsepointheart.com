import type { Metadata } from 'next'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import AdminLogo from '@/components/admin/AdminLogo'

export const metadata: Metadata = { title: 'Admin Login | PulsePoint Clinic' }

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <AdminLogo size="lg" href="/" className="rounded-md bg-white px-4 py-3 shadow-sm" />
        </div>
        <div className="rounded-lg bg-white p-6 shadow-xl sm:p-8">
          <h1 className="mb-1 font-display text-[1.25rem] font-bold text-charcoal sm:text-[1.4rem]">
            Admin Access
          </h1>
          <p className="mb-6 text-[.85rem] text-muted">
            Enter your admin email and password to access the dashboard.
          </p>
          <AdminLoginForm />
        </div>
        <p className="mt-4 text-center text-[.75rem] text-white/40">
          PulsePoint Clinic &middot; Staff access only
        </p>
      </div>
    </div>
  )
}
