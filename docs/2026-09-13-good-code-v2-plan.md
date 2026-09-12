# good-code v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Perluas good-code dari skill komentar menjadi domain kode penuh dengan prinsip "Every line should earn its place", Code Purpose Test, dan Engineer Judgment; naikkan Change Slop ke core.

**Architecture:** Sesuai Bagian 6 design doc (`docs/2026-09-13-anything-good-design.md`). Core memegang mekanisme + batas lintas-domain (Change Slop), skill memegang aturan domain. good-code v2 = Comment Hygiene (filter existing dipertahankan, panjang komentar dilonggarkan) + groups diagnostik L3 (label, bukan linter) + Engineer Judgment sebagai mekanisme bukti-repo.

**Tech Stack:** Markdown (skill files), tidak ada kode runtime. "Test" = verifikasi lint dengan `rg` (em dash, cross-reference, konsistensi id).

**Konvensi proyek:** plan disimpan di `docs/` (bukan `docs/superpowers/plans/`). Working tree = repo lokal `/Users/aaa/Documents/Developer/Skills/anything-good/`, sudah symlink ke `~/.config/opencode/skills/anything-good`. Disiplin em dash: semua teks SKILL.md/README bebas `—` (0 occurrence), kecuali references (dokumentasi rule).

---

### Task 1: Core — path map + Agent boundaries + checklist

**Files:**
- Modify: `SKILL.md` (baris path good-code, bagian Agent boundaries, checklist core)

- [ ] **Step 1: Perbarui path map good-code di `SKILL.md`**

Ganti baris (sekitar baris 26):

```
  - `skills/good-code/`: komentar kode, filter komentar AI, pertahankan yang bernilai.
```

menjadi:

```
  - `skills/good-code/`: domain kode, komentar (Comment Hygiene) + fingerprint slop kode (unnecessary, abstraction, naming, defensive, pattern, error) + Engineer Judgment.
```

- [ ] **Step 2: Sesuaikan path di pembuka "Arsitektur" bila merujuk komentar saja**

Periksa blok `- **Skill** = aturan domain...` (baris 23-27). Pastikan baris good-code sudah menandakan `kode` bukan hanya `komentar`. Jika ada kata "komentar kode" di posisi deskripsi skill, lanjutkan tanpa ubah (Step 1 sudah menangani isi baris).

- [ ] **Step 3: Absorpsi Change Slop ke Agent boundaries**

Di bagian `## Agent boundaries`, tambahkan item pada `- **Must not:**` (setelah "...klaim "ikut voice user" tanpa sampel tulisan user."):

```
perluas scope perubahan: cleanup/refactor/format file di luar task; tambah dependency/config yang tidak diminta task.
```

Hasil `Must not` menjadi:

```
- **Must not:** perlakukan L3 suggestion sebagai linter error; restruktur komposisi tanpa intent; skip rule "karena kelihatan fine"; waive a11y demi purpose test; klaim "ikut voice user" tanpa sampel tulisan user; perluas scope perubahan: cleanup/refactor/format file di luar task; tambah dependency/config yang tidak diminta task.
```

- [ ] **Step 4: Checklist core ditambah item change hygiene**

Di `## Checklist core (gate rol)` tambahkan baris (setelah item copy & code):

```
- [ ] Diff scope: hanya file yang diminta task (tidak ada cleanup/refactor tak terkait)
```

- [ ] **Step 5: Verifikasi**

Run: `rg -n "good-code|Change|scope perubahan|perluas scope" SKILL.md`
Expected: baris path good-code menyebut `domain kode`, `Must not` memuat "perluas scope perubahan", checklist memuat "Diff scope".

Run: `rg -c $'\u2014' SKILL.md`
Expected: `0`

- [ ] **Step 6: Commit**

```bash
git add SKILL.md
git commit -m "feat(core): perluas path good-code ke domain kode + absorpsi Change Slop ke boundaries"
```

---

### Task 2: Tulis ulang `skills/good-code/SKILL.md` v2

**Files:**
- Rewrite: `skills/good-code/SKILL.md` (konten lengkap baru)

