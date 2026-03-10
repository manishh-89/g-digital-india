"use client"

import { useState } from "react"
import Image from "next/image"
import styles from "./Projects.module.css"
import Link from "next/link"

const projects = [
  {
    id: "01",
    size: "large",
    title: "FreshCart — 420% Organic Growth in 8 Months",
    category: "SEO",
    desc: "Complete SEO overhaul for a D2C grocery brand.",
    img: "/images/project-img-1.jpg",
    color: "#6de8b8",
    stats: [
      { val: "420%", label: "Traffic Growth" },
      { val: "1.2K", label: "Backlinks Built" },
      { val: "#1", label: "Google Rank" },
    ],
    tags: ["SEO"],
  },
  {
    id: "02",
    size: "small",
    title: "NovaPay — 9x ROAS on Google Ads",
    category: "Paid Ads",
    desc: "Performance campaign for a fintech startup.",
    img: "/images/project-img-2.jpg",
    color: "#6d9fe8",
    stats: [
      { val: "9x", label: "ROAS" },
      { val: "₹2Cr+", label: "Revenue" },
    ],
    tags: ["Paid Ads"],
  },
  {
    id: "03",
    size: "small",
    title: "LuxeWear — Instagram to ₹1Cr/Month",
    category: "Social Media",
    desc: "Built a 180K+ engaged community.",
    img: "/images/project-img-3.jpg",
    color: "#e86d9f",
    stats: [
      { val: "180K+", label: "Followers" },
      { val: "₹1Cr", label: "Monthly Rev" },
    ],
    tags: ["Social Media"],
  },
  {
    id: "04",
    size: "small",
    title: "BuildRight — 310% More Leads via CRO",
    category: "Web Design",
    desc: "Redesigned construction website with CRO.",
    img: "/images/project-img-4.jpg",
    color: "#b86de8",
    stats: [
      { val: "310%", label: "More Leads" },
      { val: "60", label: "Days" },
    ],
    tags: ["Web Design"],
  },
  
]

export default function Projects() {

  const [pjFilter, setPjFilter] = useState("All")

  const pjFiltered =
    pjFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(pjFilter))

  return (
    <section className={styles.pj}>

      <div className={styles["pj-bg"]}>
        <div className={styles["pj-bg-noise"]} />
        <div className={`${styles["pj-bg-line"]} ${styles["pj-bg-line-1"]}`} />
        <div className={`${styles["pj-bg-line"]} ${styles["pj-bg-line-2"]}`} />
        <div className={`${styles["pj-bg-line"]} ${styles["pj-bg-line-3"]}`} />
      </div>

      <div className={styles["pj-wrap"]}>

        {/* Header */}

        <div className={styles["pj-header"]}>

          <div className={styles["pj-header-top"]}>
            <span className={styles["pj-eyebrow"]}>— Our Work</span>
            <span className={styles["pj-count"]}>04 Projects</span>
          </div>

          <div className={styles["pj-header-bottom"]}>
            <h2 className={styles["pj-title"]}>
              Results That <br /> <em>Speak Louder</em>
            </h2>

            <p className={styles["pj-subtitle"]}>
              Real brands. Real strategies. Real growth.
            </p>
          </div>

        </div>

        {/* Filters */}

        <div className={styles["pj-filters"]}>

          {["All", "SEO", "Paid Ads", "Social Media", "Web Design"].map((f) => (

            <button
              key={f}
              onClick={() => setPjFilter(f)}
              className={`${styles["pj-filter"]} ${
                pjFilter === f ? styles["pj-filter-active"] : ""
              }`}
            >
              {f}
            </button>

          ))}

        </div>

        {/* Grid */}

        <div className={styles["pj-grid"]}>

          {pjFiltered.map((p) => (

            <div
              key={p.id}
              className={`${styles["pj-card"]} ${styles[`pj-card-${p.size}`]}`}
              
            >

              <div className={styles["pj-card-img-wrap"]}>

                <Image
                  src={p.img}
                  alt={p.title}
                  width={900}
                  height={600}
                  className={styles["pj-card-img"]}
                />

                <div className={styles["pj-card-img-overlay"]} />

              </div>

              <div className={styles["pj-card-strip"]}>
                <span className={styles["pj-card-cat"]}>{p.category}</span>
                <span className={styles["pj-card-num"]}>{p.id}</span>
              </div>

              <div className={styles["pj-card-hover"]}>

                <div className={styles["pj-card-hover-inner"]}>

                  <span className={styles["pj-card-tag"]}>{p.category}</span>

                  <h3 className={styles["pj-card-title"]}>{p.title}</h3>

                  <p className={styles["pj-card-desc"]}>{p.desc}</p>

                  <div className={styles["pj-card-stats"]}>

                    {p.stats.map((s) => (

                      <div key={s.label} className={styles["pj-stat"]}>
                        <span className={styles["pj-stat-val"]}>{s.val}</span>
                        <span className={styles["pj-stat-lbl"]}>{s.label}</span>
                      </div>

                    ))}

                  </div>

                  <Link href="/projects" className={styles["pj-card-btn"]}>
                    View Case Study →
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className={styles["pj-footer"]}>

          <div className={styles["pj-footer-line"]} />

          <Link href="/projects" className={styles["pj-footer-btn"]}>
            <span>View All Projects</span>
            <span className={styles["pj-footer-btn-icon"]}>↗</span>
          </Link>

          <div className={styles["pj-footer-line"]} />

        </div>

      </div>

    </section>
  )
}