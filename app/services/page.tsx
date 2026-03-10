"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import styles from "../components/Services/Services.module.css"
import Link from "next/link"

const services = [
  {
    id: "01",
    title: "Search Engine Optimization",
    short: "SEO",
    desc: "Dominate Google rankings with technical SEO, content strategy, and link-building that drives compounding organic traffic — month after month.",
    highlight: "Avg. 340% increase in organic traffic within 6 months",
    tags: ["Technical SEO", "Link Building", "Content Clusters", "Core Web Vitals"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    color: "#e8b86d",
  },
  {
    id: "02",
    title: "Paid Media & Performance Ads",
    short: "PPC",
    desc: "Google Ads, Meta, LinkedIn — we run hyper-targeted campaigns that convert.",
    highlight: "Clients see 8x ROAS on average within 90 days",
    tags: ["Google Ads", "Meta Ads", "Retargeting", "Conversion Tracking"],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop",
    color: "#6d9fe8",
  },
  {
    id: "03",
    title: "Social Media Management",
    short: "SMM",
    desc: "We build communities, not just followers.",
    highlight: "2M+ impressions generated for clients monthly",
    tags: ["Instagram", "LinkedIn", "Reels & Shorts", "Community Growth"],
    img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop",
    color: "#e86d9f",
  },
  {
    id: "04",
    title: "Content Marketing & Copywriting",
    short: "COPY",
    desc: "Words that sell. Blog posts, landing pages, email sequences.",
    highlight: "65% higher engagement vs industry average",
    tags: ["Blog Strategy", "Email Funnels", "Landing Pages", "Brand Voice"],
    img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&auto=format&fit=crop",
    color: "#6de8b8",
  },
  {
    id: "05",
    title: "Web Design & CRO",
    short: "WEB",
    desc: "Beautiful websites that actually convert.",
    highlight: "Average 220% boost in conversion rate post-redesign",
    tags: ["UI/UX Design", "CRO", "Speed Optimisation", "A/B Testing"],
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
    color: "#b86de8",
  },
  {
    id: "06",
    title: "Analytics & Growth Strategy",
    short: "DATA",
    desc: "Data is only powerful when you can read it.",
    highlight: "Full-funnel visibility from Day 1",
    tags: ["GA4 Setup", "Funnel Analysis", "Monthly Reports", "Growth Consulting"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
    color: "#e8d06d",
  },
]

export default function Services() {

  const canvasRef = useRef(null)

  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const svc = services[active]

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.4 + 0.05,
    }))

    const draw = () => {

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const accent = services[active]?.color || "#e8b86d"

      particles.forEach((p) => {

        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)

        ctx.fillStyle =
          accent +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0")

        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }

  }, [active])


  const handleSelect = (idx) => {

    if (idx === active) return

    setAnimating(true)

    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 220)
  }


  return (
    <section className={styles.sv}>

      <canvas ref={canvasRef} className={styles["sv-canvas"]} />

      <div className={styles["sv-wrap"]}>

        <div className={styles["sv-header"]}>

          <div className={styles["sv-header-left"]}>
            <span className={styles["sv-label"]}>What We Do</span>

            <h2 className={styles["sv-heading"]}>
              Services Built for <br />
              <em>Real Growth</em>
            </h2>
          </div>

          <p className={styles["sv-header-desc"]}>
            Six core services. One unified goal — to make your brand the most recognisable.
          </p>

        </div>

        <div className={styles["sv-grid"]}>

          <div className={styles["sv-list"]}>

            {services.map((s, i) => (

              <button
                key={s.id}
                className={`${styles["sv-item"]} ${i === active ? styles["sv-item-active"] : ""}`}
                onClick={() => handleSelect(i)}
                style={{ "--svc-color": s.color }}
              >

                <span className={styles["sv-item-num"]}>{s.id}</span>
                <span className={styles["sv-item-short"]}>{s.short}</span>
                <span className={styles["sv-item-name"]}>{s.title}</span>
                <span className={styles["sv-item-arrow"]}>→</span>

              </button>

            ))}

          </div>

          <div
            className={`${styles["sv-detail"]} ${
              animating ? styles["sv-detail-out"] : styles["sv-detail-in"]
            }`}
            style={{ "--svc-color": svc.color }}
          >

            <div className={styles["sv-detail-img-wrap"]}>

              <img
                src={svc.img}
                alt={svc.title}
                width={600}
                height={400}
                className={styles["sv-detail-img"]}
              />

            </div>

            <div className={styles["sv-detail-body"]}>

              <span className={styles["sv-detail-short"]}>{svc.short}</span>

              <h3 className={styles["sv-detail-title"]}>{svc.title}</h3>

              <p className={styles["sv-detail-desc"]}>{svc.desc}</p>

              <div className={styles["sv-highlight"]}>
                <span className={styles["sv-highlight-bar"]} />
                  <span className={styles["sv-highlight-text"]}>{svc.highlight}</span>
              </div>

              <div className={styles["sv-tags"]}>
                {svc.tags.map((t) => (
                  <span key={t} className={styles["sv-tag"]}>
                    {t}
                  </span>
                ))}
              </div>

              <Link href="/service-detail" className={styles["sv-cta"]}>
                Get Started →
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}