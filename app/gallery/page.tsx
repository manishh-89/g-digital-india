"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../components/Gallery/Gallery.module.css";

// Gallery ke liye sample data - apne actual images se replace karo
const galleryItems = [
  {
    id: 1,
    title: "Digital India Summit 2024",
    category: "Events",
    src: "/images/gallery-img-1.jpeg",
    tags: ["events"],
  },
  {
    id: 2,
    title: "Tech Innovation Hub",
    category: "Infrastructure",
    src: "/images/gallery-img-2.jpeg",
    tags: ["infrastructure"],
  },
  {
    id: 3,
    title: "Smart City Project",
    category: "Projects",
    src: "/images/gallery-img-3.jpeg",
    tags: ["projects"],
  },
  {
    id: 4,
    title: "Digital Literacy Drive",
    category: "Events",
    src: "/images/gallery-img-4.jpeg",
    tags: ["events"],
  },
  {
    id: 5,
    title: "Broadband Connectivity",
    category: "Infrastructure",
    src: "/images/gallery-img-5.jpeg",
    tags: ["infrastructure"],
  },
  {
    id: 6,
    title: "E-Governance Portal",
    category: "Projects",
    src: "/images/gallery-img-6.jpeg",
    tags: ["projects"],
  },
  {
    id: 7,
    title: "Women in Tech Program",
    category: "Events",
    src: "/images/gallery-img-7.jpeg",
    tags: ["events"],
  },
];

const filters = ["All", "Events", "Infrastructure", "Projects"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className={styles.gallerySection} id="gallery" style={{paddingTop:"150px",}}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Gallery</span>
          <h2 className={styles.title}>
            Moments That <span>Define Us</span>
          </h2>
          <p className={styles.subtitle}>
            Digital India ki journey ke kuch khaas pal — events, projects aur
            milestones jo hamari pehchaan banate hain.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`${styles.filterBtn} ${
                activeFilter === f ? styles.filterBtnActive : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className={styles.grid}>
          {filtered.map((item, index) => {
            const isTall = index % 3 === 0;
            const isWide = index === 4;
            return (
              <div
                key={item.id}
                className={`${styles.gridItem} ${isTall ? styles.gridItemTall : ""} ${
                  isWide ? styles.gridItemWide : ""
                }`}
                onClick={() => setLightboxItem(item)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={900}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <button className={styles.viewBtn}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className={styles.loadMore}>
          <button className={styles.loadMoreBtn}>Load More Photos</button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div className={styles.lightbox} onClick={() => setLightboxItem(null)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxItem(null)}
            >
              ✕
            </button>
            <Image
              src={lightboxItem.src}
              alt={lightboxItem.title}
              width={900}
              height={600}
              className={styles.lightboxImage}
              style={{ objectFit: "contain" }}
            />
            <div className={styles.lightboxInfo}>
              <div>
                <h3 className={styles.lightboxTitle}>{lightboxItem.title}</h3>
                <p className={styles.lightboxCategory}>{lightboxItem.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
