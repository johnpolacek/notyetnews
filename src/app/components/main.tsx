import Image from 'next/image'
import { NewsArticle } from '../types'

export default function Main({articles}: {articles: NewsArticle[]}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Not Yet News</h1>
      <div>
        {articles.map((article, i) => (
          <div key={`article-${i}`}>
            <h3>{article.title}</h3>
            <p>{article.abstract}</p>
            <Image alt="" src={article.imageUrl} width={256} height={256} />
          </div>
        ))}
      </div>
    </main>
  )
}
