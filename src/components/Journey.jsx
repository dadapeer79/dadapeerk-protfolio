const milestones = [
  { time: 'NOW', title: '3rd Year — Information Science & Engineering', sub: 'CMR Institute of Technology, Bengaluru' },
  { time: '4th SEM', title: '2nd Prize — CMRIT Project Showcase', sub: 'Semi-finalist recognition' },
  { time: '3rd SEM', title: '3rd Prize — CMRIT Project Showcase', sub: 'Departmental competition' },
  { time: '2nd SEM', title: '2nd Prize — CMRIT Project Showcase', sub: 'First major recognition' },
]

export default function JourneySection() {
  return (
    <section className="journey-section" id="journey">
      <p className="journey-section-label">06 / Journey</p>
      <h2 className="journey-heading">SO FAR,<br />SO GOOD.</h2>

      {milestones.map((m, i) => (
        <div key={i} className="journey-row">
          <div className="journey-time">{m.time}</div>
          <div>
            <div className="journey-title">{m.title}</div>
            {m.sub && <div className="journey-sub">{m.sub}</div>}
          </div>
        </div>
      ))}
      <div style={{ borderBottom: '1px solid rgba(11,11,11,0.1)' }} />
    </section>
  )
}
