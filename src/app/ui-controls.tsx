"use client";
import { useEffect, useRef, useCallback, useState } from "react";

/* ── Scroll reveal (Intersection Observer) ───── */
export function RevealInit() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "1";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/* ── Navbar: ID/EN toggle + dark/light ────────── */
export function NavControls() {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    queueMicrotask(() => setDark(isDark));
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <div className="navControls">
      <button
        className="navPill"
        onClick={() => setLang((l) => (l === "ID" ? "EN" : "ID"))}
        aria-label="Toggle language"
      >
        {lang === "ID" ? "ID" : "EN"}
      </button>
      <button
        className="navPill themeToggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {dark ? "☀" : "☾"}
      </button>
    </div>
  );
}

/* ── CS floating circle ───────────────────────── */
export function CsFloat() {
  return (
    <button
      className="csFloat"
      aria-label="Customer Service"
      title="Chat CS — segera hadir"
      onClick={() => alert("Fitur live chat CS sedang dalam pengembangan.")}
    >
      CS
    </button>
  );
}

/* ── Contact dialog ───────────────────────────── */
export function ContactDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => ref.current?.showModal(), []);
  const close = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) ref.current?.close();
    },
    []
  );

  return (
    <>
      <button className="ctaSecondary" onClick={open}>
        Hubungi kami
      </button>
      <dialog ref={ref} className="contactDialog" onClick={close}>
        <form method="dialog">
          <button className="dialogClose" aria-label="Tutup">✕</button>
        </form>
        <p className="eyebrow">CONTACT NUSAFIN</p>
        <h2 className="dialogTitle">Ceritakan kebutuhan Anda.</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="fieldLabel">
            Nama lengkap
            <input className="field" required placeholder="Nama Anda" />
          </label>
          <label className="fieldLabel">
            Email
            <input className="field" type="email" required placeholder="hello@example.com" />
          </label>
          <label className="fieldLabel">
            Pesan
            <textarea className="field" rows={4} required placeholder="Ceritakan kebutuhan Anda…" />
          </label>
          <button className="button btnGold" type="submit">Kirim permintaan</button>
          <p className="formNote">Prototype — pengiriman email aktif setelah backend tersedia.</p>
        </form>
      </dialog>
    </>
  );
}
