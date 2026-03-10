"use client"

import Image from "next/image"
import aboutImg from "../../../public/images/about-img.png"
import styles from "./About.module.css"


export default function AboutSection() {

  const values = [
    {
      icon: "◎",
      title: "Strategy First",
      desc: "Every campaign starts with deep research & a custom growth blueprint."
    },
    {
      icon: "◈",
      title: "Creative That Converts",
      desc: "Visuals and copy engineered to stop the scroll and drive action."
    },
    {
      icon: "◉",
      title: "Data-Driven Always",
      desc: "Real-time analytics, A/B testing, and continuous optimisation."
    }
  ]

  const tickerItems = [
    "SEO","·","Paid Media","·","Social Strategy","·","Content Marketing","·",
    "Web Design","·","Email Funnels","·","Analytics","·","Brand Identity","·",
    "SEO","·","Paid Media","·","Social Strategy","·","Content Marketing","·",
    "Web Design","·","Email Funnels","·","Analytics","·","Brand Identity","·"
  ]

  return (
    <section className={styles.ab}>

      <div className={styles["ab-bg"]}>

        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
          alt="about"
          className={styles["ab-bg-img"]}
        />

        <div className={styles["ab-bg-overlay"]} />
        <div className={`${styles["ab-orb"]} ${styles["ab-orb-1"]}`} />
        <div className={`${styles["ab-orb"]} ${styles["ab-orb-2"]}`} />
        <div className={`${styles["ab-orb"]} ${styles["ab-orb-3"]}`} />
        <div className={styles["ab-grid"]} />

      </div>

      <div className={styles["ab-wrap"]}>

        <div className={styles["ab-eyebrow"]}>
          <div className={styles["ab-eyebrow-line"]} />
          <span>Who We Are</span>
          <div className={styles["ab-eyebrow-line"]} />
        </div>

        <div className={styles["ab-hero-text"]}>
          <h2 className={styles["ab-title"]}>
            Your Brand Deserves
            <br />
            More Than <em>Clicks.</em>
          </h2>

          <p className={styles["ab-tagline"]}>
            We build digital ecosystems that convert attention into revenue.
          </p>
        </div>

        <div className={styles["ab-split"]}>

          {/* IMAGE CARD */}
          <div className={styles["ab-img-card"]}>

            <Image
              src={aboutImg}
              alt="Team working"
              className={styles["ab-card-img"]}
            />

            <div className={styles["ab-card-badge"]}>
              <span className={styles["ab-badge-num"]}>7+</span>
              <span className={styles["ab-badge-txt"]}>
                Years of <br/> Excellence
              </span>
            </div>

            <div className={styles["ab-card-glow"]} />

          </div>

          {/* CONTENT */}
          <div className={styles["ab-content"]}>

            <p className={styles["ab-para"]}>
              We're not a typical agency. We're a <strong>growth partner</strong> — obsessed
              with data, driven by creativity, and relentless in our pursuit of results that
              actually move the needle.
            </p>

            <p className={styles["ab-para"]}>
              From startups finding their voice to enterprises scaling globally, we craft
              strategies that are bold, intentional, and built to last.
            </p>

            <div className={styles["ab-values"]}>
              {values.map((v) => (
                <div className={styles["ab-val-item"]} key={v.title}>

                  <span className={styles["ab-val-icon"]}>{v.icon}</span>

                  <div>
                    <strong className={styles["ab-val-title"]}>
                      {v.title}
                    </strong>

                    <p className={styles["ab-val-desc"]}>
                      {v.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            <button className={styles["ab-btn"]}>
              Discover Our Story →
            </button>

          </div>

        </div>

        {/* TICKER */}
        <div className={styles["ab-ticker"]}>

          <div className={styles["ab-ticker-track"]}>
            {tickerItems.map((item, i) => (
              <span
                key={i}
                className={item === "·" ? styles["ab-dot"] : styles["ab-tick-item"]}
              >
                {item}
              </span>
            ))}
          </div>

        </div>

      </div>

    </section>
  )
}