# NusaFin — Dev Plan (MVP)

Marketplace petani ikan hias → pembeli ekspor. Sesuai stack di MEMORY.md.
**Belum mulai code.** Ini urutan kerja dan lingkup tiap fase.

---

## Prinsip

- Asset-light, no-bakar-uang juga berlaku ke dev: fitur minimum dulu, yang mahal nanti.
- Tiap fase berakhir dengan yang bisa dilihat/dites, bukan "selesai nanti".
- Backend TS (Next.js Route Handlers / Server Actions). Go setelah pendanaan.
- Semua nomor/tarif/keputusan ambil dari dokumen proposal di MEMORY.md.

## Fase 0 — Setup & repo (hari 1-2)

- Repo git (monorepo satu project Next.js, tidak microservice).
- Akun + MFA: Supabase (region Singapore), Vercel, Cloudinary, Upstash, Resend, Sentry, Cloudflare.
- Next.js 15 + TypeScript + Tailwind + Drizzle.
- Env: `.env.local` (dev), Vercel env (staging/prod). Tidak ada key di repo.
- Skema Drizzle + folder `supabase/migrations` SQL — skema jadi file milik sendiri.
- Sentry + error boundary dari hari pertama.
- CI: typecheck + lint minimal.

**Selesai jika:** repo push, `next dev` jalan, Supabase project connect, login dummy (email test) work.

## Fase 0.5 — UI/UX Interactive Prototype & Static Pages (minggu 1)

Fokus ke validasi user experience, evaluasi visual/layout, dan halaman informasi publik sebelum backend/database dihubungkan secara fungsional penuh.

- **Design System & Branding Dasar**:
  - Warna, tipografi, komponen UI dasar (Button, Card, Modal, Input, Badge, Table).
  - Dukungan dwibahasa (ID/EN toggle preview).
- **Halaman Statis & Legal (SEO & Kepatuhan)**:
  - Landing page publik (Hero, Value Proposition, Cara Kerja, Katalog Unggulan).
  - About Us / Tentang NusaFin.
  - Terms & Conditions (Ketentuan Layanan perantara, ekspor FOB/FCA, titik kumpul).
  - DOA Policy & Claim Terms (Jendela 24 jam, batas 5%, aturan eskalasi & force majeure).
  - Privacy Policy (Kepatuhan UU PDP + GDPR Uni Eropa).
  - FAQ (Pertanyaan umum untuk petani lokal & pembeli luar negeri).
  - Contact / Pusat Bantuan.
- **Interactive UI Mockups & User Flow Preview**:
  - Alur Registrasi & Onboarding Mockup:
    - Petani (input data tambak/kolam, upload dokumen NIB/sertifikat).
    - Pembeli Internasional (pilihan membership, data importir/negara tujuan).
  - Katalog & Detail Produk Mockup (filter spesies, grade, estimasi biaya FOB).
  - Preview Keranjang & Checkout Multi-Petani (simulasi pemecahan sub-order & lot).
  - Mockup Dashboard:
    - Petani (status stok, monitoring pengiriman, pencairan dana).
    - Pembeli (tracking pengiriman konsolidasi, form klaim DOA 24 jam).
    - Admin (verifikasi petani, manajemen konsolidasi).

**Selesai jika:** User/Anda dapat mengklik dan mereview seluruh alur navigasi visual, halaman statis legal terbaca lengkap, dan tampilan di-approve sebelum integrasi database/backend.

## Fase 1 — Auth & peran (minggu 2)

- Supabase Auth: email + OTP WA (rate-limit login).
- Peran di `app_metadata`: `petani`, `pembeli`, `admin`, `moderator`, `finance`.
- Pendaftaran terpisah per peran, verifikasi email/HP wajib.
- **Bahasa UI: ID (petani) + EN (pembeli EU/US)** dari awal — i18n routing Next.js, jangan retrofit.
- **Field `destination_country` di order dari awal** (bukan retrofit): dokumen + regulasi beda per negara.
- Error login seragam (tidak bocor email terdaftar).
- Middleware: redirect route berdasarkan peran.
- Turnstile di form pendaftaran/login.

