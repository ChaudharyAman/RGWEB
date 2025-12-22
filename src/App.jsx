import './App.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Services from './components/services'
import Timeline from './components/timeline'
import Solutions from './components/solution'
import Technologies from './components/technologies'
import Talent from './components/talent'
import Clients from './components/client'
import CTA from './components/cta'
import Footer from './components/Footer'




function App() {
  return (
     <div className="relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-white via-blue-50 to-purple-50" />
      <Navbar />
        <Hero />
        <About />
        <Timeline />
        <Services />
        <Solutions/>
        <Talent />
        <Technologies />
        <Clients />
        <CTA />
        <Footer />
    </div>
  )
}

export default App
