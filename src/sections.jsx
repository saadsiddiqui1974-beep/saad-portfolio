import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Mail,
  MousePointer2,
  Send,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { projects, services, skills } from './data.js'

const easeOut = [0.22, 1, 0.36, 1]

function reveal(reduceMotion, delay = 0) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reduceMotion ? 0.01 : 0.66, delay: reduceMotion ? 0 : delay, ease: easeOut },
  }
}

function SectionHeading({ index, eyebrow, title, description, reduceMotion, headingId, invert = false }) {
  return (
    <motion.div className={`section-heading${invert ? ' section-heading--invert' : ''}`} {...reveal(reduceMotion)}>
      <div className="section-heading__meta">
        <span className="eyebrow"><span className="eyebrow-mark">{index}</span>{eyebrow}</span>
        <span className="section-heading__rule" aria-hidden="true" />
      </div>
      <div className="section-heading__body">
        <h2 id={headingId}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </motion.div>
  )
}

function PrimaryLink({ href, children, secondary = false, reduceMotion }) {
  const moveMagnet = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.055
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const resetMagnet = (event) => { event.currentTarget.style.transform = '' }

  return (
    <a
      className={`button${secondary ? ' button--secondary' : ' button--primary'}`}
      href={href}
      onPointerMove={moveMagnet}
      onPointerLeave={resetMagnet}
    >
      <span>{children}</span><ArrowUpRight size={16} strokeWidth={1.8} />
    </a>
  )
}

