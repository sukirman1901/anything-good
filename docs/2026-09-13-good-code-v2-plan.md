# good-code v2 Implementation Plan

**Status:** shipped 2026-09-13 dengan amandemen review prinsip. Jangan mengeksekusi dump SKILL dari draf plan lama (itu delete-first + `l3.code.*` linter). Sumber kebenaran = file live.

**Goal:** Domain kode penuh. Nyawa: *stop completing patterns, start making decisions.* Tes: every line should earn its place (bukan izin menghapus). Jangan over-sterilize. Change Slop di core; extract ke consumer kedua di blast radius = keputusan.

**Amandemen vs draf awal:** tesis di atas tes; 2 pertanyaan load-bearing; L3 group tanpa id; `references/good-code.md` untuk bentuk keputusan; core/README naik bersama; Q7 tidak membunuh extract yang sah.

**Files (live):**

- `skills/good-code/SKILL.md`
- `references/good-code.md`
- `SKILL.md` (core)
- `references/anything-good-core.md`
- `README.md`
- `docs/2026-09-13-anything-good-design.md` Bagian 6

**Konvensi:** teks SKILL.md / README / skills/*/SKILL.md bebas em dash (`—`) = 0 occurrence. `references/` boleh (dokumentasi rule + contoh). Jangan commit kecuali user minta.

---

### Verifikasi

- [ ] **Em dash di teks deliverable**

```bash
for f in SKILL.md README.md skills/good-ui/SKILL.md skills/good-copy/SKILL.md skills/good-code/SKILL.md skills/a11y/SKILL.md DESIGN.schema.md; do echo "$f: $(rg -c $'\u2014' "$f" || echo 0)"; done
```

Expected: semua `0`.

- [ ] **Nyawa dan tes ada; dogmatisme panjang tidak ada**

```bash
rg -n "stop completing patterns|over-sterilize|what does this earn|Length is a smell" skills/good-code/SKILL.md
rg "tak pernah 3|1 baris, maks 2" skills/good-code/SKILL.md
```

Expected: konsep kunci ketemu; dogmatisme `0`.

- [ ] **L3 tanpa id linter**

```bash
rg "l3\.code\." skills/good-code/SKILL.md references/good-code.md SKILL.md
```

Expected: `0` (boleh disebut sebagai larangan "jangan mengarang `l3.code.*`").

- [ ] **Change Slop di core, extract carve-out ada**

```bash
rg -n "perluas scope|consumer kedua|Diff scope" SKILL.md skills/good-code/SKILL.md
```

- [ ] **Path referensi**

```bash
test -f references/good-code.md && test -f skills/good-code/SKILL.md && echo OK
```

- [ ] **README domain kode**

```bash
rg -n "good-code" README.md
```

Expected: `domain kode`, ada `good-code.md`.
