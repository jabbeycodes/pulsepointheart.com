// Reusable HIPAA-safety notice shown on every public form.
// Reminds users not to share medical details in the form.
export default function FormPrivacyNotice() {
  return (
    <div className="rounded border border-wine/20 bg-wine/5 p-4 text-[.82rem] leading-[1.55] text-charcoal">
      <strong className="block font-semibold text-wine">
        A note about your privacy:
      </strong>
      For your security, please do not include medical history, symptoms, or
      health details in this form. Our team will reach out to discuss those
      securely by phone or through our HIPAA-compliant patient portal.
    </div>
  )
}