function HeroVisual({ reduceMotion }) {
  const orbitTransition = {
    duration: 34,
    ease: 'linear',
    repeat: Infinity,
    repeatType: 'loop',
  }

  return (
    <div className="hero-visual" role="img" aria-label="Abstract motion graphic with a developer console">
      <div className="hero-visual__halo" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <motion.div
        className="orbit orbit--outer"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={orbitTransition}
      >
        <span className="orbit__node orbit__node--one" />
        <span className="orbit__node orbit__node--two" />
        <span className="orbit__dash" />
      </motion.div>
      <motion.div
        className="orbit orbit--inner"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ ...orbitTransition, duration: 47 }}
      >
        <span className="orbit__spark"><Asterisk size={20} /></span>
      </motion.div>

      <motion.div
        className="hero-core"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : 0.2, ease: easeOut }}
      >
        <div className="hero-core__topbar">
          <span className="hero-core__lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="hero-core__filename">digital-experience.jsx</span>
          <Terminal size={14} aria-hidden="true" />
        </div>
        <div className="hero-core__code" aria-label="Code-inspired illustration">
          <p><span className="code-muted">01</span> <span className="code-purple">const</span> <span className="code-blue">experience</span> <span className="code-faint">=</span> <span className="code-purple">create</span><span className="code-faint">({`{`}</span></p>
          <p><span className="code-muted">02</span> &nbsp;<span className="code-blue">clarity</span><span className="code-faint">:</span> <span className="code-green">'always'</span><span className="code-faint">,</span></p>
          <p><span className="code-muted">03</span> &nbsp;<span className="code-blue">details</span><span className="code-faint">:</span> <span className="code-purple">'considered'</span><span className="code-faint">,</span></p>
          <p><span className="code-muted">04</span> &nbsp;<span className="code-blue">delight</span><span className="code-faint">:</span> <span className="code-green">true</span></p>
          <p><span className="code-muted">05</span> <span className="code-faint">{`}`})`}</span></p>
          <div className="code-caret" aria-hidden="true" />
        </div>
        <div className="hero-core__footer">
          <span><span className="online-dot" /> BUILDING FOR THE WEB</span>
          <span>EST. ALWAYS LEARNING</span>
        </div>
      </motion.div>

      <div className="hero-note hero-note--top"><span className="hero-note__line" />THOUGHTFUL BY DESIGN</div>
      <div className="hero-note hero-note--bottom"><Sparkles size={14} strokeWidth={1.6} /> MADE WITH INTENTION</div>
      <div className="hero-coordinate" aria-hidden="true">S / 01<span>•</span> D</div>
    </div>
  )
}

export function HeroSection({ reduceMotion }) {
  return (
    <section id="home" className="hero section-anchor" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.div
            className="eyebrow hero-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : 0.08 }}
          >
            <span className="status-pip" />WEB DEVELOPER · DIGITAL CRAFT
          </motion.div>
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.14, ease: easeOut }}
          >
            <span className="hero-title__line">I BUILD</span>
            <span className="hero-title__line hero-title__line--outline">DIGITAL</span>
            <span className="hero-title__line hero-title__line--accent">EXPERIENCES<span className="hero-title__period">.</span></span>
          </motion.h1>
          <motion.div
            className="hero-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, delay: reduceMotion ? 0 : 0.28, ease: easeOut }}
          >
            <p>Hey, I’m <strong>Saad</strong> — a web developer shaping thoughtful ideas into clear, engaging experiences for the web.</p>
            <div className="hero-actions">
              <PrimaryLink href="#projects" reduceMotion={reduceMotion}>Explore my work</PrimaryLink>
              <PrimaryLink href="#contact" secondary reduceMotion={reduceMotion}>Let’s talk</PrimaryLink>
            </div>
          </motion.div>
          <motion.div
            className="hero-footnote"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.56 }}
          >
            <span>DESIGN-MINDED. DETAIL-DRIVEN.</span>
            <span className="hero-footnote__divider" />
            <span>BUILT FOR THE REAL WORLD.</span>
          </motion.div>
        </div>
        <HeroVisual reduceMotion={reduceMotion} />
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to the About section">
        <span className="scroll-cue__label">SCROLL TO DISCOVER</span>
        <span className="scroll-cue__track"><motion.span animate={reduceMotion ? undefined : { y: [0, 13, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={15} /></motion.span></span>
      </a>
      <div className="hero-index" aria-hidden="true">01 <span>/</span> 06</div>
    </section>
  )
}

export function AboutSection({ reduceMotion }) {
  return (
    <section className="section about-section section-anchor" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="A LITTLE ABOUT ME"
          title={<>Good work starts<br /><span>with good thinking.</span></>}
          description="The best digital experiences feel simple on the surface and thoughtful all the way through."
          reduceMotion={reduceMotion}
          headingId="about-title"
        />
        <div className="about-grid">
          <motion.div className="about-story" {...reveal(reduceMotion, 0.1)}>
            <span className="about-kicker"><span className="about-kicker__star">✳</span> THE PERSON BEHIND THE PIXELS</span>
            <h3>Hi, I’m Saad.<br />I make the web<br /><span>a more useful place.</span></h3>
            <div className="about-copy">
              <p>I’m a web developer drawn to the moment where a good idea becomes something people can actually use. I enjoy shaping clear interfaces, getting the small details right, and building experiences that feel at home on any screen.</p>
              <p>My approach brings design sensibility together with practical frontend and backend development. I believe the most memorable work is the work that feels considered, works beautifully, and makes its purpose easy to understand.</p>
            </div>
            <a href="#services" className="text-link">How I can help <ArrowRight size={15} /></a>
          </motion.div>

          <motion.div className="about-profile" {...reveal(reduceMotion, 0.2)}>
            <div className="profile-card">
              <div className="profile-card__top">
                <div><span className="profile-card__label">A DEVELOPER’S MINDSET</span><h4>Some things<br />I care about.</h4></div>
                <span className="profile-card__asterisk"><Asterisk size={26} /></span>
              </div>
              <div className="profile-principles">
                {[
                  ['01', 'Clarity over clutter'],
                  ['02', 'Details with purpose'],
                  ['03', 'Always keep learning'],
                ].map(([number, label], index) => (
                  <motion.div className="profile-principle" key={number} {...reveal(reduceMotion, 0.24 + index * 0.08)}>
                    <span className="profile-principle__number">{number}</span><span>{label}</span><ArrowUpRight size={15} aria-hidden="true" />
                  </motion.div>
                ))}
              </div>
              <div className="profile-card__footer"><span><span className="online-dot" /> SAAD</span><span>WEB DEVELOPER</span></div>
            </div>
            <div className="about-orbit" aria-hidden="true"><span>S</span><i /></div>
            <span className="profile-caption"><MousePointer2 size={13} /> ALWAYS CURIOUS ABOUT WHAT’S NEXT</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection({ reduceMotion }) {
  return (
    <section className="section services-section section-anchor" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="WHAT I CAN HELP WITH"
          title={<>From first thought<br /><span>to finished experience.</span></>}
          description="Flexible web development for good ideas at every stage — from the first sketch to the final detail."
          reduceMotion={reduceMotion}
          headingId="services-title"
        />
        <div className="services-grid">
          {services.map(({ number, title, description, icon: Icon, tags }, index) => (
            <motion.article className="service-card" key={number} {...reveal(reduceMotion, index % 3 * 0.08)}>
              <div className="service-card__head">
                <span className="service-number">{number} <i>/ 06</i></span>
                <span className="service-icon"><Icon size={19} strokeWidth={1.6} /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="service-card__line" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectArtwork({ visual, name, glyph }) {
  return (
    <div className={`project-art project-art--${visual}`} aria-label={`${name} visual concept`} role="img">
      <div className="project-art__frame">
        <div className="project-browser-bar"><span /><span /><span /><div className="project-browser-url"><i />{name.toLowerCase().replaceAll(' ', '')}.studio</div><div className="project-browser-menu"><i /><i /><i /></div></div>
        <div className={`project-art__canvas project-art__canvas--${visual}`}>
          {visual === 'arc' && (
            <>
              <div className="arc-nav"><span>arc<span className="arc-dot">.</span></span><span>WORK&nbsp; &nbsp; STUDIO&nbsp; &nbsp; ABOUT</span><i><ArrowUpRight size={12} /></i></div>
              <div className="arc-hero"><span>INDEPENDENT DESIGN STUDIO</span><strong>Ideas made<br /><em>tangible.</em></strong><p>Strategy, identity & digital things.</p></div>
              <div className="arc-shape arc-shape--one" /><div className="arc-shape arc-shape--two" /><div className="arc-shape arc-shape--three" />
              <div className="arc-work"><span>SELECTED WORK</span><span>2025 — 2026</span></div>
            </>
          )}
          {visual === 'northstar' && (
            <>
              <div className="north-sidebar"><div className="north-logo">N<span>.</span></div><i /><i /><i /><i /></div>
              <div className="north-main">
                <div className="north-top"><div><span>YOUR WORKSPACE</span><strong>Dashboard overview</strong></div><i /></div>
                <div className="north-stats"><div><span>FOCUS</span><strong>Northstar</strong><i>PERSONAL CONCEPT</i></div><div><span>WORKFLOW</span><strong>Thoughtful</strong><i>MADE FOR CLARITY</i></div></div>
                <div className="north-chart"><div><span>RECENT ACTIVITY</span><span>VISUAL STUDY</span></div><svg viewBox="0 0 300 83" preserveAspectRatio="none" aria-hidden="true"><path d="M0 61 C24 56 35 66 56 48 S85 46 105 51 S132 23 154 36 S178 48 197 31 S220 37 239 20 S271 35 300 7" /><path className="north-chart__shade" d="M0 61 C24 56 35 66 56 48 S85 46 105 51 S132 23 154 36 S178 48 197 31 S220 37 239 20 S271 35 300 7 V83 H0Z" /></svg></div>
              </div>
            </>
          )}
          {visual === 'field' && (
            <>
              <div className="field-nav"><span>form <i>&</i> field</span><span>OBJECTS&nbsp; &nbsp; OUR STORY&nbsp; &nbsp; <b>BAG (0)</b></span></div>
              <div className="field-copy"><span>OBJECTS FOR SLOWER DAYS</span><strong>Make room<br />for <i>good.</i></strong><p>Thoughtful things for everyday living.</p><span className="field-link">DISCOVER THE COLLECTION <ArrowUpRight size={11} /></span></div>
              <div className="field-product field-product--one" /><div className="field-product field-product--two" /><div className="field-ground" />
              <div className="field-stamp"><span>FORM<br />& FIELD</span><Asterisk size={18} /></div>
            </>
          )}
        </div>
        <span className="project-art__number">{glyph}<i>.</i></span>
        <span className="project-art__index">VISUAL STUDY&nbsp; / &nbsp;{visual === 'arc' ? '01' : visual === 'northstar' ? '02' : '03'}</span>
      </div>
      <span className="project-art__glow" aria-hidden="true" />
    </div>
  )
}

function ProjectCard({ project, index, reduceMotion }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const tiltArtwork = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${x * 4}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${y * -4}deg`)
  }
  const resetArtworkTilt = (event) => {
    event.currentTarget.style.removeProperty('--tilt-x')
    event.currentTarget.style.removeProperty('--tilt-y')
  }

  return (
    <motion.article className={`project-card project-card--${project.visual}`} {...reveal(reduceMotion, index * 0.08)}>
      <button
        className="project-preview-button"
        type="button"
        aria-label={`Open ${project.name} project details`}
        aria-expanded={detailsOpen}
        onClick={() => setDetailsOpen((open) => !open)}
        onPointerMove={tiltArtwork}
        onPointerLeave={resetArtworkTilt}
      >
        <ProjectArtwork visual={project.visual} name={project.name} glyph={project.glyph} />
      </button>
      <div className="project-card__body">
        <div className="project-title-line">
          <div><span className="project-category">{project.category}</span><h3>{project.name}<span>.</span></h3></div>
          <button
            type="button"
            className={`project-expand${detailsOpen ? ' is-open' : ''}`}
            onClick={() => setDetailsOpen((open) => !open)}
            aria-expanded={detailsOpen}
            aria-label={`${detailsOpen ? 'Close' : 'Show'} details for ${project.name}`}
          ><ChevronRight size={18} /></button>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-bottom">
          <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="project-placeholder">DEMO + REPO URL TO BE ADDED</span>
        </div>
        <AnimatePresence>
          {detailsOpen && (
            <motion.div
              className="project-details"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
            >
              <p><span>PROJECT NOTE</span>This is an original portfolio concept for a fictional brand. Live demo and repository addresses have not been provided.</p>
              <div><button type="button" disabled title="Add a live demo URL to enable this link"><ExternalLink size={13} />Live demo · add URL</button><button type="button" disabled title="Add a source code URL to enable this link"><Github size={13} />Source · add URL</button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export function ProjectsSection({ reduceMotion }) {
  return (
    <section className="section projects-section section-anchor" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="A FEW EXPLORATIONS"
          title={<>Thoughtful ideas.<br /><span>Realized on screen.</span></>}
          description="A selection of personal visual concepts. Each one explores a different way to make digital feel more human."
          reduceMotion={reduceMotion}
          headingId="projects-title"
        />
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} reduceMotion={reduceMotion} />)}
        </div>
        <motion.p className="projects-note" {...reveal(reduceMotion)}><span className="projects-note__asterisk">✳</span>These are personal design and development concepts. Live deployments and source repositories are not linked yet.</motion.p>
      </div>
    </section>
  )
}

