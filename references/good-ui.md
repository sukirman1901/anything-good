# good-ui

Pack test: **every element should earn its space.** The catalog below is detectors and a default ladder, not a style guide. An isolated tell is not a conviction; a composition cluster is. Contrast/keyboard/focus: skill `a11y`. Copy: skill `good-copy`.

**Operating model (UI Critic + UI Generator contract):**

```
PRODUCT INTENT
     ↓
Design Planner → composition decision
     ↓
UI Generator → UI / code
     ↓
┌───────────────┴───────────────┐
Mechanical Critic        Visual Critic
(Layer 1)                (Layer 2 + 3)
     ↓                       ↓
└───────────────┬───────────────┘
        targeted fixes → final render
```

Fix order is **never arbitrary**: Layer 1 errors first (they are measurable), then Layer 2 warnings, then Layer 3 suggestions — Layer 3 requires product intent and may stop to ask.

---

## Rule metadata legend

Every rule below is a table row. Columns mean:

| Column | Meaning |
|---|---|
| `id` | Stable identifier for the engine (`layer.group.name`) |
| `sev` | `error` (a11y/mechanical breach — fix always) · `warning` (heuristic defect — fix unless waived) · `suggestion` (judgment — needs product context) |
| `det` | `true` = deterministic/lintable · `false` = heuristic/judgment, requires context |
| `src` | `B1` = UI 3.0 book · `B2` = 50 Do's & Don'ts book · `AS` = anti-slop (adapted) |

Canonical encoding (the table rows are the compact form of this):

```yaml
id: accessibility.text-contrast        # Layer 1 — error, deterministic
severity: error
category: accessibility
deterministic: true
autofixable: false
rule:  small-text ≥ 4.5:1, large-text >24px ≥ 3:1, interactive ≥ 3:1
exceptions: [ decorative-only text, brand-locked large logotype ]
```

```yaml
id: color.no-pure-black                # Layer 3 — heuristic, but NOT universal law
severity: suggestion
category: color
deterministic: false
rule:  avoid literal #000/#fff full-strength → tinted neutral (#333335-ish)
exceptions:
  - brand system explicitly defines pure black/white
  - high-contrast accessibility mode
  - intentional editorial treatment (art direction)
```

```yaml
id: composition.excessive-cardification # Layer 3 — judgment, never a linter error
severity: warning
category: composition
deterministic: false
requires_context: true
rule:  not everything is a card — groups belong to whitespace/dividers
```

---

# Layer 1 — Mechanical / Deterministic (lintable)

Violating a Layer 1 rule is a defect, full stop. These are what code review / `grep` can catch.

## Grid & Spacing

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `layout.grid-anatomy` | Container ≠ declared safe zone; no max-width / no gutters | Start from a coherent container (pack default if none: ~1200–1240 desktop / 12-col @ 20px; mobile 4-col @ 8px). DESIGN.md and existing tokens win. Not a deliverable failure by itself | warning | true |
| `layout.8pt` | `gap: 12px; padding: 22px; margin: 13px` (not on 4–8pt ladder) | Nearest 8pt value: `8/16/24/32/40/48/56/64` (4pt for fine detail; 5px only on Bootstrap stacks) | error | true |
| `layout.breaking-order` | Breakpoints tuned from desktop down | Build mobile 375/min first, scale up — scaling down is what breaks | error | true |
| `layout.row-grid` | Row heights/baseline drift between siblings | Align text rows to one baseline; 8px row steps | warning | true |
| `layout.box-model` | Element floats bare, siblings with mismatched margins in one row | Everything in a container; containers nest into columns/sections | error | true |
| `layout.edge-white-space` | Content touches the container/breakpoint edge (`max-width: 100%` no safe zone) | Reserve min **16–20px** edge margin so content never kisses the boundary | warning | true |

Basic terms (anchor for debate — say "fix the container", not "nudge the element"):

| Term | Definition | Value in practice |
|---|---|---|
| **Column** | Vertical zone content spans | Desktop **12-col**; mobile **4-col** |
| **Gutter** | Gap *between* columns | Desktop **20px**; mobile **8px** |
| **Side margin** | Space between content and screen/frame edge | Desktop **≥ 100px** (frame 1440 → safe 1240); mobile **≥ 16px** |
| **Container / safe zone** | Max-width box content lives in | ≈ **1200–1240px** desktop; **343px** mobile |
| **Row / baseline grid** | Horizontal rhythm off 8px steps; text aligns to one line | Height = 8px steps; line-height cascade once |
| **Breakpoint** | Width where composition changes (not margin tweaks) | 375 → 768 → 1024 → 1440 |
| **Box model** | Everything nests container → columns → sections | Two siblings in one row share a container |

