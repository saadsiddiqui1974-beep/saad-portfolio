export function BrandMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brand-ribbon" x1="8" y1="7" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B7C9C1" />
          <stop offset=".48" stopColor="#70F0BD" />
          <stop offset="1" stopColor="#20B984" />
        </linearGradient>
      </defs>
      <path d="M34.5 9H18.2a8.2 8.2 0 0 0 0 16.4h11.6a8.2 8.2 0 0 1 0 16.4H12.5" stroke="url(#brand-ribbon)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 9H9.8M38.2 39h-3.7" stroke="#D8F8E9" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
    </svg>
  )
}
