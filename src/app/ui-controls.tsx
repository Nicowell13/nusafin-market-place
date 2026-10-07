"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { useLanguage } from "./language";

export const navTargets = ["#cara", "#tentang", "#koleksi", "#tujuan", "#testimoni", "#faq", "#artikel", "#kebijakan", "#galeri"];
export const fish = [
  { name: "Betta", sci: "Betta splendens", image: "/images/betta.png" },
  { name: "Discus", sci: "Symphysodon spp.", image: "/images/discus.png" },
  { name: "Guppy", sci: "Poecilia reticulata", image: "/images/guppy.png" },
  { name: "Tetra", sci: "spp.", image: "/images/tetra.png" },
  { name: "Corydoras", sci: "Corydoras spp.", image: "/images/corydoras.png" },
];
export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useLanguage();
  return <>
    <button type="button" className="mobileMenuBtn" onClick={() => ref.current?.showModal()} aria-label={t.menu} aria-haspopup="dialog"><Icon name="menu" /></button>
    <dialog ref={ref} className="mobileDialog" aria-label={t.menu} onClick={e => { if (e.target === ref.current) ref.current.close(); }}>
      <form method="dialog"><button className="dialogClose" aria-label={t.close}><Icon name="close" /></button></form>
      <nav>{navTargets.map((href, i) => <a key={href} href={href} className="mobilePanelLink" onClick={() => ref.current?.close()}>{t.nav[i]}</a>)}
        <Link className="mobilePanelLink" href="/login" onClick={() => ref.current?.close()}>{t.login}</Link><Link className="button btnOcean" href="/register" onClick={() => ref.current?.close()}>{t.register}</Link>
      </nav>
    </dialog>
  </>;
}
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (motion.matches || document.hidden) video.pause(); };
    update();
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <>
    <video ref={ref} className="heroBgVideo" autoPlay muted loop playsInline preload="none" poster="/images/hero-fish.png" aria-hidden="true" onPause={() => setPaused(true)} onPlay={() => setPaused(false)}>
      <source src="/hero-bg.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
    </video>
    <button type="button" className="videoControl navPill" aria-label={paused ? t.playVideo : t.pauseVideo} onClick={() => { const v = ref.current; if (v) { if (v.paused) v.play().catch(() => setPaused(true)); else v.pause(); } }}><Icon name={paused ? "play" : "pause"} />{paused ? t.playVideo : t.pauseVideo}</button>
  </>;
}
export function ContactDialog({ support = false }: { support?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const { t, lang } = useLanguage();
  return <>
    <button type="button" className={support ? "csFloat" : "button btnOutlineOcean"} onClick={() => ref.current?.showModal()} aria-label={support ? t.cs : t.contact} aria-haspopup="dialog">{support ? <Icon name="chat" /> : t.contact}</button>
    <dialog ref={ref} className="contactDialog" aria-labelledby={support ? "support-title" : "contact-title"} onClick={e => { if (e.target === ref.current) ref.current.close(); }}>
      <form method="dialog"><button className="dialogClose" aria-label={t.close}><Icon name="close" /></button></form>
      <p className="eyebrow">{t.contactLabel}</p><h2 className="dialogTitle" id={support ? "support-title" : "contact-title"}>{support ? t.cs : t.contactTitle}</h2>
      {support && <p className="formNote">{t.csNotice}</p>}
      <form lang={lang} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
        <label className="fieldLabel">{t.name}<input className="formInput" required maxLength={120} autoComplete="name" placeholder={t.namePlaceholder} /></label>
        <label className="fieldLabel">{t.email}<input className="formInput" type="email" required maxLength={254} autoComplete="email" placeholder={t.emailPlaceholder} /></label>
        <label className="fieldLabel">{t.message}<textarea className="formInput" rows={4} required maxLength={2000} placeholder={t.messagePlaceholder} /></label>
        <button className="button btnOcean" type="submit">{t.send}</button>
        <p className="formNote" role="status">{submitted ? t.submitted : t.unsent}</p>
      </form>
    </dialog>
  </>;
}
export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const { t, lang } = useLanguage();
  const items = t.reviews;
  return <div className="testimonialWrap" role="region" aria-label={t.reviewTitle}>
    <p className="sectionNote">{t.reviewNotice}</p>
    <article className="testimonialCard glassCard" aria-live="polite" aria-atomic="true">
      <div className="testimonialAuthor"><Icon name="user" /><div><b>{items[active][0]}</b><small>DEMO</small></div></div>
      <p className="testimonialText">{items[active][1]}</p>
    </article>
    <div className="testimonialDots">
      <button type="button" className="navPill" aria-label={t.previous} onClick={() => setActive((active + items.length - 1) % items.length)}><Icon name="back" /></button>
      <span>{new Intl.NumberFormat(lang).format(active + 1)} / {items.length}</span>
      <button type="button" className="navPill" aria-label={t.next} onClick={() => setActive((active + 1) % items.length)}><Icon name="arrow" /></button>
    </div>
    <div className="reviewGrid">{items.map(([name, text], i) => <button type="button" key={name} className="reviewCard glassCard" aria-pressed={active === i} aria-label={`${t.reviewSelect} ${i + 1}: ${name}`} onClick={() => setActive(i)}><Icon name="user" /><b>{name}</b><small>DEMO</small><span>{text}</span></button>)}</div>
  </div>;
}
export function FishCards() {
  const { t } = useLanguage();
  return <div className="fishGrid">{fish.map(f => <article className="fishCard cardHover" key={f.name}>
    <Image src={f.image} alt={`${t.fishAlt}: ${f.name}`} fill sizes="(max-width: 640px) 88vw, (max-width: 720px) 44vw, 30vw" loading="lazy" className="fishImage" />
    <div className="fishCardTop"><span className="fishTag">{t.sample}</span></div>
    <div className="fishCardBottom"><h3>{f.name}</h3><p className="fishSci">{f.sci}</p><LinkRequest /></div>
  </article>)}</div>;
}
function LinkRequest() { const { t } = useLanguage(); return <Link className="fishCta" href="/register/buyer">{t.request} <Icon name="arrow" /></Link>; }
export function Gallery() {
  const [filter, setFilter] = useState("all");
  const { t } = useLanguage();
  return <>
    <p className="sectionNote">{t.galleryNotice}</p>
    <div className="galleryFilters">{["all", ...fish.map(f => f.name)].map(name => <button type="button" className="navPill" key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name === "all" ? t.all : name}</button>)}</div>
    <div className="galleryGrid">{fish.filter(f => filter === "all" || f.name === filter).map(f => <figure key={f.name}>
      <div className="galleryImage"><Image src={f.image} alt={`${t.fishAlt}: ${f.name}`} fill sizes="(max-width: 640px) 88vw, (max-width: 1080px) 44vw, 28vw" loading="lazy" /></div><figcaption>{f.name} · {t.sample}</figcaption>
    </figure>)}</div>
  </>;
}