Numbers above are the pack **default ladder** when DESIGN.md / existing tokens are silent. They are not a deliverable failure by themselves (`layout.grid-anatomy` = warning).

## Color (mechanical half)

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `color.contrast` | Small text < 4.5:1, large text (>24px) < 3:1, buttons/inputs < 3:1 | Raise ratio to WCAG AA | error | true |
| `color.system-tokens` | Status colors as prose only, no error/warning/success tokens | ≥ 3 system tokens, each ≥ 4.5:1 (ideally 7:1) | warning | true |
| `color.brand-tint` | Grays/neutrals with zero brand tint (`#f5f5f5` everywhere) | Tone grays: overlay primary 5–15% opacity | suggestion | true |
| `color.spelling` | Hex/named color that doesn't exist in token scale | Map to nearest 50–900 neutral/primary token | error | true |
| `color.pure-black` | Literal `#000`/`#fff` full-strength surfaces | Tinted neutral (`#333335`-ish); pure black/white strains eyes — exception: brand system explicitly defines it, HCA mode, editorial treatment | warning | true |
| `color.dark-mode-share` | One palette reused 1:1 for dark mode | Dark mode = its own darker-tint palette; keep tone ~200–500 on dark bg | warning | true |

**Color psychology (decision aid, not law):** blue=trust, green=growth, red=urgency, orange=friendly CTA, yellow=attention, purple=luxury (and the most overused default), black=elegance, white=purity. Use as a *reason* for a choice, never as a rule that forces one.

**Tints vs shades:** tint = add white (lighter surface); shade = add black (deeper text/border). Build the palette by stepping both directions from the base hue. Choose warm OR cool deliberately — don't blend both by accident.

## Typography (mechanical half)

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `type.tokens` | Arbitrary sizes (13/17/21px ladder) | Named type scale (display/headline/body/label/menu), ≥ 3–4 steps | error | true |
| `type.minimums` | Body < 14px; button/body line-height < 22px | Body ≥ 14px; LH ≥ 22px for body+buttons | error | true |
| `type.line-length` | Reading line wider than ~75 chars | `max-width: 60–70ch` | warning | true |
| `type.family-count` | > 2 families / random weights | ≤ 2 families; weight carries hierarchy | warning | true |

## Radius, Shadows, States, Target

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `radius.language` | `rounded-xl/2xl/3xl` mixed at random on one surface | One token radius scale; nested inner radius < outer (30pt → 15pt) | error | true |
| `shadow.direction` | Elements with different shadow directions (competing light sources) | ONE directional light source per composition | error | true |
| `shadow.hardness` | Hard black shadows (`4px 4px 0`), or `rgba(0,0,0,1)` | Layered soft: `0 2px 4px rgba(0,0,0,.15), 0 10px 15px rgba(0,0,0,.04)` | error | true |
| `shadow.dark-bg` | Shadow-only elevation on dark bg (invisible) | Light highlight / 1px reduced-opacity stroke instead | warning | true |
| `target.size` | Click targets < 40–44px (mobile < 48px) | Invisible padding / full-row hit target | error | true |
| `state.components` | No hover/pressed/disabled/loading states | Add all, distinguishable but not drastic | error | true |

## Gradients

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `gradient.hue` | Gradient between opposite hues (abrupt transition) | Adjacent hues on the wheel; natural smooth flow | error | true |
| `gradient.placement` | Gradient stops mid-element, or run-on (starts at one edge, ends past content) | Concentrate stops toward one end; transition finishes before content edge | warning | true |
| `gradient.everywhere` | Gradient on bg + buttons + text + icon in one surface | One gradient family, used with moderation — not gradient-on-everything | warning | false |
| `gradient.noise` | Flat gradient, no texture | Overlay noise/grain — separates good from generic | suggestion | false |

- Types: **linear** (buttons/backgrounds), **radial** (overlays, color→transparent), angular/diamond/mesh (decorative only).
- Radial overlay = color full opacity → transparent, for text-over-image contrast.

