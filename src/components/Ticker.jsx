export default function Ticker() {
  const items = ['DEVELOPER', 'DESIGNER', 'AI BUILDER', 'ENTREPRENEUR', 'CREATOR', 'FULL-STACK', 'BRAND BUILDER']
  // Double for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}
            <span className="ticker-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
