"use client";
import Link from "next/link";
import { LanguageButton, useLanguage } from "./language";
import { Icon } from "./icons";
import { ContactDialog, FishCards, Gallery, HeroVideo, MobileMenu, navTargets, TestimonialSlider } from "./ui-controls";

export default function Home() {
  const { t } = useLanguage();
  const stepIcons = ["chat", "list", "box", "plane", "shield", "wallet"] as const;
  const trustIcons = ["check", "box", "list", "shield"] as const;
  return <main className="mainWrap">
    <nav id="main-nav" className="nav" aria-label={t.menu}>
      <Link className="brand" href="#top">Nusa<span>Fin</span></Link>
      <div className="navLinks">{navTargets.slice(0, 6).map((href, i) => <Link key={href} href={href}>{t.nav[i]}</Link>)}</div>
      <div className="navRight"><LanguageButton /><div className="navDiv" /><Link href="/login" className="navLogin">{t.login}</Link><Link className="button btnOcean small" href="/register">{t.register}</Link><MobileMenu /></div>
    </nav>
    <div className="csWrap"><ContactDialog support /></div>
    <section id="top" className="hero">
      <div className="heroBg"><HeroVideo /><div className="heroBgOverlay" /></div>
      <div className="heroContent">
        <div className="heroBadge">{t.badge}</div>
        <h1>{t.hero}<br /><em>{t.heroEm}</em></h1><p className="heroLead">{t.lead}</p>
        <div className="heroActions"><Link className="button btnOceanGlow" href="/register/buyer">{t.request}</Link><Link className="button btnOutlineOcean" href="#koleksi">{t.explore}</Link></div>
        <div className="heroStats">{t.stats.map(([v, label]) => <div key={label} className="stat"><b className="gradientText">{v}</b><span>{label}</span></div>)}</div>
      </div>
      <div className="heroWave" aria-hidden="true"><svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none"><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="var(--surface)" /></svg></div>
    </section>
    <section id="cara" className="section bgSurface"><div className="sectionInner">
      <p className="eyebrow">{t.processLabel}</p><h2>{t.processTitle}</h2>
      <ol className="processTimeline">{t.steps.map(([title, desc], i) => <li key={i}>
        <span className="timelineNode">{String(i + 1).padStart(2, "0")}</span>
        <article className="processCard glassCard"><div className="processTop"><span className="processNum">{String(i + 1).padStart(2, "0")}</span><Icon name={stepIcons[i]} /></div><h3>{title}</h3><p>{desc}</p></article>
      </li>)}</ol>
    </div></section>
    <section id="tentang" className="section bgOceanDeep"><div className="sectionInner splitLayout">
      <div><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2><p className="sectionNote">{t.aboutText}</p>
        <ul className="featureList">{t.features.map(text => <li key={text}><Icon name="check" />{text}</li>)}</ul>
      </div>
      <div className="trustGrid">{t.trust.map(([title, desc], i) => <article key={title} className="trustCard glassCard cardHover"><div className="trustIcon"><Icon name={trustIcons[i]} /></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </div></section>
    <section id="koleksi" className="section bgSurface"><div className="sectionInner">
      <p className="eyebrow">{t.collectionLabel}</p><h2>{t.collectionTitle}</h2><p className="sectionNote">{t.collectionNote}</p>
      <FishCards /><div className="sectionAction"><Link className="button btnOcean" href="/app/catalog">{t.fullCatalog}<Icon name="arrow" /></Link></div>
    </div></section>
    <section id="kebijakan" className="section bgOceanDeep"><div className="sectionInner">
      <p className="eyebrow">{t.policyLabel}</p><h2>{t.policyTitle}</h2>
      <div className="doaGrid">{t.doa.map(([big, title, desc], i) => <article className={`doaCard glassCard${i === 1 ? " doaAccent" : ""}`} key={big}><div className="doaBig gradientText">{big}</div><h3>{title}</h3><p>{desc}</p></article>)}</div>
      <p className="doaNote">{t.exception}</p>
    </div></section>
    <section id="tujuan" className="section bgSurface"><div className="sectionInner">
      <p className="eyebrow">{t.reachLabel}</p><h2>{t.reachTitle}</h2>
      <div className="regionGrid">{t.regions.map(([title, desc]) => <article key={title} className="regionCard glassCard"><Icon name="globe" /><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </div></section>
    <section id="testimoni" className="section bgOceanDeep"><div className="sectionInner"><p className="eyebrow">{t.reviewLabel}</p><h2>{t.reviewTitle}</h2><TestimonialSlider /></div></section>
    <section id="galeri" className="section bgSurface"><div className="sectionInner"><p className="eyebrow">{t.galleryLabel}</p><h2>{t.galleryTitle}</h2><Gallery /></div></section>
    <section id="faq" className="section bgOceanDeep"><div className="sectionInner splitLayout">
      <div><p className="eyebrow">{t.faqLabel}</p><h2>{t.faqTitle}</h2></div>
      <div className="faqList">{t.faq.map(([q, a]) => <details className="faqItem" key={q}><summary className="faqQ">{q}</summary><p className="faqA">{a}</p></details>)}</div>
    </div></section>
    <section id="artikel" className="section bgSurface"><div className="sectionInner">
      <p className="eyebrow">{t.articleLabel}</p><h2>{t.articleTitle}</h2>
      <div className="articleGrid">{t.articles.map(([title, desc]) => <article key={title} className="articleCard glassCard"><h3 className="articleTitle">{title}</h3><p className="articleDesc">{desc}</p><span className="articleLink">{t.soon}</span></article>)}</div>
    </div></section>
    <section className="section bgOceanDeep"><div className="sectionInner"><div className="ctaBanner"><div className="ctaBannerBg" /><div className="ctaBannerContent"><p className="eyebrow">{t.ctaLabel}</p><h2>{t.ctaTitle}</h2><div className="heroActions"><Link className="button btnOcean" href="/register">{t.create}</Link><ContactDialog /></div></div></div></div></section>
    <section className="section bgSurface"><div className="sectionInner twoCol">{[t.terms, t.privacy].map((title, i) => <article key={title} className="legalCard glassCard"><p className="eyebrow">{t.draft}</p><h3>{title}</h3><p>{t.legalSummaries[i]}</p><Link className="textLink" href={i === 0 ? "/terms" : "/privacy"}>{t.read}<Icon name="arrow" /></Link></article>)}</div></section>
    <footer className="footer"><div className="footerInner"><div className="footerTop"><div><Link className="brand" href="#top">Nusa<span>Fin</span></Link><p className="footerTagline">{t.tagline}</p></div><nav className="footerLinks" aria-label={t.home}>{navTargets.map((href, i) => <Link key={href} href={href}>{t.nav[i]}</Link>)}<Link href="/terms">{t.terms}</Link><Link href="/privacy">{t.privacy}</Link></nav></div><div className="footerBottom"><small>{t.footer}</small><small>{t.noContact}</small></div></div></footer>
  </main>;
}
