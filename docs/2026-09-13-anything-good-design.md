# anything-good — Design Doc

Tanggal: 2026-09-13
Status: Draft proposal (pending review user)

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

## Bagian 6 — Revisi good-code (proposal, pending review user)

**Latar:** SKILL good-code saat ini ~95% good-comments (description menyatakan "Code comments skill", trigger hanya komentar, guardrail melarang sentuh executable code). Nama vs substansi tidak match. Revisi ini membuka good-code menjadi domain kode penuh, dengan tesis: *stop completing patterns, start making decisions.*

### 6.1 Scope & prinsip induk

- good-code = domain kode (bukan hanya komentar). Bagian komentar dipertahankan menjadi **satu sub-bagian: Comment Hygiene**.
- Prinsip induk naik dari "komentar menjelaskan why" menjadi **"Every line should earn its place"**:
  - Code exists because the problem requires it, not because good code is *supposed to look that way*.
  - Abstraksi wajib membeli boundary yang berarti; guard melindungi kemungkinan nyata; komentar membawa info; dependency membeli kapabilitas; pattern menyelesaikan masalah aktual; refactor melayani perubahan yang diminta.

### 6.2 Code Purpose Test (DNA skill)

Generalisasi purpose test core untuk kode. Untuk setiap tambahan non-trivial tanya **"What does this earn?"**:

| Konstruk | Jawaban sah |
|---|---|
| comment | informasi yang kode belum perlihatkan |
| abstraction | boundary yang berarti |
| dependency | kapabilitas nyata |
| validation | invalid state yang benar-benar terjadi |
| state | info yang harus bertahan |
| effect | sinkronisasi dengan sistem eksternal |
| wrapper | semantic boundary |
| configuration | variabilitas aktual |
| fallback | failure mode yang diperkirakan |

Jawaban tanpa kebutuhan konkret ("for flexibility", "best practice", "just in case", "clean architecture", "future-proofing", "more robust") = **AI-slop tell** → drop/rework, kecuali rule `sev: error`.

### 6.3 Diagnostic groups (label, bukan 45 rule)

Group di bawah dipakai sebagai **bingkai berpikir + wajah cepat**, bukan tabel rule bernomor (yang akan melahirkan mode linter baru — kesalahan yang justru dihindari tesis ini).

```
Comment Hygiene       → deco beauty, narration, vague TODO, signature echo, over-explanation
Unnecessary Code      → redundant guards, wrappers, pointless vars, pass-through, dead abstraction
Abstraction Slop      → premature interfaces, one-use helpers, architecture cosplay, factory tanpa kebutuhan
Generic Naming        → processData, handleThing, resultData, utils dumping ground, vocabulary buta-domain
Defensive Slop        → null-check mustahil, validasi ganda, catch-and-rethrow, fallback-everything
Pattern Slop          → pattern demi pattern, layer yang tidak berfungsi, framework cargo cult
Change Slop           → cleanup tak terkait, refactor tak perlu, scope expansion  →  DIPINDAH ke core (6.7)
Error Slop            → error generik, swallowed error, console.log+rethrow, context destruction
Engineer Judgment     → mekanisme (6.4), bukan daftar
```

Pola contoh (mis. "catch(y){}") disebut sebagai eksemplar group, bukan baris rule.

### 6.4 Engineer Judgment (mekanisme, bukan checklist)

Tujuh pertanyaan dijawab **dari bukti repo**, bukan proyeksi psikologi maintainer:

1. Apa yang codebase ini sudah lakukan? (baca 2-3 sibling terdekat)
2. Apa yang task ini benar-benar minta?
3. Solusi koheren terkecil apa?
4. Aku menambah ini karena masalahnya butuh, atau karena "ini terlihat seperti good engineering"?
5. Apakah ada primitive/pola yang sudah ada untuk dipakai?
6. Asumsi apa tentang kebutuhan masa depan?
7. **Apakah perubahan ini tak mengejutkan maintainer berpengalaman?** (operasionalisasi: diff hanya menyentuh file yang diminta task; pola konsisten dengan sibling; tidak ada abstraksi/dependency/config tanpa consumer lain yang nyata)

### 6.5 Pemetaan ke evaluator 3-layer (jujur soal deteksi)

- L1/L2 (`det:true` sebagian besar): Comment Hygiene — kebanyakan bisa diperiksa mesin/manusia cepat.
- L3 (`det:false`, butuh konteks): Unnecessary Code, Abstraction Slop, Defensive Slop, Pattern Slop, Error Slop, Naming (sebagian). **Konsekuensi: good-code jauh lebih berat L3 daripada good-ui.** Audit mode AFTER untuk bagian ini bersifat diskusi (buktikan dari repo), bukan checklist.
- Item framework-spesifik (hooks/effects/repository layer, dst.) = **eksemplar di bawah group L3**, bukan rule agnostik; paket tetap agnostik-arsitektur.

### 6.6 Relaksasi panjang komentar

- Aturan absolut "1 baris, maks 2, tak pernah 3" dicabut (dari rule + checklist).
- Ganti: **"Use the shortest comment that preserves the useful information. Length is a smell, not a violation."**
- Alasan: dogmatisme panjang = mode berpikir yang sama dengan yang pack ini cabut dari AI.

### 6.7 Perubahan lintas-file yang menyertai

- **Core `SKILL.md`:** path map good-code diperluas (kode, bukan komentar); `Agent boundaries` menyerap **Change Slop** (diff menyentuh file yang diminta task; tidak ada cleanup/refactor/format tak terkait; dependency/config baru hanya bila task minta) supaya tidak diduplikasi di skill.
- **Guardrail DURING:** tetap tidak menyentuh executable code di luar task; kode executable **hanya** berubah lewat approval findings mode AFTER (konsisten dengan boundaries core).
- **README:** deskripsi good-code diperbarui.
- Referensi baru tidak wajib; mekanisme tinggal di `skills/good-code/SKILL.md` (bukan katalog besar).

### 6.8 Yang TIDAK berubah

- Skema `id = layer.group.name`, `sev/det/src`; comment-rules existing yang sudah matang (preservasi business logic, security, API contract, workaround, edge case) tetap utuh di bawah Comment Hygiene.
- Position: skill memegang aturan domain, core memegang mekanisme — satu-satunya pengecualian adalah Change Slop yang naik ke core karena lintas-domain.

## Selanjutnya

- [ ] Review user atas doc ini
- [ ] Tulis implementation plan (writing-plans)