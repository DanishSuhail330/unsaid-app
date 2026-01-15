/**
 * Write Page
 * 
 * Page for writing anonymous thoughts with glassmorphic textarea
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import { countWords } from '@/lib/wordCount'
import { containsHarmfulLanguage } from '@/lib/contentModeration'

const MAX_WORDS = 200

export default function WritePage() {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHarmfulWarning, setShowHarmfulWarning] = useState(false)
  const router = useRouter()

  const wordCount = countWords(text)
  const isOverLimit = wordCount > MAX_WORDS

  /**
   * Handle form submission
   * Saves the text to Supabase and redirects to Read page
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset harmful warning
    setShowHarmfulWarning(false)
    
    // Don't submit if text is empty or over word limit
    if (!text.trim() || isOverLimit) {
      return
    }

    // Check for harmful language
    if (containsHarmfulLanguage(text)) {
      setShowHarmfulWarning(true)
      return
    }

    setIsSubmitting(true)

    try {
      // Insert the anonymous entry into the database
      const { error } = await supabase
        .from('entries')
        .insert([{ content: text.trim() }])

      if (error) {
        console.error('Error saving entry:', error)
        alert('Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Success! Redirect to Read page
      router.push('/read')
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0b0022] overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0022] via-[#1a0033] to-[#0b0022] opacity-50" />

      {/* Top Navigation */}
      <div className="absolute left-1/2 top-[23.63px] -translate-x-1/2 z-10">
        <Navigation />
      </div>

      {/* Main Content - Centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[426px] px-4 md:px-0">
        {/* Glassmorphic Textarea Card */}
        <div className="glass flex flex-col gap-[20px] h-[426px] items-start p-[40px] rounded-[22px] shadow-[0px_0px_49.4px_0px_rgba(255,255,255,0.25)] relative overflow-hidden">
          {/* Decorative ellipses */}
          <div className="absolute -left-[94px] -top-[99px] w-[276px] h-[276px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="absolute left-[288px] top-[304px] w-[276px] h-[276px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full h-full">
            <textarea
              value={text}
              onChange={(e) => {
                const newText = e.target.value
                const newWordCount = countWords(newText)
                // Allow deletion even if over limit, but prevent adding more words if at limit
                if (newWordCount <= MAX_WORDS || newText.length < text.length) {
                  setText(newText)
                }
              }}
              placeholder="Write what you couldn't say."
              className="flex-1 bg-transparent border-none outline-none resize-none text-white text-[16px] placeholder:text-white placeholder:opacity-40 placeholder:italic leading-normal whitespace-pre-wrap min-h-0"
              disabled={isSubmitting}
            />
          </form>
        </div>

        {/* Harmful Language Warning - Subtle message below textarea */}
        {showHarmfulWarning && (
          <p className="text-white text-xs opacity-30 mt-2 text-center">
            This space isn't meant for harm.
          </p>
        )}

        {/* Helper Text, Word Counter, and Submit Button */}
        <div className="flex items-center justify-between gap-[20px] mt-[20px] w-full">
          <div className="flex flex-col gap-1">
            <p className="text-white text-[12px] opacity-20">
              Anonymous · Not a crisis service
            </p>
            {/* Word Counter */}
            <p className={`text-[12px] ${isOverLimit ? 'text-red-400' : 'text-white/40'}`}>
              {wordCount} / {MAX_WORDS} words
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !text.trim() || isOverLimit}
            className="glass h-[39px] flex items-center justify-center px-[20px] py-[10px] rounded-[10px] shadow-[0px_0px_85.3px_0px_rgba(255,255,255,0.25)] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shrink-0 w-[137px]"
          >
            <span className="text-white text-[16px]">
              {isSubmitting ? 'Leaving...' : 'Leave it here'}
            </span>
          </button>
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
