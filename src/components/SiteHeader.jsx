import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { navigation } from '../data.js'
import { BrandMark } from './BrandMark.jsx'

export function SiteHeader({ theme, setTheme, reduceMotion }) {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-26% 0px -58% 0px', threshold: [0, 0.1, 0.35, 0.65, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Saad Developer, home">
          <span className="brand-mark"><BrandMark className="brand-mark__icon" /></span>
          <span className="brand-wordmark">SAAD <span>DEVELOPER</span></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href }) => (
            <a
              href={href}
              className={`nav-link${activeSection === href.slice(1) ? ' is-active' : ''}`}
              aria-current={activeSection === href.slice(1) ? 'location' : undefined}
              key={href}
            >
              {label}
              {activeSection === href.slice(1) && (
                <motion.span
                  className="nav-active-line"
                  layoutId="nav-active-line"
                  transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>
          <a className="header-contact" href="#contact">
            <span>Let’s talk</span><ArrowUpRight size={15} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: 'easeOut' }}
          >
            <div className="mobile-nav-inner">
              {navigation.map(({ label, href }, index) => (
                <a
                  className={`mobile-nav-link${activeSection === href.slice(1) ? ' is-active' : ''}`}
                  href={href}
                  key={href}
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span>{label}</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
