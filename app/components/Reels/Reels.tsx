"use client"

import { useEffect, useState } from "react"
import styles from "./Reels.module.css"

interface ReelItem {
  _id: string
  url: string
}

export default function Reels() {
  const [reels, setReels] = useState<ReelItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/reels")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setReels(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getEmbedUrl = (url: string) => {
    try {
      // Extract the shortcode from URLs like:
      // https://www.instagram.com/reels/C8Sj_xXSb9y/
      // https://www.instagram.com/reel/C8Sj_xXSb9y/?igsh=...
      const match = url.match(/(?:reels?|p)\/([A-Za-z0-9_-]+)/);
      if (match && match[1]) {
        return `https://www.instagram.com/reel/${match[1]}/embed/`;
      }
      return url;
    } catch (e) {
      return url;
    }
  }

  if (reels.length === 0 && !loading) return null;

  return (
    <section className={styles.reelsSection}>
      <div className={styles.bgGlow} />
      
      <div className={styles.reelsWrap}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Social Proof</span>
          <h2 className={styles.title}>
            Trending <em>Inspiration</em>
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
             <p>Loading trending reels...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {reels.map((reel) => (
              <div className={styles.reelCard} key={reel._id}>
                <div className={styles.iframeWrapper}>
                  <iframe
                    className={styles.iframe}
                    src={getEmbedUrl(reel.url)}
                    scrolling="no"
                    allowTransparency={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
