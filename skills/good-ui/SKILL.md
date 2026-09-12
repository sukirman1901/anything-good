---
name: good-ui
description: >-
  UI/visual skill dari pack anything-good: every element should earn its space.
  Evaluator 3-layer + layout mobile + states + app/dashboard + motion. Cluster
  komposisi mengalahkan isolated tell. Use when building, restyling, or auditing
  UI (termasuk "rapihin UI", "buat lebih bagus", "audit UI", "terlalu generik",
  "design"). Katalog: references/good-ui.md. Merujuk core anything-good.
---

# Good UI (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang DNA, cluster, purpose test, Delivery Gate, dials. Skill ini membawa aturan domain UI. Katalog: `../../references/good-ui.md`.

**Every element should earn its space.** Tes, bukan izin mengosongkan sampai steril. Removal adalah alat komposisi terkuat: "should this exist at all?"

## Kapan dipakai

- Sebelum menyudahi build UI (component, page, section, form, card grid)
- Saat audit/"rapihin UI"/"buat lebih bagus"
- Saat output "tampak benar" tapi terasa template (kluster composition.*)

## Kapan dilewati

- Slop logika kode (useEffect, type lies) → `good-code`
- Copy tone / empty-state / error copy → `good-copy`
- Kontras, keyboard, fokus, zoom → `a11y` (Hard-forever; jangan diulang sebagai style rule)
- Frame-by-frame motion → MOTION dial core

## Evaluator

1. **Collect intent.** L1 tak butuh intent. L3 (composition, emphasis, removal) butuh product intent; kalau tidak ada, TANYA.
2. **Scan by layer** di `../../references/good-ui.md` (L1 → L2 → L3). Isolated tell bukan pengakuan.
3. **Rank** (`sev`): error (a11y + mechanical craft) → warning → suggestion.
4. **Fix** rule + earning 1 baris. Angka grid di katalog = default, bukan hukum.
5. **Re-scan.** Waiver disebut nama.

## MUST (lantai, bukan style guide)

| Rule | Detail |
|------|--------|
| **Earn its space** | Tiap elemen punya alasan 1 baris. Slot kosong bukan alasan menambah kartu/badge/bento |
| **Contrast & fokus** | Rujuk `a11y`. Jangan eyeball. `outline: none` tanpa pengganti = error |
| **8-pt spacing** | `gap`/`padding` di ladder 4–8pt. Arbitrary `13px`/`22px` = craft defect, bukan identitas brand |
| **Overflow & tap** | Tanpa overflow horizontal; tap ≥44px; mobile = reflow (stack/scale/reorder), bukan desktop yang disusutkan |
| **States** | Setiap view data: empty/loading/error. Loading berteks; error apa yang rusak + cara lanjut. Copy-nya: `good-copy` |
| **Data jujur** | Angka/feed/avatar nyata atau placeholder berlabel. Cell kosong tetap kosong |
| **Motion** | Sesuai MOTION dial; tanpa pulse/loop abadi; `prefers-reduced-motion` (rujuk a11y). Gerak punya purpose tertulis |
| **Satu cahaya, hierarki tombol** | Shadow satu arah. Primary / secondary / tertiary. State hover/pressed/disabled/loading ada |
| **Komposisi = kluster** | Template stack (badge→gradient→2 CTA→3 cards→bento→CTA banner) diflag sebagai kluster, bukan tiap beat terpisah. Pecah ≥1 beat dengan bentuk produk, atau waive dengan intent |

Bukan MUST (default, bisa dilawan DESIGN.md / sibling):

- Container 1200–1240 / 343 / 12-col gutter 20px: tangga awal, bukan error
- `#000`/`#fff`: suggestion; exception brand, high-contrast, art direction (katalog `color.pure-black`)
- Form single-column: heuristik (nama depan+belakang boleh bersebelahan di desktop)
- Dropdown 2–4 opsi → chips: heuristik, bukan hukum
- ≤2 typefaces: mulai dari situ; brand boleh lebih jika DESIGN.md bilang

CTA: namai aksi/konsekuensi (`good-copy`). Bukan "Click here". Bukan "Join the Club!" kecuali itu voice produk.

## Pattern mini-table

| Detection marker | Fix | Layer |
|---|---|---|
| `gap: 13px; padding: 22px;` | Nilai 8pt terdekat | L1 |
| `#000`/`#fff` penuh tanpa brand/HCA | Tinted neutral, atau keep jika DESIGN.md | L3 |
| `rounded-3xl` sama dalam-luar | Inner radius < outer | L1 |
| `outline: none` tanpa replacement | focus-visible ≥3:1 (`a11y`) | L1 |
| "Click here"/"Learn More" kosong | Konsekuensi klik (`good-copy`) | L2 |
| Teks di atas foto terang | Scrim; titik terparah (`a11y`) | L1 |
| 1 toast error di atas | Inline di lokasi + alasan | L2 |
| Scroll dalam kartu | Potong + "See more", atau jangan kartu | L2 |
| Baris baca terlalu lebar | `max-width` ~60–70ch | L1 |
| Kluster SSA stack | Pecah ≥1 beat; isolated card/badge biasa | L3 |
| Setiap section = heading+subtitle+cards | Variasi; section boleh drop element | L3 |
| Kartu untuk yang whitespace bisa group | Divider/whitespace | L3 |
| Stat card `12,483 / 94.2%` tanpa sumber | Nyata atau `[REAL DATA]` | L2 |
| Feed "Sarah Chen updated..." | Event nyata atau delete | L2 |

Katalog penuh: `../../references/good-ui.md`. Copy di katalog (`copy.*`) tunduk pada `good-copy`.

## Agent boundaries

- **May decide:** urutan fix dalam layer, token naming, nilai 8pt, beat mana yang dipecah, grid ladder vs DESIGN.md.
- **Must not:** default purple/indigo; perlakukan L3 sebagai linter; restruktur tanpa intent; skip rule karena "kelihatan fine"; hukuman isolated tell; merusak a11y demi estetika.
- **Stop & ask:** composition/emphasis tanpa intent; copy L3 butuh sampel (`good-copy`); konflik produk vs a11y (a11y menang).

## Checklist good-ui

- [ ] Setiap elemen earning 1 baris; removal dipertimbangkan
- [ ] L1 craft: 8pt, overflow, tap, radius, satu cahaya, fokus (via a11y)
- [ ] Kontras dihitung di `a11y`, bukan diulang sebagai selera warna
- [ ] States + data jujur
- [ ] Kluster komposisi ditamai atau di-waive; isolated card/badge tidak
- [ ] Grid/pixel katalog = default, bukan gagal deliverable
- [ ] Motion + reduced-motion
- [ ] Copy permukaan di `good-copy`
- [ ] Close: re-scan; gate core PASS
