import Image from 'next/image'
import Footer from './footer'
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
    <main className="flex min-h-screen flex-col items-center justify-between p-8 xl:p-16 max-w-[1240px] mx-auto">
      <div className="lg:grid grid-cols-5 pb-4 lg:pb-6 border-[#666] border-double border-b-4 w-full mb-12">
        <h4 className="text-center text-xs pb-2 italic lg:text-base lg:text-left">{new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
        <h1 className="lg:w-[720px] text-center col-span-3">
          <p className="text-lg lg:text-xl pb-3 lg:pb-4">Speculative Satire from the Future</p>
          <Image src="/notyetnews.svg" width={720} height={48} alt="Not Yet News" />
        </h1>
      </div>
      <div className="lg:grid lg:grid-cols-3 gap-8">
        <div className="col-span-2 divide-y divide-[#aaa] -mt-8">
          {topArticles.map((article, i) => (
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 py-8" key={`article-${i}`}>
              <div className="w-full md:w-2/5">
                <h3 className="text-xl font-semibold pb-2 ">{article.title}</h3>
                <p>{article.abstract}</p>
              </div>
              <div className="w-full md:w-3/5 grow md:pl-4">
                <Image className='w-full h-auto' alt="" src={article.imageUrl || `/placeholder${Math.round(Math.random() * 5)}.png`} width={180} height={180} />
              </div>
            </div>
          ))}
          <div className="pt-8">
            <Footer />
          </div>
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-l-[#aaa]">
          {batchedArticles.map((batch, i) => (
            <>
              <div className="flex flex-col gap-8 pb-8" key={`article-${i}`}>
                <Image className='w-full h-auto' alt="" src={batch[0].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                <div className="border-b border-[#aaa] pb-6">
                  <h3 className="text-xl font-semibold pb-2 ">{batch[0].title}</h3>
                  <p>{batch[0].abstract}</p>
                </div>
              </div>
              {
                batch.length === 3 && (
                <div className="grid grid-cols-2 divide-x divide-[#aaa] pb-8">
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
