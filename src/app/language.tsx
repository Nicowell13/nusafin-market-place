"use client";
import { createContext, useContext, useEffect, useState } from "react";
import copy from "./copy.json";

const LanguageContext = createContext({ lang: "id" as "id" | "en", toggle: () => {} });
// ponytail: session-local language; add URL locales when translated indexing is required.
export function LanguageProvider({ children, initialLanguage = "id" }: { children: React.ReactNode; initialLanguage?: "id" | "en" }) {
  const [lang, setLang] = useState<"id" | "en">(initialLanguage);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LanguageContext.Provider value={{ lang, toggle: () => setLang(l => l === "id" ? "en" : "id") }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const { lang, toggle } = useContext(LanguageContext);
  return { lang, toggle, t: copy[lang] };
}
export function LanguageButton() {
  const { lang, toggle, t } = useLanguage();
  return <button type="button" className="navPill" onClick={toggle} aria-label={t.language}>{lang.toUpperCase()} / {lang === "id" ? "EN" : "ID"}</button>;
}
