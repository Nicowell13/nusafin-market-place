import Link from "next/link";
const lots = [
  { farmer:"Petani A · Jakarta", item:"Betta Halfmoon × 40", lot:"NF-JKT-A01" },
  { farmer:"Petani B · Tangerang", item:"Discus × 20", lot:"NF-TNG-B01" },
  { farmer:"Petani C · Blitar", item:"Koi × 10", lot:"NF-BLT-C01" },
];
export default function Page() {
  return (
    <main className="appShell">
      <header className="appTop">
        <Link className="brand" href="/app/catalog">← Katalog</Link>
        <span style={{fontSize:"14px",color:"var(--muted)"}}>Checkout prototype</span>
      </header>
      <p className="eyebrow">MULTI-FARMER ORDER</p>
      <h2 style={{fontSize:"38px",letterSpacing:"-1.5px",margin:"8px 0 32px"}}>Satu pembayaran, tiga sub-order.</h2>
      <div className="appGrid">
        {lots.map(l => (
          <article className="appCard" key={l.lot}>
            <h3 style={{marginBottom:"8px"}}>{l.farmer}</h3>
            <p style={{marginBottom:"12px"}}>{l.item}</p>
            <code>{l.lot}</code>
          </article>
        ))}
      </div>
      <div className="authCard" style={{marginTop:"32px",maxWidth:"520px"}}>
        <h3 style={{marginBottom:"20px"}}>Destinasi & kepatuhan</h3>
        <label className="fieldLabel">
          Negara tujuan
          <select className="field">
            <option>United States — Lacey Act declaration</option>
            <option>European Union — CITES / GDPR flow</option>
          </select>
        </label>
        <p style={{fontSize:"14px",color:"var(--muted)",margin:"16px 0"}}>Biaya layanan pengiriman dan membership masih dalam tahap finalisasi dengan investor.</p>
        <button className="button">Review pesanan</button>
      </div>
    </main>
  );
}
