import Link from "next/link";
import { RevealInit, NavControls, CsFloat, ContactDialog } from "./ui-controls";

const steps = [
  ["01", "Petani Terverifikasi", "Dokumen dan kualitas diperiksa ketat sebelum produk tampil di katalog."],
  ["02", "Buyer Memilih", "Gabungkan ikan dari banyak petani dalam satu pesanan terintegrasi."],
  ["03", "Konsolidasi Hub", "Inspeksi kondisi di titik kumpul, kode lot tercatat, ekspor terjadwal."],
  ["04", "Tiba & Terlindungi", "Buyer punya 24 jam klaim DOA dengan bukti foto/video terverifikasi."],
];

const faq = [
  ["Apa itu batas DOA 5%?", "DOA ≤5% dipotong otomatis dari pembayaran petani. >5% tidak dibebankan otomatis — dimediasi bersama buyer dan petani oleh tim NusaFin."],
  ["Kapan petani menerima pembayaran?", "100% dibayarkan setelah ikan tiba di gudang buyer di negara tujuan dan masa klaim 24 jam selesai, ditambah tenggat +7 hari kerja."],
  ["Apakah NusaFin eksportir?", "NusaFin fasilitator marketplace dan konsolidasi. Pengiriman dilakukan bersama mitra ekspor dan logistik berizin."],
  ["Negara tujuan mana?", "Fokus awal Eropa dan Amerika Serikat — mengikuti CITES, Lacey Act, health certificate, GDPR, dan regulasi masing-masing negara tujuan."],
  ["Berapa biaya membership?", "Petani gratis 1 tahun sejak pendaftaran. Biaya buyer dan layanan pengiriman sedang difinalkan bersama investor."],
];

const articles = [
  ["PANDUAN EKSPOR", "Memahami FCA dan FOB untuk Kargo Udara", "Pembagian biaya, dokumen karantina, dan titik serah risiko dari kolam ke bandara tujuan."],
  ["PERAWATAN IKAN", "Persiapan Ikan Sebelum Perjalanan Internasional", "Conditioning, packing oksigen, inspeksi di titik kumpul, dan standar kualitas Grade A."],
  ["REGULASI", "CITES dan Lacey Act: Panduan untuk Buyer EU & AS", "Persyaratan dokumen spesies, deklarasi impor, dan cara NusaFin membantu kepatuhan."],
];

function RevealWrapper({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div data-reveal style={{ "--delay": `${delay}ms` } as React.CSSProperties} className={className}>
      {children}
    </div>
  );
}

function PageClient() {
  return <RevealInit />;
}

