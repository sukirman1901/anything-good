# anything-good — Design Doc

Tanggal: 2026-09-13
Status: Pack v1 shipped; good-code v2 disetujui 2026-09-13 (Bagian 6)

## Ringkasan

anything-good adalah **skill pack multi-domain anti-slop** untuk AI coding agents. Satu pack berisi 4 skill (UI, copy, code, a11y) yang berbagi **core mekanisme** tunggal: evaluator 3-layer, purpose test, Delivery Gate, dua usage mode, dan arah desain via DESIGN.md + dials. Dibangun dengan mengadopsi + mengimprove skema anti-slop publik (MIT) dan mewarisi katalog good-ui (dari 2 buku UI, MIT-friendly attribution).

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
│   ├── good-ui-principles.md   # katalog rule good-ui (dipindah dari dalam good-ui lama)
│   └── good-code.md            # bentuk keputusan kode (bukan katalog rule)
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

**good-code** (domain kode, bukan hanya komentar):
- Nyawa: *stop completing patterns, start making decisions.* Tes: every line should earn its place. Jangan over-sterilize.
- Comment Hygiene (L1/L2, `id` rule) + group diagnostik L3 sebagai label (bukan linter) + Engineer Judgment (2 load-bearing, 5 saat ragu).
- Code Purpose Test ("what does this earn?") dari bukti repo.
- Bentuk keputusan: `references/good-code.md` (pasangan pola vs keputusan, bukan katalog).
- Change Slop naik ke core. Extract ke consumer kedua di blast radius = keputusan, bukan slop.

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

## Bagian 6 — Revisi good-code (disetujui 2026-09-13)

**Latar:** v1 ~95% good-comments. Nama vs substansi tidak match. v2 membuka domain kode penuh.

Tesis (nyawa, bukan slogan cadangan): *stop completing patterns, start making decisions.*

**Every line should earn its place** adalah tes, bukan izin menghapus. **Jangan over-sterilize:** kode yang hanya minim dan takut membentuk sama AI-nya dengan kode penuh wrapper.

Amandemen dari review prinsip (human + professional engineer), di atas draf plan awal:

1. Nyawa di atas tes. "Earn its place" tidak menjadi judul delete-first.
2. Setara good-copy: jangan over-sterilize.
3. Engineer Judgment: 2 pertanyaan load-bearing (sibling; task). Lima sisanya hanya saat ragu, bukan liturgi setiap diff.
4. Group L3 tanpa `id` linter. AFTER = `[group] + bukti repo`.
5. Satu pasang contoh keputusan per group di `references/good-code.md` (bentuk, bukan katalog 45 rule).
6. Eksemplar boleh framework, tetap di bawah group, pack tetap agnostik.
7. Core ikut: contoh gate, L3, AFTER, path map. README dan skill naik bersama.
8. Q7 / Change Slop: extract ke consumer kedua yang sudah ada di blast radius = keputusan, bukan "jangan sentuh file lain".

### 6.1 Scope & prinsip induk

- good-code = domain kode. Komentar = **Comment Hygiene**.
- Kode ada karena masalahnya memintanya, bukan karena "kode bagus harusnya terlihat begitu".
- Abstraksi membeli boundary; guard melindungi kemungkinan nyata; komentar membawa info; dependency membeli kapabilitas; pattern menyelesaikan masalah aktual; refactor melayani perubahan yang diminta.
- Bentuk yang earning di *repo ini* (tipe domain, invariant, boundary yang baru kelihatan) adalah keputusan, bukan slop.

### 6.2 Code Purpose Test (DNA skill)

Generalisasi purpose test core. **"What does this earn?"** Jawaban sah terikat repo ini. Tanpa kebutuhan konkret ("best practice", "just in case", "clean architecture") = AI-slop tell. Kalau earning tertulis 1 baris dari repo ini, bentuk yang tidak ada di rata-rata tetap sah.

### 6.3 Diagnostic groups (label, bukan rule)

Comment Hygiene, unnecessary, abstraction, naming, defensive, pattern, error. Change Slop di core. Engineer Judgment = mekanisme 6.4.

Temuan AFTER L3: `N. [group] <bukti sibling/consumer 1 baris>`. Jangan mengarang `l3.code.*`. Cari kluster, bukan isolated tell.

### 6.4 Engineer Judgment

Wajib (bukti repo, bukan psikologi maintainer):

1. Apa yang codebase ini sudah lakukan? (2-3 sibling)
2. Apa yang task ini benar-benar minta?

Saat ragu saja: solusi koheren terkecil yang masih punya bentuk; butuh vs "good engineering"; primitive existing; asumsi masa depan; kejutan maintainer yang baca sibling yang sama.

### 6.5 Evaluator

- L1/L2: Comment Hygiene (`id`, `det` sebagian besar true).
- L3: group di atas, `det:false`, diskusi berbukti. good-code lebih berat L3 daripada good-ui.
- Framework = eksemplar di `references/good-code.md`, bukan rule agnostik.

### 6.6 Panjang komentar

"Use the shortest comment that preserves the useful information. Length is a smell, not a violation." Dogmatisme "tak pernah 3" dicabut.

### 6.7 Lintas-file

- Core: path map, Agent boundaries (Change Slop + carve-out extract), AFTER L3 tanpa id palsu, contoh Delivery Gate berbukti sibling, L3 copy.
- README: domain kode + `good-code.md`.
- Referensi kecil `references/good-code.md` = bentuk keputusan, bukan katalog.

### 6.8 Yang tidak berubah

- Comment Hygiene `id`/`sev`/`det`/`src` tetap. Preservasi business logic, security, API, workaround, edge.
- Skill memegang aturan domain, core memegang mekanisme. Pengecualian: Change Slop di core; group L3 tanpa `id`.

## Selanjutnya

- [x] Review user atas prinsip + amandemen v2
- [x] Tulis implementation plan
- [x] Ship skill + core + README + `references/good-code.md`