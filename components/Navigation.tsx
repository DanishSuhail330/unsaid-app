/**
 * Navigation Component
 * 
 * Pill-style navigation buttons for Write and Read pages
 * Shows active state based on current route
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="flex gap-3 md:gap-5 items-center">
      {/* Write Button */}
      <Link
        href="/write"
        className={`flex gap-2 h-[34px] items-center justify-center px-6 md:px-10 py-2.5 rounded-[10px] transition-all min-h-[44px] ${
          pathname === '/write'
            ? 'bg-[rgba(255,255,255,0.1)]'
            : 'bg-[rgba(255,255,255,0.1)] hover:opacity-80'
        }`}
      >
        <span className="text-sm font-medium text-white">Write</span>
        <span className="text-white text-base leading-none">✏️</span>
      </Link>

      {/* Read Button */}
      <Link
        href="/read"
        className={`flex gap-2 h-[34px] items-center justify-center px-6 md:px-10 py-2.5 rounded-[10px] transition-all min-h-[44px] ${
          pathname === '/read'
            ? 'bg-[rgba(255,255,255,0.1)]'
            : 'bg-[rgba(255,255,255,0.1)] hover:opacity-80'
        }`}
      >
        <span className="text-sm font-medium text-white">Read</span>
        <span className="text-white text-base leading-none">🤍</span>
      </Link>
    </div>
  )
}