**Selesai jika:** 3 peran bisa daftar/login, route guard jalan, `app_metadata` tidak bisa diubah user.

## Fase 2 — Profil & verifikasi petani (minggu 2)

- Profil petani: kelompok tani, lokasi, spesies unggulan, kontak (disembunyikan dari publik).
- Upload dokumen: NIB, sertifikat — bucket **privat** Supabase Storage, akses via signed URL, RLS restrict ke admin + pemilik.
- Admin dashboard sederhana: list verifikasi, approve/reject, catatan.
- Lencana "Terverifikasi" tampil publik setelah approve.

**Selesai jika:** petani upload dokumen, admin approve, dokumen tidak bisa diakses publik/anon.

## Fase 3 — Katalog produk (minggu 3)

- Produk: spesies, ukuran, grade, harga, stestatus stok, foto/video.
- Upload gambar: **Cloudinary signed upload**, validasi format+ukuran server-side.
- Simpan `public_id` Cloudinary di DB, bukan URL penuh (mudah migrasi).
- Halaman publik: listing, filter spesies/ukuran/grade, pencarian sederhana (Postgres `ilike` dulu, tanpa search engine).
- Cache halaman publik via CDN / Next `revalidate`.

**Selesai jika:** petani CRUD produk sendiri, pembeli bisa cari & lihat detail, foto load cepat.

## Fase 4 — Pesanan multi-petani (minggu 4-5)

Model data inti mulai bentuknya:

```
buyer_orders
  └─ sub_orders (per petani, kode lot per sub-order)
  └─ consolidated_shipments (gabungan sub-orders → 1 pengiriman)
       └─ boxes (kode lot, isi per sub-order)
  └─ doa_claims (link ke lot)
  └─ farmer_payments (status: held → released | deducted)
```

**Status shipment terkait pembayaran petani:**
```
consolidating → shipped → arrived_at_destination
  → claim_window_open (24 jam sejak ikan masuk gudang pembeli)
  → claim_closed (klaim selesai diproses)
  → farmer_payment.released (+7 hari config)
  
  kalau lewat 24 jam tanpa klaim → claim_window_expired → langsung farmer_payment.released
```

**Override:** admin bisa buka klaim manual setelah window tutup untuk kejadian luar biasa. Alasan wajib, masuk audit log.

- Inquiry/chat: buyer tanya dulu ke petani (atau ke platform), sanitasi input, tombol blokir/laporkan.
- Checkout: order 1 pembeli → pecah jadi sub-order per petani otomatis.
- Pembeli **bayar/setor di muka** sebelum kirim (escrow platform / pending status).
- Status order: `pending → paid → consolidating → shipped → arrived → claim_open → closed`.
- Stok di-hold saat checkout, release kalau batal.
- **Pembayaran petani: 100% setelah shipment tiba di negara tujuan + masa klaim DOA selesai.** Status flow: `arrived_at_destination` → masa klaim (config) → `claim_closed` → trigger `farmer_payment.released` (tenggat +7 hari, config). Kompensasi DOA dipotong dari pembayaran petani otomatis.

**Selesai jika:** order multi-petani bisa dibuat, sub-order terbentuk, status berjalan, tidak double-order.

## Fase 5 — Konsolidasi & pengiriman (minggu 5-6)

- **Titik kumpul sendiri**: entitas `consolidation_points` (alamat, jam operasional, PIC) di DB.
- **Cek kondisi saat sampai di titik kumpul**: foto/video wajib oleh staf sebelum diterima. Status `arrived_at_hub`. Ini bukti awal kalau nanti ada klaim DOA — tanpa ini, kata petani vs kata staf.
- Jadwal kirim tetap per minggu (cut-off day, ship day).
- Admin/ops: pilih sub-order → bentuk consolidated shipment → generate kode lot per box.
- Packing list + dokumen ekspor (template PDF/label sederhana).
- Tracking: status shipment manual input ops dulu (tanpa integrasi kurir).
- Notifikasi: petani & pembeli dapat update (Resend email + WA via provider).

