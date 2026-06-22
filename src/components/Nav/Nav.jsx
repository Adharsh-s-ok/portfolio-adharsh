import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Nav.css'

const links = ['Work', 'About', 'Contact']

const Nav = () => {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 2.8,
    })
  }, [])

  return (
    <nav ref={navRef} className="nav">
      <a href="#" className="nav__logo" data-magnetic>
        A<span className="nav__logo-dot">.</span>
      </a>

      <ul className="nav__links">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="nav__link" data-cursor="hover">
              <span className="nav__link-inner">{link}</span>
              <span className="nav__link-inner nav__link-inner--hover" aria-hidden>{link}</span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:adharsh@email.com"
        className="nav__cta"
        data-magnetic
        data-cursor="hover"
      >
        Hire me
      </a>
    </nav>
  )
}

export default Nav
