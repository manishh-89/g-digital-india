"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectsPage.module.css";

// ── Icons ──────────────────────────────────────────────────
const IcHome = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcChevR = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcChevL = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcArrow = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IcEye = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcX = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcExLink = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// ── Projects Data ──────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Battery Nearby",
    category: "Website Design",
    industry: "Automotive",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    desc: "A clean and conversion-focused website for an automotive battery service business, built to drive local leads and walk-in customers.",
    tags: ["UI/UX Design", "Responsive", "Lead Gen"],
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Roopji Caterers",
    category: "Website Design",
    industry: "Food & Catering",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80",
    desc: "A warm and appetizing website for a premium catering brand, showcasing their menu, event packages, and booking process seamlessly.",
    tags: ["Web Design", "Branding", "Menu Showcase"],
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Find My Place",
    category: "Website Design",
    industry: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
    desc: "A property listing and lead capture website for a real estate firm, complete with search filters, property showcases, and agent contact flows.",
    tags: ["Real Estate", "Property Listing", "Lead Forms"],
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Star Car Care Solutions",
    category: "Website Design",
    industry: "Automotive",
    img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80",
    desc: "A professional service portal website for an auto care company, designed to build trust and make booking service appointments effortless.",
    tags: ["Web Design", "Service Portal", "Booking UX"],
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Genix Fertility Care",
    category: "Website Design",
    industry: "Healthcare",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
    desc: "A sensitive, patient-first website for a fertility care clinic — balancing professional credibility with warmth and ease of appointment booking.",
    tags: ["Healthcare", "Patient UX", "Trust Design"],
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Maruti Creation",
    category: "Website Design",
    industry: "Manufacturing",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80",
    desc: "A bold corporate website for a manufacturing brand, showcasing their product range, capabilities, and manufacturing process with clarity.",
    tags: ["Corporate", "Product Catalog", "B2B Design"],
    liveUrl: "#",
  },
  {
    id: 7,
    title: "Kanvas Kidz",
    category: "Website Design",
    industry: "Education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    desc: "A vibrant, child-friendly website for an education brand, designed to engage parents while clearly communicating programs, fees, and admissions.",
    tags: ["Education", "Child-Friendly UI", "Admissions"],
    liveUrl: "#",
  },
  {
    id: 8,
    title: "Sangam Sweet",
    category: "Website Design",
    industry: "Food & Retail",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
    desc: "An appetizing e-commerce style website for a sweet shop brand, driving online orders and showcasing their traditional product range beautifully.",
    tags: ["E-Commerce Design", "Food Brand", "Product Showcase"],
    liveUrl: "#",
  },
  {
    id: 9,
    title: "Sparsh Ortho",
    category: "Website Design",
    industry: "Healthcare",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
    desc: "A trust-focused orthopaedic clinic website with specialist profiles, treatment pages, and a frictionless appointment booking experience for patients.",
    tags: ["Healthcare", "Clinic Website", "Doctor Profiles"],
    liveUrl: "#",
  },
  {
    id: 10,
    title: "SEO Growth Campaign",
    category: "Digital Marketing",
    industry: "E-Commerce",
    img: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=900&q=80",
    desc: "A comprehensive SEO campaign that tripled organic traffic for an e-commerce brand within 6 months through on-page fixes, content, and link-building.",
    tags: ["SEO", "Content Strategy", "Link Building"],
    liveUrl: "#",
  },
  {
    id: 11,
    title: "Meta & Google Ads Drive",
    category: "Digital Marketing",
    industry: "Real Estate",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80",
    desc: "A full-funnel paid advertising campaign combining Meta Ads and Google Ads to generate qualified real estate leads at a dramatically reduced cost-per-lead.",
    tags: ["Meta Ads", "Google Ads", "Performance Marketing"],
    liveUrl: "#",
  },
  {
    id: 12,
    title: "Lead Management CRM",
    category: "CRM & Software",
    industry: "Technology",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    desc: "A custom lead management CRM built for a sales team — with pipeline tracking, follow-up reminders, call logs, and a reporting dashboard.",
    tags: ["CRM", "Custom Software", "Sales Automation"],
    liveUrl: "#",
  },
];

const FILTERS = ["All", "Website Design", "Digital Marketing", "CRM & Software"];

