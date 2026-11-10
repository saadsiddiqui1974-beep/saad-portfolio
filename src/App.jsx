import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { BrandMark } from './components/BrandMark.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import {
  AboutSection,
  ContactSection,
  Footer,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from './sections.jsx'

function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, visible: false })

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const next = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
        setState({ progress: Math.min(100, next), visible: window.scrollY > 640 })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return state
}

function CursorFollower({ enabled }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const move = (event) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const point = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
        if (dotRef.current) dotRef.current.style.transform = `${point} translate(-50%, -50%)`
        if (ringRef.current) ringRef.current.style.transform = `${point} translate(-50%, -50%)`
        document.documentElement.classList.add('custom-cursor-on')
      })
    }
    const hover = (event) => {
      const target = event.target.closest('a, button, input, textarea, [data-cursor-hover]')
      document.documentElement.classList.toggle('custom-cursor-hover', Boolean(target))
    }
    const leave = () => {
      document.documentElement.classList.remove('custom-cursor-on', 'custom-cursor-hover')
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', hover, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('custom-cursor-on', 'custom-cursor-hover')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  )
}

function LoadingScreen({ reduceMotion }) {
  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.42, ease: 'easeInOut' } }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader-mark"><BrandMark className="brand-mark__icon" /></div>
      <div className="loader-name">SAAD <span>DEVELOPER</span></div>
      <div className="loader-track" aria-hidden="true"><span /></div>
    </motion.div>
  )
}

function BackToTop({ visible, reduceMotion }) {
  const scrollToTop = () => {
    if (reduceMotion) window.scrollTo(0, 0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
        >
          <ArrowUp size={17} strokeWidth={1.8} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)
  const { progress, visible } = useScrollProgress()

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('saad-portfolio-theme')
      if (stored === 'light' || stored === 'dark') setTheme(stored)
    } catch {
      // Private browsing settings may block storage; the in-memory toggle still works.
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeMeta = document.querySelector('meta[name="theme-color"]')
    if (themeMeta) themeMeta.content = theme === 'dark' ? '#08090d' : '#f2f4f8'
    try {
      window.localStorage.setItem('saad-portfolio-theme', theme)
    } catch {
      // Theme preference remains active for this visit.
    }
  }, [theme])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), reduceMotion ? 80 : 1050)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 120, damping: 24 }}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className={`site-shell theme-${theme} min-h-screen`}>
        <div className="scroll-progress" aria-hidden="true">
          <motion.div className="scroll-progress__bar" style={{ scaleX: progress / 100 }} />
        </div>
        <SiteHeader theme={theme} setTheme={setTheme} reduceMotion={reduceMotion} />
        <main id="main">
          <HeroSection reduceMotion={reduceMotion} />
          <AboutSection reduceMotion={reduceMotion} />
          <ServicesSection reduceMotion={reduceMotion} />
          <ProjectsSection reduceMotion={reduceMotion} />
          <SkillsSection reduceMotion={reduceMotion} />
          <ContactSection reduceMotion={reduceMotion} />
        </main>
        <Footer />
        <BackToTop visible={visible} reduceMotion={reduceMotion} />
        <CursorFollower enabled={!reduceMotion} />
        <AnimatePresence>{loading && <LoadingScreen reduceMotion={reduceMotion} />}</AnimatePresence>
      </div>
    </MotionConfig>
  )
}
