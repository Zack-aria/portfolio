import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './Skills.css'

const SKILLS = [
  { name: 'SQL', icon: '🗄️', category: 'Database', level: 88, color: '#22d3ee', desc: 'JOINs avancés, subqueries, GROUP BY, optimisation de requêtes' },
  { name: 'Power BI', icon: '📊', category: 'Visualisation', level: 85, color: '#f59e0b', desc: 'DAX, modélisation, dashboards KPI, slicers interactifs' },
  { name: 'PL/SQL', icon: '⚙️', category: 'Database', level: 75, color: '#a78bfa', desc: 'Procédures stockées, fonctions, triggers, curseurs' },
  { name: 'Python', icon: '🐍', category: 'Langage', level: 70, color: '#4ade80', desc: 'Pandas, NumPy, nettoyage de données, EDA' },
  { name: 'ETL / ELT', icon: '🔄', category: 'Data Engineering', level: 75, color: '#22d3ee', desc: 'Pipelines de données, transformation, chargement en DWH' },
  { name: 'Data Modeling', icon: '📐', category: 'Architecture', level: 82, color: '#f87171', desc: 'Star Schema, Snowflake Schema, tables de faits & dimensions' },
  { name: 'Data Warehouse', icon: '🏗️', category: 'Architecture', level: 78, color: '#fbbf24', desc: 'Conception de DWH, historisation, agrégation' },
  { name: 'KPI & Reporting', icon: '📈', category: 'Métier', level: 85, color: '#34d399', desc: 'Définition des indicateurs, tableaux de bord décisionnels' },
  { name: 'Excel Avancé', icon: '📋', category: 'Visualisation', level: 80, color: '#60a5fa', desc: 'Tableaux croisés dynamiques, formules avancées, Power Query' },
  { name: 'EDA', icon: '🔍', category: 'Analyse', level: 78, color: '#c084fc', desc: 'Analyse exploratoire, statistiques descriptives, corrélations' },
  { name: 'Git / GitHub', icon: '🌿', category: 'Outils', level: 70, color: '#f97316', desc: 'Versioning, branches, collaboration en équipe' },
  { name: 'DAX', icon: '⚡', category: 'Langage', level: 80, color: '#22d3ee', desc: 'Mesures calculées, time intelligence, CALCULATE, FILTER' },
]

/* Roller-coaster heights — wave pattern */
const WAVE = [0, -40, -70, -40, 0, 40, 60, 40, 0, -40, -60, -30]

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const wave = WAVE[index % WAVE.length]

  return (
    <motion.div
      className="skill-card-wrap"
      style={{ y: wave }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.06, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className={`skill-card ${hovered ? 'hovered' : ''}`}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.08, y: -12, rotateZ: 0 }}
        style={{ '--accent': skill.color }}
        animate={!hovered ? { rotateZ: (index % 2 === 0) ? -3 : 3 } : { rotateZ: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Front */}
        <div className="skill-front">
          <div className="skill-icon-wrap">
            <span className="skill-icon">{skill.icon}</span>
            <div className="skill-icon-glow" />
          </div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-category">{skill.category}</div>
          <div className="skill-bar-mini">
            <motion.div
              className="skill-bar-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.05 + 0.3 }}
            />
          </div>
          <div className="skill-level">{skill.level}%</div>
        </div>

        {/* Hover overlay — desc */}
        <motion.div
          className="skill-hover-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="shi-icon">{skill.icon}</div>
          <div className="shi-name">{skill.name}</div>
          <div className="shi-desc">{skill.desc}</div>
          <div className="shi-bar">
            <div className="shi-fill" style={{ width: `${skill.level}%` }} />
          </div>
          <div className="shi-pct">{skill.level}%</div>
        </motion.div>
      </motion.div>

      {/* Track connector */}
      <div className="track-dot" style={{ background: skill.color }} />
    </motion.div>
  )
}

export default function Skills() {
  const trackRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: trackRef })
  const trainX = useTransform(scrollXProgress, [0, 1], ['0%', '92%'])
  const trainXSpring = useSpring(trainX, { stiffness: 80, damping: 20 })

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Compétences</span>
          <h2 className="section-title">Mon Stack <span>Technique</span></h2>
          <div className="section-divider" />
          <p className="section-desc">Faites défiler la piste — survolez chaque carte pour les détails.</p>
        </motion.div>
      </div>

      {/* Roller coaster track */}
      <div className="coaster-outer">
        {/* SVG track curve */}
        <div className="track-svg-wrap" aria-hidden="true">
          <svg viewBox="0 0 1400 160" preserveAspectRatio="none" className="track-svg">
            <defs>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                <stop offset="10%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="90%" stopColor="rgba(34,211,238,0.5)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </linearGradient>
            </defs>
            {/* Rail 1 */}
            <path
              d="M0,80 C60,80 80,40 130,40 C180,40 200,80 250,80 C300,80 320,110 370,120 C420,130 450,80 500,50 C550,20 570,80 620,90 C670,100 700,80 750,60 C800,40 830,110 880,120 C930,130 960,80 1010,60 C1060,40 1100,100 1150,90 C1200,80 1250,40 1300,50 C1350,60 1380,80 1400,80"
              fill="none" stroke="url(#trackGrad)" strokeWidth="2"
            />
            {/* Rail 2 (shadow) */}
            <path
              d="M0,86 C60,86 80,46 130,46 C180,46 200,86 250,86 C300,86 320,116 370,126 C420,136 450,86 500,56 C550,26 570,86 620,96 C670,106 700,86 750,66 C800,46 830,116 880,126 C930,136 960,86 1010,66 C1060,46 1100,106 1150,96 C1200,86 1250,46 1300,56 C1350,66 1380,86 1400,86"
              fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="2"
            />
          </svg>
        </div>

        {/* Scrollable cards */}
        <div className="coaster-track" ref={trackRef}>
          <div className="coaster-cards">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* Train indicator */}
        <div className="train-wrap" aria-hidden="true">
          <motion.div className="train" style={{ left: trainXSpring }}>
            <span>🚂</span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >→</motion.div>
          Faites défiler
        </div>
      </div>
    </section>
  )
}
