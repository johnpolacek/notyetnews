import './globals.css'

export const metadata = {
  title: 'Not Yet News',
  description: 'News from the future',
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
