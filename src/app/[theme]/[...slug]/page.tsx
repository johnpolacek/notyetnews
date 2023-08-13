import Main from '@/app/components/main'
import Article from '@/app/components/article'
import { NewsArticle } from '../../types'

async function getNewsArticles({theme, slug}: { theme: string, slug: string[] }) {
  const res = await fetch(`https://notyetnews.s3.us-east-1.amazonaws.com/notyet${theme}-${slug[0]}.json`, { next: { revalidate: 60 } })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home({ params }: { params: { theme: string, slug: string[] } }) {

  const articles:NewsArticle[] = await getNewsArticles({...params})
  const articleIndex = params.slug[1] ? parseInt(params.slug[1]) : undefined;

  return (
    typeof articleIndex === 'number' && articles[articleIndex] ? (<Article article={articles[articleIndex]} />) : (<Main theme={params.theme} slug={params.slug} articles={articles} />)
  )
}
