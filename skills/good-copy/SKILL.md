---
name: good-copy
description: >-
  Copy skill dari pack anything-good: every sentence should earn the reader's
  attention. Keputusan (voice, specificity, does this surface need copy) dulu;
  detector AI (klaim kosong, rhythm cluster, capability-inflation) sebagai
  bukti, bukan kamus haram. Use when writing or editing prose: headlines, CTAs,
  error/empty states, landing copy, "buat copy lebih bagus", "tulisan terasa
  AI", "pesan error", "teks tombol". Merujuk mekanisme core anything-good.
---

# Good Copy (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang DNA, cluster, purpose test, Delivery Gate. Skill ini membawa aturan domain copy. Bentuk keputusan: `../../references/good-copy.md`.

## Kapan dipakai

- DURING: menulis/menyunting copy produk (headline, CTA, error, empty, onboarding, body)
- AFTER: audit. Honesty memakai `id` + `sev: error`. Detector lain: kluster, bukan isolated tell
- Copy tone / empty / error: di sini, bukan good-ui

## What good means

Good copy terdengar seperti orang yang paham produk, audiens, dan momen sebelum menulis.

Tidak dibuat manusia dengan menambah quirk. Tidak dibuat profesional dengan menghapus kepribadian.

**Every sentence should earn the reader's attention.** Tes, bukan izin menghapus sampai steril.

**Professional ≠ sanitized.** Sampel user MENANG atas rule default. Tanpa sampel → default di bawah, jangan voice fabrikasi.

Prefer specific truth over abstract persuasion. Katakan hanya yang pembaca butuh di permukaan ini.

## Dua pertanyaan load-bearing

Sebelum menulis non-trivial, dari fakta produk (bukan dari template slot):

1. Siapa yang baca, di momen apa?
2. Apa **satu** pesan yang permukaan ini harus sampaikan?

Saat ragu: apakah permukaan ini butuh copy sama sekali? Apa kebenaran konkret terkecil? Apakah menyembunyikan aktor membuat kalimat mengelak?

## Copy Purpose Test

Untuk setiap kalimat/blok: **"What attention does this earn?"**

| Tambahan | Jawaban sah |
|---|---|
| headline | apa produk ini, untuk siapa, sekarang |
| body | fakta yang mengubah pemahaman |
| CTA | konsekuensi klik yang perlu diprediksi |
| empty | status nyata; sering satu kalimat cukup |
| error | apa yang rusak + cara lanjut |
| proof | angka/nama yang ada di sumber |

Jawaban "biar lengkap slotnya" / "biar professional" / "biar human" tanpa isi = drop. Kalau earning tertulis 1 baris dari produk ini, bentuk yang tidak ada di rata-rata adalah keputusan.

