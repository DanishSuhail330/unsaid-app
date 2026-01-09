/**
 * Modal Component
 * 
 * Glassmorphic modal for displaying full message content
 * Closes on: close button, outside click, or ESC key
 */

'use client'

import { useEffect } from 'react'
import { getHumanTimestamp } from '@/lib/timestamp'

interface Entry {
  id: number
  content: string
  created_at: string
}

interface ModalProps {
  entry: Entry | null
  onClose: () => void
}

export default function Modal({ entry, onClose }: ModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!entry) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative glass rounded-[22px] p-10 shadow-[0px_0px_49.4px_0px_rgba(255,255,255,0.12)] max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative ellipse (background decoration) */}
        <div className="absolute left-5 top-2.5 w-[102px] h-[102px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors z-20"
          aria-label="Close"
        >
          <span className="text-3xl leading-none">×</span>
        </button>

        {/* Message Content */}
        <p className="text-white text-2xl leading-relaxed mb-5 whitespace-pre-wrap relative z-10">
          {entry.content}
        </p>

        {/* Timestamp */}
        <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
          <p className="text-white text-base">
            {getHumanTimestamp(entry.created_at)}
          </p>
        </div>
      </div>
    </div>
  )
}
