/**
 * Word Count Helper
 * 
 * Counts words in a text string
 */

export function countWords(text: string): number {
  if (!text.trim()) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Truncates text to a specified number of words
 * Returns the truncated text and whether truncation occurred
 */
export function truncateWords(text: string, maxWords: number = 30): { preview: string; needsTruncation: boolean } {
  if (!text.trim()) return { preview: '', needsTruncation: false }
  
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  
  if (wordCount <= maxWords) {
    return { preview: text, needsTruncation: false }
  }
  
  // Take first maxWords and join with single space for clean preview
  const truncatedWords = words.slice(0, maxWords)
  const preview = truncatedWords.join(' ')
  
  return { preview, needsTruncation: true }
}