// ── Component ──────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxId, setLightboxId]     = useState<number | null>(null);

  const filtered = useMemo(() =>
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const lbIdx     = lightboxId !== null ? filtered.findIndex((p) => p.id === lightboxId) : -1;
  const lbProject = lbIdx >= 0 ? filtered[lbIdx] : null;

  const goPrev = () => lbIdx > 0 && setLightboxId(filtered[lbIdx - 1].id);
  const goNext = () => lbIdx < filtered.length - 1 && setLightboxId(filtered[lbIdx + 1].id);

  // keyboard nav in lightbox
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft")  goPrev();
    if (e.key === "Escape")     setLightboxId(null);
  };

  return (
    <div className={styles.page} onKeyDown={handleKey} tabIndex={-1}>

      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>

          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.bcLink}><IcHome /> Home</Link>
            <span className={styles.bcSep}><IcChevR /></span>
            <span className={styles.bcCurrent}>Portfolio</span>
          </nav>

          <div className={styles.heroFlex}>
            <div>
              <div className={styles.eyebrow}><span className={styles.dot} /> Our Portfolio</div>
              <h1 className={styles.heroTitle}>
                Work That Speaks<br /><em>Louder Than Words</em>
              </h1>
              <p className={styles.heroDesc}>
                Real projects. Real clients. Real results. Explore our complete portfolio of
                website design, digital marketing, and software projects delivered by G Digital India.
              </p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.hStat}>
                <div className={styles.hStatNum}>200+</div>
                <div className={styles.hStatLabel}>Projects</div>
              </div>
              <div className={styles.hStat}>
                <div className={styles.hStatNum}>2000+</div>
                <div className={styles.hStatLabel}>Clients</div>
              </div>
              <div className={styles.hStat}>
                <div className={styles.hStatNum}>7+</div>
                <div className={styles.hStatLabel}>Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY FILTER BAR ═══ */}
      <div className={styles.filterBar}>
        <div className={styles.filterBarInner}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.fTab} ${activeFilter === f ? styles.fTabActive : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ MAIN ═══ */}
      <main className={styles.main}>
        <div className={styles.countRow}>
          <p className={styles.countText}>
            Showing <span>{filtered.length}</span> projects
            {activeFilter !== "All" && <> in <span>{activeFilter}</span></>}
          </p>
        </div>

        {/* Project List */}
        <div className={styles.projectList}>
          {filtered.map((project, i) => (
            <div key={project.id} className={styles.card}>

              {/* Thumbnail */}
              <div className={styles.cardThumb} onClick={() => setLightboxId(project.id)}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width:700px) 100vw, 340px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.thumbGlow} />
                <span className={styles.thumbIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.categoryBadge}>{project.category}</span>
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardIndustry}>{project.industry}</span>
                    <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.cardDesc}>{project.desc}</p>
                </div>

                <div className={styles.cardBottom}>
                  <div className={styles.cardTags}>
                    {project.tags.map((t) => (
                      <span key={t} className={styles.cardTag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => setLightboxId(project.id)}
                    >
                      <IcEye /> View Preview
                    </button>
                    <a
                      href={project.liveUrl}
                      className={styles.previewBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IcExLink /> Live Site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ═══ CTA ═══ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Want Results Like These?</h2>
          <p className={styles.ctaDesc}>
            Lets discuss your project. Our team is ready to build something
            great for your business too.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>
            Start Your Project <IcArrow />
          </Link>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      {lbProject && (
        <div
          className={styles.lightbox}
          onClick={(e) => e.target === e.currentTarget && setLightboxId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lbProject.title}
        >
          <div className={styles.lbBox}>
            <button className={styles.lbClose} onClick={() => setLightboxId(null)} aria-label="Close">
              <IcX />
            </button>

            <Image
              src={lbProject.img}
              alt={lbProject.title}
              width={1020}
              height={600}
              className={styles.lbImg}
              priority
            />

            <div className={styles.lbMeta}>
              <div className={styles.lbLeft}>
                <p className={styles.lbCategory}>{lbProject.category} · {lbProject.industry}</p>
                <h3 className={styles.lbTitle}>{lbProject.title}</h3>
                <div className={styles.lbTags}>
                  {lbProject.tags.map((t) => (
                    <span key={t} className={styles.lbTag}>{t}</span>
                  ))}
                </div>
              </div>

              <div className={styles.lbRight}>
                <span className={styles.lbCounter}>
                  {lbIdx + 1} / {filtered.length}
                </span>
                <div className={styles.lbNav}>
                  <button className={styles.lbNavBtn} onClick={goPrev} disabled={lbIdx === 0} aria-label="Previous">
                    <IcChevL />
                  </button>
                  <button className={styles.lbNavBtn} onClick={goNext} disabled={lbIdx === filtered.length - 1} aria-label="Next">
                    <IcChevR />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}