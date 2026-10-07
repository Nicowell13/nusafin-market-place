import Link from "next/link";
export default function Page() {
  return (
    <main className="appShell">
      <header className="appTop">
        <Link className="brand" href="/app">Nusa<span>Fin</span></Link>
        <span style={{fontSize:"14px",color:"var(--muted)"}}>Admin · Control Tower</span>
      </header>
      <p className="eyebrow">OPERATIONS · ADMIN PROTOTYPE</p>
      <h2 style={{fontSize:"38px",letterSpacing:"-1.5px",margin:"8px 0 32px"}}>Control tower.</h2>
      <div className="appGrid">
        <article className="appCard"><p>Verifikasi petani</p><b>8</b><p style={{fontSize:"13px"}}>Dokumen menunggu review admin</p></article>
        <article className="appCard"><p>Kedatangan di hub</p><b>14</b><p style={{fontSize:"13px"}}>3 belum ada foto kondisi</p></article>
        <article className="appCard"><p>DOA eskalasi</p><b>2</b><p style={{fontSize:"13px",color:"#e55"}}>Di atas 5% — mediasi manual</p></article>
      </div>
    </main>
  );
}
