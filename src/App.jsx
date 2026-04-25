import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
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

  const isCareersPage = currentPath === '/careers'

  return (
     <div className="relative overflow-x-hidden">
      <PrivacyBanner />
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-white via-blue-50 to-purple-50" />
      <Navbar currentPath={currentPath} />
        {isCareersPage ? (
          <CareersPage />
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <Solutions/>
            <Technologies />
            <CTA />
          </>
        )}
      <Footer />
    </div>
  )
}

export default App
