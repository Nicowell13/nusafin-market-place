import Link from "next/link";
import {
  RevealInit, NavScrolled, NavControls, MobileMenu,
  CsFloat, ContactDialog, TestimonialSlider
} from "./ui-controls";

const steps = [
  ["01","💬","Inquiry & Konsultasi","Hubungi kami via form atau CS. Tim ekspor mendiskusikan kebutuhan spesies, harga, dan pengiriman."],
  ["02","📋","Pilih & Konfirmasi","Akses katalog terverifikasi, tentukan spesies dan jumlah, terima penawaran lengkap."],
  ["03","📦","Konsolidasi & Inspeksi","Ikan dari berbagai petani diperiksa di titik kumpul NusaFin. Kode lot per petani dicatat."],
  ["04","✈️","Ekspor & Pengiriman","Shipment terjadwal mingguan. Buyer mendapat update status hingga ikan tiba di gudang tujuan."],
  ["05","🛡️","Klaim DOA 24 Jam","Buyer punya 24 jam untuk klaim dengan bukti foto/video. DOA ≤5% otomatis, >5% dimediasi."],
  ["06","💰","Pembayaran Petani","100% pembayaran petani dilepas setelah masa klaim tutup. Transparan dan terlacak."],
];

const fishCategories = [
  { name:"Betta Halfmoon", sci:"Betta splendens", emoji:"🐠", tag:"Populer", min:"200 pcs" },
  { name:"Discus Red Melon", sci:"Symphysodon spp.", emoji:"🐡", tag:"Premium", min:"50 pcs" },
  { name:"Guppy Fancy", sci:"Poecilia reticulata", emoji:"🐟", tag:"Terlaris", min:"500 pairs" },
  { name:"Neon Tetra", sci:"Paracheirodon innesi", emoji:"✨", tag:"Volume", min:"1000 pcs" },
  { name:"Koi Kohaku", sci:"Cyprinus carpio", emoji:"🎏", tag:"Eksklusif", min:"10 pcs" },
  { name:"Arowana Silver", sci:"Osteoglossum bicirrhosum", emoji:"🐉", tag:"Langka", min:"On request" },
];

const regions = [
  { flag:"🌍", region:"Eropa", countries:["Jerman","Belanda","UK","Prancis","Italia","Polandia"] },
  { flag:"🌎", region:"Amerika", countries:["Amerika Serikat"] },
  { flag:"🌏", region:"Asia Pasifik", countries:["Jepang","Korea","Singapura","Australia"] },
  { flag:"🌍", region:"Timur Tengah", countries:["UAE","Arab Saudi","Qatar","Kuwait"] },
];

const trustFeatures = [
  { icon:"📸", title:"Titik Kumpul Sendiri", desc:"Fasilitas inspeksi dan konsolidasi milik NusaFin. Kondisi ikan diperiksa dan difoto sebelum packing." },
  { icon:"📦", title:"Packing IATA-compliant", desc:"Double-bag oksigen dalam styrofoam berinsulasi. Standar kargo udara internasional." },
  { icon:"✈️", title:"Ekspor Terjadwal", desc:"Pengiriman mingguan terkonsolidasi ke berbagai negara tujuan, lebih hemat dari pengiriman terpisah." },
  { icon:"🏆", title:"Dokumen Lengkap", desc:"CITES, health certificate, karantina, Lacey Act declaration — semua diurus per negara tujuan." },
];

// ponytail: demo reviews for layout; replace with verified pilot feedback before launch.
const testimonials = [
  { name:"Hans Mueller", company:"Perusahaan demo", country:"Germany", flag:"🇩🇪", text:"NusaFin menggabungkan pembelian dari beberapa petani terverifikasi dalam satu shipment. Kualitas konsisten, dokumentasi lengkap. Partner terpercaya untuk pasar Eropa kami." },
  { name:"Sarah Mitchell", company:"Perusahaan demo", country:"United States", flag:"🇺🇸", text:"Proses ekspor yang transparan dari awal sampai akhir. Klaim DOA diproses cepat dengan sistem yang adil. Ikan Betta Halfmoon dari NusaFin jadi produk terlaris kami." },
  { name:"Takeshi Yamamoto", company:"Perusahaan demo", country:"Japan", flag:"🇯🇵", text:"Kode lot per petani membuat tracing sangat mudah. Sistem konsolidasi mingguan jauh lebih efisien dari supplier lain yang kami coba." },
  { name:"Marie Dubois", company:"Perusahaan demo", country:"France", flag:"🇫🇷", text:"Sebagai importir Eropa, kami sangat menghargai kepatuhan GDPR dan CITES yang serius dari NusaFin. Proses onboarding cepat dan professional." },
];

