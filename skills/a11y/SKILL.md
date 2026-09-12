---
name: a11y
description: >-
  Accessibility skill dari pack anything-good: kontras (formula WCAG + tabel +
  contrast.py), non-text contrast 3:1, fokus visible, keyboard, states, zoom
  200%, dan mobile keyboard. Use when building or auditing for
  accessibility (termasuk "aksesibilitas", "AI dapat keyboard?", "kontras", "a11y",
  "WCAG", "audit aksesibilitas"), yang merujuk mekanisme core anything-good.
---

# a11y (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme; khususnya, **aksesibilitas = Hard-forever** (Lihat Blok 1 gate core): kontras, keyboard, fokus, states, zoom adalah `sev: error` di L1 dan TIDAK pernah dilemahkan oleh purpose test. Skill ini adalah detektor + cara fix-nya.

## Tools

- **`contrast.py`** (di folder skill ini): `python3 contrast.py "#RRGGBB" "#RRGGBB"` → rasio + verdict normal/besar. Pakai untuk SETIAP pairing yang tidak bisa diverifikasi dengan mata. Kalau script hilang → pakai formula/tabel di bawah, jangan blokir.
- **Formula (WCAG 2.x):** rasio = (L1 + 0.05) / (L2 + 0.05), L1/L2 luminance relatif (lebih terang/lebih gelap). Luminance: c=hex/255; c<=0.03928 → c/12.92; else ((c+0.055)/1.055)^2.4; L=0.2126R+0.7152G+0.0722B. Bandingkan 4.5:1 normal / 3:1 besar (18px+).
- **Tabel referensi** (sanity, bukan pengganti; pairing lain → formula/script):

| Text on bg | Ratio | Normal (4.5) | Large (3.0) |
|---|---|---|---|
| Black on white | 21.00 | Pass | Pass |
| White on black | 21.00 | Pass | Pass |
| White on #333333 | 12.63 | Pass | Pass |
| White on #666666 | 5.74 | Pass | Pass |
| #777777 on white | 4.48 | Fail | Pass |
| White on #888888 | 3.54 | Fail | Pass |
| White on #999999 | 2.85 | Fail | Fail |
| #555555 on black | 2.82 | Fail | Fail |

## Kontras

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.text-contrast` | error | true | AS | Teks abu muda di atas near-white, dipilih karena "elegant" | Hitung; capai AA (4.5 normal / 3 besar). Jangan eyeball |
| `l1.a11y.scrim-over-media` | error | false | AS | Teks putih di atas gambar/gradient yang lokal terang, dicek di satu titik terang saja | Scrim/blok solid di belakang teks; verifikasi titik TERPARAH, bukan terbaik |
| `l1.a11y.grey-hallucination` | error | false | AS | "abu-abu gelap di atas hitam dapat AA" tanpa hitung | Jangan pernah asersi pairing; jalankan script/formula. #555 on black = 2.8:1, gagal |
| `l1.a11y.non-text-contrast` | error | false | AS | Boundary komponen/ikon/status dibedakan <3:1 | 3:1 untuk komponen boundary & status (WCAG 1.4.11); ikon berpasangan label teks ≥4.5 |

## Keyboard & Fokus

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.outline-removed` | error | true | AS | `outline: none` / `outline: 0` tanpa replacement | fokus-visible ≥3:1; jangan pernah hapus tanpa pengganti |
| `l1.a11y.mouse-only` | error | false | AS | Hover-only menu, dropdown tak bisa dibuka keyboard, drag-drop tanpa fallback | Semua element interaktif reachable+operable via Tab/Enter/Space; dialog tutup dengan Escape |
| `l1.a11y.tab-order` | error | false | AS | Fokus melompat (DOM order != visual order) | Source order mengikuti visual; skip-link halaman panjang; jangan `tabindex=-1` konten nyata |
| `l1.a11y.focus-indicator` | error | false | AS | Focus ring warna sama dengan bg, hover-only, atau <1px | Indicator terlihat 3:1 terhadap tetangga di SEMUA tema |

## States

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.color-only` | error | false | AS | Status hanya lewat warna (border merah/hijau) | Pasangkan teks/ikon/pola; error text-first: "Password must be at least 8 characters" |
| `l1.a11y.missing-states` | error | false | AS | View data tanpa empty/loading/error, atau spinner tanpa teks | Ketiga state ada & perseptif: empty jelas, loading berteks, error menyebut yang gagal + cara lanjut (koordinat good-ui) |

## Zoom & Mobile

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.no-zoom` | error | false | AS | Font fixed px / kontainer overflow:hidden yang terklipping di 200% | Fluid type reflow; tanpa clipping; verifikasi 200% di viewport sempit |
| `l1.a11y.keyboard-covers-form` | error | false | AS | Input di bawah viewport tertutup keyboard on-screen, tanpa scroll-into-view | Saat fokus, input scroll ke atas keyboard + bottom padding cukup |

## Checklist a11y

- [ ] Setiap text/bg pairing diverifikasi (script/formula/tabel), termasuk teks di atas gambar/gradient
- [ ] Non-text contrast ≥3:1 untuk boundary/status
- [ ] Fokus indicator terlihat, kontras, di tiap element interaktif, di semua tema
- [ ] Semua element reachable+operable keyboard; dialog tutup Escape; tanpa outline:none tanpa pengganti
- [ ] States empty/loading/error ada & perseptif, bukan color-only
- [ ] Teks bisa 200% tanpa clipping; keyboard tak menutup input fokus
- [ ] Delivery Gate core PASS (a11y tak pernah di-waive)