## Forms (mechanical half)

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `forms.labels` | Placeholder used as only label | Label always visible | error | true |
| `forms.semantic-type` | Wrong input types (`type="text"` for email/tel/numeric) | Correct semantic types | error | true |
| `forms.masks` | Input without format hint (phone/date) | Input mask `(032) xxxx-xxxx`, `DD/MM/YYYY` | warning | true |
| `forms.length` | Fields wider/taller than the data asked for | Match input length to content (zip short, email wide) | warning | true |
| `forms.choice-type` | Checkbox used for single choice | Checkbox = multi; radio/chips = single | error | true |

## Responsive constraints

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `responsive.no-hscroll` | Horizontal scroll at any width | Containers = gutters + safe margins at every breakpoint | error | true |
| `responsive.cta-mobile` | Primary CTA desktop-width on phone | Full-width primary below 768 | warning | true |
| `responsive.breakpoints` | Margin-tweak at every px instead of composition change | Discrete breakpoints (375 → 768 → 1024 → 1440) | warning | true |

---

# Layer 2 — Structural / Heuristic

Fixable on inspection, but the "right" fix depends on the component at hand. Default: apply; waiver allowed with a named reason.

## Visual hierarchy & density

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `hierarchy.proximity` | Same `p-6` everywhere; title→body, group→button, container padding all identical | Spacing encodes hierarchy: title→body `8–20px`, group→button `20–40px`, container padding `12–20px` | warning | false | B1 |
| `hierarchy.density` | Everything equally big / equally small | One primary focus per surface; type scale step order (not raw size) | warning | false | B1 |
| `hierarchy.off-script` | Hierarchy only readable after color is on | Design grayscale first — layout must carry structure alone | warning | false | B1 |
| `hierarchy.60-30-10` | Palette share unbalanced | 60% primary / 30% neutral / 10% accent | warning | false | B1 |
| `hierarchy.selection-colors` | > 2 colors for selection/nav state | ~2: one element color + one selected state | warning | false | B2 |

## CTA & buttons

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `cta.hierarchy` | Buttons equal weight (all filled) | Primary → secondary (outlined) → tertiary (link), aligned by importance | warning | false | B1 |
| `cta.verb` | "Click here" / "Submit" / generic labels | Action-verb + outcome ("Get started", "Download PDF") | error | false | B1 |
| `cta.icon` | Random icon placement | Icon leads label; trailing icon only for "where it goes" (log out → door) | suggestion | false | B1 |
| `cta.destructive` | Destructive colored blue/gray (looks normal) | Red = destructive warning; blue informational | error | false | B2 |
| `cta.distinct-secondary` | Hero secondary CTA competes with primary | Thin border, no fill — visually subordinate | warning | false | B1 |

## Cards & consistency

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `cards.consistent-length` | Ragged card heights / truncation in a row | Clamp text, min/max height, tooltip for full text | warning | true | B1 |
| `cards.image-ratio` | Image ratios vary across a grid | One aspect ratio per grid | error | true | B1 |
| `cards.spacing` | Card gaps not on ladder | Between cards `16–40px`, rows `64–96px`, inside `16–24px` | warning | true | B1 |
| `cards.no-inner-scroll` | Scroll/drag inside a card to read | Cut content + "See more"/"Explore" | warning | false | B2 |
| `cards.hit-target` | Only the visible card chrome is clickable | Whole card clickable when it's the one action; else CTA ≥ 44px is the target | warning | false | B1 |
| `cards.nested-radius` | Inner radius = outer radius | Inner < outer (card 30pt → inner 15pt) | error | true | B2 |

## Forms (structural half)

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `forms.optional-not-required` | Star-marks on every required field | Mark **optional** instead | warning | false | B1 |
| `forms.inline-error` | One generic error toast at top ("1 error found") | Inline error where it happened + why (+ `aria-describedby`) | error | false | B2 |
| `forms.flow` | Giant single-page form | Steps + progress; serialize; success state required | warning | false | B1 |
| `forms.single-column` | Random multi-column drift | Single-column flow; only related pairs (name, date range) share a row, aligned on one axis | warning | false | B2 |
| `forms.columns-align` | Labels/inputs at different x | Labels + inputs share one axis | error | false | B2 |
| `forms.avoid-translucent` | Translucent/gradient inputs for looks | Legible fills/borders — accessibility over flex | warning | false | B1 |

