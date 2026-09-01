import type { Metadata } from 'next'
import AdminLogo from '@/components/admin/AdminLogo'
import AdminResetPasswordForm from '@/components/admin/AdminResetPasswordForm'

export const metadata: Metadata = { title: 'Reset Password | PulsePoint Clinic' }

export default function AdminResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <AdminLogo size="lg" href="/" className="rounded-md bg-white px-4 py-3 shadow-sm" />
        </div>
        <div className="rounded-lg bg-white p-6 shadow-xl sm:p-8">
          <h1 className="mb-1 font-display text-[1.25rem] font-bold text-charcoal sm:text-[1.4rem]">
            Set a new password
          </h1>
          <p className="mb-6 text-[.85rem] text-muted">
            Choose a new password for the PulsePoint admin dashboard.
          </p>
          <AdminResetPasswordForm />
        </div>
      </div>
    </div>
  )
}
