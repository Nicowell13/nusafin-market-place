import Link from "next/link";
export default function Page() {
  return (
    <main className="authShell">
      <section className="authCard">
        <Link className="brand" href="/">Nusa<span>Fin</span></Link>
        <p className="eyebrow">SELAMAT DATANG KEMBALI</p>
        <h1>Masuk</h1>
        <label className="fieldLabel">Email<input className="field" type="email" placeholder="hello@example.com" /></label>
        <label className="fieldLabel">Password<input className="field" type="password" placeholder="••••••••" /></label>
        <Link className="button" href="/app" style={{display:"flex"}}>Masuk ke prototype</Link>
        <p style={{marginTop:"20px",fontSize:"15px"}}>Belum punya akun? <Link href="/register" style={{color:"var(--green-600)",fontWeight:700}}>Daftar</Link></p>
      </section>
    </main>
  );
}
