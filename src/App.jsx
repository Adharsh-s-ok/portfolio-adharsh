import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor from './components/Cursor/Cursor'
import Loader from './components/Loader/Loader'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Work from './components/Work/Work'
import Contact from './components/Contact/Contact'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      <Cursor />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </>
  )
}

export default App
