import type { Metadata } from 'next'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Admin Login | PulsePoint Clinic' }

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="rounded bg-white px-3 py-2">
            <Image src="/assets/logo.png" alt="PulsePoint Clinic" width={160} height={40} className="h-10 w-auto" />
          </div>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-xl">
          <h1 className="mb-1 font-display text-[1.4rem] font-bold text-charcoal">Admin Access</h1>
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
