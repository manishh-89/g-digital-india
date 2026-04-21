"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "../../service-detail/ServiceDetail.module.css";

// ── Inline SVG Icons ───────────────────────────────────────
const IconHome = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconArrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.15 1.19 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.86-.86a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

// Offer card icons
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconLink = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);
const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

interface Service {
  _id: string;
  title: string;
  slug: string;
  short: string;
  description: string;
  highlight: string;
  tags: string[];
  image: string;
  heroStats: { num: string; label: string }[];
  offers: { title: string; text: string; icon?: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

// Offer icons mapping fallback
const offerIcons = [<IconSearch />, <IconLink />, <IconCode />, <IconMap />];

// ── FAQ Item ───────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button className={`${styles.faqQ} ${open ? styles.faqQActive : ""}`} onClick={() => setOpen(!open)}>
        {q}
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`}><IconPlus /></span>
      </button>
      <div className={`${styles.faqA} ${open ? styles.faqAOpen : ""}`} dangerouslySetInnerHTML={{ __html: a }} />
    </div>
  );
}

export default function DynamicServiceDetail() {
  const params = useParams();
  const idOrSlug = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resSvc, resAll] = await Promise.all([
          fetch(`/api/services/${idOrSlug}`),
          fetch('/api/services')
        ]);
        
        if (resSvc.ok) setService(await resSvc.json());
        if (resAll.ok) setServices(await resAll.json());
      } catch (err) {
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idOrSlug]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (!service) return <div style={{ padding: '100px', textAlign: 'center' }}>Service not found</div>;

  return (
    <div className={styles.page}>

      {/* ═══ HERO BANNER ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${service.image})`, opacity: 0.1 }} />
        <div className={styles.heroInner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.bcLink}><IconHome /> Home</Link>
            <span className={styles.bcSep}><IconChevron /></span>
            <Link href="/services" className={styles.bcLink}>Services</Link>
            <span className={styles.bcSep}><IconChevron /></span>
            <span className={styles.bcCurrent}>{service.short}</span>
          </nav>

          <div className={styles.heroTag}>
            <span className={styles.heroDot} /> {service.short} Services
          </div>
          <h1 className={styles.heroTitle}>
            {service.title}
          </h1>
          <p className={styles.heroDesc}>
            {service.highlight || "Professional solutions tailored to grow your business sustainably."}
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Get Free Consultation <IconArrow size={13} />
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        {service.heroStats && service.heroStats.length > 0 && (
          <div className={styles.heroStats}>
            {service.heroStats.map((s, i) => (
              <div key={i} className={styles.heroStat}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══ MAIN BODY ═══ */}
      <div className={styles.main}>

        {/* ── LEFT CONTENT ── */}
        <div className={styles.content}>

          {/* Section 1 */}
          <span className={styles.sectionLabel}>About the Service</span>
          <h2 className={styles.contentTitle}>{service.title}</h2>
          
          <div 
            className={styles.contentText}
            dangerouslySetInnerHTML={{ __html: service.description }}
          />

          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              width={900} height={450}
              className={styles.contentImg}
              style={{ objectFit: 'cover' }}
            />
          )}

          {/* Section 2 — What We Offer */}
          {service.offers && service.offers.length > 0 && (
            <>
              <span className={styles.sectionLabel} style={{ marginTop: '40px', display: 'block' }}>What We Offer</span>
              <h2 className={styles.contentTitle}>Our {service.short} Solutions</h2>
              <div className={styles.offerGrid}>
                {service.offers.map((o, i) => (
                  <div key={i} className={styles.offerCard}>
                    <div className={styles.offerCardIcon}>{offerIcons[i % offerIcons.length]}</div>
                    <h3 className={styles.offerCardTitle}>{o.title}</h3>
                    <div 
                      className={styles.offerCardText} 
                      dangerouslySetInnerHTML={{ __html: o.text }} 
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section 3 — Process */}
          {service.steps && service.steps.length > 0 && (
            <div className={styles.processSection}>
              <span className={styles.sectionLabel}>Our Process</span>
              <h2 className={styles.contentTitle}>How We Deliver Results</h2>
              <div className={styles.steps}>
                {service.steps.map((s, i) => (
                  <div key={i} className={styles.step}>
                    <div className={styles.stepNum}>0{i + 1}</div>
                    <div>
                      <h4 className={styles.stepTitle}>{s.title}</h4>
                      <div 
                        className={styles.stepText} 
                        dangerouslySetInnerHTML={{ __html: s.text }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4 — FAQ */}
          {service.faqs && service.faqs.length > 0 && (
            <div className={styles.faqSection}>
              <span className={styles.sectionLabel}>FAQs</span>
              <h2 className={styles.contentTitle}>Frequently Asked Questions</h2>
              <div className={styles.faqList}>
                {service.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
              </div>
            </div>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '40px' }}>
            {service.tags?.map(tag => (
              <span key={tag} style={{ background: '#f0f0f0', padding: '5px 12px', borderRadius: '20px', fontSize: '13px' }}>
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Quick Enquiry Form */}
          <div className={styles.sideForm}>
            <h3 className={styles.sideFormTitle}>Get Free Consultation</h3>
            <p className={styles.sideFormSub}>Tell us about your project — we all get back within 24 hours.</p>
            <form action="/api/enquiry" method="POST">
                <input type="hidden" name="service" value={service.title} />
                <div className={styles.formGroup}>
                <input required name="name" className={styles.formInput} type="text" placeholder="Your Name *" />
                </div>
                <div className={styles.formGroup}>
                <input required name="email" className={styles.formInput} type="email" placeholder="Email Address *" />
                </div>
                <div className={styles.formGroup}>
                <input required name="phone" className={styles.formInput} type="tel" placeholder="Phone Number *" />
                </div>
                <div className={styles.formGroup}>
                <textarea name="message" className={styles.formTextarea} placeholder="Your Message..." />
                </div>
                <button type="submit" className={styles.formBtn}>
                Submit Enquiry <IconArrow size={13} />
                </button>
            </form>
          </div>

          {/* Other Services */}
          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Other Services</p>
            <div className={styles.relatedList}>
              {services.filter(s => s._id !== service._id).slice(0, 7).map((s) => (
                <Link key={s._id} href={`/services/${s.slug || s._id}`} className={styles.relatedLink}>
                  {s.title} <IconChevron />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div className={styles.contactCard}>
            <h4 className={styles.contactCardTitle}>Need Immediate Help?</h4>
            <p className={styles.contactCardText}>Our team is available Monday–Saturday, 9AM to 7PM.</p>
            <a href="tel:9116175600" className={styles.phoneLink}>
              <IconPhone /> +91 9116175600
            </a>
            <a href="mailto:info@gdigitalindia.com" className={styles.emailLink}>
              info@gdigitalindia.com
            </a>
          </div>

        </aside>
      </div>

      {/* ═══ RELATED SERVICES ═══ */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedInner}>
          <span className={styles.sectionLabel}>Related Services</span>
          <h2 className={styles.contentTitle}>You Might Also Need</h2>
          <div className={styles.relatedGrid}>
            {services.filter(s => s._id !== service._id).slice(0, 3).map((s) => (
              <Link key={s._id} href={`/services/${s.slug || s._id}`} className={styles.relatedCard}>
                <Image src={s.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"} alt={s.title} width={600} height={160} className={styles.relatedCardImg} style={{ objectFit: 'cover' }} />
                <div className={styles.relatedCardBody}>
                  <span className={styles.relatedCardTag}>{s.short}</span>
                  <h3 className={styles.relatedCardTitle}>{s.title}</h3>
                  <p className={styles.relatedCardText}>{s.highlight || s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
