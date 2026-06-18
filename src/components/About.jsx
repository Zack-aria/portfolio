import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const KPIS = [
  { num: 2, suffix: '+', label: 'Projets BI' },
  { num: 10, suffix: '+', label: 'Compétences' },
  { num: 4, suffix: ' mois', label: 'Expérience' },
  { num: 3, suffix: '', label: 'Langues' },
]

function KpiCard({ num, suffix, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const numRef = useRef(null)

  useRef(() => {
    if (!inView) return
    let start = null
    const dur = 1400
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      if (numRef.current) numRef.current.textContent = Math.round(e * num) + suffix
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })

  return (
    <motion.div
      ref={ref}
      className="about-kpi card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.35)' }}
    >
      <div className="kpi-num" ref={numRef}>{num}{suffix}</div>
      <div className="kpi-label">{label}</div>
    </motion.div>
  )
}

const TAGS = ['SQL Avancé','PL/SQL','Power BI','DAX','Python','Pandas','NumPy','ETL','Data Warehouse','Star Schema','Snowflake Schema','Excel Avancé','Git/GitHub','EDA']

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--navy-800)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Profil</span>
          <h2 className="section-title">À propos de <span>moi</span></h2>
          <div className="section-divider" />
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p>Junior <strong>Data / BI Analyst</strong> spécialisé en informatique décisionnelle, je transforme des volumes de données brutes en insights actionnables qui alimentent la prise de décision stratégique.</p>
            <p>Maîtrise solide de <strong>SQL avancé</strong>, <strong>Power BI</strong> (DAX, modélisation) et des architectures <strong>Data Warehouse</strong>. Expérimenté dans la conception de processus ETL, la modélisation dimensionnelle (Star Schema, Snowflake) et la définition de KPI à valeur métier.</p>
            <p>En cours de <strong>DUT Informatique Décisionnelle & Statistique</strong> (2024–2026), je suis activement en recherche d'opportunités pour évoluer vers un profil Data confirmé.</p>

            <div className="about-highlights">
              {[
                { icon: '⚡', title: 'Analyse orientée impact', desc: 'KPI business, aide à la décision' },
                { icon: '🗄️', title: 'Data Engineering', desc: 'ETL, modélisation, Data Warehouse' },
                { icon: '📊', title: 'Visualisation', desc: 'Power BI, dashboards interactifs' },
                { icon: '🔍', title: 'Exploration des données', desc: 'EDA, nettoyage, preprocessing' },
              ].map((h, i) => (
                <motion.div
                  key={h.title}
                  className="highlight-card card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="hi-icon">{h.icon}</div>
                  <h4>{h.title}</h4>
                  <p>{h.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="about-langs">
              {[['🇲🇦','Arabe','Natif'],['🇫🇷','Français','Courant'],['🇬🇧','Anglais','Courant']].map(([flag, lang, level]) => (
                <span key={lang} className="lang-badge">
                  <span>{flag}</span> {lang} <span className="lang-level">— {level}</span>
                </span>
              ))}
            </div>
          </motion.div>

          <div className="about-visual">
            <div className="about-kpi-grid">
              {KPIS.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 0.1} />)}
            </div>
            <motion.div
              className="about-tech-strip card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {TAGS.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
