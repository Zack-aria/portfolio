import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Hero.css'

const STATS = [
  { num: 2,  suffix: '+',    label: 'Projets BI' },
  { num: 4,  suffix: ' mois', label: 'Expérience' },
  { num: 3,  suffix: '',      label: 'Langues' },
  { num: 5,  suffix: '+',    label: 'Outils maîtrisés' },
]

function StatCard({ num, suffix, label, delay }) {
  const ref = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let start = null
      const duration = 1600
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 3)
        if (countRef.current) countRef.current.textContent = Math.round(ease * num) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      observer.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [num, suffix])

  return (
    <motion.div
      ref={ref}
      className="hero-stat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="hero-stat-num" ref={countRef}>0{suffix}</div>
      <div className="hero-stat-label">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [8, -8])
  const rotateY = useTransform(springX, [-300, 300], [-8, 8])

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) window.scrollTo({ top: el.offsetTop - 75, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
      </div>

      <div className="container hero-inner">
        {/* Left — text */}
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dot" />
            Disponible · Berrechid, Maroc
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            El Boudali<br /><span className="accent">Zakaria</span>
          </motion.h1>

          <motion.p
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Business Intelligence Analyst · Junior
          </motion.p>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            J'aide les entreprises à <strong>transformer leurs données en décisions</strong> — dashboards Power BI, modélisation Data Warehouse, pipelines ETL.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Voir mes projets
            </button>
            <a href="mailto:ZakariaELBoudali@outlook.com?subject=Opportunité professionnelle" className="btn btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Télécharger CV
            </a>
            <button className="btn btn-ghost" onClick={() => scrollTo('#contact')}>
              Me contacter
            </button>
          </motion.div>

          <div className="hero-stats">
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.5 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <motion.div
          className="hero-photo-wrap"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 800 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="photo-tilt"
            style={{ rotateX, rotateY }}
          >
            {/* Glow rings */}
            <div className="photo-ring ring-1" aria-hidden="true" />
            <div className="photo-ring ring-2" aria-hidden="true" />
            <div className="photo-ring ring-3" aria-hidden="true" />

            {/* Data grid overlay */}
            <div className="photo-grid-overlay" aria-hidden="true" />

            {/* The image */}
            <div className="photo-frame">
              <img
                src="/profile.svg"
                alt="El Boudali Zakaria"
                className="profile-img"
                draggable="false"
              />
              {/* Bottom blur gradient */}
              <div className="photo-blur-bottom" />
              {/* Corner accent */}
              <div className="photo-corner tl" />
              <div className="photo-corner tr" />
              <div className="photo-corner bl" />
              <div className="photo-corner br" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="photo-badge"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="photo-badge-dot" />
              <span>BI Analyst</span>
            </motion.div>

            {/* Floating stat chip */}
            <motion.div
              className="photo-chip"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Power BI · SQL · ETL
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Défiler</span>
      </motion.div>
    </section>
  )
}