**Selesai jika:** satu shipment berisi sub-order dari ≥2 petani, kode lot terlihat di sistem, notifikasi keluar.

## Fase 6 — Klaim DOA (minggu 6-7)

- Klaim dibuka setelah shipment "arrived". **Jendela klaim: 24 jam sejak ikan masuk gudang pembeli.** Setelah 24 jam, sistem tidak menerima klaim baru — status `claim_window_expired`.
- Kejadian luar biasa setelah 24 jam: tidak bisa diklaim via sistem. Dibicarakan/dinegosiasi manual oleh admin dengan buyer + petani. Admin bisa buka klaim manual dengan catatan alasan (`override`), ter-log di audit log.
- Upload bukti video/foto (Cloudinary, private delivery).
- Admin review: bedakan penyebab (kualitas ikan/packing vs kesalahan kargo).
- **Batas DOA: 5%.** DOA ≤5% → dibebankan ke petani (dipotong dari pembayaran). DOA >5% → TIDAK otomatis dibebankan; status klaim jadi `escalated`, notifikasi ke buyer + petani, penyelesaian manual oleh admin.
- Kompensasi dihitung otomatis untuk bagian ≤5%, sisanya tunggu resolusi manual.
- Sengketa: status `disputed`, ada catatan + resolusi manual.

**Selesai jika:** klaim tercatat dengan lot terkait, admin bisa approve/reject/dispute, kompensasi terhitung.

## Fase 7 — Pembayaran & membership (minggu 7-8)

- Membership pembeli berbayar (Rp 500rb/bln, tarif di config server).
- Biaya layanan pengiriman (Rp 1,5jt/pengiriman).
- Xendit/Midtrans untuk lokal, Stripe/Wise untuk internasional.
- **Verifikasi signature webhook** sebelum proses.
- Idempotency: webhook ganda tidak dobel-aktivasi.
- Status membership hanya dari server, harga dihitung server, client tidak bisa set.
- Pakai payment page provider (tidak simpan kartu).
- Pembayaran petani: **100% setelah masa klaim tutup**, dipotong kompensasi DOA otomatis (bagian ≤5%).

**Selesai jika:** pembeli bisa bayar membership, webhook terverifikasi, status keaman terupdate, tidak double charge.

## Fase 8 — Dashboard & admin (minggu 8)

- Admin: verifikasi petani, moderasi produk, monitoring order/shipment, klaim DOA, refund.
- Peran admin: moderator (konten), finance (pembayaran). Least privilege.
- Audit log: siapa ubah apa kapan. Alert login gagal berulang.
- Petani: ringkasan order, pembayaran, status DOA, statistik sendiri.
- Pembeli: order history, shipment tracking, invoice.

**Selesai jika:** tiap peran lihat dashboard sendiri, aksi sensitif ter-log.

## Fase 9 — Hardening pre-launch (minggu 9)

Dari dokumen Hardening Keamanan, wajib sebelum publish:

- [ ] RLS aktif semua tabel + uji dua akun (A tidak bisa baca/ubah B)
- [ ] `service_role` key hanya server/Edge Function, tidak ke frontend
- [ ] Drizzle bypass RLS → otorisasi di kode server
- [ ] MFA admin & akun infrastruktur
- [ ] Validasi input server (Zod) di semua endpoint
- [ ] Rate limiting (Upstash) + Turnstile di endpoint sensitif
- [ ] Verifikasi webhook pembayaran
- [ ] Dokumen verifikasi privat (bucket privat + signed URL)
- [ ] Backup + uji restore (Supabase PITR)
- [ ] Security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy
- [ ] CORS restrict domain sendiri, no open redirect
- [ ] Currency & tarif: semua dari config server, bukan hardcoded
- [ ] Kebijakan privasi UU PDP **+ GDPR** (pembeli EU: consent, right to access/erasure, data minimization)
- [ ] Daftar spesies CITES per negara tujuan — tolak order spesies terlarang otomatis
- [ ] US Lacey Act declaration untuk shipment AS
- [ ] Health certificate template per negara tujuan
- [ ] Uji beban sebelum soft launch
- [ ] Supabase Pro aktif beberapa hari sebelum launch + connection pooler

