"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles["navbar-logo"]}>
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>

        <div className={`${styles["navbar-links"]} ${menuOpen ? styles.open : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Our Projects</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact Us</Link>

          <div className={`${styles["navbar-buttons"]} ${styles["mobile-only"]}`}>
            <Link href="#" className={styles["btn-filled"]}>
              Enquiry Now
            </Link>
          </div>
        </div>

        <div className={`${styles["navbar-buttons"]} ${styles["desktop-only"]}`}>
          <Link href="#" className={styles["btn-filled"]}>
            Enquiry Now
          </Link>
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
};

export default Navbar;