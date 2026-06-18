import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const links = [
  { href: '#about',      label: 'Profil' },
  { href: '#skills',     label: 'Compétences' },
  { href: '#projects',   label: 'Projets' },
  { href: '#experience', label: 'Expérience' },
  { href: '#education',  label: 'Formation' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container nav-inner">
        <a className="nav-logo" href="#hero" onClick={e => scrollTo(e, '#hero')}>
          <span className="logo-diamond">◈</span> Zakaria<span className="logo-dot">.BI</span>
        </a>

        <ul className="nav-links desktop">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? 'active' : ''}
                onClick={e => scrollTo(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={e => scrollTo(e, '#contact')}>
              Contact
            </a>
          </li>
        </ul>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-links mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...links, { href: '#contact', label: 'Contact' }].map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={e => scrollTo(e, l.href)}>{l.label}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
