import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const f = e.target
    const name = f.name.value
    const subject = f.subject.value || 'Contact depuis portfolio'
    const message = f.message.value
    const body = `Bonjour Zakaria,\n\nJe vous contacte depuis votre portfolio.\n\nNom : ${name}\n\nMessage :\n${message}`
    window.location.href = `mailto:ZakariaELBoudali@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: 'var(--navy-900)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Travaillons <span>ensemble</span></h2>
          <div className="section-divider" />
          <p className="section-desc">Ouvert aux opportunités de stage, alternance ou premier poste en BI / Data.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Restons en contact</h3>
            <p>Disponible pour discuter de vos besoins data, d'une opportunité professionnelle ou simplement échanger sur la BI.</p>

            {[
              { icon: '✉️', label: 'Email', value: 'ZakariaELBoudali@outlook.com', href: 'mailto:ZakariaELBoudali@outlook.com' },
              { icon: '📞', label: 'Téléphone', value: '+212 680 6951 34', href: 'tel:+212680695134' },
              { icon: '📍', label: 'Localisation', value: 'Berrechid, Maroc', href: null },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <p className="ci-label">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="ci-value">{item.value}</a>
                    : <span className="ci-value">{item.value}</span>
                  }
                </div>
              </div>
            ))}

            <div className="social-links">
              {[
                { label: 'LinkedIn', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { label: 'GitHub', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> },
              ].map(s => (
                <motion.a key={s.label} href="#" className="social-link card" aria-label={s.label}
                  whileHover={{ y: -3, borderColor: 'rgba(34,211,238,0.4)' }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">Nom complet</label>
                  <input id="cf-name" name="name" type="text" placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" placeholder="email@exemple.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cf-subject">Sujet</label>
                <input id="cf-subject" name="subject" type="text" placeholder="Opportunité de stage / Collaboration..." />
              </div>
              <div className="form-group">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" placeholder="Décrivez votre projet ou opportunité..." required />
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary form-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Envoyer le message
              </motion.button>
              {sent && (
                <motion.p className="form-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  ✓ Votre client email s'est ouvert. Merci !
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
