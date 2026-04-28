"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useEnquiry } from "../../context/EnquiryContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // For mobile toggle
  const [megaMenuData, setMegaMenuData] = useState<{ category: any, services: any[] }[]>([]);
  const { openModal } = useEnquiry();

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const [catRes, svcRes] = await Promise.all([
          fetch('/api/service-categories'),
          fetch('/api/services')
        ]);
        if (catRes.ok && svcRes.ok) {
          const categories = await catRes.json();
          const services = await svcRes.json();
          
          const grouped = categories.map((cat: any) => ({
            category: cat,
            services: services.filter((s: any) => s.category === cat.name)
          }));
          setMegaMenuData(grouped);
        }
      } catch (e) {
        console.error("Failed to load mega menu", e);
      }
    }
    fetchMenuData();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles["navbar-logo"]}>
          <Link href="/">
            <Image src={logo} alt="logo" priority />
          </Link>
        </div>

        <div className={`${styles["navbar-links"]} ${menuOpen ? styles.open : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          
          {/* Services with Mega Menu */}
          <div className={styles.servicesDropdown}>
            <div 
              className={styles.servicesLink} 
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <i className={`fa-solid fa-chevron-down ${styles.dropdownIcon}`}></i>
            </div>
            
            <div className={`${styles.megaMenu} ${servicesOpen ? styles.mobileMegaMenuOpen : ""}`}>
              <div className={styles.megaMenuContainer}>
                {megaMenuData.map(group => (
                  <div key={group.category._id} className={styles.megaMenuColumn}>
                    <h3 className={styles.megaMenuCategory}>
                      <Link href={`/services-category/${group.category.slug || group.category._id}`} onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                        {group.category.name}
                      </Link>
                    </h3>
                    <ul className={styles.megaMenuList}>
                      {group.services.map(s => (
                        <li key={s._id}>
                          <Link href={`/services/${s.slug}`} onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                            | {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/projects" onClick={() => setMenuOpen(false)}>Our Projects</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          <div className={`${styles["navbar-buttons"]} ${styles["mobile-only"]}`}>
            <button 
              className={styles["btn-filled"]} 
              onClick={() => { openModal(); setMenuOpen(false); }}
            >
              Enquiry Now
            </button>
          </div>
        </div>

        <div className={`${styles["navbar-buttons"]} ${styles["desktop-only"]}`}>
          <button className={styles["btn-filled"]} onClick={openModal}>
            Enquiry Now
          </button>
        </div>

        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    </>
  );
}