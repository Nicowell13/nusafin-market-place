"use client";
import { useEffect, useRef, useCallback, useState } from "react";

/* ── Scroll reveal ──────────────────────────── */
export function RevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).dataset.visible = "1";
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.10 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* ── Scrolled navbar ────────────────────────── */
export function NavScrolled() {
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const onScroll = () => nav.dataset.scrolled = window.scrollY > 60 ? "1" : "0";
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

/* ── Mobile menu ────────────────────────────── */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const links = [["#cara","Cara Kerja"],["#tentang","Tentang"],["#koleksi","Koleksi"],["#kebijakan","Kebijakan DOA"],["#tujuan","Jangkauan"],["#testimoni","Testimoni"],["#faq","FAQ"],["#artikel","Insight"]];
  return (
    <>
      <button className="mobileMenuBtn" onClick={() => setOpen(true)} aria-label="Buka menu">
        <span /><span /><span />
      </button>
      {open && (
        <div className="mobileOverlay" onClick={() => setOpen(false)}>
          <nav className="mobilePanel" onClick={e => e.stopPropagation()}>
            <button className="mobilePanelClose" onClick={() => setOpen(false)}>✕</button>
            {links.map(([href, label]) => (
              <a key={href} href={href} className="mobilePanelLink" onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a href="/register" className="button btnOcean" onClick={() => setOpen(false)}>Daftar Sekarang</a>
          </nav>
        </div>
      )}
    </>
  );
}

/* ── Navbar controls: ID/EN + dark/light ─────── */
export function NavControls() {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    queueMicrotask(() => setDark(isDark));
  }, []);
  const toggleTheme = useCallback(() => {
    setDark(d => {
      const next = !d;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);
  return (
    <div className="navControls">
      <button className="navPill" onClick={() => setLang(l => l === "ID" ? "EN" : "ID")} aria-label="Toggle language">{lang}</button>
      <button className="navPill themeBtn" onClick={toggleTheme} aria-label="Toggle theme">{dark ? "☀" : "☾"}</button>
    </div>
  );
}

/* ── CS floating bubble with tooltip ─────────── */
export function CsFloat() {
  const [tip, setTip] = useState(false);
  return (
    <div className="csWrap">
      {tip && <div className="csTip"><p>Chat CS</p><small>Segera hadir — team kami siap membantu</small></div>}
      <button
        className="csFloat"
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        onFocus={() => setTip(true)}
        onBlur={() => setTip(false)}
        onClick={() => alert("Fitur live chat CS sedang dalam pengembangan.")}
        aria-label="Customer Service"
      >
        CS
        <span className="csPing" />
      </button>
    </div>
  );
}

/* ── Contact dialog ───────────────────────────── */
export function ContactDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => ref.current?.showModal(), []);
  const close = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) ref.current?.close();
  }, []);
  return (
    <>
      <button className="button btnOutlineOcean" onClick={open}>Hubungi Kami</button>
      <dialog ref={ref} className="contactDialog" onClick={close}>
        <form method="dialog"><button className="dialogClose" aria-label="Tutup dialog">✕</button></form>
        <p className="eyebrow">CONTACT NUSAFIN</p>
        <h2 className="dialogTitle">Ceritakan kebutuhan Anda.</h2>
        <form onSubmit={e => e.preventDefault()}>
          <label className="fieldLabel">Nama lengkap<input className="formInput" required placeholder="Nama Anda" /></label>
          <label className="fieldLabel">Email<input className="formInput" type="email" required placeholder="hello@example.com" /></label>
          <label className="fieldLabel">Pesan<textarea className="formInput" rows={4} required placeholder="Ceritakan kebutuhan Anda…" /></label>
          <button className="button btnOcean" type="submit" style={{width:"100%",justifyContent:"center",marginTop:"4px"}}>Kirim permintaan</button>
          <p className="formNote">Prototype — pengiriman email aktif setelah backend tersedia.</p>
        </form>
      </dialog>
    </>
  );
}

/* ── Testimonial slider ───────────────────────── */
export function TestimonialSlider({ items }: { items: { name:string; company:string; country:string; flag:string; text:string }[] }) {
  const [active, setActive] = useState(0);

  const item = items[active];
  return (
    <div className="testimonialWrap">
      <div className="testimonialCard" key={active}>
        <p className="testimonialStars">ULASAN DEMO</p>
        <p className="testimonialText">&#34;{item.text}&#34;</p>
        <div className="testimonialAuthor">
          <span className="testimonialFlag">{item.flag}</span>
          <div><b>{item.name}</b><small>{item.company} · {item.country}</small></div>
        </div>
      </div>
      <div className="testimonialDots">
        {items.map((_, i) => (
          <button key={i} className={`tDot${i === active ? " active" : ""}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i+1}`} />
        ))}
      </div>
    </div>
  );
}
