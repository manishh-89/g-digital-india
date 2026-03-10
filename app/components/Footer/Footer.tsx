"use client"

import { useState } from "react"
import styles from "./Footer.module.css"

const navLinks = {
Services: ["SEO","Paid Media","Social Media","Content Marketing","Web Design & CRO","Analytics"],
Company: ["About Us","Our Work","Pricing","Careers","Blog","Contact"],
Legal: ["Privacy Policy","Terms of Service","Cookie Policy","Refund Policy"]
}

const socials = [
{ label: "IN", name: "LinkedIn", href: "#" },
{ label: "IG", name: "Instagram", href: "#" },
{ label: "TW", name: "Twitter", href: "#" },
{ label: "YT", name: "YouTube", href: "#" }
]

export default function Footer(){

const [email,setEmail] = useState("")
const [submitted,setSubmitted] = useState(false)

const handleSubmit=(e)=>{
e.preventDefault()
if(!email.trim()) return
setSubmitted(true)
setEmail("")
}

return(

<footer className={styles.ft}>

{/* CTA */}

<div className={styles["ft-cta-band"]}>

<div className={styles["ft-cta-inner"]}>

<div className={styles["ft-cta-left"]}>

<span className={styles["ft-cta-label"]}>
Ready to scale? </span>

<h2 className={styles["ft-cta-heading"]}>
Let's Build Something <br/>
<em>Remarkable.</em>
</h2>

</div>

<div className={styles["ft-cta-right"]}>

<p className={styles["ft-cta-desc"]}>
Book a free 30-min strategy call.
<br/>
Just honest advice on how to grow your brand.
</p>

<button className={styles["ft-cta-btn"]}>
Book a Free Call
<span className={styles["ft-cta-btn-arrow"]}>↗</span> </button>

</div>

</div>

<div className={styles["ft-cta-line"]}/>

</div>

{/* Ticker */}

<div className={styles["ft-ticker"]}>

<div className={styles["ft-ticker-track"]}>

{[
"SEO","✦","Paid Ads","✦","Social Media","✦","Content","✦",
"Web Design","✦","Analytics","✦","Growth Strategy","✦","Branding",
].map((item,i)=>(
<span
key={i}
className={
item==="✦"
? styles["ft-tick-dot"]
: styles["ft-tick-item"]
}

>

{item} </span>
))}

</div>

</div>

{/* BODY */}

<div className={styles["ft-body"]}>

<div className={styles["ft-body-inner"]}>

{/* BRAND */}

<div className={styles["ft-brand-col"]}>

<a href="/" className={styles["ft-logo"]}>
<span className={styles["ft-logo-mark"]}>GDI</span>
<span className={styles["ft-logo-dot"]}/> </a>

<p className={styles["ft-brand-tagline"]}>
We don't just run campaigns.
<br/>
We engineer growth.
</p>

<div className={styles["ft-socials"]}>

{socials.map((s)=>(
<a
key={s.name}
href={s.href}
className={styles["ft-social"]}

>

<span className={styles["ft-social-label"]}>
{s.label} </span>

<span className={styles["ft-social-name"]}>
{s.name} </span>

</a>
))}

</div>

{/* Newsletter */}

<div className={styles["ft-newsletter"]}>

<p className={styles["ft-nl-label"]}>
Growth insights, weekly.
</p>

{submitted ? (

<div className={styles["ft-nl-success"]}>
<span className={styles["ft-nl-check"]}>✓</span>
You're in.
</div>

) : (

<div className={styles["ft-nl-form"]}>

<input
type="email"
className={styles["ft-nl-input"]}
placeholder="[your@email.com](mailto:your@email.com)"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button
className={styles["ft-nl-btn"]}
onClick={handleSubmit}

>

→ </button>

</div>

)}

</div>

</div>

{/* NAV COLS */}

{Object.entries(navLinks).map(([col,links])=>(

<div key={col} className={styles["ft-nav-col"]}>

<h4 className={styles["ft-nav-heading"]}>
{col}
</h4>

<ul className={styles["ft-nav-list"]}>

{links.map((link)=>(

<li key={link}>

<a
href="#"
className={styles["ft-nav-link"]}

>

<span className={styles["ft-nav-link-bar"]}/>

{link}

</a>

</li>
))}

</ul>

</div>

))}

{/* CONTACT */}

<div className={styles["ft-contact-col"]}>

<h4 className={styles["ft-nav-heading"]}>
Contact
</h4>

<div className={styles["ft-contact-list"]}>

<a
href="mailto:hello@gdi.agency"
className={styles["ft-contact-item"]}

>

<span className={styles["ft-contact-icon"]}>✉</span> <span>[hello@gdi.agency](mailto:hello@gdi.agency)</span> </a>

<a
href="tel:+919876543210"
className={styles["ft-contact-item"]}

>

<span className={styles["ft-contact-icon"]}>✆</span> <span>+91 98765 43210</span> </a>

<div className={styles["ft-contact-item"]}>
<span className={styles["ft-contact-icon"]}>◎</span>
<span>Jaipur · Mumbai · Delhi</span>
</div>

</div>

<div className={styles["ft-available"]}>
<span className={styles["ft-available-dot"]}/>
<span>Currently taking new clients</span>
</div>

</div>

</div>

</div>

{/* WORDMARK */}

<div className={styles["ft-wordmark-wrap"]}>
<div className={styles["ft-wordmark"]}>
G-DIGITAL INDIA
</div>
</div>

{/* BOTTOM */}

<div className={styles["ft-bottom"]}>

<div className={styles["ft-bottom-inner"]}>

<span className={styles["ft-copy"]}>
© 2025 GDI Agency </span>

<span className={styles["ft-bottom-mid"]}>
Crafted in 🇮🇳 </span>

<div className={styles["ft-bottom-links"]}>

<a href="#" className={styles["ft-bottom-link"]}>
Privacy </a>

<span className={styles["ft-bottom-sep"]}>·</span>

<a href="#" className={styles["ft-bottom-link"]}>
Terms </a>

<span className={styles["ft-bottom-sep"]}>·</span>

<a href="#" className={styles["ft-bottom-link"]}>
Sitemap </a>

</div>

</div>

</div>

</footer>

)
}
