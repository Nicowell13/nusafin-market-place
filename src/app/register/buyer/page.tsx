import Link from "next/link";
export default function Page() {
  return (
    <main className="authShell">
      <section className="authCard">
        <Link className="brand" href="/">Nusa<span>Fin</span></Link>
        <p className="eyebrow">BUYER · STEP 1 OF 3</p>
        <h1>Importer profile</h1>
        <label className="fieldLabel">Full name<input className="field" placeholder="Your name" /></label>
        <label className="fieldLabel">Company name<input className="field" placeholder="AquaImport GmbH" /></label>
        <label className="fieldLabel">
          Destination country
          <select className="field" defaultValue="">
            <option value="" disabled>Select country</option>
            <option>United States</option>
            <option>Germany</option>
            <option>Netherlands</option>
            <option>United Kingdom</option>
            <option>Other EU country</option>
          </select>
        </label>
        <label className="fieldLabel">Species you source<input className="field" placeholder="Betta, Discus, Koi…" /></label>
        <button className="button" style={{marginTop:"8px"}}>Continue to verification →</button>
        <p style={{fontSize:"13px",color:"var(--muted)",marginTop:"16px"}}>Next: importer details, CITES compliance, and membership preview. Pricing subject to final investor agreement.</p>
      </section>
    </main>
  );
}
