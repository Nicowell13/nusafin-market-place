"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export function UiControls() {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [dark, setDark] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    // Read from DOM so no cascading re-render from setState
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setDark(root.dataset.theme === "dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    setDark(isDark);
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    setDark(d => {
      const next = !d;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const closeOnBackdrop = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialog.current) dialog.current?.close();
  }, []);

  return (
    <>
      {/* ── Top controls ─────────────────────────── */}
      <div className="uiControls">
        <button
          onClick={() => setLang(l => l === "ID" ? "EN" : "ID")}
          aria-label="Toggle language"
          title={lang === "ID" ? "Switch to English" : "Ganti ke Indonesia"}
        >
          {lang === "ID" ? "🇮🇩 ID" : "🇺🇸 EN"}
        </button>
        <button onClick={toggleTheme} aria-label="Toggle dark mode">
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ── CS floating bubble ─────────────────────── */}
      <button
        className="csFloat"
        aria-label="Customer Service"
        title={lang === "ID" ? "Chat CS — Segera hadir" : "Customer Service — Coming soon"}
        onClick={() => alert(lang === "ID" ? "Fitur chat CS segera hadir." : "Live CS chat coming soon.")}
      >
        CS
      </button>

      {/* ── Contact dialog ─────────────────────────── */}
      <dialog ref={dialog} className="contactDialog" onClick={closeOnBackdrop}>
        <form method="dialog">
          <button className="dialogClose" aria-label="Tutup">×</button>
        </form>
        <p className="eyebrow">CONTACT NUSAFIN</p>
        <h2 className="dialogTitle">
          {lang === "ID" ? "Ceritakan kebutuhan Anda." : "Tell us what you need."}
        </h2>
        <form onSubmit={e => e.preventDefault()}>
          <label className="fieldLabel">
            {lang === "ID" ? "Nama" : "Name"}
            <input className="field" required placeholder={lang === "ID" ? "Nama lengkap" : "Full name"} />
          </label>
          <label className="fieldLabel">
            Email
            <input className="field" type="email" required placeholder="hello@example.com" />
          </label>
          <label className="fieldLabel">
            {lang === "ID" ? "Pesan" : "Message"}
            <textarea className="field" rows={4} required
              placeholder={lang === "ID" ? "Ceritakan kebutuhan Anda…" : "Tell us about your needs…"} />
          </label>
          <button className="button" type="submit">
            {lang === "ID" ? "Kirim permintaan" : "Send request"}
          </button>
          <p className="formNote">
            {lang === "ID"
              ? "Prototype: pengiriman email aktif setelah backend tersedia."
              : "Prototype: email delivery active after backend launch."}
          </p>
        </form>
      </dialog>
    </>
  );
}

export function ContactBtn({ label }: { label: string }) {
  return (
    <button
      className="button ghost"
      onClick={() => {
        const dialog = document.querySelector(".contactDialog") as HTMLDialogElement | null;
        dialog?.showModal();
      }}
    >
      {label}
    </button>
  );
}