- [ ] **Step 1: Tulis ulang file (konten penuh berikut)**

```markdown
---
name: good-code
description: >-
  Code skill dari pack anything-good: every line should earn its place.
  Menyaring AI-slop pada kode dan komentar (Comment Hygiene, unnecessary/dead
  code, abstraction/pattern/defensive/error slop, generic naming). Dipandu Code
  Purpose Test ("what does this earn?") dan Engineer Judgment. Use when writing,
  auditing, or reviewing code (termasuk "rapikan kode", "over-engineered",
  "abstraksi berlebihan", "bersihkan komentar AI"), yang merujuk mekanisme core
  anything-good.
---

# Good Code (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme (evaluator 3-layer, purpose test, Delivery Gate, Change Slop di Agent boundaries). Skill ini membawa aturan domain kode.

## Kapan dipakai

- DURING: menulis/menyunting kode, komentar dalam cakupan task.
- AFTER: audit kode untuk AI-slop (findings bernomor, user pilih, fix, lapor).
- Perubahan executable code di luar task hanya lewat approval mode AFTER.

## Prinsip induk: every line should earn its place

Kode ada karena masalahnya memintanya, bukan karena "kode bagus harusnya terlihat begitu".

- Abstraksi harus membeli boundary yang berarti.
- Guard melindungi kemungkinan nyata.
- Komentar membawa informasi yang kode belum perlihatkan.
- Dependency membeli kapabilitas nyata.
- Pattern menyelesaikan masalah aktual.
- Refactor melayani perubahan yang diminta.

## Code Purpose Test (DNA skill)

Untuk setiap tambahan non-trivial, tanya: **"What does this earn?"**

| Tambahan | Jawaban sah |
|---|---|
| comment | informasi yang kode belum perlihatkan |
| abstraction | boundary yang berarti |
| dependency | kapabilitas nyata |
| validation | invalid state yang benar-benar terjadi |
| state | informasi yang harus bertahan |
| effect | sinkronisasi dengan sistem eksternal |
| wrapper | semantic boundary |
| configuration | variabilitas aktual |
| fallback | failure mode yang diperkirakan |

Jawaban tanpa kebutuhan konkret ("for flexibility", "best practice", "just in case", "clean architecture", "future-proofing", "more robust", "better maintainability") = **AI-slop tell**. Drop atau rework, kecuali `sev: error`. Alasan harus bisa ditulis 1 baris; kalau tidak, keputusan belum valid.

## Evaluator: pakai 3-layer core

Scan berurutan L1 → L2 → L3 (mekanisme core). Di kode:

- **L1** (`det:true`): komentar dekoratif/restate/narration/empty label/end marker/emoji, error generik seperti "Something went wrong".
- **L2** (`det:true|false`): komentar over-explained, line-by-line, signature echo, redundant guard jelas, validasi ganda yang kelihatan.
- **L3** (`det:false`, butuh konteks repo): abstraction/pattern/defensive/error/naming. Buktikan dari repo (sibling, consumer, DSL yang ada), bukan tebakan.

## Bagian 1: Comment Hygiene

Pola: komentar yang menambah nol

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.comment.decorative-separator` | warning | true | AS | `// =====` + ALL CAPS label, box-drawing | Satu baris polos, atau hapus bila label tak menambah |
| `l1.comment.restating-obvious` | warning | true | AS | "// Initialize variable" di atas `let count = 0` | Hapus, biarkan kode |
| `l1.comment.workflow-narration` | warning | true | AS | "// Step 1: validate", "// First...", "// Finally..." | Hapus; kalau alur susah diikuti = masalah struktur |
| `l1.comment.empty-label` | warning | true | AS | "// Main logic", "// Helper function", "// Important: please read" | Hapus kecuali membawa fakta spesifik |
| `l1.comment.vague-todo` | warning | true | AS | "// TODO: Improve this", "// Add more validation" | Pertahankan hanya bila menamai task spesifik yang bisa dieksekusi |
| `l1.comment.signature-echo` | warning | true | AS | JSDoc mengulang @param/@returns yang sudah jelas dari nama | Simplify/remove echo; pertahankan doc yang menjelaskan business rules/edge/assumption/alg/limitations/side-effects/API/security |
| `l1.comment.decorative-emoji` | warning | true | AS | `// ✅ Validation`, `// 🚀 Performance` | Plain English atau hapus |
| `l1.comment.end-marker` | warning | true | AS | `} // end if`, `# End of function` | Hapus; braket sudah mengakhiri blok |

