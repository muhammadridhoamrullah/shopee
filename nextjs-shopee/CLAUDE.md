@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tentang Project

E-commerce app (Shopee-clone), fullstack, berdiri sendiri di dalam monorepo
`shopee` (terpisah dari `backend-shopee` dan `frontend-shopee` yang ada di
repo yang sama — jangan campur konvensi ketiganya).

## Stack

- Next.js 16 (App Router) — lihat `AGENTS.md`: API/konvensi bisa berbeda dari training data, cek `node_modules/next/dist/docs/` sebelum menulis kode yang menyentuh API Next.js
- React 19, TypeScript (strict), Tailwind CSS v4
- MongoDB via driver native `mongodb` (bukan Mongoose/ODM) — client singleton di `src/db/config.ts`
- Redux Toolkit untuk state form/auth (`src/store/slice/*`)
- Zod v4 untuk validasi input (`src/helpers/zod.ts`)
- JWT ganda: `jsonwebtoken` untuk **sign** (Node runtime, di route handler), `jose` untuk **verify** (Edge-compatible, dipakai di `proxy.ts` dan `src/components/VerifyToken.ts`)
- `proxy.ts` di root menggantikan `middleware.ts` (perubahan Next.js 16)
- nodemailer untuk email verifikasi & notifikasi login
- react-toastify (`ToastProvider`), nextjs-toploader untuk loading bar

## Struktur Penting

- `app/` — routing App Router
  - `(non-auth)/` — route group untuk halaman tamu (login, register, verify-email); tiap halaman berpola `page.tsx` (server) + `XClient.tsx` (client component, form logic + Redux)
  - `api/auth/*/route.ts` — Route Handlers (login, register, verify-email)
  - `dashboard/` — halaman yang butuh login
- `src/components/` — komponen UI umum; `MainPage/` untuk komponen landing page (Banner, FlashSale, Kategori, dll)
- `src/models/user/` — pola repository + service:
  - `user.repository.ts` — akses DB langsung (query MongoDB)
  - `user.ts` — business logic (login/register/verify), memanggil repository + helpers
- `src/helpers/` — `bcrypt.ts`, `jwt.ts`, `nodemailer.ts`, `zod.ts` (schema validasi), `utils.ts`, `hooks.ts`
- `src/store/` — Redux Toolkit: `store.ts`, `StoreProvider.tsx`, `slice/*` (satu slice per fitur: login, register, verifyEmail)
- `src/type/type.ts` — semua type/interface bersama (input DTO, `User`, dll)
- `proxy.ts` — auth guard: redirect `/dashboard/*` ke `/login` kalau tanpa token, redirect `/login` & `/register` ke `/dashboard` kalau sudah login; inject header `UserId`/`Username`/`Email`/`Role` dari payload token
- Path alias: `@/*` → root project (mis. `@/src/helpers/zod`)

## Command Umum

- `npm run dev` — jalankan development di port **3001** (bukan 3000)
- `npm run build` — build production (dipaksa `--webpack`, bukan Turbopack — lihat catatan di bawah)
- `npm start` — jalankan hasil build
- `npm run lint` — ESLint (`eslint-config-next`)
- Belum ada test suite/command di project ini.

## Konvensi

- Auth flow: Route Handler (`app/api/auth/...`) → set httpOnly cookie `access_token` → `proxy.ts` verifikasi tiap request ke path terproteksi/guest-only
- Response API konsisten berbentuk `{ success, message, data }`, dengan error handling berlapis di tiap route handler: `ZodError` → 400 per-field, `Error` → 500 dengan `error.message`, fallback → 500 generic
- Repository (`*.repository.ts`) hanya berisi query DB mentah; logic bisnis (hashing, cek duplikasi, kirim email, sign token) ada di layer service (`user.ts`), jangan dicampur
- `NEXT_PUBLIC_*` env vars di-bake saat build time — pakai `--build-arg` di Docker, bukan runtime `.env`; var server-only (mis. `MONGODB_URI`) diisi dummy saat build dan baru diisi asli saat runtime lewat `--env-file`
- SEO pakai `generateMetadata`/`metadata` export + dynamic OG tags (lihat `app/layout.tsx`)
- Halaman dengan `useSearchParams()` wajib dibungkus `<Suspense>`
- Banyak komentar & pesan error dalam Bahasa Indonesia — ikuti gaya yang sudah ada di file yang disentuh
- `VerifyToken.ts` melakukan in-memory caching payload token (5 menit) untuk kurangi overhead verifikasi JWT di `proxy.ts`

## Deployment

- Docker multi-stage (deps → builder → runner), `output: 'standalone'`
- CI/CD: GitHub Actions (`.github/workflows/ci.yml`, `cd.yml`) → build & lint on push/PR ke `develop`/`main` (hanya trigger kalau ada perubahan di `nextjs-shopee/**`) → push image ke GHCR → deploy SSH ke AWS EC2
- Container jalan di port 3000 internal, di-map ke 3001 di host; runtime secrets lewat `--env-file .env.production`, bukan build-time
- Domain: amrullah.biz.id, HTTPS via Nginx + Certbot
- Git workflow: branch fitur → PR ke `develop` → PR `develop` ke `main`

## Yang Perlu Diperhatikan

- Docker/Turbopack punya known bug soal file watcher — pakai `WATCHPACK_POLLING=true` + `--webpack` kalau ada masalah (sudah di-set default di `next.config.ts` untuk dev)
- Ini Next.js 16 — jangan asumsikan API/struktur file sama dengan versi Next.js yang lebih familiar; cek dokumentasi lokal di `node_modules/next/dist/docs/` dulu