export default function Home() {
  return (
    <main>
      <PageClient />
      <CsFloat />
      <ContactDialog />

      {/* ── Navbar ─────────────────────────────── */}
      <nav className="nav">
        <Link className="brand" href="#top">
          Nusa<span>Fin</span>
        </Link>
        <div className="navLinks">
          <Link href="#cara">Cara Kerja</Link>
          <Link href="#tentang">Tentang</Link>
          <Link href="#kebijakan">Kebijakan DOA</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#artikel">Insight</Link>
        </div>
        <div className="navRight">
          <NavControls />
          <div className="navDivider" />
          <Link href="/login" className="navLogin">Masuk</Link>
          <Link className="button btnGold small" href="/register">Daftar</Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section id="top" className="hero">
        <div className="heroBg">
          <video
            className="heroBgVideo"
            autoPlay muted loop playsInline
            poster="/hero-poster.jpg"
            aria-hidden="true"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="heroBgOverlay" />
        </div>

        <div className="heroContent">
          <RevealWrapper delay={0}>
            <p className="eyebrow light">DARI PERAIRAN NUSANTARA · KE PASAR DUNIA</p>
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <h1>
              Ekspor ikan hias,<br />
              <em>lebih terhubung.</em>
            </h1>
          </RevealWrapper>
          <RevealWrapper delay={160}>
            <p className="heroLead">
              NusaFin menyatukan petani terverifikasi, buyer internasional, dan
              pengiriman terkonsolidasi dalam satu alur transparan dan terlindungi.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={240}>
            <div className="heroActions">
              <Link className="button btnGold" href="/register?role=farmer">
                Gabung sebagai petani
              </Link>
              <Link className="button btnOutlineWhite" href="/app/catalog">
                Jelajahi katalog
              </Link>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={320}>
            <div className="heroStats">
              <div className="stat"><b>24 jam</b><span>Jendela klaim DOA</span></div>
              <div className="statDiv" />
              <div className="stat"><b>5%</b><span>Batas DOA otomatis</span></div>
              <div className="statDiv" />
              <div className="stat"><b>EU + US</b><span>Pasar tujuan awal</span></div>
            </div>
          </RevealWrapper>
        </div>

        <div className="heroScroll" aria-hidden="true">
          <div className="scrollLine" />
        </div>
      </section>

      {/* ── Cara Kerja ───────────────────────────── */}
      <section id="cara" className="section bgDark">
        <div className="sectionInner">
          <RevealWrapper>
            <p className="eyebrow light">ALUR YANG JELAS</p>
            <h2 className="textWhite">Dari kolam hingga<br />gudang buyer.</h2>
          </RevealWrapper>
          <div className="stepsGrid">
            {steps.map(([num, title, desc], i) => (
              <RevealWrapper key={num} delay={i * 90}>
                <article className="stepCard">
                  <span className="stepNum">{num}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang ──────────────────────────────── */}
      <section id="tentang" className="section bgSurface">
        <div className="sectionInner splitLayout">
          <RevealWrapper>
            <div className="splitText">
              <p className="eyebrow">TENTANG NUSAFIN</p>
              <h2>Petani fokus merawat.<br />Kami urus ekspor.</h2>
              <p className="bodyText">
                Banyak petani unggul dalam budidaya, tetapi akses ke buyer luar negeri,
                dokumen ekspor, dan logistik lintas benua masih rumit. NusaFin adalah
                jembatan — bukan pengganti petani.
              </p>
              <ul className="featureList">
                {[
                  "Katalog multi-petani terkurasi dan terverifikasi",
                  "Titik kumpul sendiri dengan inspeksi terstandar",
                  "Kode lot per petani untuk tracing DOA transparan",
                  "Pembayaran dan klaim terlacak di satu platform",
                ].map((f) => (
                  <li key={f}><span className="featureIcon">✦</span>{f}</li>
                ))}
              </ul>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={120}>
            <div className="splitVisual">
              <div className="visualCard">
                <div className="visualTop">
                  <span className="badge">Terverifikasi ✓</span>
                  <span className="badgeGold">Export Ready</span>
                </div>
                <div className="fishArt">🐠</div>
                <p className="visualName">Premium Betta Halfmoon</p>
                <p className="visualSub">Jakarta, Indonesia · Grade A</p>
                {[["Lot ID","NF-JKT-001"],["Tujuan","Amsterdam, NL"],["DOA window","24 jam"]].map(([k,v])=>(
                  <div className="visualRow" key={k}>
                    <span>{k}</span><code>{v}</code>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── DOA Policy ───────────────────────────── */}
      <section id="kebijakan" className="section bgNavy">
        <div className="sectionInner">
          <RevealWrapper>
            <p className="eyebrow gold">PERLINDUNGAN TRANSAKSI</p>
            <h2 className="textWhite">Aturan DOA,<br />tanpa area abu-abu.</h2>
          </RevealWrapper>
          <div className="doaGrid">
            {[
              ["24H","Jendela Klaim","Klaim maksimal 24 jam sejak ikan masuk gudang buyer, wajib disertai foto/video.",""],
              ["≤5%","Potongan Terukur","Kompensasi otomatis dipotong dari pembayaran petani sesuai lot yang terdampak.","accent"],
              [">5%","Eskalasi Manusia","Tidak ada keputusan otomatis. Buyer, petani, dan admin mediasi bersama.",""],
            ].map(([big,title,desc,mod],i) => (
              <RevealWrapper key={big} delay={i*80}>
                <article className={`doaCard ${mod}`}>
                  <div className="doaBig">{big}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              </RevealWrapper>
            ))}
          </div>
          <RevealWrapper>
            <p className="doaNote">Kejadian luar biasa setelah batas waktu ditinjau manual dengan alasan tercatat dalam audit log.</p>
          </RevealWrapper>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section id="faq" className="section bgSurface">
        <div className="sectionInner splitLayout">
          <RevealWrapper>
            <div className="splitText">
              <p className="eyebrow">PERTANYAAN UMUM</p>
              <h2>Yang perlu diketahui<br />sebelum mulai.</h2>
            </div>
          </RevealWrapper>
          <RevealWrapper delay={100}>
            <div className="faqList">
              {faq.map(([q, a]) => (
                <details className="faqItem" key={q}>
                  <summary className="faqQ">{q}</summary>
                  <p className="faqA">{a}</p>
                </details>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Artikel ──────────────────────────────── */}
      <section id="artikel" className="section bgDark">
        <div className="sectionInner">
          <RevealWrapper>
            <p className="eyebrow light">INSIGHT & PANDUAN</p>
            <h2 className="textWhite">Belajar ekspor ikan hias.</h2>
          </RevealWrapper>
          <div className="articleGrid">
            {articles.map(([tag, title, desc], i) => (
              <RevealWrapper key={title} delay={i * 80}>
                <article className="articleCard">
                  <span className="articleTag">{tag}</span>
                  <h3 className="articleTitle">{title}</h3>
                  <p className="articleDesc">{desc}</p>
                  <a className="articleLink" href="#artikel">Segera hadir →</a>
                </article>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal ────────────────────────────────── */}
      <section className="section bgSurface2">
        <div className="sectionInner twoCol">
          {[
            ["TERMS","Ketentuan Layanan","/terms","NusaFin bertindak sebagai fasilitator marketplace dan konsolidasi. Harga, risiko FCA/FOB, klaim, dan tanggung jawab setiap pihak dijelaskan sebelum transaksi."],
            ["PRIVACY","Privasi & Data","/privacy","Data dikumpulkan seperlunya, dilindungi sesuai UU PDP dan GDPR, serta tidak dijual. Pengguna dapat meminta akses atau penghapusan data kapan saja."],
          ].map(([tag,title,href,desc])=>(
            <RevealWrapper key={tag}>
              <article className="legalCard">
                <p className="eyebrow">{tag}</p>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="textLink">Baca selengkapnya →</Link>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section bgNavy ctaSection">
        <div className="sectionInner ctaInner">
          <RevealWrapper>
            <p className="eyebrow gold">MULAI PERJALANAN</p>
            <h2 className="textWhite">Ikan terbaik Nusantara.<br />Buyer di seluruh dunia.</h2>
            <div className="heroActions ctaActions">
              <Link className="button btnGold" href="/register">Buat akun NusaFin</Link>
              <ContactDialog />
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="footer">
        <div className="footerTop">
          <div>
            <Link className="brand" href="#top">Nusa<span>Fin</span></Link>
            <p className="footerTagline">Marketplace ekspor ikan hias Indonesia</p>
          </div>
          <nav className="footerLinks">
            {[["#cara","Cara Kerja"],["#tentang","Tentang"],["#kebijakan","Kebijakan DOA"],["#faq","FAQ"],["/terms","Ketentuan"],["/privacy","Privasi"]].map(([href,label])=>(
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>
        <div className="footerBottom">
          <small>© 2026 NusaFin · Prototype untuk review internal.</small>
          <small><a href="mailto:hello@nusafin.example">hello@nusafin.example</a></small>
        </div>
      </footer>
    </main>
  );
}