const faq = [
  ["Apa itu batas DOA 5%?","DOA ≤5% dipotong otomatis dari pembayaran petani. >5% tidak dibebankan otomatis — dimediasi bersama buyer, petani, dan tim NusaFin."],
  ["Kapan petani menerima pembayaran?","100% setelah ikan tiba di gudang buyer + masa klaim 24 jam selesai. Tenggat tambahan +7 hari setelah klaim ditutup."],
  ["Bagaimana jika klaim lewat 24 jam?","Sistem tidak menerima klaim baru. Kejadian luar biasa dibicarakan manual; admin bisa override dengan alasan tercatat dalam audit log."],
  ["Apakah NusaFin eksportir resmi?","NusaFin fasilitator marketplace dan konsolidasi. Pengiriman bersama mitra ekspor dan logistik berizin. Semua dokumen disiapkan per negara tujuan."],
  ["Berapa biaya membership?","Petani gratis 1 tahun sejak pendaftaran. Biaya buyer dan layanan pengiriman dalam tahap finalisasi bersama investor."],
];

const articles = [
  ["PANDUAN EKSPOR","Memahami FCA dan FOB untuk Kargo Udara","Pembagian biaya, dokumen karantina, dan titik serah risiko dari kolam ke bandara tujuan."],
  ["PERAWATAN IKAN","Persiapan Ikan Sebelum Perjalanan Internasional","Conditioning, packing oksigen, inspeksi di titik kumpul, dan standar kualitas Grade A."],
  ["REGULASI","CITES dan Lacey Act: Panduan untuk Buyer EU & AS","Persyaratan dokumen spesies, deklarasi impor, dan cara NusaFin membantu kepatuhan."],
];

function R({ d=0, c="", children }: { d?:number; c?:string; children:React.ReactNode }) {
  return <div data-reveal style={{"--delay":`${d}ms`} as React.CSSProperties} className={c}>{children}</div>;
}

