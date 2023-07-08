import Image from 'next/image'
import { NewsArticle } from '../types'

export default function Main({articles}: {articles: NewsArticle[]}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 max-w-[960px] mx-auto">
      <div className="pb-8 border-[#ccc] border-double border-b-4 w-full mb-12 text-center">
        <h1 className="text-6xl">Not Yet News</h1>
        <h4>{new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
      </div>
      <div>
        {articles.filter((article) => (article.title && article.abstract)).map((article, i) => (
          <div className="flex gap-8 pb-12" key={`article-${i}`}>
            <Image className='w-40 h-40' alt="" src={article.imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
            <div>
              <h3 className="text-xl font-semibold pb-2 ">{article.title}</h3>
              <p>{article.abstract}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
