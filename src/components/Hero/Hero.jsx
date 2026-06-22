import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import SplitType from 'split-type'
import Experience from '../../canvas/Experience'
import './Hero.css'

const Hero = () => {
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const metaRef     = useRef(null)
  const ctaRef      = useRef(null)
  const scrollRef   = useRef(null)

  useEffect(() => {
    const split = new SplitType(titleRef.current, { types: 'chars, words' })
    const sub   = new SplitType(subtitleRef.current, { types: 'lines' })

    const tl = gsap.timeline({ delay: 2.6 })

    tl.from(split.chars, {
      y:        '120%',
      opacity:  0,
      rotateX:  -40,
      stagger:  0.025,
      duration: 1.1,
      ease:     'power4.out',
    })
    .from(sub.lines, {
      y:        30,
      opacity:  0,
      stagger:  0.1,
      duration: 0.9,
      ease:     'power3.out',
    }, '-=0.7')
    .from(metaRef.current, {
      y:       15,
      opacity: 0,
      duration: 0.6,
      ease:    'power3.out',
    }, '-=0.5')
    .from(ctaRef.current.children, {
      y:       20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease:    'power3.out',
    }, '-=0.4')
    .from(scrollRef.current, {
      opacity:  0,
      duration: 0.5,
    }, '-=0.2')

    return () => {
      split.revert()
      sub.revert()
      tl.kill()
    }
  }, [])

  return (
    <section className="hero" id="hero">
      {/* WebGL background */}
      <div className="hero__canvas">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 70 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <Experience />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.8}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Gradient vignette */}
      <div className="hero__vignette" />

      <div className="hero__content container">
        <p ref={metaRef} className="hero__meta">
          Available for freelance · India
        </p>

        <h1 ref={titleRef} className="hero__title">
          Adharsh<br />
          <em>S.</em>
        </h1>

        <p ref={subtitleRef} className="hero__subtitle">
          Frontend Developer &amp; Creative Coder<br />
          crafting immersive digital experiences.
        </p>

        <div ref={ctaRef} className="hero__cta">
          <a href="#work" className="btn btn--primary" data-magnetic>
            View Work
          </a>
          <a href="#contact" className="btn btn--ghost" data-magnetic>
            Say Hello
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero
