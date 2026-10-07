import Link from "next/link";
export default function Page() {
  return (
    <main className="authShell">
      <section className="authCard">
        <Link className="brand" href="/">Nusa<span>Fin</span></Link>
        <p className="eyebrow">BUAT AKUN</p>
        <h1>Mulai dari peran Anda.</h1>
        <p style={{color:"var(--muted)",marginBottom:"28px"}}>Prototype onboarding — data belum dikirim atau disimpan.</p>
        <div className="roleGrid">
          <Link className="roleCard" href="/register/farmer">
            <b>🌱 Petani ikan hias</b>
            <p>Profil budidaya, upload NIB/sertifikat, spesies dan lokasi titik kumpul.</p>
          </Link>
          <Link className="roleCard" href="/register/buyer">
            <b>🌍 Buyer internasional</b>
            <p>Profil importir, negara tujuan, kebutuhan, dan membership.</p>
          </Link>
        </div>
        <p style={{marginTop:"28px",fontSize:"15px"}}>Sudah punya akun? <Link href="/login" style={{color:"var(--green-600)",fontWeight:700}}>Masuk</Link></p>
      </section>
    </main>
  );
}
