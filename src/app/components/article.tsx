import Image from 'next/image'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'
import { NewsArticle } from '../types'

export default function Article({article}: {article: NewsArticle}) {

  const insertBreaks = (str: string) => str.replace(/((?:[^.!?]*[.!?]){3})/g, '$1\n\n');

  return (
    <main className="p-8 xl:p-16 max-w-[1240px] mx-auto relative">
      <Header />
      <div className="w-full text-center -mt-9 mb-8 italic text-lg">
        <Link className="text-indigo-600" href="./"><span className="text-xl relative -top-px pr-1">←</span> Return to articles</Link>
      </div>
      <Image alt="" className="w-full md:w-auto md:float-left md:mr-8 mb-4" src={article.imageUrl} width={320} height={320} />
      <h2 className="text-4xl font-bold pb-4">{article.title}</h2>
      <div className="whitespace-pre-line pb-8 border-b border-gray-400 mb-10">{insertBreaks(article.content)}</div>
      <div className="w-full text-center -mt-4 mb-8 italic text-lg">
        <Link className="text-indigo-600" href="./"><span className="text-xl relative -top-px pr-1">←</span> Return to articles</Link>
      </div>
      <Footer />
    </main>
  )
}
