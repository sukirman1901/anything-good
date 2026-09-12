---
name: good-code
description: >-
  Code skill dari pack anything-good: stop completing patterns, start making
  decisions. Menyaring AI-slop pada kode dan komentar lewat Code Purpose Test
  ("what does this earn?") dan Engineer Judgment dari bukti repo, bukan dari
  checklist. Use when writing, auditing, or reviewing code (termasuk "rapikan
  kode", "over-engineered", "abstraksi berlebihan", "kode terasa AI",
  "bersihkan komentar AI"), yang merujuk mekanisme core anything-good.
---

# Good Code (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme (evaluator 3-layer, purpose test, Delivery Gate, Change Slop di Agent boundaries). Skill ini membawa aturan domain kode. Bentuk keputusan: `../../references/good-code.md`.

## Kapan dipakai

- DURING: menulis/menyunting kode dan komentar dalam cakupan task.
- AFTER: audit AI-slop. Comment Hygiene memakai `id` rule. Group L3 memakai nama group + bukti repo, bukan id palsu.
- Perubahan executable di luar task hanya lewat approval mode AFTER.

## Nyawa: stop completing patterns, start making decisions

AI melengkapi pola yang sering muncul. Engineer memutuskan bentuk untuk masalah ini, di repo ini.

**Every line should earn its place** adalah tes, bukan izin menghapus. Kode ada karena masalahnya memintanya, bukan karena "kode bagus harusnya terlihat begitu".

**Jangan over-sterilize.** Menghindari pola AI separuh pekerjaan. Kode yang hanya minim dan takut membentuk sama AI-nya dengan kode penuh wrapper. Tipe domain, invariant bernama, boundary yang baru kelihatan setelah masalah dipahami: boleh, asal earning-nya ditulis 1 baris dari repo ini.

Cocokkan craft sibling. Kalau sibling sloppy, naikkan lantai (hapus tell L1/L2) tanpa mengarang arsitektur baru.

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
| type | invariant yang compiler harus jaga |

Jawaban tanpa kebutuhan konkret ("for flexibility", "best practice", "just in case", "clean architecture", "future-proofing", "more robust", "better maintainability") = **AI-slop tell**. Drop atau rework, kecuali `sev: error`.

Kalau earning-nya bisa ditulis 1 baris dari *repo ini*, bentuk yang tidak ada di rata-rata adalah keputusan, bukan slop. Alasan tak bisa ditulis 1 baris → keputusan belum valid.

## Evaluator: pakai 3-layer core

Scan berurutan L1 → L2 → L3 (mekanisme core). Di kode:

- **L1** (`det:true`): Comment Hygiene yang mesin bisa lihat (dekoratif, restate, narration, empty label, end marker, emoji).
- **L2** (`det:true|false`): komentar over-explained, line-by-line, signature echo, stiff-loud.
- **L3** (`det:false`): group diagnostik di bawah. Buktikan dari sibling/consumer/DSL yang ada. Diskusi, bukan linter. Kluster (mekanisme core) mengalahkan isolated tell.

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

Bukan ban: pertahankan komentar yang menjelaskan business logic/intent, architectural decisions, security, performance, concurrency, protocol, API contracts, workarounds, edge cases & assumptions, licensing/legal.

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Nilai bukan panjang. Use the shortest comment that preserves the useful information. Length is a smell, not a violation.

## Bagian 2: Diagnostic groups (label, bukan linter)

Bingkai berpikir. Jangan mengarang `l3.code.*`. Temuan AFTER: `N. [group] <bukti sibling/consumer 1 baris>`.

| group | tell khas | bukti wajib sebelum flag |
|---|---|---|
| unnecessary | redundant guard, pointless variable, pass-through, wrapper tanpa fungsi | tunjuk consumer/state nyata yang membuatnya hidup, atau tidak ada |
| abstraction | premature interface, one-use helper, factory tanpa kebutuhan, architecture cosplay | minimal 2 consumer asli sekarang, atau batas yang memang berubah di repo |
| naming | processData, handleThing, resultData, utils/helper dumping ground | nama mengikuti vocab domain yang dipakai sibling |
| defensive | null-check mustahil, validasi ganda, catch-and-rethrow, fallback-everything | type/API memungkinkan state itu; kegagalan memang expected |
| pattern | pattern demi pattern, layer/service tanpa kerja, framework cargo cult | pola dipakai karena masalah memintanya, dan sibling sudah (atau belum) memakai |
| error | error generik, swallowed error, console.log + rethrow, context destruction | error membawa konteks yang cukup untuk dipulihkan di permukaan ini |

Framework-spesifik (hooks, effects, type assertion, repository layer) = eksemplar di `../../references/good-code.md`, bukan aturan agnostik pack.

Change Slop (cleanup/refactor/format di luar task; dependency/config yang tidak diminta) = Agent boundaries core, bukan group di sini.

Extract ke sibling karena task ini sudah punya consumer kedua = keputusan, bukan Change Slop.

## Bagian 3: Engineer Judgment

Sebelum kode non-trivial, jawab **dua pertanyaan load-bearing** dari bukti repo (baca sibling, bukan proyeksi psikologi):

1. Apa yang codebase ini sudah lakukan? (pola 2-3 sibling terdekat)
2. Apa yang task ini benar-benar minta?

Lima sisanya hanya saat ragu. Jangan jadikan liturgi setiap diff:

3. Apa solusi koheren terkecil yang masih punya bentuk?
4. Aku menambah ini karena masalahnya butuh, atau karena terlihat "good engineering"?
5. Adakah primitive/pola existing yang bisa dipakai?
6. Asumsi apa tentang kebutuhan masa depan? (tebakan masa depan ≠ earning)
7. Apakah perubahan ini tak mengejutkan maintainer berpengalaman yang baca sibling yang sama?

Keraguan → tanya user, jangan default ke "lebih aman menambah". Perubahan pun punya biaya. Jangan default ke "lebih aman menghapus bentuk" juga.

## Checklist good-code

- [ ] Keputusan, bukan pelengkapan pola; earning tiap tambahan non-trivial tertulis 1 baris dari repo ini
- [ ] Tidak over-sterilize: bentuk yang earning tetap ada
- [ ] Dua pertanyaan load-bearing dijawab dari sibling, bukan dari buku
- [ ] L3 group dibuktikan dari repo; temuan AFTER memakai [group] + bukti, bukan id palsu
- [ ] Comment Hygiene bersih; komentar = shortest yang menjaga info; panjang = smell
- [ ] Diff scope: hanya yang diminta task, kecuali extract ke consumer kedua yang sudah ada di blast radius
- [ ] Delivery Gate core PASS
