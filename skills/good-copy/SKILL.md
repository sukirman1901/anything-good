---
name: good-copy
description: >-
  Copy & text skill dari pack anything-good: tone & voice, rhythm & structure,
  honesty, dan hygiene anti-AI — termasuk em dash, buzzwords, fake stats,
  kotak-kotak kosong, dan voice calibration (sampel user menang). Use when
  writing or editing prose: headlines, CTAs, tone, error/empty states, landing
  copy, "buat copy lebih bagus", "tulisan terasa AI", "pesan error", "teks
  tombol". Merujuk mekanisme core anything-good.
---

# Good Copy (anything-good)

Bagian dari pack anything-good. Core (`../../SKILL.md`) memegang mekanisme (evaluator 3-layer, purpose test, Delivery Gate). Skill ini membawa aturan domain copy dan TIDAK menduplikasi mekanisme.

## Kapan dipakai

- Menulis/menyunting copy produk: headline, CTA, value prop, onboarding, error, empty state
- Saat kopi terasa AI atau generik
- Saat audit copy proyek jadi (mode AFTER)

## Prinsip di atas segalanya

1. **Jangan mengarang fakta.** Tulis ulang tak menambah fakta, nama, angka, tanggal, kutipan, atau citation yang tidak ada di sumber / dari user. Perincian datang dari sumber, bukan dari penulisan ulang. Kalau kalimat butuh detail nyata, minta atau tulis versi polos.
2. **Jangan over-sterilize.** Menghindari pola AI separuh pekerjaan. Copy tanpa voice sama AI-nya dengan copy penuh tell. Kalau user memberi voice, pertahankan.
3. **Voice calibration:** kalau ada sampel tulisan user, cocokkan sampel itu dulu (panjang kalimat, vocab, pembuka paragraf, kapitalisasi, idiom). Sampel MENANG atas rule default skill ini. Tanpa sampel → pakai default di bawah.

## Pola: Tone & Voice

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.copy.empty-vocab` | warning | true | AS | unlock/elevate/empower/delve/showcase/robust/game-changer/seamless/cutting-edge | Ganti kalimat spesifik: "Work with your team in one shared space" |
| `l2.copy.significance-inflate` | warning | true | AS | "the future of X", "pivotal moment", "revolutionizing", "new era" | Bukti spesifik: "cuts the time your team spends in status meetings" |
| `l2.copy.unsourced-proof` | error | false | AS | "Trusted by thousands", "industry-leading", tanpa yang disebut | Nama customer nyata atau potong klaim (C-5) |
| `l2.copy.weasel` | warning | true | AS | "Experts say", "people report" tanpa nama | Sebut sumber nyata atau hapus |
| `l2.copy.persuasion-trope` | warning | true | AS | "at its core", "the real question is", "fundamentally" | Sampaikan poin polos |
| `l2.copy.chatbot-closer` | warning | true | AS | "I hope this helps!", "Let me know if...", "You're welcome!" | Hapus; sampaikan info |
| `l2.copy.fake-candid` | warning | true | AS | "Honestly?", "Let's be honest", "Real talk" | Langsung ke poin |
| `l2.copy.signposting` | warning | true | AS | "Let's dive in", "Here's what you need to know" | Lakukan saja |
| `l1.copy.all-caps-emphasis` | warning | true | AS | Kalimat full ALL CAPS dalam paragraf untuk penekanan | Tulis emphasis ke kalimat; minimal, jangan strip semua caps (judul sah) |
| `l2.copy.actorless-passive` | warning | true | AS | "the decision was made", "the page was updated" dengan aktor tersedia | "We rewrote the pricing page"; passive sah bila aktor tak diketahui/tak relevan |
| `l2.copy.inanimate-subject` | warning | true | AS | "the dashboard understands", "the data tells us" | Kalimat yang menggambarkan yang dilakukan: "opens on the three metrics..." Not a ban untuk verb fungsional ("the form submits") |

## Pola: Rhythm & Structure

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.copy.rule-of-three` | warning | true | AS | "innovation, inspiration, insights" dipaksakan | Daftar sebanyak konten butuh |
| `l2.copy.negative-parallel` | warning | true | AS | "It's not just X, it's Y", "not only X but also Y", fragmen "no guessing" | Tulis lugas |
| `l2.copy.aphorism` | warning | true | AS | "X is the language of Y", "X is the currency of Z" | Formulasikan presisi |
| `l2.copy.staccato` | warning | true | AS | Runtutan sila pendek untuk memukau | Gabung jadi kalimat normal |
| `l2.copy.synonym-cycle` | warning | true | AS | Ganti sinonim untuk menghindari repetisi | Ulangi kata terjelas |
| `l2.copy.false-range` | warning | true | AS | "from onboarding to scale", "everything in between" | Sebut yang konkret |

