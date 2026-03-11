"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./AboutPage.module.css";

// ─── Inline SVG Icons (no library needed) ─────────────────
const IconHome = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 01-2-2V5h4"/><path d="M18 9h2a2 2 0 002-2V5h-4"/>
    <path d="M6 5h12v5a6 6 0 01-12 0V5z"/><path d="M9 20h6"/><path d="M12 16v4"/>
    <path d="M8 20h8"/>
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconSmile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconHandshake = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4v5l4 4-4 4v5"/><path d="M20 4v5l-4 4 4 4v5"/>
    <path d="M8 12h8"/>
  </svg>
);
const IconAward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconTarget = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconEye = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconUserCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
  </svg>
);
const IconHeadphones = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0118 0v6"/>
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z"/>
    <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/>
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
// Industry icons
const IconPlane = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2 3.3 6.7l4 3-1 2-2-1-1.5 1.5 3 3 3 3 1.5-1.5-1-2 3-1 3 4 1.5-1.5z"/>
  </svg>
);
const IconHotel = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-5h6v5"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M16 11h.01"/>
  </svg>
);
const IconCart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);
const IconGrad = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────
const stats = [
  { icon: <IconClock />, number: "7+",      label: "Years of Experience" },
  { icon: <IconUsers />, number: "100+",    label: "Expert Team Members" },
  { icon: <IconSmile />, number: "2000+",   label: "Satisfied Clients" },
  { icon: <IconMonitor />, number: "1000+", label: "Active Softwares" },
  { icon: <IconChart />, number: "95%",     label: "Client Retention Rate" },
  { icon: <IconStar />, number: "5★",       label: "Star Rating" },
  { icon: <IconHandshake />, number: "150+",label: "Business Partners" },
  { icon: <IconAward />, number: "Best",    label: "Development Company" },
];

const services = [
  "CRM Software", "PPC Management",
  "SEO Services", "E-Commerce Website",
  "SMO Services", "WhatsApp Marketing",
  "Email Marketing", "Performance Marketing",
];

const values = [
  { icon: <IconUserCheck />,  name: "Trained Professionals",  desc: "Our team comprises skilled and certified digital marketing professionals with hands-on expertise across every domain we serve." },
  { icon: <IconHeadphones />, name: "24/7 Technical Support",  desc: "Round-the-clock support ensures your campaigns and websites are always running. Our support executives are just a call away." },
  { icon: <IconShield />,     name: "Work Transparency",       desc: "We believe in complete transparency — from strategy to execution. You'll always know exactly what we're doing and why." },
  { icon: <IconLayers />,     name: "Team Effort",             desc: "Every project is backed by a coordinated team effort. No siloed work — just seamless collaboration for your growth." },
  { icon: <IconChart />,      name: "Proven Track Record",     desc: "7+ years and 2000+ satisfied clients speak for themselves. We consistently deliver results that matter for businesses." },
  { icon: <IconStar />,       name: "Ethical Work Practices",  desc: "We follow white-hat, ethical approaches in all our services — ensuring long-term sustainable growth for your business." },
];

const industries = [
  { icon: <IconPlane />,    name: "Travel & Tour" },
  { icon: <IconHotel />,    name: "Hotel & Hospitality" },
  { icon: <IconBuilding />, name: "Real Estate" },
  { icon: <IconCart />,     name: "E-Commerce" },
  { icon: <IconGrad />,     name: "Education" },
  { icon: <IconHeart />,    name: "Healthcare" },
];

