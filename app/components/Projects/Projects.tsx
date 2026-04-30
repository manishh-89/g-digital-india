"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./Projects.module.css"
import Link from "next/link"

const colors = ["#6de8b8", "#6d9fe8", "#e86d9f", "#b86de8"]

export default function Projects({ initialData }: { initialData?: any[] }) {
  const [pjFilter, setPjFilter] = useState("All")
  const [projects, setProjects] = useState<any[]>(initialData || [])
  const [categories, setCategories] = useState<string[]>(["All"])

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const cats = new Set(initialData.map(item => item.category));
      setCategories(["All", ...Array.from(cats) as string[]]);
      return;
    }
    fetch('/api/projects')

      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        
        const mappedData = data.map((p, i) => {
          const displayId = (i + 1).toString().padStart(2, '0');
          // e.g. 0 is large, 1,2,3 are small
          const size = i % 4 === 0 ? 'large' : 'small';
          const color = colors[i % colors.length];

          const stats = Array.isArray(p.stats) 
            ? p.stats.map((s: any) => ({ val: s.value || '', label: s.label || '' })) 
            : [];
            
          const tags = Array.isArray(p.technologies) && p.technologies.length > 0
            ? p.technologies
            : [p.category || 'General'];

          return {
            _originalId: p._id,
            id: displayId,
            size,
            title: p.title || 'Untitled Project',
            category: p.category || 'General',
            desc: p.description || '',
            img: p.image || '/images/project-img-1.jpg',
            color,
            stats,
            tags,
          }
        });
        
        setProjects(mappedData);

        const cats = new Set(mappedData.map(item => item.category));
        setCategories(["All", ...Array.from(cats) as string[]]);
      })
      .catch(console.error);
  }, []);

  const pjFiltered =
    pjFilter === "All"
      ? projects
      : projects.filter((p) => p.category === pjFilter || p.tags.includes(pjFilter))

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
            <span className={styles["pj-count"]}>
              {projects.length < 10 ? `0${projects.length}` : projects.length} Projects
            </span>
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



        {/* Grid */}

        <div className={styles["pj-grid"]}>

          {pjFiltered.map((p) => (

            <div
              key={p._originalId}
              className={`${styles["pj-card"]} ${styles[`pj-card-${p.size}`]}`}
              
            >

              <div className={styles["pj-card-img-wrap"]}>

                <Image
                  src={p.img}
                  alt={p.title}
                  width={900}
                  height={600}
                  className={styles["pj-card-img"]}
                  style={{ objectFit: 'cover' }}
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

                  <div className={styles["pj-card-desc"]} dangerouslySetInnerHTML={{ __html: p.desc }} />

                  <div className={styles["pj-card-stats"]}>

                    {p.stats.slice(0, 3).map((s: any, idx: number) => (

                      <div key={idx} className={styles["pj-stat"]}>
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