// The mountain-over-water line from the logo, used as a quiet divider.
export default function Mark({ className = 'mark' }) {
  return (
    <svg className={className} viewBox="0 0 120 40" aria-hidden="true" focusable="false">
      <path d="M22 22 L60 4 L98 22" />
      <path d="M30 22 L60 9 L90 22" />
      <path d="M6 28 q9 -5 18 0 t18 0 t18 0 t18 0 t18 0 t18 0" />
      <path d="M6 35 q9 -5 18 0 t18 0 t18 0 t18 0 t18 0 t18 0" />
    </svg>
  )
}
