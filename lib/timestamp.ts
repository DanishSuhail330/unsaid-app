/**
 * Timestamp Helper
 * 
 * Converts database timestamps into soft, human-friendly text
 * Examples: "Just now", "A week ago", "A month ago", "Few months ago", "A year ago"
 */

export function getHumanTimestamp(createdAt: string): string {
  const now = new Date()
  const created = new Date(createdAt)
  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000)

  // Just now (less than 1 minute)
  if (diffInSeconds < 60) {
    return 'Just now'
  }

  // Minutes ago (less than 1 hour)
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    if (minutes === 1) return 'A minute ago'
    return `${minutes} minutes ago`
  }

  // Hours ago (less than 1 day)
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    if (hours === 1) return 'An hour ago'
    return `${hours} hours ago`
  }

  // Days ago (less than 1 week)
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    if (days === 1) return 'A day ago'
    if (days < 7) return `${days} days ago`
  }

  // Weeks ago (less than 1 month)
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    if (weeks === 1) return 'A week ago'
    if (weeks < 4) return `${weeks} weeks ago`
  }

  // Months ago (less than 1 year)
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    if (months === 1) return 'A month ago'
    if (months < 12) {
      if (months < 3) return 'Few months ago'
      return `${months} months ago`
    }
  }

  // Years ago
  const years = Math.floor(diffInSeconds / 31536000)
  if (years === 1) return 'A year ago'
  return `${years} years ago`
}
