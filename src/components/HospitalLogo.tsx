/**
 * Placeholder logo — replace src/assets/logo.png with your actual hospital logo
 * and swap the SVG below with: <img src={logoUrl} alt="Carewell Hospital" className={className} />
 */

interface HospitalLogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'full'
  className?: string
}

const sizes = {
  sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
  md: { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]' },
  lg: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
}

export default function HospitalLogo({ size = 'md', variant = 'full', className = '' }: HospitalLogoProps) {
  const s = sizes[size]

  const icon = (
    <div className={`${s.icon} bg-primary rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 relative overflow-hidden`}>
      {/* Cross symbol */}
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full p-2">
        <rect x="15" y="5" width="10" height="30" rx="2" fill="white" />
        <rect x="5" y="15" width="30" height="10" rx="2" fill="white" />
        {/* Small heart at center */}
        <circle cx="20" cy="20" r="3" fill="#00B4D8" />
      </svg>
    </div>
  )

  if (variant === 'icon') return <div className={className}>{icon}</div>

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      <div>
        <p className={`font-display text-primary ${s.text} leading-none`}>Carewell Hospital</p>
        <p className={`text-gray-400 ${s.sub} leading-none tracking-wide uppercase mt-0.5`}>Advanced Healthcare · Bengaluru</p>
      </div>
    </div>
  )
}

export function HospitalLogoWhite({ size = 'md', variant = 'full', className = '' }: HospitalLogoProps) {
  const s = sizes[size]

  const icon = (
    <div className={`${s.icon} bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full p-2">
        <rect x="15" y="5" width="10" height="30" rx="2" fill="white" />
        <rect x="5" y="15" width="30" height="10" rx="2" fill="white" />
        <circle cx="20" cy="20" r="3" fill="#00B4D8" />
      </svg>
    </div>
  )

  if (variant === 'icon') return <div className={className}>{icon}</div>

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      <div>
        <p className={`font-display text-white ${s.text} leading-none`}>Carewell Hospital</p>
        <p className={`text-white/50 ${s.sub} leading-none tracking-wide uppercase mt-0.5`}>Advanced Healthcare · Bengaluru</p>
      </div>
    </div>
  )
}