## Honesty (error; satu cukup, cluster tidak berlaku)

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.copy.fabricated-specifics` | error | false | AS | Angka/testimoni/tanggal dibuat tapi realistis | Tanpa sumber → tanpa angka dan kutipan; placeholder berlabel |
| `l2.copy.unsourced-proof` | error | false | AS | "Trusted by thousands" tanpa yang disebut | Nama nyata atau potong klaim (C-5) |
| `l2.copy.weasel` | warning | true | AS | "Experts say", "people report" tanpa nama | Sebut sumber atau hapus |
| `l2.copy.speculative-gap` | warning | false | AS | Menebak celah fakta | Nyatakan tidak terdokumentasi atau omit |

## Detector (bukti, bukan definisi)

Cari kluster (mekanisme core). Satu kata/satu dash bukan pengakuan.

| id | sev | det | src | tell | judgment |
|---|---|---|---|---|---|
| `l2.copy.empty-claim` | warning | false | AS | unlock/elevate/empower/seamless/robust sebagai klaim tanpa densitas | Apakah pembaca tahu apa yang terjadi? "Seamless migration" sah jika tanpa downtime; "seamless collaboration" kosong → tulis kejadian konkret |
| `l2.copy.significance-inflate` | warning | true | AS | "the future of X", "revolutionizing" | Turunkan ke bukti spesifik |
| `l2.copy.capability-inflation` | warning | false | AS | "AI-powered workspace" untuk satu operasi (extract PDF) | Tulis kapabilitas nyata: "Upload a PDF. We'll pull the fields you need." |
| `l2.copy.surface-overload` | warning | false | AS | Surface sederhana: headline + sub + helper + note yang sama | Satu pesan; buang yang tidak mengubah pemahaman/aksi. Slot UI kosong bukan alasan menulis |
| `l2.copy.persuasion-trope` | warning | true | AS | "at its core", "the real question is" | Poin polos |
| `l2.copy.chatbot-closer` | warning | true | AS | "I hope this helps!", "Let me know if..." | Hapus |
| `l2.copy.fake-candid` | warning | true | AS | "Honestly?", "Real talk" | Langsung ke poin |
| `l2.copy.signposting` | warning | true | AS | "Let's dive in", "Here's what you need to know" | Lakukan saja |
| `l2.copy.false-agency` | warning | false | AS | "the platform understands your business" | Anthropomorphism palsu. Bukan ban subject benda: "The graph shows revenue by month" sah |
| `l2.copy.evasive-passive` | warning | false | AS | "Your account was suspended" tanpa siapa/kenapa, padahal aktor ada | Tes: menyembunyikan aktor = mengelak? `Payment failed.` dan `Changes saved.` sah |
| `l1.copy.all-caps-emphasis` | warning | true | AS | Kalimat FULL CAPS dalam paragraf | Emphasis ke kalimat; judul sah |
| `l2.copy.em-dash-pattern` | suggestion | true | AS | Em dash (`—`) atau ` -- ` dipakai berulang sebagai transisi default | Kebiasaan, bukan karakter. Satu dash bukan dosa. Sampel user menang. Rewrite hanya jika dash mengganti struktur kalimat yang lemah |
| `l2.copy.rule-of-three` | warning | true | AS | "innovation, inspiration, insights" / "No X. No Y. No Z." dipaksakan | Daftar sebanyak konten butuh. Isolated triad bukan pengakuan |
| `l2.copy.negative-parallel` | warning | true | AS | "It's not just X, it's Y" | Tulis lugas |
| `l2.copy.aphorism` | warning | true | AS | "X is the language of Y" | Formulasikan presisi |
| `l2.copy.staccato` | warning | true | AS | Runtutan sila pendek untuk memukau | Gabung jadi kalimat normal |
| `l2.copy.synonym-cycle` | warning | true | AS | Ganti sinonim untuk menghindari repetisi | Ulangi kata terjelas |
| `l2.copy.false-range` | warning | true | AS | "from onboarding to scale" | Sebut yang konkret |
| `l2.copy.generic-closing` | warning | true | AS | "The future looks bright" | Potong; akhiri di fakta |
| `l2.copy.boldface-overuse` | warning | true | AS | Tiap istilah di-bold mekanis | Emphasis via struktur |
| `l2.copy.quote-overuse` | warning | true | AS | Kutip untuk jarak/ironi | Kutip hanya yang bermakna |
| `l2.copy.inline-header-lists` | warning | true | AS | "- **User Experience:** The UX..." | Kalimat lugas |
| `l2.copy.emoji-heading` | warning | true | AS | 🚀/💡/✅ di heading sebagai default | Kluster. Satu emoji di produk yang memang memakai = keputusan. Sampel/DESIGN.md menang |
| `l2.copy.filler` | warning | true | AS | "in order to", "due to the fact that" | Ringkas, kecuali voice |
| `l2.copy.hedging` | warning | true | AS | "could potentially possibly" | Satu qualifier |

CTA: namai konsekuensi klik jika user perlu memprediksi (`Upload contract`, `Send invoice`). `Save`, `Close`, `Back`, `Cancel` sudah jelas; jangan dipanjangkan.

## Voice calibration

1. Baca sampel user: panjang kalimat, vocab, pembuka, punctuation, frase berulang.
2. Samakan; jangan upgrade kata casual atau merapikan quirk yang disengaja.
3. Sampel menang (termasuk frekuensi em dash, emoji, caps).

## Loop: draft → audit → final

1. **Draft.** Jawab dua pertanyaan load-bearing; tulis; baca keras.
2. **Audit.** "Apa kluster yang membuat ini buatan AI?" dan "Ada fakta yang dikarang?" Fabrikasi = cacat walau bunyinya manusiawi. Isolated tell bukan gagal.
3. **Final.** Perbaiki keduanya. Jangan gagalkan draf karena satu dash.

## Checklist good-copy

- [ ] Dua pertanyaan load-bearing dijawab dari produk, bukan dari slot UI
- [ ] Setiap kalimat earning; permukaan yang tidak butuh copy dibiarkan pendek atau kosong
- [ ] Tanpa fabrikasi; capability tidak di-upgrade lewat bahasa
- [ ] Klaim punya densitas informasi; bukan kamus kata terlarang
- [ ] Passive/aktor: tes mengelak, bukan "tiap kalimat ada pelaku"
- [ ] CTA: konsekuensi jika perlu prediksi; Save/Close tetap
- [ ] Kluster rhythm/hygiene ditangani; isolated tell tidak
- [ ] Voice: sampel user atau tone jelas, bukan steril
- [ ] Delivery Gate core PASS
