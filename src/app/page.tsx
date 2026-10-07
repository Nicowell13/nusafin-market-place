import Link from "next/link";
import { UiControls, ContactBtn } from "./ui-controls";

const steps = [
  ["01", "Petani Terverifikasi", "Dokumen dan kualitas diperiksa sebelum produk tampil di katalog."],
  ["02", "Buyer Memilih", "Gabungkan ikan dari beberapa petani dalam satu pesanan terintegrasi."],
  ["03", "Kami Konsolidasikan", "Inspeksi di titik kumpul, kode lot tercatat, ekspor terjadwal mingguan."],
  ["04", "Tiba & Terlindungi", "Buyer punya 24 jam klaim DOA dengan bukti foto/video yang terverifikasi."],
];

const faq = [
  ["Apa itu batas DOA 5%?", "DOA ≤5% dipotong otomatis dari pembayaran petani. >5% tidak dibebankan otomatis — dimediasi bersama buyer dan petani."],
  ["Kapan petani menerima pembayaran?", "100% dilepas setelah ikan tiba di gudang buyer di negara tujuan dan masa klaim 24 jam selesai, ditambah tenggat +7 hari."],
  ["Apakah NusaFin eksportir?", "NusaFin fasilitator marketplace dan konsolidasi. Pengiriman bersama mitra ekspor dan logistik berizin."],
  ["Negara tujuan mana?", "Fokus awal Eropa dan AS — mengikuti CITES, Lacey Act, health certificate, GDPR, dan regulasi tujuan."],
  ["Berapa biaya membership?", "Petani gratis selama 1 tahun sejak pendaftaran. Biaya buyer dan layanan pengiriman masih dalam tahap finalisasi."],
];

const articles = [
  ["PANDUAN EKSPOR", "Memahami FCA dan FOB untuk Kargo Udara", "Pembagian biaya, dokumen karantina, dan titik serah risiko dari kolam ke bandara tujuan."],
  ["PERAWATAN IKAN", "Persiapan Ikan Sebelum Perjalanan Internasional", "Conditioning, packing oksigen, inspeksi di titik kumpul, dan standar kualitas Grade A."],
  ["REGULASI", "CITES dan Lacey Act: Panduan untuk Buyer EU & AS", "Persyaratan dokumen spesies, deklarasi impor, dan cara NusaFin membantu kepatuhan."],
];

