"use client";

import { useEffect, useRef, useState } from "react";

export function UiControls() {
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return <>
    <div className="uiControls" aria-label="Pengaturan tampilan">
      <button onClick={() => setLanguage(language === "ID" ? "EN" : "ID")} aria-label="Ganti bahasa">{language}</button>
      <button onClick={toggleTheme} aria-label="Ganti mode terang atau gelap">◐</button>
    </div>
    <button className="chatFloat" aria-label="Chat dengan customer service" title="Segera hadir" onClick={() => alert(language === "ID" ? "Chat CS segera hadir." : "Customer support chat is coming soon.")}>Chat us</button>
    <button className="contactFloat" onClick={() => dialog.current?.showModal()}>Contact</button>
    <dialog ref={dialog} className="contactDialog" onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <form method="dialog"><button className="dialogClose" aria-label="Tutup">×</button></form>
      <p className="eyebrow">CONTACT NUSAFIN</p><h2>{language === "ID" ? "Ceritakan kebutuhan Anda." : "Tell us what you need."}</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>Nama / Name<input className="field" required /></label>
        <label>Email<input className="field" type="email" required /></label>
        <label>Pesan / Message<textarea className="field" rows={5} required /></label>
        <button className="button" type="submit">{language === "ID" ? "Kirim permintaan" : "Send request"}</button>
        <p className="formNote">Prototype: pengiriman email diaktifkan saat backend tersedia.</p>
      </form>
    </dialog>
  </>;
}
