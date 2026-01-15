/**
 * Read Page
 * 
 * Displays anonymous entries in a masonry/staggered layout
 * Clicking a card opens a modal with the full message
 */

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Modal from '@/components/Modal'
import { getHumanTimestamp } from '@/lib/timestamp'
import { truncateWords } from '@/lib/wordCount'

// Type definition for an entry
interface Entry {
  id: number
  content: string
  created_at: string
}

export default function ReadPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)

  /**
   * Fetch all entries from the database when the page loads
   */
  useEffect(() => {
    async function fetchEntries() {
      try {
        // Fetch entries, ordered by newest first
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching entries:', error)
          return
        }

        setEntries(data || [])
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [])

  /**
   * Distribute entries into 3 columns for masonry layout
   */
  const distributeEntries = (entries: Entry[]): Entry[][] => {
    const columns: Entry[][] = [[], [], []]
    entries.forEach((entry, index) => {
      columns[index % 3].push(entry)
    })
    return columns
  }

  const columns = distributeEntries(entries)

  /**
   * Get preview text for a message (first 30 words)
   */
  const getPreview = (content: string) => {
    return truncateWords(content, 30)
  }

  return (
    <div className="relative min-h-screen bg-[#0b0022]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0022] via-[#1a0033] to-[#0b0022] opacity-50" />

      {/* Top Navigation */}
      <div className="absolute left-1/2 top-[23.63px] -translate-x-1/2 z-10">
        <Navigation />
      </div>

      {/* Content Area - Masonry Layout */}
      {isLoading ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50">
          Loading thoughts...
        </div>
      ) : entries.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-white/50 text-lg mb-4">No thoughts yet.</p>
        </div>
      ) : (
        <div className="pt-[145px] pb-[180px] md:pb-[250px] px-4">
          {/* Mobile: Single column with all entries */}
          <div className="max-w-[1200px] mx-auto flex flex-col md:hidden gap-[30px] items-center">
            {entries.map((entry) => {
              const { preview, needsTruncation } = getPreview(entry.content)
              return (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="glass flex flex-col gap-5 items-start p-5 rounded-[22px] shadow-[0px_0px_49.4px_0px_rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity text-left relative w-full max-w-[358px]"
                >
                  {/* Decorative ellipse */}
                  <div className="absolute left-5 top-2.5 w-[102px] h-[102px] opacity-20 pointer-events-none">
                    <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
                  </div>

                  <p className="text-white text-base opacity-70 whitespace-pre-wrap relative z-10">
                    {preview}
                    {needsTruncation && (
                      <span className="text-white/25"> Read more</span>
                    )}
                  </p>
                  <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
                    <p className="text-white text-[10px]">
                      {getHumanTimestamp(entry.created_at)}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Desktop: 3 columns with staggered offsets */}
          <div className="max-w-[1200px] mx-auto hidden md:flex gap-[30px] items-start justify-center">
            {columns.map((columnEntries, colIndex) => {
              // Stagger the columns: first starts at top, second offset by 80px, third offset by 15px
              const topOffsetClass = colIndex === 0 ? '' : colIndex === 1 ? 'pt-20' : 'pt-4'
              
              return (
                <div 
                  key={colIndex}
                  className={`flex flex-col gap-[30px] w-[358px] ${topOffsetClass}`}
                >
                  {columnEntries.map((entry) => {
                    const { preview, needsTruncation } = getPreview(entry.content)
                    return (
                      <button
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className="glass flex flex-col gap-5 items-start p-5 rounded-[22px] shadow-[0px_0px_49.4px_0px_rgba(255,255,255,0.12)] hover:opacity-80 transition-opacity text-left relative w-full"
                      >
                        {/* Decorative ellipse */}
                        <div className="absolute left-5 top-2.5 w-[102px] h-[102px] opacity-20 pointer-events-none">
                          <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
                        </div>

                        <p className="text-white text-base opacity-70 whitespace-pre-wrap relative z-10">
                          {preview}
                          {needsTruncation && (
                            <span className="text-white/25"> Read more</span>
                          )}
                        </p>
                        <div className="bg-[rgba(255,255,255,0.1)] inline-flex items-center justify-center px-2.5 py-1.5 rounded-[45px]">
                          <p className="text-white text-[10px]">
                            {getHumanTimestamp(entry.created_at)}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer Gradient Overlay - sits above cards, below footer */}
      {/* Gradient: transparent at top, transitions to black earlier and stronger */}
      {/* Reduced height on mobile to avoid covering content */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-[150px] md:h-[209px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.95) 70%, #000 100%)'
        }}
      />

      {/* Footer - Fixed to bottom of viewport */}
      <div className="fixed bottom-[13px] left-1/2 -translate-x-1/2 flex gap-3 items-center justify-center px-5 py-3 z-30">
        <span className="text-white text-lg opacity-50">☁️</span>
        <p className="text-white text-xl font-medium opacity-20">Unsaid</p>
      </div>

      {/* Modal */}
      {selectedEntry && (
        <Modal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  )
}
