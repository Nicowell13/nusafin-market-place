# NusaFin

Marketplace petani/pembudidaya ikan hias lokal ke pasar ekspor (Eropa & AS).

## Prinsip
- Asset-light, no-bakar-uang.
- Konsolidasi pengiriman multi-petani dengan titik kumpul sendiri.
- Ketentuan DOA transparan: batas 5%, jendela klaim 24 jam.

## Stack
- Next.js (TypeScript, Tailwind)
- Supabase (PostgreSQL, Auth, RLS, Storage)
- Drizzle ORM
- Cloudinary
- Upstash Redis

Dokumen perencanaan dan detail fase pengerjaan tersedia di [DEV-PLAN.md](./DEV-PLAN.md).

## UI prototype: night + ID/EN

- Night palette only. Shared in-memory ID/EN state covers homepage and all current prototype routes, retained across Next.js client navigation. Full reload defaults to ID; no language/theme persistence.
- Indonesian HTML is prerendered and visible without JavaScript. English is a client-selected translation, not a separate indexed locale. Metadata remains Indonesian.
- Local Siripku images are illustrations, not verified stock or facility photos. Reviews are clearly labeled DEMO scenarios, not endorsements.
- Forms validate inputs locally but send/store nothing. No authentication, payment, live chat, claim processing, or backend is active. Legal text remains a draft.
- Existing hero video retained with muted autoplay/loop, manual pause, reduced-motion handling, and poster fallback.

### Checks

```sh
node scripts/check-homepage.mjs
npm run lint
npx tsc --noEmit
npm run build
node scripts/check-homepage.mjs --built
```

Self-check renders actual React components in ID and EN, checks dictionary parity, SSR content, business rules, demo disclosures, local assets, night-only source, and markup contracts. `--built` checks production homepage HTML. These checks do not replace browser interaction, visual accessibility, or Lighthouse testing.
