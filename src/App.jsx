import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import StatsRibbon from './components/StatsRibbon'
import About from './components/about'
import Services from './components/services'
import Solutions from './components/solution'
import Technologies from './components/technologies'
import CTA from './components/cta'
import Footer from './components/Footer'
import PrivacyBanner from './components/PrivacyBanner'
import CareersPage from './components/CareersPage'

const getCurrentPath = () => {
  if (typeof window === 'undefined') {
    return '/'
  }

  const normalizedPath = window.location.pathname.replace(/\/+$/, '')
  return normalizedPath || '/'
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href*="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const hashIndex = href.indexOf('#')
      if (hashIndex === -1) return

      const hash = href.slice(hashIndex)
      if (!hash || hash === '#') return

      const path = href.slice(0, hashIndex)
      const current = window.location.pathname.replace(/\/+$/, '') || '/'

      if (!path || path === current || (path === '/' && current === '/')) {
        if (hash === '#hero' || hash === '#top') {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          window.history.pushState(null, '', '/')
          return
        }

        const targetElement = document.querySelector(hash)
        if (targetElement) {
          e.preventDefault()
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
          window.history.pushState(null, '', hash)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash)
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }, 150)
      }
    }
  }, [currentPath])

  const isCareersPage = currentPath === '/careers'

  return (
    <div className="relative overflow-x-hidden bg-white min-h-screen text-slate-800">
      <PrivacyBanner />
      <Navbar currentPath={currentPath} />

      {isCareersPage ? (
        <CareersPage />
      ) : (
        <main>
          <Hero />
          <StatsRibbon />
          <About />
          <Services />
          <Solutions />
          <Technologies />
          <CTA />
        </main>
      )}

      <Footer />
    </div>
  )
}

export default App
