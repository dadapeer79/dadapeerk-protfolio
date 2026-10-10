import Link from 'next/link'

export default function AlonaLabel() {
  return (
    <section id="alona" className="bg-ink-black text-warm-white p-8 py-16 flex flex-col md:flex-row items-center justify-between border-y border-warm-white">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <div className="text-neon-green font-sans text-sm uppercase mb-4">04 / Brand &middot; Streetwear</div>
        <h2 className="font-display text-9xl uppercase leading-none mb-2">Alona<br/>Label</h2>
        <div className="font-display text-4xl text-neon-green mb-6 uppercase tracking-tight" style={{textShadow: '1px 1px 0 #000'}}>
          FRESH FIT. SERVED HOT.
        </div>
        <p className="font-sans mb-8 max-w-sm text-sm">
          Indian streetwear with Karnataka-inspired graphics.
        </p>
        <Link href="#" className="bg-neon-green text-ink-black px-6 py-3 rounded-full font-sans uppercase text-sm hover:scale-105 transition font-bold">
          Enter The Label &rarr;
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center">
        {/* Placeholder for Alona image */}
        <div className="w-80 h-96 bg-poster-red rounded-3xl flex items-center justify-center -rotate-3">
          <div className="text-ink-black font-display text-2xl">[CAMPAIGN IMG]</div>
        </div>
      </div>
    </section>
  )
}
