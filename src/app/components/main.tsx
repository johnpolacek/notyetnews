import Image from 'next/image'
import { NewsArticle } from '../types'

export default function Main({articles}: {articles: NewsArticle[]}) {

  const articleData = articles.filter((article) => (article.title && article.abstract))

  const topArticles = articleData.slice(0,8)
  const otherArticles = articleData.slice(8)
  const batchedArticles = []
  for(let i = 0; i < otherArticles.length; i += 3) {
    batchedArticles.push(otherArticles.slice(i, i+3));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 max-w-[1400px] mx-auto">
      <div className="pb-8 border-[#aaa] border-double border-b-4 w-full mb-12 text-center">
        <h1 className="text-6xl">Not Yet News</h1>
        <h4>{new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
      </div>
      <div className="grid grid-cols-3 gap-8 divide-x">
        <div className="col-span-2 divide-y -mt-8">
          {topArticles.map((article, i) => (
            <div className="flex gap-8 py-8" key={`article-${i}`}>
              <div className="w-2/5">
                <h3 className="text-xl font-semibold pb-2 ">{article.title}</h3>
                <p>{article.abstract}</p>
              </div>
              <div className="w-3/5 grow border">
                <Image className='w-full h-auto' alt="" src={article.imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
              </div>
            </div>
          ))}
        </div>
        <div className="pl-8">
          {batchedArticles.map((batch, i) => (
            <>
              <div className="flex flex-col gap-8 pb-8" key={`article-${i}`}>
                <Image className='w-full h-auto' alt="" src={batch[0].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold pb-2 ">{batch[0].title}</h3>
                  <p>{batch[0].abstract}</p>
                </div>
              </div>
              {
                batch.length === 3 && (
                <div className="grid grid-cols-2 divide-x pb-8">
                  <div className="pr-8">
                    <Image className='pb-2 w-full h-auto' alt="" src={batch[1].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                    <h3 className="text-sm font-semibold pb-2 ">{batch[1].title}</h3>
                  </div>
                  <div className="pl-8">
                    <Image className='pb-2 w-full h-auto' alt="" src={batch[2].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                    <h3 className="text-sm font-semibold pb-2 ">{batch[2].title}</h3>
                  </div>
                </div>)
              }
            </>
          ))}
        </div>
      </div>
    </main>
  )
}