## Controls & navigation

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `control.dropdown-count` | Dropdown used for 2–4 choices | Side-by-side chips/segmented ≤ 4; dropdown only 5+ | warning | false | B2 |
| `control.slider` | Text/range input where a slider fits | Slider for ranges (price, difficulty) | warning | false | B2 |
| `control.swipe` | Inline option button where swipe works (list rows) | Swipe = fast/primary action; overflow button for rest | suggestion | false | B2 |
| `nav.short-labels` | Verb-heavy nav items ("Edit my address") | Noun destination labels ("My address") | warning | false | B2 |
| `nav.active-state` | No active page state | Hover + active highlight | error | true | B1 |
| `nav.logo-clickable` | Logo not a link top-left | Logo → home, top-left | warning | false | B1 |
| `nav.serpos` | Equal-importance items buried mid-bar | Most important at first/last (serial-position) | warning | false | B2 |
| `nav.sticky-clarity` | Translucent sticky bar page blends into | Elevation: shadow / 0.5–1px stroke / blur 20–32 + 50–80% fill | warning | false | B1 |

## Cognitive load

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `load.hicks` | Many equal options, no default | Fewer options + an "Other" free-text | warning | false | B2 |
| `load.typefaces` | Multiple families mixed | One family; weight/role differentiates | warning | false | B2 |
| `load.font-count` | Too many sizes on one surface | ~3 tiers (head / label / body) | warning | false | B2 |
| `load.separators` | Divider lines to separate every menu item | Spacing groups related items; lines only at real boundaries | warning | false | B2 |

## Modal & destructive action

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `modal.trap` | No escape (no X, no click-outside, no ESC) | Always give escape: X, click-outside, ESC, clear cancel | error | true | B1 |
| `modal.wrong-tool` | Routine error shown as modal / snackbar for irreversible action | Irreversible/destructive/purchase → modal; routine errors → inline | warning | false | B1 |
| `modal.double-negative` | "Are you sure you don't want to keep your account?" | Ask positively: "Keep your account?" | error | false | B1 |
| `modal.mirror` | Buttons don't restate the question ([Cancel][OK]) | [Don't Cancel][Yes, Cancel] | warning | false | B2 |
| `modal.long-op` | Long operation in a modal with no feedback | Progress indicator inside the modal | warning | false | B1 |

## Search

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `search.prominent` | Search buried, small, unreadable | Prominent at top; ≥ 40–44px target; border/fill so it reads as an input | warning | true | B1 |
| `search.placeholder` | Placeholder "Search…" with no example | Placeholder shows an *example* of what to type | suggestion | false | B1 |
| `search.recent` | No recent searches / no clear-all | Recent searches + clear-all | suggestion | false | B1 |
| `search.no-results` | No-results = dead end | Suggestion-rich no-results page (related/alternates) | warning | false | B1 |
| `search.autocomplete` | No suggestions while typing | Autocomplete/completion | suggestion | false | B1 |

---

# Layer 3 — Contextual / Product Judgment

These are **not linter rules**. They need a product intent input; without one, apply conservatively or ask. **A page that passes every Layer 1–2 rule can still be a template** — that failure lives here.

## Composition & Anti-Template

The AI-slop smell is a **cluster**, not `padding: 22px`. Isolated badge, card, or gradient is normal. The signature is a forced stack without product reason:

```
badge
↓ gradient headline
↓ paragraph
↓ 2 CTAs
↓ 3 cards
↓ bento grid
↓ logos
↓ testimonial
↓ CTA banner
```

Technically each piece may be perfect. A page like this reads as *generated SaaS template* regardless of rule compliance.

