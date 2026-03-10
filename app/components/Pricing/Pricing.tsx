"use client"

import { useState } from "react"
import styles from "./Pricing.module.css"

const pricingPlans = [
  {
    id: "01",
    name: "Starter",
    tag: "For New Brands",
    price: { monthly: 14999, yearly: 11999 },
    color: "#6d9fe8",
    desc: "Perfect for startups and small businesses ready to build their online presence.",
    features: [
      { text: "SEO Audit & On-Page Optimisation", included: true },
      { text: "Google Ads Management (up to ₹50K spend)", included: true },
      { text: "Social Media (2 platforms)", included: true },
      { text: "8 Content Pieces / Month", included: true },
      { text: "Monthly Performance Report", included: true },
      { text: "Dedicated Account Manager", included: false },
      { text: "CRO & Landing Page Design", included: false },
      { text: "Full Funnel Strategy", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "02",
    name: "Growth",
    tag: "Most Popular",
    price: { monthly: 34999, yearly: 27999 },
    color: "#e8b86d",
    desc: "Our most popular plan for scaling brands that want serious, measurable results.",
    features: [
      { text: "Advanced SEO + Link Building", included: true },
      { text: "Google + Meta Ads (up to ₹2L spend)", included: true },
      { text: "Social Media (4 platforms + Reels)", included: true },
      { text: "20 Content Pieces / Month", included: true },
      { text: "Weekly Performance Reports", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "CRO & Landing Page Design", included: true },
      { text: "Full Funnel Strategy", included: false },
    ],
    cta: "Start Growing",
    popular: true,
  },
  {
    id: "03",
    name: "Dominator",
    tag: "For Market Leaders",
    price: { monthly: 74999, yearly: 59999 },
    color: "#b86de8",
    desc: "End-to-end growth engine for enterprises ready to dominate their market.",
    features: [
      { text: "Full-Scale SEO + PR Outreach", included: true },
      { text: "Omnichannel Ads (No spend cap)", included: true },
      { text: "Social Media (All platforms)", included: true },
      { text: "Unlimited Content Production", included: true },
      { text: "Real-Time Analytics Dashboard", included: true },
      { text: "Dedicated Senior Strategist", included: true },
      { text: "CRO + Full Website Management", included: true },
      { text: "Custom Full Funnel Strategy", included: true },
    ],
    cta: "Let's Dominate",
    popular: false,
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState("monthly")

  return (
    <section className={styles.pr}>
      
      {/* Background */}
      <div className={styles["pr-bg"]}>
        <div className={styles["pr-bg-grid"]} />
        <div className={`${styles["pr-orb"]} ${styles["pr-orb-1"]}`} />
        <div className={`${styles["pr-orb"]} ${styles["pr-orb-2"]}`} />
        <div className={`${styles["pr-orb"]} ${styles["pr-orb-3"]}`} />
      </div>

      <div className={styles["pr-wrap"]}>

        {/* Header */}
        <div className={styles["pr-header"]}>

          <div className={styles["pr-eyebrow"]}>
            <div className={styles["pr-eyebrow-line"]} />
            <span>Pricing Plans</span>
            <div className={styles["pr-eyebrow-line"]} />
          </div>

          <h2 className={styles["pr-title"]}>
            Transparent Pricing.<br />
            <em>Extraordinary Results.</em>
          </h2>

          <p className={styles["pr-subtitle"]}>
            No hidden fees. No lock-ins. Just pure growth.
          </p>

          {/* Billing Toggle */}
          <div className={styles["pr-toggle"]}>

            <button
              className={`${styles["pr-toggle-btn"]} ${
                billing === "monthly" ? styles["pr-toggle-active"] : ""
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>

            <div
              className={styles["pr-toggle-track"]}
              onClick={() =>
                setBilling(billing === "monthly" ? "yearly" : "monthly")
              }
            >
              <div
                className={`${styles["pr-toggle-thumb"]} ${
                  billing === "yearly" ? styles["pr-toggle-thumb-on"] : ""
                }`}
              />
            </div>

            <button
              className={`${styles["pr-toggle-btn"]} ${
                billing === "yearly" ? styles["pr-toggle-active"] : ""
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              <span className={styles["pr-toggle-save"]}>Save 20%</span>
            </button>

          </div>
        </div>

        {/* Pricing Cards */}
        <div className={styles["pr-grid"]}>

          {pricingPlans.map((plan) => (

            <div
              key={plan.id}
              className={`${styles["pr-card"]} ${
                plan.popular ? styles["pr-card-popular"] : ""
              }`}
            >

              {plan.popular && (
                <div className={styles["pr-popular-badge"]}>
                  <span className={styles["pr-popular-dot"]} />
                  Most Popular
                </div>
              )}

              <div className={styles["pr-card-top"]}>

                <div className={styles["pr-card-header"]}>
                  <span className={styles["pr-card-num"]}>{plan.id}</span>

                  <div>
                    <span className={styles["pr-card-tag"]}>{plan.tag}</span>
                    <h3 className={styles["pr-card-name"]}>{plan.name}</h3>
                  </div>
                </div>

                <div className={styles["pr-price"]}>
                  <span className={styles["pr-currency"]}>₹</span>

                  <span className={styles["pr-amount"]}>
                    {(
                      billing === "monthly"
                        ? plan.price.monthly
                        : plan.price.yearly
                    ).toLocaleString("en-IN")}
                  </span>

                  <span className={styles["pr-period"]}>/mo</span>
                </div>

                {billing === "yearly" && (
                  <p className={styles["pr-billed-note"]}>
                    Billed ₹
                    {(plan.price.yearly * 12).toLocaleString("en-IN")}
                    /year
                  </p>
                )}

                <p className={styles["pr-card-desc"]}>{plan.desc}</p>

              </div>

                <div className={styles["pr-divider"]}>
                <div className={styles["pr-divider-line"]} />
                <span className={styles["pr-divider-text"]}>What&apos;s included</span>
                <div className={styles["pr-divider-line"]} />
              </div>

              <ul className={styles["pr-features"]}>
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className={`${styles["pr-feature"]} ${
                      f.included
                        ? styles["pr-feature-on"]
                        : styles["pr-feature-off"]
                    }`}
                  >
                    <span className={styles["pr-feature-icon"]}>
                      {f.included ? "✓" : "×"}
                    </span>
                    <span className={styles["pr-feature-text"]}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button className={styles["pr-cta"]}>
                {plan.cta}
                <span className={styles["pr-cta-arrow"]}>→</span>
              </button>

              <div className={styles["pr-card-glow"]} />
              <div className={styles["pr-card-border"]} />

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}