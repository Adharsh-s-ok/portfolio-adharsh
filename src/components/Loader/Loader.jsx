import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Loader.css'

const Loader = () => {
  const loaderRef  = useRef(null)
  const barRef     = useRef(null)
  const countRef   = useRef(null)
  const panelsRef  = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()
    const counter = { val: 0 }

    // Animate counter 0 → 100
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.val)
        if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0')
        if (barRef.current)   barRef.current.style.transform = `scaleX(${v / 100})`
      },
    })

    // Split-panel exit
    .to(panelsRef.current, {
      yPercent: -100,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none'
      }
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={loaderRef} className="loader" aria-hidden="true">
      {/* 3 staggered panels */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          className="loader__panel"
          style={{ zIndex: 3 - i }}
        />
      ))}

      <div className="loader__content">
        <div className="loader__counter">
          <span ref={countRef}>000</span>
        </div>
        <div className="loader__bar-wrap">
          <div ref={barRef} className="loader__bar" />
        </div>
        <p className="loader__label">Loading Experience</p>
      </div>
    </div>
  )
}

export default Loader