export function SkillsSection({ reduceMotion }) {
  return (
    <section className="section skills-section section-anchor" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="TOOLS OF THE TRADE"
          title={<>A versatile toolkit<br /><span>for the modern web.</span></>}
          description="The technologies and disciplines I use to think, build, and bring the details together."
          reduceMotion={reduceMotion}
          headingId="skills-title"
        />
        <div className="skills-layout">
          <div className="skills-intro">
            <div className="skills-intro__glyph"><Code2 size={29} strokeWidth={1.25} /></div>
            <span className="eyebrow">CURIOUS BY NATURE</span>
            <p>I’m interested in how good ideas become useful products. A balanced toolkit helps me think about the whole experience, from the first line of markup to the final responsive detail.</p>
            <div className="skills-intro__footer"><span>CRAFTED WITH CARE</span><span>↗ KEEP EXPLORING</span></div>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div className="skill-card" key={skill.name} {...reveal(reduceMotion, index * 0.035)}>
                <span className={`skill-symbol skill-symbol--${skill.symbol.toLowerCase().replace(/[^a-z0-9]/g, '')}`} aria-hidden="true">{skill.symbol}</span>
                <span className="skill-card__content"><span className="skill-group">{skill.group}</span><strong>{skill.name}</strong></span>
                <ArrowUpRight className="skill-arrow" size={15} strokeWidth={1.6} aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="skills-marquee" {...reveal(reduceMotion)} role="group" aria-label="HTML, CSS, JavaScript, React, Java, Spring Boot, Tailwind CSS, Responsive Web Design">
          {[0, 1].map((copy) => (
            <div className="skills-marquee__track" aria-hidden={copy === 1} key={copy}>
              {['HTML', 'CSS', 'JavaScript', 'React', 'Java', 'Spring Boot', 'Tailwind CSS', 'Responsive Design'].map((name) => <span key={name}>{name}<Asterisk size={11} /></span>)}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactField({ label, name, value, onChange, error, type = 'text', placeholder, multiline = false, maxLength }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className={`form-field${error ? ' has-error' : ''}`}>
      <label htmlFor={name}>{label}<span aria-hidden="true">*</span></label>
      <Tag
        id={name}
        name={name}
        type={multiline ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={multiline ? 4 : undefined}
        required
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
      />
      {error && <span className="field-error" id={`${name}-error`}>{error}</span>}
    </div>
  )
}

export function ContactSection({ reduceMotion }) {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please add your name.'
    if (!values.email.trim()) next.email = 'Please add your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (!values.message.trim()) next.message = 'Please write a message.'
    else if (values.message.trim().length < 20) next.message = 'Add a little more detail (at least 20 characters).'
    setErrors(next)
    return next
  }

  const submitForm = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      setNotice('Please check the fields marked below.')
      return
    }
    setNotice('Your details look good. This form is a preview, so your message has not been sent. Connect an email service to enable delivery.')
  }

  return (
    <section className="section contact-section section-anchor" id="contact" aria-labelledby="contact-title">
      <div className="contact-orb contact-orb--one" aria-hidden="true" /><div className="contact-orb contact-orb--two" aria-hidden="true" />
      <div className="container contact-container">
        <SectionHeading
          index="05"
          eyebrow="HAVE SOMETHING IN MIND?"
          title={<>Let’s make<br /><span>something meaningful.</span></>}
          description="Have a project, a question, or an idea taking shape? I’d love to hear what you’re working on."
          reduceMotion={reduceMotion}
          headingId="contact-title"
          invert
        />

        <div className="contact-grid">
          <motion.div className="contact-copy" {...reveal(reduceMotion, 0.08)}>
            <span className="contact-kicker"><span className="online-dot" /> OPEN THE CONVERSATION</span>
            <p>Share a little about what you have in mind. Once a delivery service is connected, this form can send your message securely.</p>
            <div className="contact-methods">
              <div className="contact-method"><span className="contact-method__icon"><Mail size={17} /></span><span><strong>Email</strong><small>Address not provided</small></span><button className="contact-placeholder" type="button" disabled title="Add an email address to enable email contact">ADD EMAIL</button></div>
              <div className="contact-method"><span className="contact-method__icon"><Send size={17} /></span><span><strong>WhatsApp</strong><small>Number not provided</small></span><button className="contact-placeholder" type="button" disabled title="Add a WhatsApp number to enable WhatsApp contact">ADD NUMBER</button></div>
            </div>
            <div className="contact-location"><Globe2 size={15} /><span>WEB DEVELOPER</span><i /> <span>LOCATION NOT PROVIDED</span></div>
          </motion.div>

          <motion.form className="contact-form" onSubmit={submitForm} noValidate {...reveal(reduceMotion, 0.16)}>
            <div className="contact-form__top"><span>START A CONVERSATION</span><span>FORM 01 / 01</span></div>
            <div className="form-row">
              <ContactField label="Your name" name="name" value={values.name} onChange={updateField} error={errors.name} placeholder="How should I address you?" maxLength={80} />
              <ContactField label="Email address" name="email" value={values.email} onChange={updateField} error={errors.email} type="email" placeholder="you@example.com" maxLength={120} />
            </div>
            <ContactField label="Subject" name="subject" value={values.subject} onChange={updateField} error={errors.subject} placeholder="A little context helps" maxLength={120} />
            <ContactField label="Your message" name="message" value={values.message} onChange={updateField} error={errors.message} placeholder="Tell me a little about what you’re thinking…" multiline maxLength={1200} />
            <div className="contact-form__bottom">
              <p role="status" aria-live="polite">{notice || 'Required fields are marked with an asterisk.'}</p>
              <button className="button button--light" type="submit"><span>Review message</span><ArrowUpRight size={16} /></button>
            </div>
            <p className="form-disclaimer">PREVIEW ONLY · NO MESSAGE WILL BE SENT FROM THIS PAGE</p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#home" aria-label="Saad Developer, back to home"><span className="brand-mark" aria-hidden="true">S<span>.</span></span><span className="brand-wordmark">SAAD <span>DEVELOPER</span></span></a>
            <p>Thoughtful websites.<br />Made with intention.</p>
          </div>
          <div className="footer-nav-block"><span className="footer-label">EXPLORE</span><nav aria-label="Footer navigation">{['About', 'Services', 'Projects', 'Skills', 'Contact'].map((name) => <a href={`#${name.toLowerCase()}`} key={name}>{name}<ArrowUpRight size={12} /></a>)}</nav></div>
          <div className="footer-social-block"><span className="footer-label">AROUND THE WEB</span><p>Social profile links<br />to be added.</p><div className="footer-social-placeholder"><span>GITHUB · ADD PROFILE URL</span><span>LINKEDIN · ADD PROFILE URL</span></div></div>
          <a className="footer-top-link" href="#home" aria-label="Back to top"><ArrowUpRight size={19} /></a>
        </div>
        <div className="footer-bottom"><span>© {year} SAAD DEVELOPER</span><span>DESIGNED & BUILT WITH INTENTION <Asterisk size={12} /></span><a href="#home">BACK TO THE TOP <ArrowUpRight size={13} /></a></div>
      </div>
    </footer>
  )
}
