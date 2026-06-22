import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Cursor.css'

const Cursor = () => {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const labelRef  = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my

    // Instant dot follow
    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0.05 })
    }

    // Smooth ring follow via RAF
    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      gsap.set(ring, { x: rx, y: ry })
    }
    gsap.ticker.add(tick)

    window.addEventListener('mousemove', onMove)

    // ── Hover effects ──────────────────────────────────────────
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(ring, { scale: 2.2, borderColor: 'var(--accent)', duration: 0.35, ease: 'power3.out' })
          gsap.to(dot,  { scale: 0, duration: 0.2 })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(ring, { scale: 1, borderColor: 'var(--fg)', duration: 0.35, ease: 'power3.out' })
          gsap.to(dot,  { scale: 1, duration: 0.2 })
        })
      })
    }

    // ── Magnetic effect ────────────────────────────────────────
    const addMagnetic = () => {
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect()
          const cx   = rect.left + rect.width  / 2
          const cy   = rect.top  + rect.height / 2
          const dx   = e.clientX - cx
          const dy   = e.clientY - cy

          gsap.to(el, { x: dx * 0.35, y: dy * 0.35, duration: 0.6, ease: 'power3.out' })
          gsap.to(ring, { scale: 1.6, duration: 0.3 })
        })

        el.addEventListener('mouseleave', () => {
          gsap.to(el,   { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
          gsap.to(ring, { scale: 1,   duration: 0.3 })
        })
      })
    }

    // Run after DOM settles
    setTimeout(() => {
      addHover()
      addMagnetic()
    }, 100)

    // Hide on leave, show on enter
    document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }))
    document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }))

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </>
  )
}

export default Cursor
