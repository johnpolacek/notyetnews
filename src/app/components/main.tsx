import Image from 'next/image'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'
import { NewsArticle } from '../types'

export default function Main({theme, slug, articles}: {theme: string, slug: string, articles: NewsArticle[]}) {

  const articleData = articles.filter((article) => (article.title && article.abstract)).map((a, i) => {
    return {...a, index: i}
  })

  const topArticles = articleData.slice(0,12)
  const otherArticles = articleData.slice(12)
  const batchedArticles = []
  for(let i = 0; i < otherArticles.length; i += 3) {
    batchedArticles.push(otherArticles.slice(i, i+3));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 xl:p-16 max-w-[1280px] mx-auto">
      <Header />
      <div className="lg:grid lg:grid-cols-5 gap-8">
        <div className="col-span-3 divide-y divide-[#aaa] -mt-8">
          {topArticles.map((article, i) => (
            <Link href={`/${theme}/${slug}/${article.index+1}`} className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 py-8" key={`article-${i}`}>
              <div className="w-full md:w-2/5">
                <h3 className="text-xl font-semibold pb-2 ">{article.title}</h3>
                <p>{article.abstract}</p>
                <p className="text-indigo-600 italic py-2 block">Read more...</p>
              </div>
              <div className="w-full md:w-3/5 grow md:pl-4">
                <Image className='w-full h-auto' alt="" src={article.imageUrl || `/placeholder${Math.round(Math.random() * 5)}.png`} width={180} height={180} />
              </div>
            </Link>
          ))}
        </div>
        <div className="col-span-2 lg:pl-8 lg:border-l lg:border-l-[#aaa]">
          {batchedArticles.map((batch, i) => (
            <>
              <Link href={`/${theme}/${slug}/${batch[0].index+1}`} className="flex flex-col gap-8 pb-8" key={`article-${i}`}>
                <Image className='w-full h-auto' alt="" src={batch[0].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                <div className="pb-4">
                  <h3 className="text-xl font-semibold pb-2 ">{batch[0].title}</h3>
                  <p>{batch[0].abstract}</p>
                  <p className="text-indigo-600 italic py-2 block">Read more...</p>
                </div>
              </Link>
              {
                batch.length === 3 && (
                <div className="grid grid-cols-2 divide-x divide-[#aaa] pb-8">
                  <Link href={`/${theme}/${slug}/${batch[1].index+1}`} className="pr-8">
                    <Image className='pb-2 w-full h-auto' alt="" src={batch[1].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                    <h3 className="text-sm font-semibold pb-2 ">{batch[1].title}</h3>
                    <p className="text-indigo-600 italic py-2 block text-sm">Read more...</p>
                  </Link>
                  <Link href={`/${theme}/${slug}/${batch[2].index+1}`} className="pl-8">
                    <Image className='pb-2 w-full h-auto' alt="" src={batch[2].imageUrl || `/placeholder${Math.round(Math.random() * 6)}.png`} width={180} height={180} />
                    <h3 className="text-sm font-semibold pb-2 ">{batch[2].title}</h3>
                    <p className="text-indigo-600 italic py-2 block text-sm">Read more...</p>
                  </Link>
                </div>)
              }
            </>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-gray-400 mt-12 pt-8">
        <Footer />
      </div>
    </main>
  )
}