export default function Home() {
  return (
    <main>
      <UiControls />

      {/* ── Navbar ────────────────────────────────── */}
      <nav className="nav">
        <Link className="brand" href="#top">Nusa<span>Fin</span></Link>
        <div className="navLinks">
          <Link href="#cara">Cara Kerja</Link>
          <Link href="#tentang">Tentang</Link>
          <Link href="#kebijakan">Kebijakan</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#artikel">Insight</Link>
        </div>
        <div className="navActions">
          <Link href="/login" className="navLogin">Masuk</Link>
          <Link className="button small" href="/register">Daftar</Link>
        </div>
      </nav>

      {/* ── Hero — full-screen video ───────────────── */}
      <section id="top" className="hero">
        <div className="heroBg">
          {/* Video: letakkan file hero-bg.mp4 di /public/ */}
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
          <p className="eyebrow light">DARI PERAIRAN NUSANTARA · KE PASAR DUNIA</p>
          <h1>
            Ekspor ikan hias,<br />
            <em>lebih terhubung.</em>
          </h1>
          <p className="heroLead">
            NusaFin menyatukan petani terverifikasi, buyer internasional, dan pengiriman
            terkonsolidasi dalam satu alur yang transparan dan terlindungi.
          </p>
          <div className="heroActions">
            <Link className="button light" href="/register?role=farmer">Gabung sebagai petani</Link>
            <Link className="button ghostLight" href="/app/catalog">Jelajahi katalog</Link>
          </div>
          <div className="heroStats">
            <div className="stat"><b>24 jam</b><span>Jendela klaim DOA</span></div>
            <div className="statDiv" />
            <div className="stat"><b>5%</b><span>Batas DOA otomatis</span></div>
            <div className="statDiv" />
            <div className="stat"><b>EU + US</b><span>Pasar tujuan awal</span></div>
          </div>
        </div>
        <div className="heroScroll" aria-hidden="true">
          <span>↓</span>
        </div>
      </section>

      {/* ── Cara Kerja ────────────────────────────── */}
      <section id="cara" className="section bgCream">
        <div className="sectionInner">
          <p className="eyebrow">ALUR YANG JELAS</p>
          <h2>Dari kolam hingga gudang buyer</h2>
          <div className="stepsGrid">
            {steps.map(([num, title, desc]) => (
              <article className="stepCard" key={num}>
                <span className="stepNum">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tentang ───────────────────────────────── */}
      <section id="tentang" className="section bgWhite">
        <div className="sectionInner splitLayout">
          <div className="splitText">
            <p className="eyebrow">TENTANG NUSAFIN</p>
            <h2>Petani fokus merawat.<br />Kami urus jalur ekspornya.</h2>
            <p className="bodyText">
              Banyak petani unggul dalam budidaya, tetapi akses ke buyer luar negeri, dokumen
              ekspor, dan logistik lintas benua masih rumit dan mahal. NusaFin hadir sebagai
              jembatan — bukan pengganti petani.
            </p>
            <ul className="featureList">
              <li><span className="featureIcon">✓</span> Katalog multi-petani terkurasi dan terverifikasi</li>
              <li><span className="featureIcon">✓</span> Titik kumpul sendiri dengan inspeksi terstandar</li>
              <li><span className="featureIcon">✓</span> Kode lot per petani untuk tracing DOA transparan</li>
              <li><span className="featureIcon">✓</span> Pembayaran dan klaim terlacak di satu platform</li>
            </ul>
          </div>
          <div className="splitVisual">
            <div className="visualCard">
              <div className="visualTop">
                <span className="badge">Terverifikasi ✓</span>
                <span className="badge green">Export Ready</span>
              </div>
              <div className="fishArt">🐠</div>
              <p className="visualName">Premium Betta Halfmoon</p>
              <p className="visualSub">Jakarta, Indonesia · Grade A</p>
              <div className="visualRow">
                <span>Lot ID</span><code>NF-JKT-001</code>
              </div>
              <div className="visualRow">
                <span>Tujuan</span><code>Amsterdam, NL</code>
              </div>
              <div className="visualRow">
                <span>DOA window</span><code>24 jam</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kebijakan DOA ─────────────────────────── */}
      <section id="kebijakan" className="section bgDark">
        <div className="sectionInner">
          <p className="eyebrow light">PERLINDUNGAN TRANSAKSI</p>
          <h2 className="textWhite">Aturan DOA, tanpa area abu-abu.</h2>
          <div className="doaGrid">
            <article className="doaCard">
              <div className="doaBig">24H</div>
              <h3>Jendela Klaim</h3>
              <p>Klaim maksimal 24 jam sejak ikan masuk gudang buyer, wajib disertai foto/video sebagai bukti.</p>
            </article>
            <article className="doaCard accent">
              <div className="doaBig">≤ 5%</div>
              <h3>Potongan Terukur</h3>
              <p>Kompensasi otomatis dipotong dari pembayaran petani sesuai lot yang terdampak.</p>
            </article>
            <article className="doaCard">
              <div className="doaBig">&gt; 5%</div>
              <h3>Eskalasi Manusia</h3>
              <p>Tidak ada keputusan otomatis. Buyer, petani, dan admin berkomunikasi mencari resolusi terbaik.</p>
            </article>
          </div>
          <p className="doaNote">Kejadian luar biasa setelah batas waktu dapat ditinjau manual dengan alasan tercatat dalam audit log.</p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section id="faq" className="section bgCream">
        <div className="sectionInner splitLayout">
          <div className="splitText">
            <p className="eyebrow">PERTANYAAN UMUM</p>
            <h2>Yang perlu diketahui sebelum mulai.</h2>
          </div>
          <div className="faqList">
            {faq.map(([q, a]) => (
              <details className="faqItem" key={q}>
                <summary className="faqQ">{q}</summary>
                <p className="faqA">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artikel SEO ───────────────────────────── */}
      <section id="artikel" className="section bgWhite">
        <div className="sectionInner">
          <p className="eyebrow">INSIGHT & PANDUAN</p>
          <h2>Belajar ekspor ikan hias.</h2>
          <div className="articleGrid">
            {articles.map(([tag, title, desc]) => (
              <article className="articleCard" key={title}>
                <span className="articleTag">{tag}</span>
                <h3 className="articleTitle">{title}</h3>
                <p className="articleDesc">{desc}</p>
                <a className="articleLink" href="#artikel">Segera hadir →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal ─────────────────────────────────── */}
      <section className="section bgCream">
        <div className="sectionInner twoCol">
          <article className="legalCard">
            <p className="eyebrow">TERMS</p>
            <h3>Ketentuan Layanan</h3>
            <p>NusaFin bertindak sebagai fasilitator marketplace dan konsolidasi. Harga, risiko FCA/FOB, klaim, pembayaran, dan tanggung jawab setiap pihak dijelaskan sebelum transaksi.</p>
            <Link href="/terms" className="textLink">Baca ketentuan lengkap →</Link>
          </article>
          <article className="legalCard">
            <p className="eyebrow">PRIVACY</p>
            <h3>Privasi & Data</h3>
            <p>Data dikumpulkan seperlunya, dilindungi sesuai UU PDP dan GDPR, serta tidak dijual. Pengguna dapat meminta akses atau penghapusan data kapan saja.</p>
            <Link href="/privacy" className="textLink">Baca kebijakan lengkap →</Link>
          </article>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="section bgGreen ctaSection">
        <div className="sectionInner ctaInner">
          <p className="eyebrow light">MULAI PERJALANAN</p>
          <h2 className="textWhite">Ikan terbaik Nusantara.<br />Buyer di seluruh dunia.</h2>
          <div className="heroActions">
            <Link className="button light" href="/register">Buat akun NusaFin</Link>
            <ContactBtn label="Hubungi kami" />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="footer">
        <div className="footerTop">
          <div>
            <Link className="brand" href="#top">Nusa<span>Fin</span></Link>
            <p className="footerTagline">Marketplace ekspor ikan hias Indonesia</p>
          </div>
          <div className="footerLinks">
            <Link href="#cara">Cara Kerja</Link>
            <Link href="#tentang">Tentang</Link>
            <Link href="/terms">Ketentuan</Link>
            <Link href="/privacy">Privasi</Link>
          </div>
        </div>
        <div className="footerBottom">
          <small>© 2026 NusaFin. Prototype untuk review internal.</small>
          <small>
            <a href="mailto:hello@nusafin.example">hello@nusafin.example</a>
          </small>
        </div>
      </footer>
    </main>
  );
}
