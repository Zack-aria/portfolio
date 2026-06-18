import { motion } from 'framer-motion'
import './Education.css'

const EDU = [
  {
    badge: 'En cours', badgeClass: 'ongoing',
    degree: 'DUT Informatique Décisionnelle & Statistique',
    school: 'École Supérieure de Technologie',
    location: 'Fkih Ben Salah, Maroc',
    years: '2024 — 2026',
    tags: ['Data Warehouse','SQL / PL-SQL','Statistiques','Business Intelligence','Python'],
  },
  {
    badge: 'Obtenu', badgeClass: 'done',
    degree: 'Baccalauréat Scientifique — Physique Chimie',
    school: 'Lycée Général El Kettani',
    location: 'Berrechid, Maroc',
    years: '2023 — 2024',
    tags: ['Option Français','Sciences','Mathématiques'],
  },
]

export default function Education() {
  return (
    <section id="education" style={{ background: 'var(--navy-800)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Formation</span>
          <h2 className="section-title">Parcours <span>académique</span></h2>
          <div className="section-divider" />
        </motion.div>

        <div className="edu-grid">
          {EDU.map((e, i) => (
            <motion.div
              key={e.degree}
              className={`edu-card card edu-${e.badgeClass}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.3)' }}
            >
              <span className={`edu-badge ${e.badgeClass}`}>
                {e.badgeClass === 'ongoing' ? '● En cours' : '✓ Obtenu'}
              </span>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-location">📍 {e.location}</div>
              <div className="edu-years">{e.years}</div>
              <div className="edu-tags">
                {e.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
