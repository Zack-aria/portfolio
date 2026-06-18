import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

/* ── PBI Mockup components ── */
function KpiCard({ label, value, delta, up }) {
  return (
    <div className="pbi-kpi">
      <div className="pbi-kpi-label">{label}</div>
      <div className="pbi-kpi-value">{value}</div>
      {delta && <span className={`pbi-delta ${up ? 'up' : 'down'}`}>{up ? '↑' : '↓'} {delta}</span>}
    </div>
  )
}

function HBar({ label, pct, val, color }) {
  return (
    <div className="hbar-row">
      <div className="hbar-meta"><span>{label}</span><span style={{ color }}>{val}</span></div>
      <div className="hbar-track"><motion.div className="hbar-fill" style={{ background: color }} initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} /></div>
    </div>
  )
}

function MockupSupplyChain() {
  return (
    <div className="pbi-mockup">
      <div className="pbi-topbar">
        <div className="pbi-dot r" /><div className="pbi-dot y" /><div className="pbi-dot g" />
        <span className="pbi-titlebar">📊 Supply Chain Performance · Power BI Desktop</span>
      </div>
      <div className="pbi-kpi-row c4">
        <KpiCard label="Livraison à temps" value="94.2%" delta="+3.1%" up />
        <KpiCard label="Coût logistique" value="1.4M MAD" delta="-8.2%" up={false} />
        <KpiCard label="Stock moyen" value="3 280" delta="Optimal" up />
        <KpiCard label="Délai moyen" value="2.3j" delta="-0.4j" up />
      </div>
      <div className="pbi-charts c2">
        <div className="pbi-panel">
          <div className="pbi-panel-title">Évolution Taux Livraison — 12 mois</div>
          <svg viewBox="0 0 300 72" className="pbi-svg">
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="18" x2="300" y2="18" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <line x1="0" y1="36" x2="300" y2="36" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <line x1="0" y1="54" x2="300" y2="54" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <path d="M0,58 L25,52 L50,46 L75,42 L100,44 L125,36 L150,30 L175,26 L200,22 L225,18 L250,14 L275,11 L300,8 L300,72 L0,72 Z" fill="url(#ag1)" />
            <path d="M0,58 L25,52 L50,46 L75,42 L100,44 L125,36 L150,30 L175,26 L200,22 L225,18 L250,14 L275,11 L300,8" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="300" cy="8" r="3" fill="#22d3ee"/>
            <text x="2" y="70" fill="#64748b" fontSize="7" fontFamily="Inter">Jan</text>
            <text x="138" y="70" fill="#64748b" fontSize="7" fontFamily="Inter">Juil</text>
            <text x="273" y="70" fill="#64748b" fontSize="7" fontFamily="Inter">Déc</text>
          </svg>
        </div>
        <div className="pbi-panel">
          <div className="pbi-panel-title">Score Fournisseurs</div>
          <div style={{ display:'flex',flexDirection:'column',gap:'6px' }}>
            <HBar label="Fournisseur A" pct={96} val="96%" color="#22d3ee" />
            <HBar label="Fournisseur B" pct={88} val="88%" color="#4ade80" />
            <HBar label="Fournisseur C" pct={73} val="73%" color="#fbbf24" />
            <HBar label="Fournisseur D" pct={61} val="61%" color="#f87171" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MockupHR() {
  const dept = [
    { lbl:'IT',    h:80, c:'#22d3ee' },
    { lbl:'RH',    h:65, c:'#4ade80' },
    { lbl:'Vente', h:90, c:'#22d3ee' },
    { lbl:'Fin.',  h:55, c:'#fbbf24' },
    { lbl:'Ops',   h:72, c:'#a78bfa' },
  ]
  return (
    <div className="pbi-mockup">
      <div className="pbi-topbar">
        <div className="pbi-dot r" /><div className="pbi-dot y" /><div className="pbi-dot g" />
        <span className="pbi-titlebar">📊 HR Performance Analytics · Power BI Desktop</span>
      </div>
      <div className="pbi-kpi-row c3">
        <KpiCard label="Turnover Rate" value="8.4%" delta="-2.1%" up={false} />
        <KpiCard label="Performance moy." value="76.8/100" delta="+4.3" up />
        <KpiCard label="Absentéisme" value="3.2%" delta="Objectif" up />
      </div>
      <div className="pbi-charts c3">
        {/* Bar chart */}
        <div className="pbi-panel">
          <div className="pbi-panel-title">Performance par Département</div>
          <div className="bar-chart-mini">
            {dept.map(d => (
              <div key={d.lbl} className="bar-col">
                <motion.div className="bar-fill" style={{ background: d.c }}
                  initial={{ height: 0 }} whileInView={{ height: `${d.h}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span className="bar-lbl">{d.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="pbi-panel">
          <div className="pbi-panel-title">Contrats</div>
          <div className="donut-wrap">
            <svg viewBox="0 0 65 65" className="donut-svg">
              <circle cx="32.5" cy="32.5" r="24" fill="none" stroke="#22d3ee" strokeWidth="9"
                strokeDasharray="87.4 150.8" strokeDashoffset="0" transform="rotate(-90 32.5 32.5)"/>
              <circle cx="32.5" cy="32.5" r="24" fill="none" stroke="#4ade80" strokeWidth="9"
                strokeDasharray="42.2 150.8" strokeDashoffset="-87.4" transform="rotate(-90 32.5 32.5)"/>
              <circle cx="32.5" cy="32.5" r="24" fill="none" stroke="#fbbf24" strokeWidth="9"
                strokeDasharray="21.1 150.8" strokeDashoffset="-129.6" transform="rotate(-90 32.5 32.5)"/>
              <text x="32.5" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Inter">58%</text>
            </svg>
            <div className="donut-legend">
              {[['#22d3ee','CDI 58%'],['#4ade80','CDD 28%'],['#fbbf24','Stage 14%']].map(([c,l]) => (
                <div key={l} className="dl-item"><div className="dl-dot" style={{ background: c }} />{l}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="pbi-panel">
          <div className="pbi-panel-title">Top Employés</div>
          <table className="pbi-table">
            <thead><tr><th>Nom</th><th>Score</th></tr></thead>
            <tbody>
              {[['A. Karimi',96,'#22d3ee'],['S. Benali',91,'#4ade80'],['M. Tazi',87,'#86efac'],['R. Alaoui',79,'#fbbf24']].map(([n,s,c]) => (
                <tr key={n}><td>{n}</td><td><span className="score-pill" style={{ background: c+'22', color: c }}>{s}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Aegis AI Mockup ── */
function MockupAegis() {
  const models = [
    { name: 'Random Forest', score: '94.2%', color: '#22d3ee', w: 94 },
    { name: 'XGBoost',       score: '91.8%', color: '#4ade80', w: 92 },
    { name: 'LightGBM',      score: '89.5%', color: '#a78bfa', w: 90 },
    { name: 'Logistic Reg.', score: '81.3%', color: '#fbbf24', w: 81 },
  ]
  return (
    <div className="pbi-mockup aegis-mockup">
      <div className="pbi-topbar">
        <div className="pbi-dot r" /><div className="pbi-dot y" /><div className="pbi-dot g" />
        <span className="pbi-titlebar">🤖 Aegis AI v2 · Data Science Platform</span>
        <span className="aegis-badge">Ollama · Llama 3</span>
      </div>

      {/* Top KPIs */}
      <div className="pbi-kpi-row c4">
        <KpiCard label="Lignes analysées" value="48 320" delta="+12%" up />
        <KpiCard label="Meilleur modèle" value="RF 94.2%" delta="AutoML" up />
        <KpiCard label="Valeurs manquantes" value="1.8%" delta="-0.6%" up={false} />
        <KpiCard label="Features sélectionnées" value="23 / 41" delta="SHAP" up />
      </div>

      {/* Charts row */}
      <div className="pbi-charts aegis-charts">
        {/* AutoML Leaderboard */}
        <div className="pbi-panel">
          <div className="pbi-panel-title">AutoML Leaderboard</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
            {models.map((m, i) => (
              <div key={m.name} className="aegis-model-row">
                <span className="aegis-rank">#{i+1}</span>
                <span className="aegis-mname">{m.name}</span>
                <div className="aegis-bar-track">
                  <motion.div className="aegis-bar-fill"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.1 }}
                  />
                </div>
                <span className="aegis-score" style={{ color: m.color }}>{m.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature importance bars */}
        <div className="pbi-panel">
          <div className="pbi-panel-title">Feature Importance (SHAP)</div>
          {[
            ['age',        88, '#22d3ee'],
            ['revenue',    75, '#4ade80'],
            ['tenure',     62, '#a78bfa'],
            ['region',     48, '#fbbf24'],
            ['category',   35, '#f87171'],
          ].map(([name, pct, color]) => (
            <div key={name} className="hbar-row" style={{ marginBottom: '5px' }}>
              <div className="hbar-meta"><span>{name}</span><span style={{ color }}>{pct}</span></div>
              <div className="hbar-track">
                <motion.div className="hbar-fill" style={{ background: color }}
                  initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Chat panel */}
        <div className="pbi-panel aegis-chat-panel">
          <div className="pbi-panel-title">Assistant AI · Llama 3</div>
          <div className="aegis-chat">
            <div className="aegis-msg user">Quel modèle recommandes-tu ?</div>
            <div className="aegis-msg bot"><span className="aegis-bot-icon">🤖</span>Random Forest — meilleur F1 score (94.2%) avec faible variance. Risque overfitting limité.</div>
            <div className="aegis-msg user">Explique les features clés</div>
            <div className="aegis-msg bot"><span className="aegis-bot-icon">🤖</span><span style={{color:'#94a3b8',fontSize:'0.58rem'}}>Génération en cours...</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    id: 1,
    tags: ['SQL','Power BI','DAX','ETL','Data Warehouse','Star Schema'],
    title: 'Système décisionnel — Chaîne logistique',
    desc: "Mise en place d'un système BI end-to-end pour l'amélioration de la performance d'une chaîne logistique : du Data Warehouse aux dashboards décisionnels Power BI, avec suivi des KPI livraison, coût et fournisseurs.",
    tasks: [
      "Analyse des données logistiques et identification des gisements de performance",
      "Conception d'un Data Warehouse (modèle en étoile : faits livraisons, dim. produits, fournisseurs, temps)",
      "Développement des processus ETL pour l'alimentation et la transformation",
      "Définition des KPI métier : taux livraison, coût logistique, stock moyen, délai",
      "Création de dashboards décisionnels interactifs (DAX, mesures calculées)",
    ],
    Mockup: MockupSupplyChain,
  },
  {
    id: 2,
    tags: ['SQL','Power BI','DAX','Data Modeling','KPI','Python'],
    title: 'Système RH basé sur la performance',
    desc: "Conception d'un système d'aide à la décision RH permettant de piloter la performance individuelle et collective, suivre le turnover, analyser l'absentéisme et identifier les talents.",
    tasks: [
      "Analyse et nettoyage des données RH multi-sources (Python Pandas)",
      "Modélisation dimensionnelle : faits performance, dim. employés, départements, temps",
      "Définition des KPI RH : turnover rate, performance moyenne, absentéisme, satisfaction",
      "Dashboards Power BI avec segments dynamiques par département, période et contrat",
      "Mesures DAX pour tendance et comparaisons N/N-1",
    ],
    Mockup: MockupHR,
  },
  {
    id: 3,
    tags: ['Python','Flask','React','AutoML','Ollama','Llama 3','Scikit-learn','Plotly','Tailwind'],
    title: 'Aegis AI v2 — Plateforme Data Science full-stack',
    desc: "Application web complète d'analyse de données et de machine learning : upload CSV, profilage automatique, AutoML avec leaderboard, visualisations Plotly, raisonnement IA et assistant conversationnel propulsé par Llama 3 via Ollama.",
    tasks: [
      "Backend Flask avec 5 modules API : overview, reasoning, automl, visual, assistant",
      "AutoML automatique : entraînement multi-modèles (RF, XGBoost, LightGBM) et leaderboard",
      "Intégration Llama 3 via Ollama pour le raisonnement IA et l'assistant conversationnel",
      "Profilage de dataset : dimensions, colonnes, valeurs manquantes, doublons, types",
      "Visualisations Plotly interactives générées dynamiquement depuis les données uploadées",
      "Frontend React + Zustand + Tailwind avec sidebar de navigation multi-pages",
    ],
    Mockup: MockupAegis,
  },
]

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--navy-800)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projets</span>
          <h2 className="section-title">Réalisations <span>BI</span></h2>
          <div className="section-divider" />
          <p className="section-desc">Systèmes décisionnels end-to-end : modélisation, ETL, dashboards Power BI orientés KPI.</p>
        </motion.div>

        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              className="project-card card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ borderColor: 'rgba(34,211,238,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 40px rgba(34,211,238,0.08)' }}
            >
              <p.Mockup />
              <div className="project-info">
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <ul className="project-tasks">
                  {p.tasks.map(t => <li key={t}><span>▸</span>{t}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
