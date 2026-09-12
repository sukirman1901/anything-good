---
name: good-ui
description: >-
  UI that earns its space — layout, states, composition, mobile. Use when
  building or auditing screens, including "rapihin UI", "buat lebih bagus",
  "audit UI", "terlalu generik", "design".
---

# Good UI (anything-good)

Part of the anything-good pack. Core (`../../SKILL.md`) holds DNA, cluster, purpose test, Delivery Gate, dials. This skill holds UI-domain rules. Catalog: `../../references/good-ui.md`.

**Every element should earn its space.** A test, not a license to empty the page until sterile. Removal is the strongest composition tool: "should this exist at all?"

## When to use

- Before finishing a UI build (component, page, section, form, card grid)
- On audit / "rapihin UI" / "make it better"
- When output "looks correct" but feels like a template (composition.* cluster)

## When to skip

- Code-logic slop (useEffect, type lies) → `good-code`
- Copy tone / empty-state / error copy → `good-copy`
- Contrast, keyboard, focus, zoom → `a11y` (Hard-forever; do not repeat as a style rule)
- Frame-by-frame motion → MOTION dial in core

## Evaluator

1. **Collect intent.** L1 does not need intent. L3 (composition, emphasis, removal) needs product intent; if missing, ASK.
2. **Scan by layer** in `../../references/good-ui.md` (L1 → L2 → L3). An isolated tell is not a conviction.
3. **Rank** (`sev`): error (a11y + mechanical craft) → warning → suggestion.
4. **Fix** the rule + one line of earning. Grid numbers in the catalog are defaults, not law.
5. **Re-scan.** Name any waiver.

## MUST (floor, not a style guide)

| Rule | Detail |
|------|--------|
| **Earn its space** | Each element has a one-line reason. An empty slot is not a reason to add a card/badge/bento |
| **Contrast & focus** | Defer to `a11y`. Do not eyeball. `outline: none` with no replacement = error |
| **8-pt spacing** | `gap`/`padding` on a 4–8pt ladder. Arbitrary `13px`/`22px` is a craft defect, not brand identity |
| **Overflow & tap** | No horizontal overflow; tap ≥44px; mobile = reflow (stack/scale/reorder), not shrunk desktop |
| **States** | Every data view: empty/loading/error. Loading has text; errors name what broke + how to continue. Copy: `good-copy` |
| **Honest data** | Real numbers/feeds/avatars or labeled placeholders. Empty cells stay empty |
| **Motion** | Follow the MOTION dial; no endless pulse/loop; `prefers-reduced-motion` (see a11y). Motion has a written purpose |
| **One light, button hierarchy** | Shadows one direction. Primary / secondary / tertiary. Hover/pressed/disabled/loading exist |
| **Composition = cluster** | Template stack (badge→gradient→2 CTAs→3 cards→bento→CTA banner) is flagged as a cluster, not beat-by-beat. Break ≥1 beat with a product shape, or waive with intent |

Not MUST (defaults, overridable by DESIGN.md / siblings):

- Container 1200–1240 / 343 / 12-col 20px gutter: starting ladder, not an error
- `#000`/`#fff`: suggestion; exceptions for brand, high-contrast, art direction (catalog `color.pure-black`)
- Single-column forms: heuristic (first+last name may sit side by side on desktop)
- Dropdown with 2–4 options → chips: heuristic, not law
- ≤2 typefaces: start there; brand may use more if DESIGN.md says so

CTA: name the action/consequence (`good-copy`). Not "Click here". Not "Join the Club!" unless that is the product voice.

## Pattern mini-table

| Detection marker | Fix | Layer |
|---|---|---|
| `gap: 13px; padding: 22px;` | Nearest 8pt value | L1 |
| `#000`/`#fff` full-strength without brand/HCA | Tinted neutral, or keep if DESIGN.md | L3 |
| `rounded-3xl` same inside and out | Inner radius < outer | L1 |
| `outline: none` without replacement | focus-visible ≥3:1 (`a11y`) | L1 |
| Empty "Click here"/"Learn More" | Click consequence (`good-copy`) | L2 |
| Text on a bright photo | Scrim; worst point (`a11y`) | L1 |
| One error toast at the top | Inline at the location + reason | L2 |
| Scroll inside a card | Cut + "See more", or do not use a card | L2 |
| Reading line too wide | `max-width` ~60–70ch | L1 |
| SSA stack cluster | Break ≥1 beat; an isolated card/badge is normal | L3 |
| Every section = heading+subtitle+cards | Vary; a section may drop elements | L3 |
| Cards where whitespace can group | Divider/whitespace | L3 |
| Stat card `12,483 / 94.2%` with no source | Real or `[REAL DATA]` | L2 |
| Feed "Sarah Chen updated..." | Real event or delete | L2 |

Full catalog: `../../references/good-ui.md`. Copy rules in the catalog (`copy.*`) defer to `good-copy`.

## Agent boundaries

- **May decide:** fix order within a layer, token names, 8pt values, which beat to break, grid ladder vs DESIGN.md.
- **Must not:** default purple/indigo; treat L3 as a linter; restructure without intent; skip a rule because it "looks fine"; punish isolated tells; harm a11y for aesthetics.
- **Stop & ask:** composition/emphasis without intent; L3 copy needs a sample (`good-copy`); product vs a11y conflict (a11y wins).

## good-ui checklist

- [ ] Every element earns in one line; removal considered
- [ ] L1 craft: 8pt, overflow, tap, radius, one light, focus (via a11y)
- [ ] Contrast computed in `a11y`, not repeated as color taste
- [ ] States + honest data
- [ ] Composition cluster named or waived; isolated card/badge not
- [ ] Catalog grid/pixels = default, not a failed deliverable
- [ ] Motion + reduced-motion
- [ ] Surface copy in `good-copy`
- [ ] Close: re-scan; gate core PASS
