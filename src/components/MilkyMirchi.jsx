import Link from 'next/link'

export default function MilkyMirchi() {
  return (
    <section id="milky" className="bg-warm-white text-ink-black p-8 py-16 flex flex-col md:flex-row items-center justify-between border-b border-ink-black">
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        {/* Placeholder for Milky Mirchi reels */}
        <div className="flex gap-4">
          <div className="w-40 h-72 bg-ink-black rounded-xl flex items-center justify-center rotate-3">
             <div className="text-warm-white font-display text-xl">[REEL]</div>
          </div>
          <div className="w-40 h-72 bg-poster-red rounded-xl flex items-center justify-center -rotate-3 mt-8">
             <div className="text-warm-white font-display text-xl">[REEL]</div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:pl-16">
        <div className="text-poster-red font-display text-2xl mb-4">ಶಿವಮೊಗ್ಗ &#10022; ಬೆಂಗಳೂರು</div>
        <h2 className="font-display text-9xl uppercase leading-none mb-4" style={{color: '#244c35'}}>
          Milky<br/>
          <span className="text-poster-red">Mirchi</span>
        </h2>
        <div className="font-sans font-bold text-xl mb-4">
          Kannada food stories. Local shops. Real flavour.
        </div>
        <p className="font-sans mb-8 max-w-md text-sm">
          Food reels and local-business promos from Shivamogga and Bengaluru.
        </p>
        <Link href="#" className="bg-poster-red text-warm-white px-6 py-3 rounded-full font-sans uppercase text-sm hover:scale-105 transition font-bold">
          Watch The Reels &rarr;
        </Link>
      </div>
    </section>
  )
}
