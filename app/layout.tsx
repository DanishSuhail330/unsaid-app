import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unsaid',
  description: 'A place for anonymous thoughts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
