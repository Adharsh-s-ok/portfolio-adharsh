import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Work.css'

const projects = [
  {
    num:   '01',
    title: 'Mojito App',
    tags:  ['React.js', 'GSAP', 'CSS3'],
    desc:  'A rich, animated cocktail experience — smooth transitions, scroll-driven reveals, and cinematic UI design.',
    year:  '2024',
    link:  '#',
  },
  {
    num:   '02',
    title: 'Solar System',
    tags:  ['GSAP ScrollTrigger', 'WebGL', 'SVG'],
    desc:  'Educational 3D solar system with GPU particle effects, scroll-synced animation, and annotated planetary data.',
    year:  '2025',
    link:  '#',
  },
  {
    num:   '03',
    title: 'ZEN Lounge',
    tags:  ['React', 'GSAP', 'Lenis'],
    desc:  'Luxury hospitality website for a Coimbatore lounge — cinematic preloader, parallax hero, and immersive gallery.',
    year:  '2025',
    link:  '#',
  },
]

const WorkItem = ({ project, index }) => {
  const itemRef  = useRef(null)
  const lineRef  = useRef(null)

  useEffect(() => {
    // Line reveal on scroll
    gsap.from(lineRef.current, {
      scrollTrigger: { trigger: itemRef.current, start: 'top 85%' },
      scaleX:   0,
      duration: 1,
      ease:     'power4.out',
    })

    gsap.from(itemRef.current.querySelectorAll('.work__item-num, .work__item-title, .work__item-tags, .work__item-meta'), {
      scrollTrigger: { trigger: itemRef.current, start: 'top 82%' },
      y:       30,
      opacity: 0,
      stagger: 0.07,
      duration: 0.8,
      ease:    'power3.out',
    })
  }, [])

  return (
    <article ref={itemRef} className="work__item">
      <div ref={lineRef} className="work__item-line" />

      <a href={project.link} className="work__item-inner" data-cursor="hover">
        <span className="work__item-num">{project.num}</span>

        <div className="work__item-body">
          <h3 className="work__item-title">{project.title}</h3>
          <p className="work__item-desc">{project.desc}</p>
          <ul className="work__item-tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="work__item-meta">
          <span className="work__item-year">{project.year}</span>
          <span className="work__item-arrow">↗</span>
        </div>
      </a>
    </article>
  )
}

const Work = () => {
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      y:       50,
      opacity: 0,
      duration: 1,
      ease:    'power4.out',
    })
  }, [])

  return (
    <section className="work" id="work">
      <div className="container">
        <div className="work__header">
          <span className="work__index">— 02</span>
          <h2 ref={headingRef} className="work__heading">Selected Work</h2>
        </div>

        <div className="work__list">
          {projects.map((p, i) => (
            <WorkItem key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
