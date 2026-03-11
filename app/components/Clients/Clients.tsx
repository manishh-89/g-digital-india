"use client"

import styles from "./Clients.module.css"

const clientLogos = [
  { name: "FreshCart", industry: "D2C / Grocery", icon: "🛒" },
  { name: "NovaPay", industry: "Fintech", icon: "💳" },
  { name: "LuxeWear", industry: "Fashion", icon: "👗" },
  { name: "BuildRight", industry: "Construction", icon: "🏗️" },
  { name: "EduSpark", industry: "EdTech", icon: "🎓" },
  { name: "ZenSpa", industry: "Wellness", icon: "🧘" },
  { name: "MediCore", industry: "Healthcare", icon: "🏥" },
  { name: "AutoElite", industry: "Automobile", icon: "🚗" },
]

const clientLogos2 = [
  { name: "TechNova", industry: "SaaS / Tech", icon: "💻" },
  { name: "GreenLeaf", industry: "Sustainability", icon: "🌿" },
  { name: "UrbanNest", industry: "Real Estate", icon: "🏠" },
  { name: "SpiceRoute", industry: "F&B / Restaurant", icon: "🍽️" },
  { name: "FitPulse", industry: "Health & Fitness", icon: "💪" },
  { name: "LegalEdge", industry: "Legal Services", icon: "⚖️" },
  { name: "CraftBrew", industry: "Beverage", icon: "🍺" },
  { name: "PixelForge", industry: "Creative Agency", icon: "🎨" },
]

export default function Clients() {
  return (
    <section className={styles.cl}>

      <div className={styles["cl-bg"]}>
        <div className={`${styles["cl-bg-glow"]} ${styles["cl-bg-glow-1"]}`} />
        <div className={`${styles["cl-bg-glow"]} ${styles["cl-bg-glow-2"]}`} />
      </div>

      <div className={styles["cl-wrap"]}>

        {/* Header */}
        <div className={styles["cl-header"]}>
          <div className={styles["cl-header-inner"]}>
            <div className={styles["cl-dash"]} />
            <span className={styles["cl-eyebrow"]}>Trusted By</span>
            <div className={styles["cl-dash"]} />
          </div>

          <h2 className={styles["cl-title"]}>
            Brands That <em>Chose</em> Growth
          </h2>

          <p className={styles["cl-desc"]}>
            From emerging startups to established enterprises — these are the brands
            we helped dominate their markets.
          </p>
        </div>

        {/* Stats */}
        <div className={styles["cl-stats"]}>
          {[
            { val: "150+", label: "Happy Clients" },
            { val: "₹50Cr+", label: "Revenue Generated" },
            { val: "12", label: "Industries Served" },
            { val: "98%", label: "Retention Rate" },
          ].map((s) => (
            <div className={styles["cl-stat"]} key={s.label}>
              <span className={styles["cl-stat-val"]}>{s.val}</span>
              <span className={styles["cl-stat-lbl"]}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Marquee Row 1 */}
        <div className={styles["cl-marquee-wrap"]}>
          <div className={styles["cl-fade-left"]} />
          <div className={styles["cl-fade-right"]} />

          <div className={styles["cl-marquee"]}>
            <div className={`${styles["cl-marquee-track"]} ${styles["cl-track-fwd"]}`}>
              {[...clientLogos, ...clientLogos].map((c, i) => (
                <div className={styles["cl-logo-card"]} key={i}>
                  <div className={styles["cl-logo-inner"]}>
                    <span className={styles["cl-logo-icon"]}>{c.icon}</span>
                    <span className={styles["cl-logo-name"]}>{c.name}</span>
                    <span className={styles["cl-logo-industry"]}>{c.industry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div className={styles["cl-marquee-wrap"]}>
          <div className={styles["cl-fade-left"]} />
          <div className={styles["cl-fade-right"]} />

          <div className={styles["cl-marquee"]}>
            <div className={`${styles["cl-marquee-track"]} ${styles["cl-track-rev"]}`}>
              {[...clientLogos2, ...clientLogos2].map((c, i) => (
                <div className={styles["cl-logo-card"]} key={i}>
                  <div className={styles["cl-logo-inner"]}>
                    <span className={styles["cl-logo-icon"]}>{c.icon}</span>
                    <span className={styles["cl-logo-name"]}>{c.name}</span>
                    <span className={styles["cl-logo-industry"]}>{c.industry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles["cl-bottom"]}>
          <p className={styles["cl-bottom-text"]}>
            Ready to join them?
          </p>

          <button className={styles["cl-cta"]}>
            Start Your Growth Journey →
          </button>
        </div>

      </div>
    </section>
  )
}