import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/components/Gallery'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const project = PROJECTS.find(p => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: `${project.title} — Dadapeer K` }
}

const PROJECT_DATA = {
  'rankroute': {
    status: 'live',
    overview: 'RankRoute (also called KCET Compass) is an AI-powered college prediction tool built for KCET students in Karnataka. It uses historical ranking data to predict which colleges and branches a student can realistically expect based on their rank.',
    problem: 'Every year thousands of Karnataka students struggle to choose the right college after KCET results. The existing government tools are confusing, and students rely on word-of-mouth guidance that is often inaccurate.',
    features: ['Enter your KCET rank and category', 'Instant college and branch predictions', 'Filter by district, college type, and branch', 'Compare multiple options side-by-side', 'Mobile-friendly interface'],
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
    contribution: 'I designed and built the entire application — data collection, backend prediction logic, frontend UI, and deployment.',
    learning: 'Building this taught me how to work with large datasets, implement filtering logic at scale, and design interfaces for a real public need.',
    github: 'https://github.com/dadapeer79',
    demo: null,
  },
  'vyapaar-sahayak': {
    status: 'coming-soon',
    overview: 'Vyapaar Sahayak is an AI-powered finance and inventory dashboard designed for small Indian retail store owners who do not have access to enterprise software.',
    problem: 'Small shop owners in India track their stock and finances manually on paper or in simple spreadsheets. They have no visibility into trends, low-stock alerts, or daily profit calculations.',
    features: ['Daily sales and expense tracking', 'AI-generated weekly business reports', 'Low-stock alerts', 'Visual profit/loss dashboard', 'Vernacular-language support (planned)'],
    tech: ['React', 'Node.js', 'MySQL', 'OpenAI API', 'Firebase'],
    contribution: 'Concept, product design, and frontend implementation.',
    learning: 'Learned to design for users who are not tech-savvy, and how AI summaries can make raw data useful for non-technical audiences.',
    github: null, demo: null,
  },
  'studo': {
    status: 'coming-soon',
    overview: 'Studo is a smart study planner that automatically schedules your revision sessions based on your deadlines, subject difficulty, and available hours.',
    problem: 'Students often plan to study but struggle to convert that into a realistic daily schedule — especially around exams.',
    features: ['Input subjects and their exam dates', 'Automatic session scheduling', 'Deadline countdown tracker', 'Progress tracking'],
    tech: ['React', 'Vite', 'JavaScript', 'LocalStorage'],
    contribution: 'Full design and frontend implementation.', learning: 'Learned about scheduling algorithms and designing self-organizing systems.', github: null, demo: null,
  },
  'travii': {
    status: 'coming-soon',
    overview: 'Travii is an AI agent application that allows users to describe a task in natural language and have it broken down and executed automatically.',
    problem: 'Most AI tools require users to prompt carefully. Travii is designed to take a vague goal and orchestrate the steps needed to accomplish it.',
    features: ['Natural language goal input', 'Multi-step task planning', 'Tool-calling capability', 'Result summarization'],
    tech: ['Python', 'Google Genkit', 'Next.js', 'OpenAI API'],
    contribution: 'Concept and system design.', learning: 'Explored agentic AI architectures and multi-step tool orchestration.', github: null, demo: null,
  },
  'labooo': {
    status: 'coming-soon',
    overview: 'Labooo is a library chatbot designed to help students locate the right book or resource quickly, instead of searching physical catalogues.',
    problem: 'College libraries have thousands of books but no conversational interface. Students often waste time searching for specific materials.',
    features: ['Ask for a book by topic or subject', 'Chatbot points to shelf and section', 'Search by author or keyword', 'Available-or-not status (planned)'],
    tech: ['Python', 'Flask', 'OpenAI API', 'JavaScript'],
    contribution: 'Built the chatbot backend and integration logic.', learning: 'Learned about intent classification and building domain-specific conversational systems.', github: null, demo: null,
  },
  'musica': {
    status: 'coming-soon',
    overview: 'Musica is a concept application that recommends music and motivational quotes based on the user\'s current mood.',
    problem: 'Mood-based recommendations often require complex machine learning. Musica takes a simpler, elegant approach using curated associations.',
    features: ['Select your current mood', 'Get a curated playlist suggestion', 'Receive a matching quote', 'Minimal, distraction-free UI'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Spotify Embed API'],
    contribution: 'UI design and frontend implementation.', learning: 'Practiced building clean minimal interfaces and working with embedded external APIs.', github: null, demo: null,
  },
}

export default function ProjectPage({ params }) {
  const project = PROJECTS.find(p => p.slug === params.slug)
  if (!project) notFound()
  const data = PROJECT_DATA[params.slug] || {}
  const isComingSoon = data.status === 'coming-soon'
  const related = PROJECTS.filter(p => p.slug !== params.slug).slice(0, 3)

  return (
    <>
      {/* Header */}
      <div className="project-hero">
        <div className="container">
          <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(250,246,238,0.6)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            ← All Projects
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span className="label" style={{ color: 'rgba(250,246,238,0.55)' }}>{project.cat}</span>
            {isComingSoon
              ? <span className="coming-soon-banner">Coming Soon</span>
              : <span className="badge badge-live">Live</span>
            }
          </div>
          <h1 className="display display-lg" style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>{project.title}</h1>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {data.demo && !isComingSoon && (
              <a href={data.demo} target="_blank" rel="noreferrer" className="btn btn-lime">Live Demo →</a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="btn btn-outline-white btn-sm">GitHub</a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="project-body">
        <div className="container" style={{ padding: '4rem 2rem' }}>
          {/* Cover */}
          <div style={{ width: '100%', aspectRatio: '16/9', background: project.color, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
            {isComingSoon && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span className="coming-soon-banner">Coming Soon</span>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>Full case study will be published when the project launches</p>
              </div>
            )}
            <span style={{ color: project.color === '#B8FF2C' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>[COVER IMAGE]</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem', alignItems: 'start' }}>
            <div>
              <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '0.75rem' }}>Overview</h2>
              <p className="body-lg" style={{ color: 'rgba(11,11,11,0.75)', marginBottom: '2.5rem' }}>{data.overview}</p>

              <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '0.75rem' }}>The Problem</h2>
              <p className="body-lg" style={{ color: 'rgba(11,11,11,0.75)', marginBottom: '2.5rem' }}>{data.problem}</p>

              {data.features && (
                <>
                  <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '0.75rem' }}>Features</h2>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
                    {data.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(11,11,11,0.8)', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--red)', fontWeight: 700, flexShrink: 0 }}>→</span> {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '0.75rem' }}>My Contribution</h2>
              <p className="body-lg" style={{ color: 'rgba(11,11,11,0.75)', marginBottom: '2.5rem' }}>{data.contribution}</p>

              <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '0.75rem' }}>What I Learned</h2>
              <p className="body-lg" style={{ color: 'rgba(11,11,11,0.75)' }}>{data.learning}</p>
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ background: 'var(--black)', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <p className="label" style={{ color: 'var(--red)', marginBottom: '1rem' }}>Tech Stack</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(data.tech || []).map((t, i) => (
                    <span key={i} className="tech-pill" style={{ color: 'var(--lime)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(11,11,11,0.1)' }}>
            <h2 className="display display-sm" style={{ color: 'var(--black)', marginBottom: '2rem' }}>More Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {related.map(p => (
                <Link key={p.slug} href={`/projects/${p.slug}`} style={{ display: 'block' }}>
                  <div style={{ background: p.color, aspectRatio: '4/3', borderRadius: '0.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: p.color === '#B8FF2C' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)' }}>[SCREENSHOT]</span>
                  </div>
                  <p className="project-card-title" style={{ color: 'var(--black)' }}>{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
