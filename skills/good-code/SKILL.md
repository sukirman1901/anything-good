---
name: good-code
description: >-
  Code comments skill dari pack anything-good: filter komentar AI-generik
  (decorative, restate obvious, workflow narration, empty labels, vague TODO,
  signature echo, emoji, end markers) tanpa menyentuh kode, plus checklist
  preventif sebelum menulis komentar. Use when writing or editing code
  comments (termasuk "bersihkan komentar AI", "rapikan komentar", "komentar terlalu
  panjang"), yang merujuk mekanisme core anything-good.
---

# Good Code (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme. Skill ini membawa aturan domain komentar kode dan TIDAK menduplikasi mekanisme.

## Kapan dipakai

- Menulis/menyunting komentar kode
- Audit komentar (mode AFTER)
- Hanya komentar yang diubah; executable code, identifiers, imports, formatting, whitespace, control flow TIDAK pernah disentuh.

## Prinsip: komentar menjelaskan **why, bukan what**

Komentar berharga bila menjelaskan hal yang kode belum perlihatkan: alasan, konstrain, perilaku tak-obvious. Value adalah informasi, bukan panjang.

## Pola: Komentar yang menambah nol

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

## Pola: Cara seharusnya terbaca

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.comment.over-explained` | warning | false | AS | 4 baris menjelaskan fakta 1 baris (stub di PATH, release apa, apa yang rusak) | Potong ke konstrain saja: 1 baris, maks 2, tak pernah 3. Jatuhkan issue number & rantai alasan |
| `l2.comment.line-by-line` | warning | true | AS | Komentar tiap statement trivial | 1 komentar per blok logis, atau tidak sama sekali |
| `l2.comment.stiff-loud` | warning | true | AS | "responsible for validating whether the supplied credentials are valid..." / `// MAIN LOGIC` caps | Kalimat natural developer: "// Validate credentials before issuing a token." |

## Bukan ban: pertahankan komentar yang menjelaskan

Business logic/intent, architectural decisions, security considerations, performance trade-offs, concurrency, protocol details, API contracts, workarounds, edge cases & assumptions, licensing/legal.

Contoh yang WAJIB bertahan:

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Kanon: nilai bukan panjang. Workaround note = 1 baris tentang workaround, bukan paragraf.

## Checklist preventif (sebelum menulis komentar)

- [ ] Bisakah kode menjelaskan sendiri (nama fungsi + tipe jelas)? Kalau ya, skip komentar
- [ ] Komentar menjelaskan why (alasan/konstrain/trap), bukan what
- [ ] Satu komentar per blok logis, bukan per baris
- [ ] 1 baris, atau 2 bila baris kedua membawa fakta baru
- [ ] Sentence case, natural developer voice; tanpa caps-scream, tanpa emoji, tanpa separator dekoratif
- [ ] Tanpa menyalin nama fungsi/signature

## Checklist good-code

- [ ] Setiap komentar menambah info yang kode belum perlihatkan
- [ ] Tanpa decorative separators, ALL CAPS banner, box-drawn headers
- [ ] Tanpa restating obvious (line, declaration, signature)
- [ ] Tanpa step-by-step narration
- [ ] Tanpa empty labels & vague TODO yang tak menamai task
- [ ] Tanpa decorative emoji & end markers
- [ ] Density = satu per blok logis
- [ ] Komentar 1 baris (2 hanya bila fakta baru)
- [ ] Natural sentence case
- [ ] Scope guardrail: hanya komentar berubah
- [ ] Delivery Gate core PASS