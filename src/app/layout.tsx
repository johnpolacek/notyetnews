import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Not Yet News',
  description: 'AI-generated news from the future',
  openGraph: {
    title: 'Not Yet News',
    description: 'AI-generated news from the future',
    url: 'https://notyet.news',
    siteName: 'Not Yet News',
    images: [
      {
        url: 'https://notyet.news/screenshot.jpg',
        width: 1191,
        height: 708,
        alt: 'Not Yet News, Speculative Satire from the Future',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-serif">{children}</body>
    </html>
  )
}
