/**
 * Word Count Helper
 * 
 * Counts words in a text string
 */

export function countWords(text: string): number {
  if (!text.trim()) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}
