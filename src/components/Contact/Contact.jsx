import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './Contact.css'

const Contact = () => {
  const headingRef = useRef(null)
  const emailRef   = useRef(null)
  const footerRef  = useRef(null)

  useEffect(() => {
    const split = new SplitType(headingRef.current, { types: 'lines' })

    gsap.from(split.lines, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      y:        80,
      opacity:  0,
      stagger:  0.1,
      duration: 1.2,
      ease:     'power4.out',
    })

    gsap.from(emailRef.current, {
      scrollTrigger: { trigger: emailRef.current, start: 'top 85%' },
      y:       30,
      opacity: 0,
      duration: 0.8,
      ease:    'power3.out',
    })

    gsap.from(footerRef.current, {
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      y:       20,
      opacity: 0,
      duration: 0.6,
      ease:    'power3.out',
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section className="contact" id="contact">
      <div className="container">

        <div className="contact__header">
          <span className="contact__index">— 03</span>
        </div>

        <h2 ref={headingRef} className="contact__heading">
          Let's build<br />
          something<br />
          <em>remarkable.</em>
        </h2>

        <div ref={emailRef} className="contact__email-wrap">
          <a
            href="mailto:adharsh@email.com"
            className="contact__email"
            data-magnetic
            data-cursor="hover"
          >
            adharsh@email.com
            <span className="contact__email-arrow">↗</span>
          </a>
        </div>

        <footer ref={footerRef} className="contact__footer">
          <p className="contact__footer-copy">
            © {new Date().getFullYear()} Adharsh S. Built with React, GSAP &amp; Three.js
          </p>
          <nav className="contact__socials">
            {[
              { label: 'GitHub',   href: 'https://github.com/Adharsh-s-ok' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/adharsh-s-5b6a3827a' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="hover">
                {s.label}
              </a>
            ))}
          </nav>
        </footer>

      </div>
    </section>
  )
}

export default Contact