// ─── Page ─────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>

      {/* ═══ HERO BANNER ═══ */}
      <section className={styles.heroBanner}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              <IconHome /> Home
            </Link>
            <span className={styles.breadcrumbSep}><IconChevron /></span>
            <span className={styles.breadcrumbCurrent}>About Us</span>
          </nav>

          <p className={styles.heroTag}>
            <span className={styles.heroDot} />
            Digital Marketing Company in Jaipur
          </p>
          <h1 className={styles.heroTitle}>
            About <em>G Digital India</em><br />— We Commit, We Deliver
          </h1>
          <p className={styles.heroDesc}>
            A reputed and well-established Digital Marketing, Website Design &amp;
            Development company based in Jaipur, Rajasthan — empowering businesses
            to thrive online since 2017.
          </p>
        </div>
        <div className={styles.heroBgText} aria-hidden="true">GDI</div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className={styles.mainContent}>

        {/* WHO WE ARE */}
        <div className={styles.whoWeAre}>
          <div>
            <span className={styles.sectionTag}>Who We Are</span>
            <h2 className={styles.sectionTitle}>
              Digital Marketing Company<br />in India
            </h2>
            <p className={styles.sectionText}>
              At G Digital India, we are determined to provide the best-in-class Website
              Development, Social Media Marketing, and all types of IT solutions for
              businesses. We dont just deliver a product — we believe in building
              long-term relationships with our clients.
            </p>
            <p className={styles.sectionText}>
              Our enthusiastic team has established itself as a pioneer in digital
              marketing services. From Google Ads and SEO to custom CRM software,
              our experts use creativity and proven strategies to grow your business online.
            </p>
            <div className={styles.motto}>We Commit, We Deliver</div>
            <div className={styles.servicesList}>
              {services.map((s) => (
                <div key={s} className={styles.serviceTag}>
                  <span className={styles.serviceIcon}><IconCheck /></span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="G Digital India Team"
              width={620} height={310}
              className={styles.imgMain}
            />
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
              alt="Digital Marketing"
              width={300} height={190}
              className={styles.imgSecond}
            />
            <div className={styles.badgeFloat}>
              <div className={styles.badgeIconWrap}><IconTrophy /></div>
              <div className={styles.badgeTextWrap}>
                <strong>Awarded</strong>
                <span>Best Development Company</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statIconWrap}>{s.icon}</div>
              <div className={styles.statNumber}>{s.number}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* MISSION & VISION */}
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvIconWrap}><IconTarget /></div>
            <h3 className={styles.mvTitle}>Our Mission</h3>
            <p className={styles.mvText}>
              Our mission is to empower businesses of all sizes to thrive in the digital era
              by providing comprehensive and results-driven digital marketing solutions. We are
              committed to delivering exceptional value through innovative strategies,
              cutting-edge technologies, and a relentless pursuit of excellence.
            </p>
          </div>
          <div className={styles.mvCard}>
            <div className={styles.mvIconWrap}><IconEye /></div>
            <h3 className={styles.mvTitle}>Our Vision</h3>
            <p className={styles.mvText}>
              Our vision is to empower businesses to thrive in the digital landscape by
              delivering innovative, data-driven strategies and cutting-edge solutions. We
              envision a future where brands harness the full potential of digital marketing
              to connect with their audience and achieve remarkable growth.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <section className={styles.valuesSection}>
          <span className={styles.sectionTag}>Why Choose Us</span>
          <h2 className={styles.sectionTitle}>What Makes G Digital India Stand Out</h2>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.name} className={styles.valueCard}>
                <div className={styles.valueIconWrap}>{v.icon}</div>
                <div>
                  <p className={styles.valueName}>{v.name}</p>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className={styles.industriesSection}>
          <span className={styles.sectionTag}>Industries We Serve</span>
          <h2 className={styles.sectionTitle}>Powering Growth Across Sectors</h2>
          <div className={styles.industriesGrid}>
            {industries.map((ind) => (
              <div key={ind.name} className={styles.industryCard}>
                <div className={styles.industryIconWrap}>{ind.icon}</div>
                <p className={styles.industryName}>{ind.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Ready to Grow Your Business Online?</h3>
          <p className={styles.ctaDesc}>
            Lets build something great together. Our team is ready to help you
            dominate the digital space.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>
            Contact Us Today <IconArrow />
          </Link>
        </div>

      </div>
    </main>
  );
}