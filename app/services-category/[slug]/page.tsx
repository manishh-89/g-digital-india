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

interface ServiceCategory {
  _id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  contentBlocks: { title: string; text: string; image: string }[];
}

export default function CategoryDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, svcRes] = await Promise.all([
          fetch(`/api/service-categories/${slug}`),
          fetch('/api/services')
        ]);
        
        let fetchedCat = null;
        if (catRes.ok) {
          fetchedCat = await catRes.json();
          setCategory(fetchedCat);
        }
        
        if (svcRes.ok && fetchedCat) {
          const allServices = await svcRes.json();
          setRelatedServices(allServices.filter((s: any) => s.category === fetchedCat.name));
        }
      } catch (err) {
        console.error("Error fetching category data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (!category) return <div style={{ padding: '100px', textAlign: 'center' }}>Category not found</div>;

  return (
    <div className={styles.page}>

      {/* ═══ HERO BANNER ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${category.image})`, opacity: 0.1 }} />
        <div className={styles.heroInner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.bcLink}><IconHome /> Home</Link>
            <span className={styles.bcSep}><IconChevron /></span>
            <span className={styles.bcCurrent}>{category.name}</span>
          </nav>

          <div className={styles.heroTag}>
            <span className={styles.heroDot} /> Category
          </div>
          <h1 className={styles.heroTitle}>
            {category.title || category.name}
          </h1>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.btnPrimary}>
              Get Free Consultation <IconArrow size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TOP FULL WIDTH AREA ═══ */}
      <div className={styles.mainTopFull} style={{ paddingBottom: '70px' }}>
        <div className={styles.topSideBySide}>
          <div className={styles.topContentLeft}>
            <span className={styles.sectionLabel}>About the Category</span>
            <h2 className={styles.contentTitle}>{category.title || category.name}</h2>
            <div 
              className={styles.contentText}
              dangerouslySetInnerHTML={{ __html: category.description || "" }}
            />
          </div>
          {category.image && (
            <div className={styles.topImageRight}>
              <Image
                src={category.image}
                alt={category.title || category.name}
                width={800} height={500}
                className={styles.topImgObj}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        {/* Alternating Content Blocks */}
        {category.contentBlocks && category.contentBlocks.length > 0 && (
          <div className={styles.contentBlocks}>
            {category.contentBlocks.map((block, i) => {
              const isReverse = i % 2 === 0;
              return (
                <div key={i} className={`${styles.contentBlock} ${isReverse ? styles.contentBlockReverse : ""}`}>
                  <div className={styles.blockText}>
                    {block.title && <h3>{block.title}</h3>}
                    <div dangerouslySetInnerHTML={{ __html: block.text }} />
                  </div>
                  {block.image && (
                    <div className={styles.blockImageWrapper}>
                      <Image
                        src={block.image}
                        alt={block.title || "Category Content"}
                        width={600} height={400}
                        className={styles.blockImage}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══ SERVICES IN THIS CATEGORY ═══ */}
      {relatedServices.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <span className={styles.sectionLabel}>Our Services</span>
            <h2 className={styles.contentTitle}>Services in {category.name}</h2>
            <div className={styles.relatedGrid}>
              {relatedServices.map((s) => (
                <Link key={s._id} href={`/services/${s.slug || s._id}`} className={styles.relatedCard}>
                  <Image 
                    src={s.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"} 
                    alt={s.title} 
                    width={600} height={160} 
                    className={styles.relatedCardImg} 
                    style={{ objectFit: 'cover' }} 
                  />
                  <div className={styles.relatedCardBody}>
                    <span className={styles.relatedCardTag}>{s.short}</span>
                    <h3 className={styles.relatedCardTitle}>{s.title}</h3>
                    <p className={styles.relatedCardDesc}>
                      {s.highlight || (s.description && s.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...')}
                    </p>
                    <span className={styles.relatedCardLink}>Read More <IconArrow size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
