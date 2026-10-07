import Link from "next/link";
export default function Page() {
  return (
    <main className="authShell">
      <section className="authCard">
        <Link className="brand" href="/">Nusa<span>Fin</span></Link>
        <p className="eyebrow">PETANI · LANGKAH 1 DARI 3</p>
        <h1>Profil budidaya</h1>
        <label className="fieldLabel">Nama lengkap<input className="field" placeholder="Nama Anda" /></label>
        <label className="fieldLabel">Nama usaha / kelompok tani<input className="field" placeholder="Kelompok Tani Maju" /></label>
        <label className="fieldLabel">Kabupaten, provinsi<input className="field" placeholder="Bogor, Jawa Barat" /></label>
        <label className="fieldLabel">Spesies unggulan<input className="field" placeholder="Betta, Discus, Arwana…" /></label>
        <button className="button" style={{marginTop:"8px"}}>Lanjut ke dokumen →</button>
        <p style={{fontSize:"13px",color:"var(--muted)",marginTop:"16px"}}>Berikutnya: upload NIB/sertifikat ke bucket privat. Lalu review dan verifikasi admin.</p>
      </section>
    </main>
  );
}