| id | Marker (structural smell) | Fix | sev | det |
|---|---|---|---|---|
| `composition.template-stack` | Page follows the badge→headline→2 CTA→3 cards→bento→logos→testimonial→CTA-banner stack end-to-end | Break ≥ 1 structural beat with a product-specific composition (intro paragraph, image band, comparison, timeline, asymmetric feature layout) — never fix that beat in with another card | warning | false |
| `composition.cardification` | Adjacent CTA/options/labels wrapped in cards where plain grouping works | Group with whitespace/divider; keep a card only when it holds distinct standalone content | warning | false |
| `composition.section-uniformity` | Every section = heading + subtitle + CTA + cards | Sections may drop any of those; rhythm should vary by content weight | warning | false |
| `composition.hero-alignment` | Hero auto-centered | Center = symmetric/equal-weight (good) or lazy (bad). Text-heavy → F-pattern left-aligned; visual-heavy → Z-pattern center. Choose by content, never by habit | warning | false |
| `composition.centering-everything` | All blocks centered (`text-center` everywhere) | Asymmetry expresses hierarchy; center when truly equal weight | suggestion | false |
| `composition.dominant-idea` | No single visual idea; the loudest element is a generic bg/brand block | One dominant visual concept per page; support elements step down | warning | false |
| `composition.decorative-noise` | Gradient blobs, floating shapes, icon orbits that carry no information | Delete unless it encodes product content (e.g., a feature mapping) | warning | false |
| `composition.hero-badge-default` | "New"/"Now with" badge on hero with no real announcement | Keep only when there's an actual message to badge | suggestion | false |
| `composition.why-biggest` | No element can answer "why is this the biggest thing on the page?" | Every oversized element must justify itself against product intent | warning | false |

Heuristics that live here (apply with judgment):

- **F vs Z**: text-heavy → F (left-aligned reading); visual-heavy → Z (center focal). Pick by content, not default.
- **Above the fold**: what must be seen first is a *product decision*, not a CSS one. Tease the next section (content peeking) to guide scroll.
- **Modal vs inline**: irreversible/destructive/purchase → modal; routine errors → inline/snackbar. Never modal-by-default.
- **Emphasis**: which plan/card/feature gets highlighted is a business intent, not an aesthetic choice.
- **Removal**: the strongest composition tool. Pack test: does this element earn its space? "Should this exist at all?" is always in scope.
- **Product fit**: the last gate — does the UI serve *this* product and *this* user, or would it paste onto any SaaS demo? If the page is interchangeable, composition failed.

