# anything-good Core — Technical Reference

Mechanism referenced by core `SKILL.md` and every skill. Skills do NOT copy this file; they cite rule `id`s and mechanism numbers.

## 1. 3-layer evaluator

All skills use three layers. `sev` `error` always fix (a11y/mechanical); `warning` fix unless waived (name the waiver); `suggestion` needs product context.

| Layer | Detection | Typical `sev` | `det` |
|---|---|---|---|
| L1 Mechanical | machine-checkable (regex/calc); contrast, 8pt spacing, tap 40-44px, comments that copy code | error | true |
| L2 Structural | structure; CTA hierarchy, cards, paragraph flow, error-message structure, restating comments | warning | false/true |
| L3 Contextual | needs product/repo intent; anti-template composition, copy voice, sibling-backed code decisions, a11y context | suggestion | false |

Fix order is always L1 → L2 → L3.

## 2. Rule metadata

Canonical encoding (table rows in skills are the compact form). **Exception:** good-code L3 diagnostic groups (`unnecessary`, `abstraction`, `naming`, `defensive`, `pattern`, `error`) are labels, not rule `id`s. Do not invent `l3.code.*`.

```yaml
id: layer.group.name        # e.g. accessibility.text-contrast, l2.hierarchy.cta
sev: error                   # error | warning | suggestion
det: true                    # true = machine-checkable
src: AS                      # source: B1=UI 3.0, B2=50 Do's&Don'ts, AS=this pack
rule: <rule sentence>
exceptions: [ ... ]          # allowed cases
```

## 3. Purpose test + DNA

1. Take the technique/element in use.
2. Ask: "What does this serve?"
3. If the answer names a purpose (hierarchy/identity/readability) → write a one-line reason → keep.
4. If the answer is "to look AI" / "to be safe" → drop or rework (except `sev: error`).
5. If the reason cannot be written in one line → the decision is not valid yet; revisit.

Domain forms (core `SKILL.md`): code earn its place; copy earn attention; ui earn its space. Valid answers are bound to this product/repo, not "best practice". A11y is not an earning test.

**Professional ≠ sanitized.** Earning shape (voice, domain types, bold composition) stays.

## 3b. Cluster > isolated tell

One marker is not a conviction, except `sev: error` (fabrication, a11y). A finding is a cluster of tells with no product reason. AFTER: name the cluster; do not number each dash/card/helper separately.

## 4. Two usage modes

- **DURING:** rules apply while writing; done = Delivery Gate PASS with evidence.
- **AFTER:** audit. Write numbered findings in `anti-slop/audit-NNN-YYYY-MM-DD.md`.
  - L1/L2 (has `id`): `N. [id rule] <one-line description> (sev: X)`.
  - L3 good-code (label): `N. [group] <sibling/consumer evidence in one line>`. Do not invent ids.
  - Priority follows `sev` when present: error=HIGH, warning=MEDIUM, suggestion=LOW. No sev (L3 groups) = discussion, user picks. Only selected numbers get fixed. Report follow-up.

## 5. Delivery Gate (4 blocks)

### Block 1 — Hard Gate (every answer must be NO)
- [ ] Horizontal overflow / text escaping its container / layout broken on mobile
- [ ] Unsourced numbers/stats (10K+ users, 99.9% uptime, etc.)
- [ ] Fictional testimonials (AI avatars, random names, random titles)
- [ ] Visual assets made with no instruction and no honest placeholder (logo, avatar, stats, nav)
- [ ] Navbar links to a section that does not exist
- [ ] Text contrast below AA (normal 4.5:1, large 18px+ 3:1) — use `skills/a11y/contrast.py`
- [ ] Button/dropdown/form with no real behavior and no `// TODO` + label
- [ ] Data view without empty/loading/error states
- [ ] FAQ holding template questions irrelevant to the product
- [ ] Not usable from keyboard (logical Tab, Enter/Space, Escape) / no visible focus
- [ ] Features added via a script that rewrites source/CSS (string patch)
- [ ] Theme toggle with one mode broken
- [ ] App not run/built, or no click-through notes per element
- [ ] Made-up security/compliance/performance claims
- [ ] Built with no direction and not labeled "draft without direction" (dials 1/1/1)
- [ ] Realistic-looking fabricated content (fictional names, tiny feeds, fake numbers)

### Block 2 — Purpose Gate
- [ ] Gradient/glow/glass/shadow/card/generic-ad/animation/illustration as a default with no written purpose → FAIL
- [ ] Generic icons (sparkle/star/magic/lightning/diamond/orb/robot) or icon-library look with no written relevance → FAIL
- [ ] Large monospace / wide-tracked uppercase labels / type with no brand reason → FAIL

### Block 3 — Liveliness (every answer YES)
- [ ] Dials declared and the result matches (RHYTHM 3 but uniform sections = FAIL)
- [ ] One focal point per screen
- [ ] Structural whitespace (not leftover)
- [ ] One conscious accent (zero = sterile; everywhere = slop)
- [ ] An identity motif (a specific repeating pattern/gesture/type voice)

### Block 4 — Craftsmanship C-1..C-5
- [ ] C-1 Intentionality: no decision whose reason is "AI default"
- [ ] C-2 Functional completeness: no element that "does" something but does not
- [ ] C-3 Content-driven composition: no template-filler sections
- [ ] C-4 Resilience: holds in all states/themes/breakpoints/without a mouse
- [ ] C-5 Evidence over claims: claims are real/verifiable or not shown

Any YES in Blocks 1/2/4 (or NO in Block 3) → do not deliver.

## 6. Dials & Design Read

| Dial | 1 Calm | 2 Balanced | 3 Bold |
|---|---|---|---|
| ENERGY | linear, GOV.UK | Stripe, Vercel | Awwwards, agency |
| RHYTHM | uniform grid | consistent + a few breaks | asymmetric, mixed |
| MOTION | hover only | scroll-reveal, transition | parallax, pin, choreography |

One-line Design Read before generate (see core SKILL.md). No direction → label "draft without direction" + dials 1/1/1.

## 7. Accessibility = Hard-forever

Contrast, keyboard, focus, states, and zoom are `sev: error` at L1. The purpose test NEVER lowers this bar. If product conflicts with accessibility, accessibility wins and that is recorded. Honor `prefers-reduced-motion` when there is motion; Dial 3 is not permission to ignore it.

## 8. Path map

| Skill | SKILL.md | Reference |
|---|---|---|
| core | `SKILL.md` | `references/anything-good-core.md` |
| good-ui | `skills/good-ui/SKILL.md` | `references/good-ui.md` |
| good-copy | `skills/good-copy/SKILL.md` | `references/good-copy.md` |
| good-code | `skills/good-code/SKILL.md` | `references/good-code.md` |
| a11y | `skills/a11y/SKILL.md` | `skills/a11y/contrast.py` |
| good-ux (not a skill) | — | `references/good-ux.md` |
