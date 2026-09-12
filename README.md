# anything-good

Paket skill anti-slop multi-domain untuk AI coding agents: **UI**, **copy**, **code**, dan **a11y**. Satu DNA: setiap baris, kalimat, dan elemen harus earning. Cluster mengalahkan isolated tell. Bukan style guide.

Professional ≠ sanitized. Arah desain dari user (via `DESIGN.md`).

## Struktur

```
SKILL.md                 # core: DNA, cluster, gate, dials
references/
  anything-good-core.md  # gate, metadata, path map
  good-ui.md             # katalog rule UI
  good-copy.md           # bentuk keputusan copy
  good-code.md           # bentuk keputusan kode
skills/
  good-ui/               # UI: earn its space
  good-copy/             # copy: earn attention
  good-code/             # kode: earn its place
  a11y/                  # Hard-forever; contrast.py
DESIGN.schema.md         # template arah desain
```

## Install (opencode)

```bash
ln -sfn /Users/aaa/Documents/Developer/Skills/anything-good "$HOME/.config/opencode/skills/anything-good"
```

Skill terdeteksi lewat `description` frontmatter. Agent lain: salin folder skill ke path yang dibaca agent masing-masing.

## Cara pakai

1. Agent membaca core `SKILL.md`; tanyakan usage mode (DURING / AFTER).
2. Skill domain dicek L1→L2→L3. Isolated tell bukan pengakuan; kluster adalah. L1/L2 memakai `id`. L3 good-code memakai nama group + bukti repo.
3. Tutup dengan **Delivery Gate** PASS/FAIL berbukti (core, Blok 1–4). Punctuation bukan Hard Gate.
4. Tanpa arah desain → label "draft tanpa arah" (dials ENERGY 1/RHYTHM 1/MOTION 1), bukan deliverable.

## Atribusi & lisensi

MIT (c) 2026. Dibangun di atas skema rule anti-slop publik (MIT). Katalog rule UI menandai asal tiap pola via kolom `src`:
- **B1/B2**: *How to Design Better UI 3.0* (Adrian Kuleszo) dan *50 UI Do's & Don'ts* (Pixsel Academy)
- **AS**: pola yang diadaptasi dari skema rule publik (MIT)