Pola: cara seharusnya terbaca

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.comment.over-explained` | warning | false | AS | 4 baris menjelaskan fakta 1 baris (stub di PATH, release apa, apa yang rusak) | Potong ke info yang penting saja; jatuhkan issue number & rantai alasan |
| `l2.comment.line-by-line` | warning | true | AS | Komentar tiap statement trivial | 1 komentar per blok logis, atau tidak sama sekali |
| `l2.comment.stiff-loud` | warning | true | AS | "responsible for validating whether the supplied credentials are valid..." / `// MAIN LOGIC` caps | Kalimat natural developer: "// Validate credentials before issuing a token." |

Bukan ban: pertahankan komentar yang menjelaskan

Business logic/intent, architectural decisions, security considerations, performance trade-offs, concurrency, protocol details, API contracts, workarounds, edge cases & assumptions, licensing/legal.

Contoh yang WAJIB bertahan:

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Kanon: nilai bukan panjang. Workaround note = 1 baris tentang workaround, bukan paragraf.

Aturan panjang:

Use the shortest comment that preserves the useful information. Length is a smell, not a violation.

## Bagian 2: Diagnostic groups (kode executable)

Label berpikir, bukan tabel linter. Tiap group punya tell khas dan bukti yang harus bisa ditunjuk dari repo sebelum dianggap bermasalah.

| id | group | tell khas | bukti wajib |
|---|---|---|---|
| `l3.code.unnecessary` | Unnecessary Code | redundant guard, pointless variable, pass-through function, wrapper tanpa fungsi | tunjuk consumer/state nyata yang menyebabkannya |
| `l3.code.abstraction` | Abstraction Slop | premature interface, one-use helper, factory tanpa kebutuhan, architecture cosplay | minimal 2 consumer asli sekarang, atau batas yang memang berubah |
| `l3.code.naming` | Generic Naming | processData, handleThing, resultData, utils/helper dumping ground | nama mengikuti vocab domain yang dipakai repo |
| `l3.code.defensive` | Defensive Slop | null-check mustahil, validasi ganda, catch-and-rethrow, fallback-everything | type/API memungkinkan state itu; kegagalan memang expected |
| `l3.code.pattern` | Pattern Slop | pattern demi pattern, layer/service tanpa kerja, framework cargo cult | pola dipakai karena masalah memintanya, bukan "best practice" |
| `l3.code.error` | Error Slop | error generik, swallowed error, console.log + rethrow, context destruction | error membawa konteks yang cukup untuk dipulihkan |

Framework-spesifik (hooks, effects, repository layer, validator DSL) = eksemplar di group ini, bukan aturan agnostik pack.

## Bagian 3: Engineer Judgment

Sebelum menulis kode non-trivial, jawab dari bukti repo (baca sibling, bukan proyeksi psikologi):

1. Apa yang codebase ini sudah lakukan? (pola 2-3 sibling terdekat)
2. Apa yang task ini benar-benar minta?
3. Apa solusi koheren terkecil?
4. Aku menambah ini karena masalahnya butuh, atau karena terlihat "good engineering"?
5. Adakah primitive/pola existing yang bisa dipakai?
6. Asumsi apa tentang kebutuhan masa depan?
7. Apakah perubahan ini tak mengejutkan maintainer berpengalaman?

Operasionalisasi nomor 7 ke bukti: diff hanya menyentuh file yang diminta task; pola konsisten dengan sibling; tidak ada abstraksi/dependency/config tanpa consumer lain yang nyata.

