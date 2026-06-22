import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './About.css'

const skills = [
  'React.js', 'JavaScript ES6+',
  'GSAP', 'WebGL / Three.js',
  'Lenis', 'Framer Motion',
  'Tailwind CSS', 'Figma',
  'Node.js', 'MongoDB',
]

const About = () => {
  const sectionRef = useRef(null)
  const bioRef     = useRef(null)
  const taglineRef = useRef(null)
  const skillsRef  = useRef(null)
  const numRef     = useRef(null)

  useEffect(() => {
    const bio     = new SplitType(bioRef.current,     { types: 'lines' })
    const tagline = new SplitType(taglineRef.current, { types: 'lines' })

    // Tagline reveal
    gsap.from(tagline.lines, {
      scrollTrigger: {
        trigger: taglineRef.current,
        start:   'top 80%',
      },
      y:        60,
      opacity:  0,
      stagger:  0.08,
      duration: 1.1,
      ease:     'power4.out',
    })

    // Bio reveal
    gsap.from(bio.lines, {
      scrollTrigger: {
        trigger: bioRef.current,
        start:   'top 75%',
      },
      y:        30,
      opacity:  0,
      stagger:  0.06,
      duration: 0.9,
      ease:     'power3.out',
    })

    // Skill chips
    gsap.from(skillsRef.current.children, {
      scrollTrigger: {
        trigger: skillsRef.current,
        start:   'top 80%',
      },
      y:       20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease:    'power3.out',
    })

    // Number counter
    const counter = { val: 0 }
    gsap.to(counter, {
      scrollTrigger: { trigger: numRef.current, start: 'top 80%' },
      val: 3,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = `${Math.round(counter.val)}+`
      },
    })

    return () => {
      bio.revert()
      tagline.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="container">

        <div className="about__header">
          <span className="about__index">— 01</span>
          <h2 ref={taglineRef} className="about__tagline">
            Design that breathes,<br />
            code that <em>moves.</em>
          </h2>
        </div>

        <div className="about__body">
          <div className="about__bio-col">
            <p ref={bioRef} className="about__bio">
              I'm Adharsh S, a frontend developer from Coimbatore, India.
              I obsess over the intersection of design and motion — building
              experiences that feel alive through GSAP, WebGL shaders, and
              Three.js. Currently finishing my CS degree at JCT College
              while shipping real work for real clients.
            </p>

            <div className="about__stat">
              <span ref={numRef} className="about__stat-num">0+</span>
              <span className="about__stat-label">Years building on the web</span>
            </div>
          </div>

          <div className="about__skills-col">
            <p className="about__skills-label">Tech stack</p>
            <ul ref={skillsRef} className="about__skills">
              {skills.map((s) => (
                <li key={s} className="about__skill">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
