import { motion } from 'framer-motion'
import './Experience.css'

const JOBS = [
  {
    role: 'Stagiaire Data / Systèmes d\'Information',
    company: 'École Supérieure de Technologie · Fkih Ben Salah',
    period: 'Sept. – Oct. 2025',
    icon: '🏫',
    tasks: [
      "Travail au sein du service de scolarité sur les flux de données administratives",
      "Gestion et traitement des données étudiantes (collecte, nettoyage, mise à jour)",
      "Mise à jour et maintenance des bases de données institutionnelles",
      "Collaboration avec l'équipe administrative pour l'amélioration des processus data",
    ],
  },
  {
    role: 'Stagiaire Data / IT',
    company: 'Freelancer',
    period: 'Juil. – Août 2025',
    icon: '💼',
    tasks: [
      "Stockage et organisation structurée des données (bases de données relationnelles)",
      "Traitement et mise à jour périodique des informations clients et opérationnelles",
      "Participation au développement de solutions digitales orientées données",
      "Gestion des plannings et suivi des livrables data",
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--navy-900)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Parcours</span>
          <h2 className="section-title">Expérience <span>professionnelle</span></h2>
          <div className="section-divider" />
        </motion.div>

        <div className="timeline">
          {JOBS.map((job, i) => (
            <motion.div
              key={job.role}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="tl-dot" aria-hidden="true">
                <div className="tl-dot-inner" />
              </div>
              <motion.div
                className="tl-card card"
                whileHover={{ x: 6, borderColor: 'rgba(34,211,238,0.28)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="tl-header">
                  <div>
                    <div className="tl-role">{job.role}</div>
                    <div className="tl-company">{job.icon} {job.company}</div>
                  </div>
                  <span className="tl-period">{job.period}</span>
                </div>
                <ul className="tl-tasks">
                  {job.tasks.map(t => <li key={t}><span>–</span>{t}</li>)}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
