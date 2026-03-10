"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./slider.module.css";

export default function Slider() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.slider}>
      <div className={`${styles["sl-wrap"]} ${visible ? styles.in : ""}`}>
        <video autoPlay loop muted playsInline className={styles["sl-video"]}>
          <source src="/videos/company-slider-2.mp4" type="video/mp4" />
        </video>

        <div className={styles["sl-overlay"]}></div>
        <div className={`${styles["sl-corner"]} ${styles["sl-corner-tl"]}`}></div>
        <div className={`${styles["sl-corner"]} ${styles["sl-corner-tr"]}`}></div>
        <div className={`${styles["sl-corner"]} ${styles["sl-corner-bl"]}`}></div>
        <div className={`${styles["sl-corner"]} ${styles["sl-corner-br"]}`}></div>
        <div className={styles["sl-content"]}>
          <span className={styles["sl-tag"]}>Innovation · Design · Growth</span>

          <h1 className={styles["sl-headline"]}>
            Building the <span className={styles["accent"]}>Future</span>
            <br />
            Together
          </h1>

          <p className={styles["sl-sub"]}>
            We craft bold strategies and powerful solutions that help businesses
            grow, scale, and leave a lasting impact.
          </p>

          <div className={styles["sl-btns"]}>
            <button className={styles["sl-btn-primary"]}>Our Work</button>
            <button className={styles["sl-btn-secondary"]}>Contact Us</button>
          </div>
        </div>

        <div className={styles["sl-bottom"]}>
          <span className={styles["sl-scroll-text"]}>Scroll</span>
          <div className={styles["sl-scroll-line"]}></div>
        </div>
      </div>
    </section>
  );
}
