"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./Testimonials.module.css"

const testimonials = [
  {
    id: "01",
    name: "Arjun Mehta",
    role: "Founder",
    company: "FreshCart",
    industry: "D2C / Grocery",
    avatar: "AM",
    color: "#6de8b8",
    rating: 5,
    short: "Revenue doubled in 5 months.",
    text: "Before them, we were invisible on Google. They restructured our entire SEO strategy...",
    metric: { val: "420%", label: "Traffic Growth" },
  },
  {
    id: "02",
    name: "Priya Nair",
    role: "CMO",
    company: "NovaPay",
    industry: "Fintech",
    avatar: "PN",
    color: "#6d9fe8",
    rating: 5,
    short: "9x ROAS in the first quarter.",
    text: "We had tried three agencies before...",
    metric: { val: "9x", label: "ROAS Achieved" },
  },
]

const StarRating = ({ count }) => (
  <div className={styles["tm-stars"]}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className={styles["tm-star"]}>
        ★
      </span>
    ))}
  </div>
)

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [animDir, setAnimDir] = useState("next")
  const [animating, setAnimating] = useState(false)

  const autoRef = useRef(null)
  const auroraRef = useRef(null)

  const next = () => {
    const index = (active + 1) % testimonials.length
    goTo(index, "next")
  }

  const prev = () => {
    const index = (active - 1 + testimonials.length) % testimonials.length
    goTo(index, "prev")
  }

  const goTo = (idx, dir) => {
    if (animating || idx === active) return

    setAnimDir(dir)
    setAnimating(true)

    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 320)
  }

  useEffect(() => {
    autoRef.current = setInterval(next, 5500)
    return () => clearInterval(autoRef.current)
  }, [active])

  const resetTimer = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(next, 5500)
  }

  const t = testimonials[active]

  return (
    <section className={styles.tm}>
      {/* Aurora Background */}
      <canvas ref={auroraRef} className={styles["tm-aurora-canvas"]} />

      <div className={styles["tm-wrap"]}>
        {/* Header */}
        <div className={styles["tm-header"]}>
          <div className={styles["tm-eyebrow"]}>
            <div className={styles["tm-eyebrow-line"]} />
            <span>Client Stories</span>
            <div className={styles["tm-eyebrow-line"]} />
          </div>

          <h2 className={styles["tm-title"]}>
            Don't Take Our
            <br />
            <em>Word For It.</em>
          </h2>

          <p className={styles["tm-subtitle"]}>
            Real words from real founders who took the leap.
          </p>
        </div>

        {/* Main testimonial */}
        <div className={styles["tm-stage"]}>
          <button
            className={`${styles["tm-nav"]} ${styles["tm-nav-prev"]}`}
            onClick={() => {
              prev()
              resetTimer()
            }}
          >
            ←
          </button>

          {/* Card */}
          <div
            className={`${styles["tm-card"]} ${
              animating
                ? styles[`tm-card-out-${animDir}`]
                : styles[`tm-card-in-${animDir}`]
            }`}
            style={{ "--tm-color": t.color }}
          >
            <div className={styles["tm-quote-mark"]}>"</div>

            <div className={styles["tm-metric"]}>
              <span className={styles["tm-metric-val"]}>{t.metric.val}</span>
              <span className={styles["tm-metric-lbl"]}>{t.metric.label}</span>
            </div>

            <StarRating count={t.rating} />

            <p className={styles["tm-short"]}>"{t.short}"</p>

            <p className={styles["tm-text"]}>{t.text}</p>

            <div className={styles["tm-author"]}>
              <div className={styles["tm-avatar"]}>
                <span className={styles["tm-avatar-initials"]}>
                  {t.avatar}
                </span>
                <div className={styles["tm-avatar-ring"]} />
              </div>

              <div className={styles["tm-author-info"]}>
                <strong className={styles["tm-author-name"]}>{t.name}</strong>

                <span className={styles["tm-author-role"]}>
                  {t.role}, {t.company}
                </span>

                <span className={styles["tm-author-industry"]}>
                  {t.industry}
                </span>
              </div>

              <div className={styles["tm-company-badge"]}>
                <span>{t.company}</span>
              </div>
            </div>

            <div className={styles["tm-card-glow"]} />
          </div>

          <button
            className={`${styles["tm-nav"]} ${styles["tm-nav-next"]}`}
            onClick={() => {
              next()
              resetTimer()
            }}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className={styles["tm-dots"]}>
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              className={`${styles["tm-dot"]} ${
                i === active ? styles["tm-dot-active"] : ""
              }`}
              style={{ "--tm-color": item.color }}
              onClick={() => {
                goTo(i, i > active ? "next" : "prev")
                resetTimer()
              }}
            />
          ))}
        </div>

        {/* Mini row */}
        <div className={styles["tm-mini-row"]}>
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              className={`${styles["tm-mini"]} ${
                i === active ? styles["tm-mini-active"] : ""
              }`}
              style={{ "--tm-color": item.color }}
              onClick={() => {
                goTo(i, i > active ? "next" : "prev")
                resetTimer()
              }}
            >
              <div className={styles["tm-mini-avatar"]}>
                <span>{item.avatar}</span>
              </div>

              <div className={styles["tm-mini-info"]}>
                <span className={styles["tm-mini-name"]}>{item.name}</span>
                <span className={styles["tm-mini-co"]}>{item.company}</span>
              </div>

              <div className={styles["tm-mini-metric"]}>
                <span>{item.metric.val}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}