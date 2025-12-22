import './App.css'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Services from './components/services'
import Timeline from './components/timeline'
import WhyChooseUs from './components/whyChooseUs'
import Solutions from './components/solution'
import Technologies from './components/technologies'
import Talent from './components/talent'
import Stats from './components/stats'
import Clients from './components/client'
import Testimonials from './components/Testimonials'
import FAQ from './components/faqs'
import CTA from './components/cta'
import Footer from './components/footer'




function App() {
  return (
     <div className="relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-white via-blue-50 to-purple-50" />
      <Navbar />
        <Hero />
        <About />
        <Timeline />
        <Services />
        <Talent />
        <Technologies />
        <Clients />
        <CTA />
        <Footer />
    </div>
  )
}

export default App
