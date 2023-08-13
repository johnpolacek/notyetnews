import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="lg:grid grid-cols-5 pb-4 lg:pb-6 border-[#666] border-double border-b-4 w-full mb-12">
      <h4 className="text-center text-xs pb-2 italic lg:text-base lg:text-left">{new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
      <h1 className="lg:w-[720px] text-center col-span-3">
        <p className="text-lg lg:text-xl pb-3 lg:pb-4">Speculative Satire from the Future</p>
        <Link href="/">
          <Image src="/notyetnews.svg" width={720} height={48} alt="Not Yet News" />
        </Link>
      </h1>
    </header>
  )
}
