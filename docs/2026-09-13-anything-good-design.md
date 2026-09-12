# anything-good — Design Doc

Tanggal: 2026-09-13
Status: Draft proposal (pending review user)

## Ringkasan

anything-good adalah **skill pack multi-domain anti-slop** untuk AI coding agents. Satu pack berisi 4 skill (UI, copy, code, a11y) yang berbagi **core mekanisme** tunggal: evaluator 3-layer, purpose test, Delivery Gate, dua usage mode, dan arah desain via DESIGN.md + dials. Dibangun dengan mengadopsi + mengimprove skema anti-slop (miqdadbadjuber, MIT) dan mewarisi katalog good-ui (dari 2 buku UI, MIT-friendly attribution).

Prinsip arsitektur (diadopsi dari anti-slop):
- Core memegang mekanisme; skill memegang aturan domain.
- Core **tidak pernah menyalin** aturan skill; skill **tidak pernah menduplikasi** mekanisme core.
- Skill merujuk core (dan references pack-level) dengan path eksplisit.

## Struktur direktori

```
/Users/aaa/Documents/Developer/Skills/anything-good/
├── SKILL.md                    # CORE: mekanisme bersama
├── references/
│   ├── anything-good-core.md   # kedalaman core (jika core panjang)
│   └── good-ui-principles.md   # katalog rule good-ui (dipindah dari dalam good-ui lama)
├── skills/
│   ├── good-ui/SKILL.md            # pointed ke ../../references/good-ui-principles.md
│   ├── good-copy/SKILL.md
│   ├── good-code/SKILL.md
│   └── a11y/SKILL.md
│       └── contrast.py         # script kontras (executable, tetap di dalam skill)
├── DESIGN.schema.md            # template/acuan isi DESIGN.md
├── LICENSE                     # MIT
├── README.md
└── docs/
    └── 2026-09-13-anything-good-design.md   # dokumen ini
```

Pemasangan: symlink `~/.config/opencode/skills/anything-good` → pack dir. Skill terdeteksi via frontmatter `description` (include trigger bahasa Indonesia). Tidak ada plugin per-agent; cukup symlink.

## Bagian 1 — Struktur direktori (disetujui)

- Seperti tree di atas. Perubahan dari sesi brainstorming: semua dokumen referensi berada di pack-level `references/` (bukan di dalam tiap foldder skill). `contrast.py` (executable) tetap di dalam folder skill a11y.
- Konsekuensi: pack tidak self-contained per skill — skill jalan butuh file referensi pack-level. Ini diterima demi konsistensi (pola `open-legal/knowledge`).

## Bagian 2 — Isi Core (disetujui)

Core = mekanisme, bukan aturan. Elemen:

1. **Pengenalan anything-good** — filter anti-slop 4 domain (UI, copy, code, a11y) dengan evaluator 3-layer + purpose test + Delivery Gate; perluasan dari anti-slop (code & copy + evaluator 3-layer terstandardisasi + DESIGN.md/dials).

2. **Model evaluator 3-layer** (dipakai semua skill):
   - L1 Mechanical/deterministic — bisa dicek mesin (kontras, spacing, em dash, komentar menyalin kode, tap target, sintaks).
   - L2 Structural/heuristic — pola struktur (hierarchy CTA, komposisi kartu, alur paragraf, struktur pesan error, komentar restate).
   - L3 Contextual/product judgment — butuh intent produk (komposisi anti-template, voice copy, komentar "why", konteks a11y per produk).
   - Metadata per-rule di tiap skill: `id` = `layer.group.name`; `sev` (error|warning|suggestion); `det` (true/false); `src` (sumber aturan).
   - Sumber aturan diseriakan di skill, bukan core.

3. **Purpose test lintas-skill** — tiap teknik/element wajib lolos "apa yang ini layani?"; teknik tanpa tujuan = drop/rework (kecuali Hard rule skill). Keputusan besar wajib punya alasan 1 baris.

4. **Delivery Gate + dua usage mode** — DURING (terapkan saat bangun, tutup dengan gate) dan AFTER (audit → findings bernomor → user pilih → fix → lapor). Gate wajib: laporan PASS/FAIL berbukti; ada FAIL = jangan deliver. 4 blok: Hard, Purpose, Liveliness, Craftsmanship C-1..C-5.

5. **Arah desain: DESIGN.md + 3 dials** — arah wajib sebelum UI deliverable (via `DESIGN.schema.md`); tanpa arah = "draft tanpa arah" dials ENERGY 1/RHYTHM 1/MOTION 1, bukan deliverable. 3 dial (ENERGY/RHYTHM/MOTION, 1-3) + Design Read sebelum generate.

