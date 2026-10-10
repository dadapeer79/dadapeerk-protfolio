import JourneySection from './Journey'

const skills = [
  { title: 'FRONTEND', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Next.js'], variant: 'default' },
  { title: 'BACKEND', items: ['Python', 'Flask', 'Java Servlets', 'Node.js', 'REST APIs'], variant: 'default' },
  { title: 'AI & APIs', items: ['OpenAI API', 'Google Genkit', 'Chatbots', 'Recommendations'], variant: 'red' },
  { title: 'DATA & CLOUD', items: ['MySQL', 'SQLite', 'MongoDB', 'Firebase', 'Vercel', 'GitHub'], variant: 'default' },
  { title: 'CS FOUNDATIONS', items: ['DSA', 'C', 'Python', 'Java', 'Problem Solving'], variant: 'dark' },
  { title: 'CREATIVE', items: ['UI/UX', 'Branding', 'Posters', 'T-shirt Graphics', 'Video Content'], variant: 'default' },
]

export default function Toolbox() {
  return (
    <div className="toolbox-journey-wrap" id="toolbox">
      {/* Toolbox — left half, white bg */}
      <section className="toolbox-section">
        <p className="toolbox-section-label">03 / Skills</p>
        <h2 className="toolbox-heading">TOOLBOX</h2>
        <p style={{ fontSize: '0.8rem', color: 'rgba(11,11,11,0.5)', marginBottom: '1.5rem', maxWidth: 260, lineHeight: 1.6 }}>
          No fabricated percentages — just the real tools I work with.
        </p>
        <div className="toolbox-grid">
          {skills.map((s, i) => (
            <div key={i} className={`skill-card ${s.variant === 'dark' ? 'dark' : s.variant === 'red' ? 'red' : ''}`}>
              <div className="skill-card-title">{s.title}</div>
              <div className="skill-tags">
                {s.items.map((item, j) => (
                  <span key={j} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey — right half, gray-light bg */}
      <JourneySection />
    </div>
  )
}
