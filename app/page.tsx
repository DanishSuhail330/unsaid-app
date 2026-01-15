/**
 * Landing Page
 * 
 * The home page with hero section, navigation buttons, and decorative background cards
 */

'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0b0022] overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0022] via-[#1a0033] to-[#0b0022]" />

      {/* Main Content - Centered */}
      {/* Mobile: responsive, Desktop: original layout */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 md:gap-10 items-center px-4 md:px-0">
        {/* Logo/Icon - Cloud */}
        <div className="flex items-center justify-center">
          <div className="w-[200px] h-[143px] md:w-[328px] md:h-[234px] flex items-center justify-center">
            <img 
              src="/cloud.png" 
              alt="Cloud icon" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-white text-[32px] md:text-[52px] font-semibold text-center leading-tight px-4 md:px-0">
          For the things you couldn't say.
        </h1>

        {/* Action Buttons */}
        {/* Mobile: stacked, Desktop: horizontal with original spacing */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center w-full max-w-[400px] md:max-w-none md:w-auto">
          {/* Write Button */}
          <Link
            href="/write"
            className="bg-[#405dff] flex gap-2 h-11 items-center justify-center px-10 py-2.5 rounded-[10px] hover:opacity-90 transition-opacity w-full md:w-auto min-h-[44px] md:min-h-0"
          >
            <span className="text-white text-xl font-medium">Write</span>
            <span className="text-white text-lg">✏️</span>
          </Link>

          {/* Read Button */}
          <Link
            href="/read"
            className="bg-[rgba(255,255,255,0.1)] flex gap-2 items-center justify-center px-10 py-2.5 rounded-[10px] hover:opacity-80 transition-opacity w-full md:w-auto min-h-[44px] md:min-h-0"
          >
            <span className="text-white text-xl font-medium">Read</span>
            <span className="text-white text-lg">🤍</span>
          </Link>
        </div>

        {/* Supporting Text */}
        <p className="text-white text-base text-center opacity-50 pt-5">
          Anonymous. Safe. Silent.
        </p>
      </div>

      {/* Decorative Background Cards (Non-interactive) - Hidden on mobile */}
      <div className="hidden md:block absolute left-[201px] top-[42px] opacity-[0.08] w-[426px]">
        <div className="glass flex flex-col gap-5 items-start p-5 rounded-[22px]">
          <p className="text-white text-base opacity-70 whitespace-pre-wrap">
            Life is getting better. Slowly, but surely. Some days I actually believe it.
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
            <p className="text-white text-[10px]">2 months ago</p>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute left-[1051px] top-[144px] opacity-25 w-[426px]">
        <div className="glass flex flex-col gap-5 items-start p-5 rounded-[22px]">
          <div className="text-white text-base opacity-70 whitespace-pre-wrap">
            <p className="mb-0">This isn't an apology.</p>
            <p>It's just something I couldn't hold anymore.</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
            <p className="text-white text-[10px]">Just now</p>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute left-[77px] top-[542px] opacity-[0.13] w-[426px]">
        <div className="glass flex flex-col gap-5 items-start p-5 rounded-[22px]">
          <p className="text-white text-base opacity-70 whitespace-pre-wrap">
            I replay that moment a lot. It always ends differently in my head.
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
            <p className="text-white text-[10px]">A week ago</p>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute left-[1031px] top-[715px] opacity-10 w-[426px]">
        <div className="glass flex flex-col gap-5 items-start p-5 rounded-[22px]">
          <p className="text-white text-base opacity-70 whitespace-pre-wrap">
            I'm scared that I'm not good enough for this job. Everyone seems so much more confident than me.
          </p>
          <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
            <p className="text-white text-[10px]">A month ago</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 items-center justify-center px-5 py-3">
        <span className="text-white text-lg opacity-50">☁️</span>
        <Link href="/" className="text-white text-xl font-medium opacity-20">
          Unsaid
        </Link>
      </div>
    </div>
  )
}