export default function Home() {
  return (
    <main className="mainWrap">
      <RevealInit />
      <NavScrolled />
      <CsFloat />

      {/* ── Navbar ─────────────────────────────── */}
      <nav id="main-nav" className="nav">
        <Link className="brand" href="#top">Nusa<span>Fin</span></Link>
        <div className="navLinks">
          {[["#cara","Cara Kerja"],["#tentang","Tentang"],["#koleksi","Koleksi"],["#tujuan","Jangkauan"],["#testimoni","Testimoni"],["#faq","FAQ"]].map(([h,l])=>(
            <Link key={h} href={h}>{l}</Link>
          ))}
        </div>
        <div className="navRight">
          <NavControls />
          <div className="navDiv" />
          <Link href="/login" className="navLogin">Masuk</Link>
          <Link className="button btnOcean small" href="/register">Daftar</Link>
          <MobileMenu />
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section id="top" className="hero">
        <div className="heroBg">
          <video className="heroBgVideo" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="heroBgOverlay" />
          {/* Animated orbs */}
          <div className="orb orb1" />
          <div className="orb orb2" />
          {/* Bubbles */}
          <div className="bubblesWrap" aria-hidden="true">
            {Array.from({length:12},(_,i)=>(
              <div key={i} className="bubble" style={{left:`${8+i*7.5}%`,animationDelay:`${i*0.9}s`,animationDuration:`${10+i*1.5}s`,width:`${5+i%4*8}px`,height:`${5+i%4*8}px`}} />
            ))}
          </div>
        </div>

        <div className="heroContent">
          <R d={0}>
            <div className="heroBadge">
              <span className="heroBadgeDot" />
              <span>Marketplace ekspor ikan hias terpercaya</span>
            </div>
          </R>
          <R d={100}>
            <h1>Ekspor ikan hias,<br /><em>lebih terhubung.</em></h1>
          </R>
          <R d={200}>
            <p className="heroLead">NusaFin menyatukan petani terverifikasi, buyer internasional, dan pengiriman terkonsolidasi dalam satu alur transparan dan terlindungi.</p>
          </R>
          <R d={300}>
            <div className="heroActions">
              <Link className="button btnOceanGlow" href="/register?role=farmer">Request Catalog</Link>
              <Link className="button btnOutlineOcean" href="/app/catalog">Jelajahi Koleksi</Link>
            </div>
          </R>
          <R d={400}>
            <div className="heroStats">
              {[["24 jam","Jendela klaim DOA"],["5%","Batas DOA otomatis"],["EU + US","Pasar tujuan awal"],["100%","Bayar setelah tiba"]].map(([v,l])=>(
                <div key={l} className="stat"><b className="gradientText">{v}</b><span>{l}</span></div>
              ))}
            </div>
          </R>
        </div>

        <div className="heroScroll" aria-hidden="true"><div className="scrollLine" /></div>

        {/* Wave SVG */}
        <div className="heroWave">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="var(--surface)" />
          </svg>
        </div>
      </section>

      {/* ── Cara Kerja (Process Timeline) ─────── */}
      <section id="cara" className="section bgSurface">
        <div className="sectionInner">
          <R><p className="eyebrow">ALUR YANG JELAS</p><h2>Dari kolam hingga gudang buyer.</h2></R>
          <div className="processGrid">
            {steps.map(([num,icon,title,desc],i)=>(
              <R key={num} d={i*70}>
                <article className="processCard glassCard">
                  <div className="processTop"><span className="processNum">{num}</span><span className="processIcon">{icon}</span></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="waveDivider waveDown"><svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none"><path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" fill="var(--ocean-950)" /></svg></div>

      {/* ── Tentang / Trust ──────────────────── */}
      <section id="tentang" className="section bgOceanDeep">
        <div className="sectionInner">
          <div className="splitLayout">
            <R>
              <p className="eyebrow light">TENTANG NUSAFIN</p>
              <h2 className="textWhite">Petani fokus merawat.<br />Kami urus ekspor.</h2>
              <p style={{color:"rgba(255,255,255,.65)",lineHeight:1.8,marginBottom:"32px",fontSize:"17px"}}>Banyak petani unggul dalam budidaya, tetapi akses ke buyer luar negeri, dokumen ekspor, dan logistik lintas benua masih rumit. NusaFin hadir sebagai jembatan — bukan pengganti petani.</p>
              <ul className="featureList">
                {["Katalog multi-petani terkurasi dan terverifikasi","Titik kumpul sendiri dengan inspeksi terstandar","Kode lot per petani untuk tracing DOA transparan","Pembayaran dan klaim terlacak di satu platform"].map(f=>(
                  <li key={f}><span className="featureIcon">✦</span>{f}</li>
                ))}
              </ul>
            </R>
            <R d={120}>
              <div className="trustGrid">
                {trustFeatures.map((f,i)=>(
                  <article key={i} className="trustCard glassCard cardHover">
                    <div className="trustIcon">{f.icon}</div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </article>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* Wave divider up */}
      <div className="waveDivider waveUp"><svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none"><path d="M0,60 C480,0 960,0 1440,60 L1440,0 L0,0 Z" fill="var(--ocean-950)" /></svg></div>

      {/* ── Fish Collection ───────────────────── */}
      <section id="koleksi" className="section bgSurface">
        <div className="sectionInner">
          <R><p className="eyebrow">KOLEKSI UNGGULAN</p><h2>Ikan berkualitas ekspor dari Indonesia.</h2></R>
          <div className="fishGrid">
            {fishCategories.map((f,i)=>(
              <R key={f.name} d={i*60}>
                <article className="fishCard cardHover">
                  <div className="fishCardTop">
                    <span className="fishTag">{f.tag}</span>
                  </div>
                  <div className="fishEmoji">{f.emoji}</div>
                  <div className="fishCardBottom">
                    <h3>{f.name}</h3>
                    <p className="fishSci">{f.sci}</p>
                    <div className="fishMeta">
                      <span>Contoh katalog</span>
                      <a href="/register" className="fishCta">Request →</a>
                    </div>
                  </div>
                </article>
              </R>
            ))}
          </div>
          <R d={300}><div style={{textAlign:"center",marginTop:"48px"}}><Link className="button btnOcean" href="/app/catalog">Lihat Katalog Lengkap →</Link></div></R>
        </div>
      </section>

      {/* ── Kebijakan DOA ─────────────────────── */}
      <section id="kebijakan" className="section bgOceanDeep">
        <div className="sectionInner">
          <R><p className="eyebrow light">PERLINDUNGAN TRANSAKSI</p><h2 className="textWhite">Aturan DOA,<br />tanpa area abu-abu.</h2></R>
          <div className="doaGrid">
            {[
              ["24H","Jendela Klaim","Klaim maksimal 24 jam sejak ikan masuk gudang buyer, wajib disertai foto/video.",""],
              ["≤5%","Potongan Terukur","Kompensasi otomatis dipotong dari pembayaran petani sesuai lot terdampak.","accent"],
              [">5%","Eskalasi Manusia","Tidak ada keputusan otomatis. Buyer, petani, dan admin mediasi bersama.",""],
            ].map(([big,title,desc,mod],i)=>(
              <R key={big} d={i*80}>
                <article className={`doaCard glassCard${mod==="accent"?" doaAccent":""}`}>
                  <div className="doaBig gradientText">{big}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              </R>
            ))}
          </div>
          <R><p className="doaNote">Kejadian luar biasa setelah batas waktu dapat ditinjau manual dengan alasan tercatat dalam audit log.</p></R>
        </div>
      </section>

      {/* ── Global Reach ─────────────────────── */}
      <section id="tujuan" className="section bgSurface">
        <div className="sectionInner">
          <R><p className="eyebrow">PASAR TUJUAN AWAL</p><h2>Fokus <span className="gradientText">Eropa &amp; AS.</span></h2></R>
          <div className="regionGrid">
            {regions.slice(0,2).map((r,i)=>(
              <R key={r.region} d={i*70}>
                <article className="regionCard glassCard cardHover">
                  <div className="regionFlag">{r.flag}</div>
                  <h3>{r.region}</h3>
                  <div className="regionTags">{r.countries.map(c=><span key={c}>{c}</span>)}</div>
                </article>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section id="testimoni" className="section bgOceanDeep">
        <div className="sectionInner">
          <R><p className="eyebrow light">KATA BUYER</p><h2 className="textWhite">Preview ulasan buyer.<br />Data demo, bukan testimoni nyata.</h2></R>
          <TestimonialSlider items={testimonials} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section id="faq" className="section bgSurface">
        <div className="sectionInner splitLayout">
          <R><div><p className="eyebrow">PERTANYAAN UMUM</p><h2>Yang perlu diketahui sebelum mulai.</h2></div></R>
          <R d={100}>
            <div className="faqList">
              {faq.map(([q,a])=>(
                <details className="faqItem" key={q}>
                  <summary className="faqQ">{q}</summary>
                  <p className="faqA">{a}</p>
                </details>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ── Artikel SEO ──────────────────────── */}
      <section id="artikel" className="section bgOceanDeep">
        <div className="sectionInner">
          <R><p className="eyebrow light">INSIGHT & PANDUAN</p><h2 className="textWhite">Belajar ekspor ikan hias.</h2></R>
          <div className="articleGrid">
            {articles.map(([tag,title,desc],i)=>(
              <R key={title} d={i*80}>
                <article className="articleCard glassCard cardHover">
                  <span className="articleTag">{tag}</span>
                  <h3 className="articleTitle">{title}</h3>
                  <p className="articleDesc">{desc}</p>
                  <a className="articleLink" href="#artikel">Segera hadir →</a>
                </article>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────── */}
      <section className="section bgSurface">
        <div className="sectionInner">
          <R>
            <div className="ctaBanner">
              <div className="ctaBannerBg" />
              <div className="ctaBannerContent">
                <p className="eyebrow light">MULAI PERJALANAN</p>
                <h2 className="textWhite">Ikan terbaik Nusantara.<br />Buyer di seluruh dunia.</h2>
                <div className="heroActions" style={{justifyContent:"center",marginBottom:0}}>
                  <Link className="button" style={{background:"white",color:"var(--ocean-800)",fontWeight:700}} href="/register">Buat Akun NusaFin</Link>
                  <ContactDialog />
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── Legal ────────────────────────────── */}
      <section className="section bgOceanDeep">
        <div className="sectionInner twoCol">
          {[["TERMS","Ketentuan Layanan","/terms","NusaFin fasilitator marketplace dan konsolidasi. Harga, risiko FCA/FOB, klaim, dan tanggung jawab dijelaskan sebelum transaksi."],
            ["PRIVACY","Privasi & Data","/privacy","Data dikumpulkan seperlunya, dilindungi UU PDP dan GDPR, tidak dijual. Pengguna dapat meminta akses atau penghapusan data kapan saja."]
          ].map(([tag,title,href,desc])=>(
            <R key={tag}>
              <article className="legalCard glassCard">
                <p className="eyebrow light">{tag}</p>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href={href} className="textLink">Baca selengkapnya →</Link>
              </article>
            </R>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerTop">
            <div>
              <Link className="brand footerBrand" href="#top">Nusa<span>Fin</span></Link>
              <p className="footerTagline">Marketplace ekspor ikan hias Indonesia</p>
            </div>
            <nav className="footerLinks">
              {[["#cara","Cara Kerja"],["#tentang","Tentang"],["#koleksi","Koleksi"],["#kebijakan","Kebijakan DOA"],["#faq","FAQ"],["/terms","Ketentuan"],["/privacy","Privasi"]].map(([h,l])=>(
                <Link key={h} href={h}>{l}</Link>
              ))}
            </nav>
          </div>
          <div className="footerBottom">
            <small>© 2026 NusaFin · Prototype untuk review internal</small>
            <small><a href="mailto:hello@nusafin.example">hello@nusafin.example</a></small>
          </div>
        </div>
      </footer>
    </main>
  );
}
