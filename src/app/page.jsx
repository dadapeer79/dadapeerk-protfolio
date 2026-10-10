'use client'
import Navbar from '@/components/Navbar'
import Ticker from '@/components/Ticker'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import Gallery from '@/components/Gallery'
import Toolbox from '@/components/Toolbox'
import BrandsSection from '@/components/BrandsSection'
import ContactSection from '@/components/Contact'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <Ticker />

      <AboutSection />

      <Gallery featured />

      {/* Toolbox (left) + Journey (right) — side by side via CSS grid */}
      <Toolbox />

      <BrandsSection />

      <ContactSection />

      {/* Footer */}
      <footer className="footer">
        <span className="footer-logo">DK.</span>
        <span>© {new Date().getFullYear()} Dadapeer K · Bengaluru, India</span>
        <span>Developer · AI Builder · Creative Entrepreneur</span>
      </footer>
    </>
  )
}
