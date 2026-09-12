---
name: good-ui
description: >-
  UI/visual skill dari pack anything-good: 3-layer evaluator (L1 mekanik, L2
  struktural, L3 kontekstual) + layout mobile + states + app/dashboard + motion,
  menemukan detection markers yang greppable, fix L1→L2→L3 (L3 butuh product
  intent). Use when building, restyling, or auditing UI — "rapihin UI", "buat
  lebih bagus", "audit UI", "terlalu generik", "design" — dan ikut merujuk
  mekanisme core anything-good. Katalog: references/good-ui-principles.md.
---

# Good UI (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme (evaluator 3-layer, purpose test, Delivery Gate, dials). Skill ini membawa aturan domain UI dan TIDAK menduplikasi mekanisme.

## Kapan dipakai

- Sebelum menyudahi build UI (component, page, section, form, card grid)
- Saat audit/"rapihin UI"/"buat lebih bagus"
- Saat output generik/berantakan tapi tidak bisa disebutkan namanya — rule L3 menamainya
- Saat hasil "tampak benar" tapi terasa template (SaaS stack smell → `composition.*`)

## Kapan dilewati

- Slop logika kode (useEffect, type lies) → `good-code`
- Copy tone / empty-state / error copy → `good-copy`
- Frame-by-frame motion intent → pakai MOTION dial core + `motion` dev tools

## Evaluator 3-layer (ringkas; mekanisme di core `../../references/anything-good-core.md`)

1. **Collect intent.** L1 tak butuh intent. L3 (`composition.*`, emphasis, removal) butuh product intent — bila `composition.*` memicu dan intent tak ada, TANYA dulu.
2. **Scan by layer** — grep marker di `../../references/good-ui-principles.md` (L1 → L2 → L3).
3. **Rank** — `sev`: error → warning → suggestion.
4. **Fix** — terapkan rule + fix dari katalog.
5. **Re-scan** — ulang grep; tiap baris tabel bersih atau di-waive (waiver disebut nama).

## MUST (ship rules)

| Rule | Detail |
|------|--------|
| **Grid anatomy** | Container ≈ 1200–1240px (desktop) / 343px (mobile 375); 12-col @ 20px gutter, 4-col mobile @ 8px gutter, margin ≥100px / ≥16px |
| **8-pt spacing** | `gap`/`margin`/`padding` ladder 4–8pt. Tak pernah `13px`, `22px`, arbitrary |
| **Contrast** | Teks kecil ≥4.5:1, besar >24px ≥3:1, interaktif ≥3:1. `#000`/`#fff` untuk area luas dilarang → neutral tinted |
| **≤2 typefaces** | Satu family + weight/role; type scale, bukan ukuran acak |
| **One light source** | Semua shadow satu arah; layered soft shadow, bukan hitam keras |
| **Button hierarchy** | Primary (filled) → secondary (outlined) → tertiary (link); semua state ada (hover/pressed/disabled/loading) |
| **Labels are verbs** | CTA = aksi ("Join the Club!") bukan "Click here"; error tunjukkan di mana + kenapa |
| **Forms single-column** | Label selalu terlihat; tandai optional bukan required; inline validation; state sukses wajib |
| **Cards consistent** | Panjang konten / min-max height / rasio gambar konsisten; tanpa inner scroll; inner radius < outer |
| **States (empty/loading/error)** | Setiap view data wajib punya ketiganya, masing-masing menyebut penyebab + aksi berikutnya; loading dengan teks; error apa yang rusak + cara lanjut |
| **Mobile = layout berbeda** | Reflow (stack, scale, reorder) bukan desktop yang disusutkan; breakpoint berdasar konten pecah; grid collapse; tanpa overflow horizontal; tap ≥44px; nav mobile (bukan row desktop) |
| **App/dashboard berisi nyata** | Stat cards memakai angka nyata atau placeholder berlabel `[REAL DATA]`; feed menampilkan event nyata; chart menjawab pertanyaan di judulnya; cell kosong tetap kosong (bukan "John Doe") |
| **Motion ikut MOTION dial** | Sesuai dial; tanpa pulse/loop abadi; gerak punya UX purpose tertulis |
| **Composition is intentional** | Hancurkan template stack (badge→gradient headline→2 CTA→3 cards→bento→CTA banner) kecuali intent produk menuntut setiap beat; satu dominant visual idea per page |

