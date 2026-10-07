import Link from "next/link";
export default function Page() {
  return (
    <main className="appShell">
      <header className="appTop">
        <Link className="brand" href="/">Nusa<span>Fin</span></Link>
        <Link href="/" style={{fontSize:"14px",color:"var(--muted)"}}>← Kembali ke homepage</Link>
      </header>
      <p className="eyebrow">PETANI · DASHBOARD PROTOTYPE</p>
      <h2 style={{fontSize:"38px",letterSpacing:"-1.5px",margin:"8px 0 32px"}}>Selamat datang kembali.</h2>
      <div className="appGrid">
        <article className="appCard"><p>Pesanan aktif</p><b>12</b><p style={{fontSize:"13px"}}>4 menunggu drop ke titik kumpul</p></article>
        <article className="appCard"><p>Siap dibayar</p><b>Rp 18,4jt</b><p style={{fontSize:"13px"}}>Setelah claim window selesai</p></article>
        <article className="appCard"><p>Rata-rata DOA</p><b>2,1%</b><p style={{fontSize:"13px"}}>Di bawah batas 5% — aman</p></article>
      </div>
      <p style={{marginBottom:"20px",fontWeight:700}}>Jelajahi area bisnis lain:</p>
      <div className="roleGrid">
        <Link className="roleCard" href="/app/catalog"><b>🐟 Katalog buyer</b><p>Filter, produk, keranjang multi-petani.</p></Link>
        <Link className="roleCard" href="/app/admin"><b>🛠 Dashboard admin</b><p>Verifikasi petani, konsolidasi, klaim DOA.</p></Link>
      </div>
    </main>
  );
}
