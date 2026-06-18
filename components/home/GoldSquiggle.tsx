/** Decorative gold flourish used under section headings in the mockup. */
export default function GoldSquiggle({ className = 'h-3 w-24' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 8c10-8 18-8 28 0s18 8 28 0 18-8 28 0 10 8 8 8"
        stroke="#C8A96A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
