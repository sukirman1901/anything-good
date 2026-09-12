# anything-good

Paket skill anti-slop multi-domain untuk AI coding agents: **UI**, **copy**, **code**, dan **a11y**: berbagi satu core mekanisme (evaluator 3-layer, purpose test, Delivery Gate, dua usage mode, DESIGN.md + dials).

Bukan style guide: tidak menentukan warna, font, atau layout. Membuang slop dan meninggalkan arah kepada user (via `DESIGN.md`).

## Struktur

```
SKILL.md                 # core mekanisme
references/              # referensi pack-level
  anything-good-core.md  # gate, metadata, dials, path map
  good-ui-principles.md  # katalog rule UI
skills/
  good-ui/               # UI + layout mobile + states + app/dashboard + motion
  good-copy/             # copy anti-AI: tone, rhythm, honesty, hygiene, voice
  good-code/             # komentar kode: filter AI, tanpa menyentuh code
  a11y/                  # aksesibilitas; contrast.py di dalamnya
DESIGN.schema.md         # template arah desain
```

## Install (opencode)

```bash
ln -sfn /Users/aaa/Documents/Developer/Skills/anything-good "$HOME/.config/opencode/skills/anything-good"
```

Skill terdeteksi lewat `description` frontmatter. Agent lain: salin folder skill ke path yang dibaca agent masing-masing.

## Cara pakai

1. Agent membaca core `SKILL.md`; tanyakan usage mode (DURING / AFTER).
2. Skill domain membawa aturan ber-`id` (`layer.group.name`), dicek L1→L2→L3.
3. Tutup dengan **Delivery Gate** PASS/FAIL berbukti (core, Blok 1–4).
4. Tanpa arah desain → label "draft tanpa arah" (dials ENERGY 1/RHYTHM 1/MOTION 1), bukan deliverable.

## Atribusi & lisensi

MIT (c) 2026. Dibangun di atas skema rule anti-slop publik (MIT). Katalog rule UI menandai asal tiap pola via kolom `src`:
- **B1/B2**: *How to Design Better UI 3.0* (Adrian Kuleszo) dan *50 UI Do's & Don'ts* (Pixsel Academy)
- **AS**: pola yang diadaptasi dari skema rule publik (MIT)