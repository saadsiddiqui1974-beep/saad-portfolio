import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Loader2 } from 'lucide-react'
import { SiteHeader } from './components/SiteHeader.jsx'
import { AboutSection, ContactSection, Footer, HeroSection, ProjectsSection, ServicesSection, SkillsSection } from './sections.jsx'

function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, visible: false })
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        setState({ progress: maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0, visible: window.scrollY > 640 })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
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
    const hover = (event) => document.documentElement.classList.toggle('custom-cursor-hover', Boolean(event.target.closest('a, button, input, textarea, [data-cursor-hover]')))
    const leave = () => document.documentElement.classList.remove('custom-cursor-on', 'custom-cursor-hover')
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
  return <div className="cursor-layer" aria-hidden="true"><div className="cursor-dot" ref={dotRef} /><div className="cursor-ring" ref={ringRef} /></div>
}

function HeroPointerField({ enabled }) {
  useEffect(() => {
    const root = document.documentElement
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) {
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '50%')
      return
    }
    let frame = 0
    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--pointer-x', `${event.clientX}px`)
        root.style.setProperty('--pointer-y', `${event.clientY}px`)
        const hero = document.querySelector('.hero')
        if (!hero) return
        const rect = hero.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        root.style.setProperty('--hero-tilt-x', `${(y * -3.2).toFixed(2)}deg`)
        root.style.setProperty('--hero-tilt-y', `${(x * 4.2).toFixed(2)}deg`)
      })
    }
    const reset = () => {
      root.style.setProperty('--hero-tilt-x', '0deg')
      root.style.setProperty('--hero-tilt-y', '0deg')
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', reset)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset); reset() }
  }, [enabled])
  return null
}

function LoadingScreen({ reduceMotion }) {
  return <motion.div className="loader-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.42, ease: 'easeInOut' } }} role="status" aria-label="Loading portfolio">
    <div className="loader-mark" aria-hidden="true"><span>S</span></div>
    <div className="loader-name">SAAD <span>DEVELOPER</span></div>
    {!reduceMotion && <Loader2 className="loader-spin" size={16} aria-hidden="true" />}
  </motion.div>
}

function BackToTop({ visible, reduceMotion }) {
  return <AnimatePresence>{visible && <motion.button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })} aria-label="Back to top" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: reduceMotion ? 0.01 : 0.24 }} whileHover={reduceMotion ? undefined : { y: -3 }}><ArrowUp size={17} strokeWidth={1.8} /></motion.button>}</AnimatePresence>
}

export default function App() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)
  const { progress, visible } = useScrollProgress()
  useEffect(() => {
    try { const stored = window.localStorage.getItem('saad-portfolio-theme'); if (stored === 'light' || stored === 'dark') setTheme(stored) } catch {}
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'dark' ? '#080a0e' : '#f2f4f8'
    try { window.localStorage.setItem('saad-portfolio-theme', theme) } catch {}
  }, [theme])
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), reduceMotion ? 80 : 650)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])
  return <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 120, damping: 24 }}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className={`site-shell theme-${theme} min-h-screen`}>
      <div className="scroll-progress" aria-hidden="true"><motion.div className="scroll-progress__bar" style={{ scaleX: progress / 100 }} /></div>
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
      <HeroPointerField enabled={!reduceMotion} />
      <CursorFollower enabled={!reduceMotion} />
      <AnimatePresence>{loading && <LoadingScreen reduceMotion={reduceMotion} />}</AnimatePresence>
    </div>
  </MotionConfig>
}
