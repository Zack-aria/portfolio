import { motion } from 'framer-motion'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer style={{ background: 'var(--navy-900)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0' }}>
      <div className="container" style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'1rem' }}>
        <p style={{ fontSize:'0.82rem', color:'var(--text-secondary)' }}>
          © 2025 <span style={{ color:'var(--cyan-400)' }}>El Boudali Zakaria</span> · BI Analyst Junior
        </p>
        <p style={{ fontSize:'0.82rem', color:'var(--text-secondary)' }}>
          Construit avec <span style={{ color:'var(--cyan-400)' }}>React</span> + Framer Motion
        </p>
        <motion.button
          onClick={scrollTop}
          style={{ fontSize:'0.82rem', color:'var(--text-secondary)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.3rem' }}
          whileHover={{ color: 'var(--cyan-400)', y: -2 }}
        >
          ↑ Retour en haut
        </motion.button>
      </div>
    </footer>
  )
}
