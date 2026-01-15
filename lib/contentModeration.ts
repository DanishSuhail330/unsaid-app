/**
 * Content Moderation Helper
 * 
 * Simple keyword/phrase check for harmful language
 * Only checks for slurs, direct threats, and targeted abuse
 * Does not block normal emotional language or general profanity
 */

// List of harmful keywords/phrases to block
// Focus on slurs, direct threats, and targeted abuse
// Does NOT block normal emotional language or general profanity
const HARMFUL_KEYWORDS = [
  // Direct threats of violence
  'i will kill you',
  'i will harm you',
  'i will hurt you',
  'kill yourself',
  'I want to kill myself',
  'fucked her',
  'motherfucker',
  'motherfucking',
  'motherfucking',
  'I want to die',
  'harm yourself',
  'I hope you die',
  'You should die',
  'I hope you kill yourself',
  'You should kill yourself',
  'I hope you harm yourself',
  'You should harm yourself',
  'I hope you hurt yourself',
  'You should hurt yourself',
  'I hope you die',
  'You should die',
  'I hope you kill yourself',
  "kill yourself",
"go kill yourself",
"go die",
"die bitch",
"die asshole",
"i will kill you",
"i want to kill you",
"you should die",
"you deserve to die",
"fucking die",

"hate you",
"i hate you so much",
"worthless piece of shit",
"you are worthless",
"you are useless",

"bitch",
"whore",
"slut",
"retard",
"moron",
//"idiot",

"asshole",
"piece of shit",
"human garbage",

"nigger",
"faggot",
"chink",
"tranny",
"kike",

"rape you",
"rape her",
"rape him",
"rape them",
"rape us",
"rape you",
"rape her",
"rape him",
"rape them",
"rape us",
"rape",
"i will rape",
"you should be raped"

  // Targeted harassment and abuse patterns
  // Add specific slurs, targeted abuse terms, or harassment phrases here
  // Be mindful not to block legitimate emotional expression or general profanity
  // Example patterns (customize based on your needs):
  // - Racial/ethnic slurs
  // - Targeted hate speech
  // - Specific harassment phrases
]

/**
 * Check if content contains harmful language
 * @param text - The text to check
 * @returns true if harmful content is detected, false otherwise
 */
export function containsHarmfulLanguage(text: string): boolean {
  if (!text || !text.trim()) {
    return false
  }

  const lowerText = text.toLowerCase().trim()

  // Check against harmful keywords list
  for (const keyword of HARMFUL_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return true
    }
  }

  return false
}
