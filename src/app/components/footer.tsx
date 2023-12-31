export default function Footer() {

  return (
    <footer className="border-b border-gray-400 mb-12 pb-8 md:border-none">
      <div className="md:grid grid-cols-2">
        <div>
          <p className="pb-2">Not Yet News is auto-generated once each day.</p>
          <p>Built by John Polacek</p>
          <p><a className="text-indigo-600" href="https://johnpolacek.com">johnpolacek.com</a></p>
          <p><a className="text-indigo-600" href="https://twitter.com/johnpolacek">@johnpolacek</a></p>
          <p><a className="text-indigo-600" href="https://github.com/johnpolacek">github.com/johnpolacek</a></p>
        </div>
        <div className="text-right italic">
          <p>Open sourced on <a className="text-indigo-600" href="https://github.com/johnpolacek/notyetnews">github.com/johnpolacek/notyetnews</a></p>
        </div>
      </div>
    </footer>
  )
}