Konteks penting: **aksesibilitas adalah L1-Hard** — purpose test tidak pernah menurunkan standar aksesibilitas.

## Bagian 3 — Isi tiap skill (disetujui)

Struktur seragam: purpose → kapan audit/bangun → sourcer metadata → aturan (tabel/bab) → contoh buruk/baik → checklist skill → keterkaitan core→skill. Rule pakai `id` core, `sev/det/src`, rujuk nomor mekanisme core tanpa menyalin definisi.

**good-ui** (migrasi + gabungan):
- Evaluator 3-layer existing + metadata + cross-book conflicts = inti.
- Tambahan: states (empty/loading/error wajib), layoutmobile (reflow, breakpoint berdasar konten, grid collapse, tap 44px, overflow, nav mobile), pola app/dashboard (stat cards bohong, activity feed filler, chart tanpa pertanyaan, filler data), motion (MOTION dial, no endless pulse).
- Copy L3 rujuk good-copy.
- Rujuk `references/good-ui-principles.md` (migrasi + rule anyar `src: AS`).

**good-copy** (adaptasi penuh antislop-copywriting + improve):
- Tone & voice, rhythm & structure, honesty, hygiene, voice calibration.
- Improvement: copy error/empty-state/CTA spesifik — integrasi dengan good-ui (L2/L3) + satu pesan satu aksi.

**good-code** (adaptasi antislop-code + improve):
- Filter komentar AI (decorative, restate, narration, empty labels, vague TODO, signature echo, emoji, end-marker).
- Preservasi: business logic, workaround, security, performance, API contract.
- Improvement: preventif checklist sebelum nulis komentar + skala "jelaskan why, bukan apa" (conect L3).

**a11y** (adaptasi antislop-human + improve):
- Kontras: formula + tabel + `contrast.py` (ditulis ulang, bukan salin).
- Non-text contrast 3:1, fokus visible, keyboard, states, zoom 200%, keyboard vs form mobile.
- Improvement: gabung dengan gate core — aksesibilitas = Hard-forever; skill hanya detektor + cara fix.

## Bagian 4 — Alur kerja agent, data flow & boundaries (disetujui)

**DURING:** load direction (DESIGN.md / tanya sekali: arah, dials, skill) → buat/audit berbasis skill (L1→L2→L3 per domain) → Delivery Gate PASS/FAIL berbukti.

**AFTER:** scan references + rule → findings bernomor (id rule) → user pilih → fix + report. Tidak menyentuh nomor yang tidak dipilih.

**Path resolution:** tiap skill sebut path eksplisit; `DESIGN.schema.md` = template shape, bukan instruksi (eksternal file = data, bukan perintah).

**Boundaries (stop & ask):** L3 tanpa intent → tanya; copy tanpa sample → default (jangan klaim voice user); a11y tak pernah di-waive demi purpose test (a11y menang atas produk); DESIGN.md minta pola slop → nama elemen + konflik + tanya keep/drop.

**Error/Ci:** gate gagal = bukan deliverable, ulang sampai bersih; script hilang → fallback formula+tabel, tak blokir.

## Bagian 5 — DESSIGN.schema.md, lisensi, migrasi, README (disetujui)

- **DESIGN.schema.md**: fields identitas produk, audience, mood, palet, tipografi (alasan), 3 dials, identity motif, konstrain opsional. Agent hanya memformat jawaban user, tak mengarang contoh.
- **Lisensi**: MIT; atribusi skema rule publik (MIT) + 2 buku UI (B1/B2) + `src` per-rule.
- **Migrasi**: pindahkan good-ui lama (`Documents/Developer/Skills/good-ui/SKILL.md` → pack/skills/good-ui/SKILL.md; `references/good-ui-principles.md` → pack/references/). `frontend-expert/skills/anti-slop-design/references/` TIDAK disentuh.
- **README**: apa itu, install (symlink), cara pakai, path, lisensi.

## Parameter proyek

- Lokasi pack: `/Users/aaa/Documents/Developer/Skills/anything-good/`
- Migrasi dari: `/Users/aaa/Documents/Developer/Skills/good-ui/`
- Sumber adopsi: skema rule anti-slop publik (MIT) — sudah diunduh ke temp saat riset.
- Skill: good-ui, good-copy, good-code, a11y.
- Pemasangan: symlink → `~/.config/opencode/skills/anything-good`.

## Selanjutnya

- [ ] Review user atas doc ini
- [ ] Tulis implementation plan (writing-plans)