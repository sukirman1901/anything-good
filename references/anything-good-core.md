# anything-good Core — Technical Reference

Referensi mekanisme yang dirujuk core `SKILL.md` dan semua skill. Skill TIDAK menduplikasi isi file ini; mereka merujuk `id` rule dan nomor mekanisme.

## 1. Model evaluator 3-layer

Tiga layer dipakai semua skill. `sev` `error` selalu fix (a11y/mechanical); `warning` fix kecuali di-waive (waiver disebut nama); `suggestion` butuh konteks produk.

| Layer | Deteksi | `sev` khas | `det` |
|---|---|---|---|
| L1 Mechanical | bisa dicek mesin (regex/kl); kontras, spacing 8pt, em dash, tap 40-44px, komentar yang menyalin kode | error | true |
| L2 Structural | pola struktur; hierarki CTA, kartu, alur paragraf, struktur pesan error, komentar restate | warning | false/true |
| L3 Contextual | butuh intent produk; komposisi anti-template, voice copy, komentar "why", konteks a11y | suggestion | false |

Urutan fix selalu L1 → L2 → L3.

## 2. Metadata rule

Canonical encoding (baris tabel di skill adalah bentuk ringkas ini):

```yaml
id: layer.group.name        # mis. accessibility.text-contrast, l2.hierarchy.cta
sev: error                   # error | warning | suggestion
det: true                    # true = bisa dicek mesin
src: AS                      # sumber: B1=UI 3.0, B2=50 Do's&Don'ts, AS=anti-slop (diadaptasi)
rule: <kalimat aturan>
exceptions: [ ... ]          # kasus yang diizinkan
```

## 3. Purpose test

1. Ambil teknik/element yang dipakai.
2. Tanya: "Apa yang ini layani?"
3. Jawaban namai tujuan (hierarchy/identity/readability) → tulis alasan 1 baris → tetap.
4. Jawaban "biar kelihatan AI" / "biar aman" → drop atau rework (kecuali `sev: error`).
5. Alasan tak bisa ditulis 1 baris → keputusan belum valid, revisit.

## 4. Dua usage mode

- **DURING:** aturan diterapkan saat menulis; selesai = Delivery Gate PASS ber-evidence.
- **AFTER:** audit. Tulis temuan bernomor di `anti-slop/audit-NNN-YYYY-MM-DD.md` format: `N. [id rule] <deskripsi 1 baris> (sev: X)`. Prioritas ikut `sev`: error=HIGH, warning=MEDIUM, suggestion=LOW. User pilih nomor; hanya nomor terpilih yang difix. Lapor follow-up.

## 5. Delivery Gate (4 blok)

### Blok 1 — Hard Gate (semua jawaban harus NO)
- [ ] Ada em dash (`—`) di teks deliverable (selain carve-out dokumentasi rule)
- [ ] Ada overflow horizontal / teks keluar kontainer / layout pecah di mobile
- [ ] Ada angka/statistik tanpa sumber (10K+ users, 99.9% uptime, dst)
- [ ] Ada testimoni fiktif (avatar AI, nama acak, jabatan acak)
- [ ] Ada asset visual dibuat tanpa instruksi & tanpa placeholder jujur (logo, avatar, statistik, nav)
- [ ] Ada navbar link ke section yang tidak ada
- [ ] Ada teks kontras < AA (normal 4.5:1, besar 18px+ 3:1) — pakai `skills/a11y/contrast.py`
- [ ] Ada tombol/dropdown/form tanpa perilaku nyata & tanpa `// TODO` + label
- [ ] Ada view data tanpa state empty/loading/error
- [ ] FAQ menampung pertanyaan template tak relevan produk
- [ ] Tak bisa dipakai keyboard (Tab logis, Enter/Space, Escape) / tanpa fokus terlihat
- [ ] Fitur ditambah via script yang rewrite source/CSS (string patch)
- [ ] Ada theme toggle dengan satu mode rusak
- [ ] App tidak di-run/build atau tanpa catatan click-through tiap element
- [ ] Ada klaim keamanan/kepatuhan/performans dibuat-buat
- [ ] Dibangun tanpa arah & tidak dilabel "draft tanpa arah" (dials 1/1/1)
- [ ] Ada konten bergaya realistis yang di-fabricate (nama fiktif, feed kecil, angka palsu)

### Blok 2 — Purpose-Gate
- [ ] Gradient/glow/glass/shadow/kartu/iklan-generik/anima/ilustrasi default tanpa tujuan tertulis → FAIL
- [ ] Ikon generik (sparkle/star/magic/lightning/diamond/orb/robot) atau ikon-library-look tanpa relevansi tertulis → FAIL
- [ ] Monospace besar / label uppercase tracking lebar / tipe tanpa alasan brand → FAIL

### Blok 3 — Liveliness (semua YES)
- [ ] Dials dideklarasikan & hasil konsisten (RHYTHM 3 tapi section seragam = FAIL)
- [ ] Satu focal point per screen
- [ ] Whitespace struktural (bukan sisa)
- [ ] Satu accent sadar (nol = steril; di mana-mana = slop)
- [ ] Ada identity motif (pola/gesture/tipe suara spesifik berulang)

### Blok 4 — Craftsmanship C-1..C-5
- [ ] C-1 Intentionality: tidak ada keputusan dengan alasan "default AI"
- [ ] C-2 Functional completeness: tak ada element yang "berbuat" tapi tidak berbuat
- [ ] C-3 Content-driven composition: tak ada section pengisi template
- [ ] C-4 Resilience: tahan di semua state/theme/breakpoint/tanpa mouse
- [ ] C-5 Evidence over claims: klaim nyata/verifiable atau tidak ditampilkan

Ada satu YES di Blok 1/2/4 (atau NO di Blok 3) → jangan deliver.

## 6. Dials & Design Read

| Dial | 1 Calm | 2 Balanced | 3 Bold |
|---|---|---|---|
| ENERGY | linear, GOV.UK | Stripe, Vercel | Awwwards, agency |
| RHYTHM | grid seragam | konsisten + beberapa break | asimetris, campur |
| MOTION | hover only | scroll-reveal, transition | parallax, pin, choreography |

Design Read satu baris sebelum generate (lihat core SKILL.md). Tanpa arah → label "draft tanpa arah" + dials 1/1/1.

## 7. Aksesibilitas = Hard-forever

Kontras, keyboard, fokus, states, dan zoom adalah `sev: error` di L1. Purpose test TIDAK PERNAH menurunkan standar ini. Jika konflik produk vs aksesibilitas, aksesibilitas menang dan dicatat.

## 8. Path map

| Skill | SKILL.md | Referensi |
|---|---|---|
| core | `SKILL.md` | `references/anything-good-core.md` |
| good-ui | `skills/good-ui/SKILL.md` | `references/good-ui-principles.md` |
| good-copy | `skills/good-copy/SKILL.md` | — |
| good-code | `skills/good-code/SKILL.md` | — |
| a11y | `skills/a11y/SKILL.md` | `skills/a11y/contrast.py` |