"use client";
import Link from "next/link";
import { useState } from "react";
import { LanguageButton, useLanguage } from "./language";
import { Icon } from "./icons";
import { FishCards } from "./ui-controls";

type PageKind = "login" | "register" | "farmer" | "buyer" | "terms" | "privacy" | "dashboard" | "admin" | "catalog" | "checkout";
export function PrototypePage({ kind }: { kind: PageKind }) {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const app = ["dashboard", "admin", "catalog", "checkout"].includes(kind);
  const legal = kind === "terms" || kind === "privacy";
  const field = (label: string, placeholder: string, type = "text") => <label className="fieldLabel">{label}<input className="field" type={type} placeholder={placeholder} required maxLength={type === "email" ? 254 : 120} /></label>;
  const titles = { login: t.login, register: t.roleTitle, farmer: t.farmProfile, buyer: t.buyerProfile, terms: t.terms, privacy: t.privacy, dashboard: t.dashboard, admin: t.admin, catalog: t.catalogTitle, checkout: t.orderTitle };
  return <main className={app ? "appShell" : "authShell"}>
    <article className={app ? "prototypeApp" : "authCard"}>
      <header className="appTop"><Link className="brand" href="/">Nusa<span>Fin</span></Link><LanguageButton /></header>
      <Link className="textLink" href="/"><Icon name="back" />{t.home}</Link>
      <p className="eyebrow">{legal ? t.draft : "DEMO"}</p><h1 className="prototypeTitle">{titles[kind]}</h1>
      {legal ? <>
        {(kind === "terms" ? t.termsSections : t.privacySections).map(([title, text]) => <section className="legalSection" key={title}><h3>{title}</h3><p>{text}</p></section>)}<p className="formNote">{t.legalNotice}</p>
      </> : <>
        <p className="sectionNote">{app ? t.dashboardNotice : t.unsent}</p>
        {kind === "login" && <><form lang={lang} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          {field(t.email, t.emailPlaceholder, "email")}{field(t.password, t.passwordPlaceholder, "password")}
          <button className="button btnOcean" type="submit">{t.send}</button><p className="formNote" role="status">{submitted ? t.submitted : t.unsent}</p>
        </form><Link className="button btnOutlineOcean" href="/app">{t.enter}</Link><p>{t.noAccount} <Link href="/register">{t.register}</Link></p></>}
        {kind === "register" && <><div className="roleGrid"><Link className="roleCard" href="/register/farmer"><Icon name="user" /><b>{t.farmer}</b><p>{t.farmerDesc}</p></Link><Link className="roleCard" href="/register/buyer"><Icon name="globe" /><b>{t.buyer}</b><p>{t.buyerDesc}</p></Link></div><p className="sectionNote">{t.hasAccount} <Link href="/login">{t.login}</Link></p></>}
        {(kind === "farmer" || kind === "buyer") && <form lang={lang} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          {field(t.name, t.namePlaceholder)}{field(t.business, t.businessPlaceholder)}
          {kind === "farmer" ? field(t.location, t.locationPlaceholder) : <label className="fieldLabel">{t.country}<select className="field" defaultValue="" required><option value="" disabled>{t.chooseCountry}</option><option value="EU">{t.eu}</option><option value="US">{t.us}</option></select></label>}
          {field(t.species, t.speciesPlaceholder)}<button className="button btnOcean" type="submit">{t.continue}</button>
          <p className="formNote">{kind === "farmer" ? t.farmerNext : t.buyerNext}</p><p className="formNote" role="status">{submitted ? t.submitted : t.unsent}</p>
        </form>}
        {(kind === "dashboard" || kind === "admin") && <><div className="appGrid">{(kind === "dashboard" ? t.dashboardCards : t.adminCards).map(([title, text]) => <section className="appCard" key={title}><Icon name="list" /><h3>{title}</h3><p>{text}</p></section>)}</div><div className="roleGrid"><Link className="roleCard" href="/app/catalog">{t.fullCatalog}</Link><Link className="roleCard" href={kind === "admin" ? "/app" : "/app/admin"}>{kind === "admin" ? t.dashboard : t.admin}</Link></div></>}
        {kind === "catalog" && <><p className="sectionNote">{t.collectionNote} {t.availability}</p><FishCards /><div className="sectionAction"><Link className="button btnOcean" href="/app/checkout">{t.checkout}</Link></div></>}
        {kind === "checkout" && <><p className="sectionNote">{t.orderNotice}</p><h3>{t.destination}</h3><label className="fieldLabel">{t.country}<select className="field"><option value="EU">{t.eu}</option><option value="US">{t.us}</option></select></label><p className="sectionNote">{t.buyerNext}</p><Link className="button btnOutlineOcean" href="/app/catalog">{t.fullCatalog}</Link></>}
      </>}
    </article>
  </main>;
}