## Copy & microcopy (judgment-heavy)

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `copy.human` | Robotic counts / "Submit" / inflated energy ("Join the Club!" without that voice) | Defer to `good-copy`: specific truth, not a template. User sample / DESIGN.md wins | warning | false | B2 |
| `copy.modal-mirror` | Modal buttons mismatch the question ([Cancel][OK]) | [Don't Cancel][Yes, Cancel] — restates action + outcome | warning | false | B2 |
| `copy.no-double-negative` | "Are you sure you don't want to keep your account?" | Ask positively ("Keep your account?") | error | false | B1 |
| `copy.vs-verb` | Verb on nav item vs noun destination confusion | CTA buttons = verbs; nav/list items = nouns | warning | false | B2 |

## Pricing & emphasis (product decisions)

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `pricing.highlight` | All plans equal weight | Highlight ONE plan (bigger, accent, "Most Popular"), rest quieter — without overshining | warning | false | B2 |
| `pricing.risk-reversal` | No free trial / guarantee named | Put risk-reversal up front | suggestion | false | B1 |
| `pricing.sticky-header` | Comparison table header scrolls away | Sticky headers | suggestion | false | B1 |
| `pricing.tooltips` | Ambiguous plan features unexplained | Tooltips; social proof near plans | suggestion | false | B1 |

## Accessibility as judgement (not just ratio)

| id | Marker | Fix | sev | det |
|---|---|---|---|---|
| `a11y.focus-order` | Visible order ≠ DOM order | Match DOM to visual reading order | error | true |
| `a11y.non-text` | Icons/status only via color or shape | `aria-label`, text alternative, `aria-describedby`, focus styles | error | true |
| `a11y.image-overlay` | Text over bright imagery | Darken image overlay so copy ≥ 4.5:1 | error | false |
| `a11y.motion-reduction` | Motion that ignores `prefers-reduced-motion` | Respect reduced-motion | warning | true |

## Hero & above-the-fold (contextual)

| id | Marker | Fix | sev | det | src |
|---|---|---|---|---|---|
| `hero.pattern-mismatch` | Text-heavy hero centered / visual-heavy hero left-cramped | F-pattern (text-heavy, left-aligned) vs Z-pattern (visual-heavy, center) — pick by content | warning | false | B1 |
| `hero.heading-jargon` | Heading full of jargon, no benefit | Plain language, two-benefit framing ("Simplify your savings, secure your future") | warning | false | B1 |
| `hero.secondary-competes` | Two equal CTAs competing | Secondary distinct style (thin border, no fill), visually subordinate | warning | false | B1 |
| `hero.social-proof` | No proof in hero (rating/users/logos) | Social proof belongs in hero when it lowers risk | suggestion | false | B1 |
| `hero.no-tease` | Fold cuts dead-flat, no scroll cue | Tease next section's edge to guide scroll (Gutenberg flow) | suggestion | false | B1/B2 |

## Good vs Bad UI — what to score

| Bad (slop) | Good |
|---|---|
| Alignment by guesswork (elements don't share lines) | One shared horizontal/vertical axis per row |
| Spacing random per element | Consistent 8-pt rhythm; white space ≥ 16–20px edge |
| 6 font sizes invented on the fly | 3-speed type scale, deliberately ordered |
| Over-engineered / "too creative" that wastes time | Every fancy detail answers an interaction need |
| Inconsistent states / borders / radius | One radius, one shadow language, named tokens |
| Tap targets squeezed below 40px | 44×44 iOS / 48×48 web & Android |

## Practicing UI (method, not just rules)

- Rebuild existing apps screen-by-screen (reconstruction beats "fresh idea" for skill building).
- Remake covers / screenshots side-by-side until grid + type + spacing match.
- Repeat a narrow workout (one color palette, one type scale) for 10–12 screens so rules become instinct.

---

# Cross-Book Conflicts & Resolution

The two books agree on ~90% and *look* contradictory in 4 places. When both rules can't be read literally, apply these resolutions:

| Area | Book 1 (UI 3.0) says | Book 2 (50 Do/Don'ts) says | Resolution |
|---|---|---|---|
| **Verbs in labels** | CTA buttons use action verbs ("Get started") | "Cut the verb" in nav/action labels ("My address", "Order history") | **Context split:** verbs live on CTA *buttons*; nav/list *items* drop them. Both are right once applied per element type |
| **Form layout** | "Compress fields, stack them next to each other" (compact, side-by-side) | "Single-column forms keep vertical momentum" | **Tier split:** primary flow is single-column; only a *related pair* (name / date range) shares a row. Never arbitrary multi-column |
| **Saturation** | Tone grays with brand overlay 5–15%; full freedom on brand color | Dark UI must stay ~tone 200–500 | **Scope:** the 200–500 cap applies to colors on dark *backgrounds*; accent/CTA on light surfaces keeps full range |
| **Selection colors** | 3+ system status colors (error/warning/success) | Max ~2 selection/nav-state colors | **Different systems:** status colors ≠ selection-state colors. Keep 3 status tokens AND ≤2 interactive state colors — don't overlap them |

Non-contradicting complements worth knowing: dark-mode palette is a **separate** darker-tint palette (book 2) that still follows "tint your blacks" (book 1) — the same idea viewed from two sides. Both books agree dropdown only from 5+ options, highlight one pricing plan, progress bars in flows, icon+label menus, and text-over-image overlays.

---

# Severity triage in one sheet

| Severity | Treat as | When to skip |
|---|---|---|
| **error** | Fix before ship; measurable breach (contrast, target, semantic type, focus) | Only with an explicit accessible waiver |
| **warning** | Default to fix; heuristic defect | Waiver with a named reason ("product intent wants equal cards") |
| **suggestion** | Judgment call; needs product context | Common — apply the reasoning, not the letter |

| Layer | What it judges | Example question the agent asks before claiming "good UI" |
|---|---|---|
| **L1 Mechanical** | Can a linter catch it? | "Does this surface violate any measurable rule?" |
| **L2 Structural** | Would a trained eye call it wrong? | "Is hierarchy / density / flow coherent?" |
| **L3 Contextual** | Does it serve this product? | "Would this page look interchangeable on any SaaS demo?" |

A surface is **done** only when L1 is clean, L2 is waived-or-fixed, and L3 has a product-intent-backed answer for composition, emphasis, removal, and fit.

---

# States (empty / loading / error)

| id | sev | det | src | rule | fix |
|---|---|---|---|---|---|
| `l2.states.all-three` | error | false | AS | Every data view must have empty/loading/error states | Implement all three; do not design happy-path only |
| `l2.states.loading-with-text` | warning | false | AS | Loading state names what is being loaded | Spinner + contextual text, not a naked spinner |
| `l2.states.empty-with-action` | warning | false | AS | Empty state names the cause + one fill action | "No jobs yet. Sync to see results" not "No data" |
| `l2.states.error-with-recovery` | warning | false | AS | Error state names what failed + how to continue | A real next action; not a bare "Something went wrong" |

# Mobile layout (reflow)

| id | sev | det | src | rule | fix |
|---|---|---|---|---|---|
| `l1.mobile.no-horiz-overflow` | error | true | AS | No horizontal scroll at any width | Find elements wider than the viewport (table/code/image/long string), contain/reflow |
| `l1.mobile.tap-targets` | error | true | AS | Interactive targets ≥44px with gap between targets | Enlarge padding/hit-box; add gap |
| `l2.mobile.breakpoint-content` | warning | false | AS | Breakpoints where content breaks, not a device list | Shrink the viewport, set the breakpoint at the break point |
| `l2.mobile.not-squeezed-desktop` | warning | false | AS | Mobile is a different layout, not squeezed desktop | Re-stack, rescale, reorder with intent; define real states (usually 3: single col → 2-col → full grid) |
| `l2.mobile.grid-collapse` | warning | true | AS | Multi-col grid collapses to a single reflowing column | `grid-template-columns` with minmax/auto-fit; collapse at the breakpoint |
| `l2.mobile.no-fixed-px-children` | warning | true | AS | Grid/flex children without fixed px/min-width that overflow | Relative units, flex-wrap, min-width:0 |
| `l2.mobile.bottom-nav-spacing` | warning | false | AS | Fixed nav (bottom/sticky) must not cover content; honor safe-area | scroll-padding + insets; verify the last item is reachable |
| `l2.mobile.hover-only` | warning | false | AS | Hover-only interaction has a tap equivalent + `:active` feedback | Menu also opens on tap |
| `l2.mobile.scaled-everything` | warning | false | AS | Desktop padding/hero/card not brought raw onto mobile | Its own mobile scale (smaller type, ~half section padding) |
| `l2.mobile.100vh-sections` | warning | true | AS | Sections are not `100vh` on mobile | `auto`, or `dvh` if full-height is real |
| `l2.mobile.nav-collapsed` | warning | false | AS | Mobile nav: bottom nav for primary destinations or a labeled menu; not a desktop row | Collapse to a mobile pattern; labeled hamburger ("Menu") |

# App & dashboard

| id | sev | det | src | rule | fix |
|---|---|---|---|---|---|
| `l2.dashboard.job-first` | warning | false | AS | Layout is built from the user's decision on that screen, not a sidebar+stat+chart+table default | Name the screen's job → hierarchy for that; cut template sections |
| `l2.dashboard.real-numbers` | error | false | AS | Stat cards use real numbers or `[REAL DATA]` placeholders; deltas only if the period is real and named | Wire to data; delta without a series = delete |
| `l2.dashboard.real-feed` | error | false | AS | Feed shows real events; fictional people/events = delete | Honest empty state + first-action instruction |
| `l2.dashboard.chart-answers-question` | warning | false | AS | Chart answers a question; title = the question | "Failed jobs per hour, last 24h"; if a sentence answers better, use a sentence |
| `l2.dashboard.columns-decide` | warning | false | AS | Table columns come from the user's decision in that table; deciding fields first | Order columns from the decision; real actions in the row menu |
| `l2.dashboard.no-fake-fill` | error | true | AS | Empty cells stay empty; honest placeholders ("Your Name", `[REAL DATA]`); not "John Doe"/"johndoe@example.com" | Empty them or use a labeled placeholder |

# Motion

| id | sev | det | src | rule | fix |
|---|---|---|---|---|---|
| `l3.motion.dials-consistent` | warning | true | AS | Motion matches the MOTION dial (dial 1 = hover only, no loop) | Adjust; claimed cinematic must move, claimed static must not |
| `l3.motion.no-endless-loop` | warning | false | AS | No endless pulse/bounce/float without a trigger | Motion guides attention to a moment, does not run forever; a repeating pattern only if the dial says so |
| `l3.motion.purpose-written` | suggestion | false | AS | Animation has a written UX purpose | Write the purpose; no purpose = delete/rework |