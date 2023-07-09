import Image from 'next/image'
import Main from './components/main'
import { NewsArticle } from './types'

async function getNewsArticles() {
  const res = await fetch('https://notyetnews.s3.us-east-1.amazonaws.com/notyetnews-2023-07-09.json')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {

  const articles:NewsArticle[] = await getNewsArticles()

  return (
    <Main articles={articles} />
  )
}