Keraguan → tanya user, jangan default ke "lebih aman menambah". Perubahan pun punya biaya.

## Checklist good-code

- [ ] Setiap baris lulus Code Purpose Test (nilai bisa ditulis 1 baris)
- [ ] L3 groups dibuktikan dari repo (consumer, sibling, DSL), bukan tebakan
- [ ] Tanpa generic naming, dead abstraction, defensive paranoia, pattern tanpa pemicu
- [ ] Comment Hygiene bersih: tanpa dekorasi, restate, narration, empty label, vague TODO, emoji, end marker
- [ ] Komentar = shortest yang menjaga info; panjang = smell, bukan pelanggaran
- [ ] Diff scope: hanya file yang diminta task (Change Slop, lihat Agent boundaries core)
- [ ] Delivery Gate core PASS
```

- [ ] **Step 2: Verifikasi lint**

Run: `rg -c $'\u2014' skills/good-code/SKILL.md`
Expected: `0`

Run: `rg -o "l[1-3]\." skills/good-code/SKILL.md | sort | uniq -c`
Expected: ada `l1.` (8), `l2.` (3), `l3.` (6) — layer lengkap sekarang.

Run: `rg -c "what does this earn|shortest comment|Engineer Judgment|mengejutkan maintainer" skills/good-code/SKILL.md`
Expected: 4+ (konsep kunci ada).

Run: `rg "tak pernah 3|1 baris, maks 2|topik" skills/good-code/SKILL.md`
Expected: `0` (aturan panjang dogmatis sudah dicabut).

- [ ] **Step 3: Commit**

```bash
git add skills/good-code/SKILL.md
git commit -m "feat(good-code): v2 domain kode penuh (Code Purpose Test, groups L3, Engineer Judgment, panjang komentar = smell)"
```

---

### Task 3: README — deskripsi good-code

**Files:**
- Modify: `README.md` (blok struktur skills)

- [ ] **Step 1: Perbarui baris good-code di blok struktur**

Ganti:

```
  good-code/             # komentar kode: filter AI, tanpa menyentuh code
```

menjadi:

```
  good-code/             # domain kode: comment hygiene + slop kode + judgment
```

- [ ] **Step 2: Verifikasi**

Run: `rg -n "good-code" README.md`
Expected: line menampilkan `domain kode`.

Run: `rg -c $'\u2014' README.md`
Expected: `0`

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs(README): deskripsi good-code = domain kode"
```

---

### Task 4: Verifikasi akhir lintas-pack

**Files:**
- (no change) — verifikasi saja

- [ ] **Step 1: Em dash pack-wide (teks deliverable)**

Run: `for f in SKILL.md README.md skills/good-ui/SKILL.md skills/good-copy/SKILL.md skills/good-code/SKILL.md skills/a11y/SKILL.md DESIGN.schema.md; do echo "$f: $(rg -c $'\u2014' "$f" || echo 0)"; done`
Expected: semua `0`. (references/ boleh punya dash = dokumentasi rule, carve-out gate.)

- [ ] **Step 2: Change Slop tidak diduplikasi**

Run: `rg -n "cleanup|refactor|scope" skills/good-code/SKILL.md | head`
Expected: good-code hanya merujuk Change Slop sekali (referensi ke core), tidak ada tabel/rule duplikat.

Run: `rg -n "perluas scope|Diff scope" SKILL.md`
Expected: item boundaries + checklist core ada.

- [ ] **Step 3: Cross-reference path masih valid**

Run: `test -f ../../SKILL.md && echo "OK core reachable"` (dari `skills/good-code/`)
Expected: `OK core reachable`

- [ ] **Step 4: Kontras/regresi proyek lain**

Run: `git status --short`
Expected: kosong (clean tree).

- [ ] **Step 5: Log final**

Run: `git log --oneline | head -4`
Expected: 3 commit baru (core, good-code v2, README) di atas commit sebelumnya.

- [ ] **Step 6: Laporan gate**

Laporkan seperti paket sendiri meminta: PASS/FAIL per item di atas, lengkap dengan output perintah yang menjadi bukti.

---