## Pattern mini-table

| Detection marker | Fix | Layer |
|---|---|---|
| `gap: 13px; padding: 22px;` | Nilai 8pt terdekat | L1 |
| `#000`/`#fff` penuh | Neutral tinted (`#333335`-ish) kecuali brand mendefinisikan | L1 |
| `rounded-3xl` sama dalam-luar | Inner radius < outer (card 30pt, inner 15pt) | L1 |
| `outline: none` tanpa replacement | focus-visible ≥3:1 | L1 |
| "Click here"/"Submit" | Label kata-kerja aksi | L2 |
| Teks di atas foto terang | Darken overlay agar ≥4.5:1 | L1 |
| 1 toast error di atas | Inline error di lokasi + alasan | L2 |
| Dropdown untuk 2–4 opsi | Chips/segmented buttons | L2 |
| Scroll dalam kartu | Potong konten + "See more" | L2 |
| Baris baca terlalu lebar | `max-width` ~60–70ch | L1 |
| SSA stack (badge→gradient→2 CTA→3 cards→bento→CTA banner) | Pecah ≥1 beat dengan komposisi spesifik produk | L3 |
| Setiap section = heading+subtitle+cards | Variasi sesuai bobot konten; section boleh drop element | L3 |
| Kartu untuk hal yang whitespace bisa group | Grouping dengan whitespace/divider; kartu untuk konten standalone | L3 |
| Logo diulang tiap section | Logo sekali di header/footer | L3 |
| Stat card `12,483 / 94.2% / +12%` | Angka nyata atau `[REAL DATA]` | L2 |
| Skeleton = product shot di hero | Screenshot nyata atau penjelasan jujur | L2 |
| Feed "Sarah Chen updated..." | Event nyata atau delete | L2 |

Katalog penuh: `../../references/good-ui-principles.md`.

## Agent boundaries

- **May decide:** urutan fix dalam layer, token naming, nilai 8pt, dengan intent produk — beat komposisi mana yang dipecah.
- **Must not:** buat default purple/indigo anyar; perlakukan L3 suggestion sebagai linter error; restruktur komposisi tanpa intent; skip rule karena "kelihatan fine"; merusak standalone card row demi heterogen.
- **Stop & ask:** `composition.*`/emphasis meledak tanpa intent produk; copy L3 butuh voice user (delegasi ke `good-copy`); konflik produk vs aksesibilitas (aksesibilitas menang).

## Checklist good-ui

- [ ] L1: grid anatomy, spacing 8pt, kontras ≥4.5:1 (text) & ≥3:1 (interaktif), ≤2 typefaces, satu shadow direction, radius language, tap ≥44px, button states lengkap, focus visible
- [ ] L2: CTA hierarchy + action-verb labels, error lokasi+alasan, kartu konsisten tanpa inner scroll, form single-column + inline validation, nav noun labels + active state, states empty/loading/error 3-lengkap dan informatif
- [ ] L2: app/dashboard — angka nyata, feed nyata, chart berjudul pertanyaan, cell kosong kosong
- [ ] L3: intent dikumpulkan; template stack dipecah/diwaive; satu dominant idea; emphases backed by intent
- [ ] Mobile: reflow nyata, breakpoint konten, tanpa overflow, tap ≥44px, nav mobile, tak ada bottom nav makan konten (safe-area + scroll-padding)
- [ ] Motion: sesuai MOTION dial, tanpa loop abadi
- [ ] Close: re-scan L1 → L2 → L3; gate core PASS