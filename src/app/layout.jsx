import './globals.css'

export const metadata = {
  title: 'Dadapeer K — Developer / Designer / AI Builder',
  description: 'I build digital experiences that feel alive. Full-stack developer, AI builder, and creative entrepreneur from Bengaluru.',
  openGraph: {
    title: 'Dadapeer K — Developer / Designer / AI Builder',
    description: 'I build digital experiences that feel alive.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