## Pola: Honesty & Evidence

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.copy.fabricated-specifics` | error | false | AS | Angka/testimoni/tanggal dibuat tapi realistis | Tanpa customer nyata → tanpa angka dan kutipan; nyatakan apa produk laku; tanpa sumber → tidak tampil |
| `l2.copy.speculative-gap` | warning | false | AS | Menebak isi celah fakta ("likely founded in 1990s") | Nyatakan tidak terdokumentasi atau omit |
| `l2.copy.generic-closing` | warning | true | AS | "The future looks bright", "exciting times ahead" | Potong; akhiri di fakta konkret |

## Pola: Hygiene & Markdown

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.copy.em-dash` | error | true | AS | `—` dalam teks | Titik, koma, kolon, atau kurung. Juga tangkap ` -- ` dan ` - ` spasial |
| `l2.copy.boldface-overuse` | warning | true | AS | Tiap istilah kunci diberi bold mekanis | Emphasis via struktur kalimat; jangan bold tiap istilah |
| `l2.copy.quote-overuse` | warning | true | AS | Tanda kutip untuk menambah jarak/ironi/emphasis | Kutip hanya yang bermakna (dialog, sumber nyata, judul) |
| `l2.copy.inline-header-lists` | warning | true | AS | "- **User Experience:** The UX..." | Tulis kalimat lugas tanpa header restate |
| `l2.copy.emoji-heading` | warning | true | AS | 🚀/💡/✅ di heading/bullet | Hapus; ikon nyata saja dengan relevansi (rule good-ui R-04) |
| `l2.copy.filler` | warning | true | AS | "in order to", "due to the fact that", "at this point in time" | Ganti ringkas |
| `l2.copy.hedging` | warning | true | AS | "could potentially possibly", "may perhaps" | Satu qualifier |

## Yang TIDAK diflag (kluster, bukan isolated)

Jangan menuduh AI pada: grammar sempurna, campur register santai+formal, "bland", kosakata formal, satu "however", curly quotes saja (auto-curl OS), satu em dash saja, satu kalimat pendek, klaim tanpa sumber (mayoritas web), teks secondhand.

**Look for clusters.** Satu em dash tak berarti; em dash + rule-of-three + buzzword + closing generik = pengakuan.

## Tanda tulisan manusia (pertahankan)

Perincian spesifik yang susah difabrikasi (alamat nyata, kutipan ganjil), perasaan campur, referensi era-bound (slang/meme), variasi panjang kalimat, aside dan self-correction asli ("(saya hampir tulis 'almost' di sini)").

## Voice calibration (opsional, wajib kalau ada sampel)

1. Baca sampel tulisan user: panjang kalimat, vocab, pembuka paragraf, punctuation, frase berulang.
2. Samakan kebiasaan itu; jangan upgrade kata casual atau mendisiplinkan quirk yang disengaja.
3. Sampel menang atas rule skill ini (contoh: sampel memakai em dash → pertahankan frekuensinya).

## Loop: draft → audit → final

1. **Draft.** Tulis ulang dengan pola di atas; baca keras; variasi panjang kalimat; prefer detail spesifik + konstruksi ringkas; jaga register.
2. **Audit.** Dua pertanyaan: "Apa yang membuat ini jelas buatan AI?" dan "Apakah ada fakta/nama/angka/tanggal/kutipan yang tak ada di sumber?" Fabrikasi = cacat walau bunyinya lebih manusiawi.
3. **Final.** Perbaiki kedua jawaban; cek em dash sekali lagi (L1). Kena = draf belum selesai.

## Checklist good-copy

- [ ] Tanpa angka/testimoni/nama/tanggal fabrikasi; semua nyata atau placeholder berlabel
- [ ] Buzzwords diganti bahasa spesifik
- [ ] Tanpa em dash (kecuali sampel user memakai)
- [ ] Tanpa quote berlebihan; kutip hanya bermakna
- [ ] Tanpa ALL CAPS sebagai emphasis
- [ ] Tiap kalimat menyebut aktor (tanpa actorless-passive mager, tanpa abstraction ber-verb manusia)
- [ ] CTA spesifik aksi, bukan template generik
- [ ] Tanpa rhythm-tells: rule-of-three paksa, negative parallel, staccato, aphorism, false range
- [ ] Voice ada (sampel user atau tone yang jelas), bukan default steril
- [ ] Error/empty/CTA berkata satu pesan satu aksi (koordinat dengan good-ui)
- [ ] Delivery Gate core PASS