Bisa menyusul: pentest pihak ketiga, WAF lanjut, audit log detail.

---

## Yang sengaja TIDAK dibuat di MVP

- Modul iklan (setelah trafik cukup, bulan 10+)
- Layanan Go (setelah pendanaan)
- Mobile app (bulan 9-18)
- Integrasi kurir realtime (manual input dulu)
- Fitur freight untuk pembeli (opsi tambahan)
- Advance search/matching (Go service nanti)

## Urutan dependency

```
Fase 0 → 0.5 (UI/UX & Static Pages) → 1 → 2 (petani) → 3 (katalog) → 4 (order) → 5 (kirim) → 6 (DOA) → 7 (bayar) → 8 (dashboard) → 9 (hardening)
```

Fase 2-3 bisa paralel dengan 1 kalau tim >1 dev. Fase 7 butuh 4-5 selesai. Fase 9 jalan terus, checklist resmi sebelum publish.

## Estimasi

Timeline di proposal: MVP bulan 2-4, soft launch bulan 4-5. Fase 0-8 = ~8-9 minggu dev untuk 1 full-stack dev. Fase 9 = minggu 9 + paralel. cocok dengan timeline dokumen kalau mulai sekarang.

## Keputusan tetap (2026-10-07)

1. **Nama platform: NusaFin** — final, ganti semua placeholder `[Nama Platform]`.
2. **Tim: 1 full-stack dev.** Timeline ~9 minggu sesuai estimasi di atas.
3. **Tarif belum final** (masih negosiasi investor). Semua tarif **harus di server config / env**, bukan hardcoded: membership, biaya kirim, batas DOA, kurs. Ubah tarif = ubah config, bukan deploy ulang.
4. **Pembayaran petani: 100% setelah ikan sampai di gudang pembeli di negara tujuan + masa klaim DOA selesai.** (Opsi B, final 2026-10-07.) Status order: `arrived_at_destination` → masa klaim (config) → `claim_closed` → trigger `farmer_payment.released`. Tenggat bayar: +7 hari setelah klaim tutup (config). Kompensasi DOA dipotong dari pembayaran petani otomatis.
5. **Konsolidasi: titik kumpul sendiri.** Platform kelola alamat drop-off, jadwal, dan kondisi ikan saat diterima. Foto/video kondisi saat sampai wajib sebagai bukti sebelum packing.
6. **Target pasar: Eropa + AS.** Konsekuensi:
   - **GDPR berlaku** (pembeli EU): consent, data minimization, right to access/erasure. UU PDP + GDPR keduanya.
   - **CITES / EU wildlife trade**: ornamental fish banyak yang terdaftar; daftar spesies wajib per negara tujuan.
   - **AS**: Lacey Act declaration, batasan spesies, health certificate.
   - **Currency**: EUR/USD pricing + Rp untuk layanan; Wise/Stripe untuk pembayaran internasional.
   - Health certificate & dokumen karantina beda per negara tujuan → field `destination_country` wajib dari awal, dokumen generated per negara.
8. **Masa gratis petani 1 thn**: dihitung sejak pendaftaran masing-masing petani (bukan tanggal tetap peluncuran). Field `free_until` per petani, auto-hitung saat approve.
9. **Batas DOA: 5%.** ≤5% → dibebankan petani (potong otomatis dari pembayaran). >5% → status `escalated`, notifikasi buyer + petani, penyelesaian manual. Angka tetap di config.
