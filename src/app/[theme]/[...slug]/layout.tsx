export async function generateMetadata({ params }: {params: any}) {
  return {
    title: `Not Yet News${params.slug[0] ? ` – ${params.slug[0]}` : ''}`,
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
}

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <>{children}</>
}