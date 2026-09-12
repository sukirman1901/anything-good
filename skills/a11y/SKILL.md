---
name: a11y
description: >-
  Accessibility skill from the anything-good pack: contrast (WCAG formula +
  table + contrast.py), non-text contrast 3:1, visible focus, keyboard, states,
  200% zoom, and mobile keyboard. Use when building or auditing accessibility
  (including "aksesibilitas", "AI dapat keyboard?", "kontras", "a11y", "WCAG",
  "audit aksesibilitas", "aria", "reduced motion"). References anything-good
  core.
---

# a11y (anything-good)

Part of the anything-good pack. Core (`../../SKILL.md`) holds mechanism; **accessibility = Hard-forever** (Block 1): contrast, keyboard, focus, states, zoom, `prefers-reduced-motion`. The purpose test NEVER weakens AA. This skill is detector + how to fix. Redundant ARIA = completing patterns, not accessibility.

## Tools

- **`contrast.py`** (in this skill folder): `python3 contrast.py "#RRGGBB" "#RRGGBB"` → ratio + normal/large verdict. Use for EVERY pairing you cannot verify by eye. If the script is missing → use the formula/table below; do not block.
- **Formula (WCAG 2.x):** ratio = (L1 + 0.05) / (L2 + 0.05), L1/L2 relative luminance (lighter/darker). Luminance: c=hex/255; c<=0.03928 → c/12.92; else ((c+0.055)/1.055)^2.4; L=0.2126R+0.7152G+0.0722B. Compare 4.5:1 normal / 3:1 large (18px+).
- **Reference table** (sanity, not a substitute; other pairings → formula/script):

| Text on bg | Ratio | Normal (4.5) | Large (3.0) |
|---|---|---|---|
| Black on white | 21.00 | Pass | Pass |
| White on black | 21.00 | Pass | Pass |
| White on #333333 | 12.63 | Pass | Pass |
| White on #666666 | 5.74 | Pass | Pass |
| #777777 on white | 4.48 | Fail | Pass |
| White on #888888 | 3.54 | Fail | Pass |
| White on #999999 | 2.85 | Fail | Fail |
| #555555 on black | 2.82 | Fail | Fail |

## Contrast

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.text-contrast` | error | true | AS | Light gray text on near-white, chosen because it looks "elegant" | Compute; hit AA (4.5 normal / 3 large). Do not eyeball |
| `l1.a11y.scrim-over-media` | error | false | AS | White text on an image/gradient that is locally bright, checked only at a bright point | Scrim/solid block behind text; verify the WORST point, not the best |
| `l1.a11y.grey-hallucination` | error | false | AS | "dark gray on black passes AA" without computing | Never assert a pairing; run script/formula. #555 on black = 2.8:1, fail |
| `l1.a11y.non-text-contrast` | error | false | AS | Component/icon/status boundary distinguished at <3:1 | 3:1 for component boundary & status (WCAG 1.4.11); icons paired with text labels ≥4.5 |

## Keyboard & focus

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.outline-removed` | error | true | AS | `outline: none` / `outline: 0` with no replacement | focus-visible ≥3:1; never remove without a replacement |
| `l1.a11y.mouse-only` | error | false | AS | Hover-only menu, dropdown that cannot open from keyboard, drag-drop with no fallback | All interactive elements reachable+operable via Tab/Enter/Space; dialogs close with Escape |
| `l1.a11y.tab-order` | error | false | AS | Focus jumps (DOM order != visual order) | Source order follows visual; skip-link on long pages; do not `tabindex=-1` real content |
| `l1.a11y.focus-indicator` | error | false | AS | Focus ring same color as bg, hover-only, or <1px | Indicator visible 3:1 against neighbors in ALL themes |

## States

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.color-only` | error | false | AS | Status only via color (red/green border) | Pair with text/icon/pattern; error text-first: "Password must be at least 8 characters" |
| `l1.a11y.missing-states` | error | false | AS | Data view without empty/loading/error, or spinner with no text | All three states exist and are perceivable: empty is clear, loading has text, error names what failed + how to continue (coordinate with good-ui) |

## Zoom & mobile

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.a11y.no-zoom` | error | false | AS | Fixed-px font / overflow:hidden container clipping at 200% | Fluid type reflow; no clipping; verify 200% on a narrow viewport |
| `l1.a11y.keyboard-covers-form` | error | false | AS | Focused input covered by on-screen keyboard, no scroll-into-view | On focus, scroll the input above the keyboard + enough bottom padding |
| `l1.a11y.reduced-motion` | error | true | AS | Animation/loop still runs when `prefers-reduced-motion: reduce` | Honor the media query: reduce/remove motion. MOTION dial 3 is not permission to ignore it |

## Names & ARIA (completing patterns)

Hard-forever a11y does not mean glue ARIA onto every element. That is completing patterns.

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.a11y.aria-soup` | warning | true | AS | `aria-label` copying visible text; `role="button"` on `<button>`; `tabindex="0"` on already-native elements | Remove redundant. ARIA only covers gaps native cannot. Accessible name = visible name, except icon-only |
| `l2.a11y.verbose-directions` | warning | false | AS | "Please click the blue button located in the top right corner" for "a11y" | Specific copy (`good-copy`); do not replace contrast/keyboard with directional prose |

## a11y checklist

- [ ] Every text/bg pairing verified (script/formula/table), including text on images/gradients
- [ ] Non-text contrast ≥3:1 for boundary/status
- [ ] Focus indicator visible, contrasting, on every interactive element, in every theme
- [ ] All elements reachable+operable from keyboard; dialogs close with Escape; no outline:none without replacement
- [ ] Empty/loading/error states exist and are perceivable, not color-only
- [ ] Text can go to 200% without clipping; keyboard does not cover the focused input
- [ ] `prefers-reduced-motion` honored when there is motion
- [ ] No aria soup; native semantics win
- [ ] Delivery Gate core PASS (a11y never waived; purpose test does not lower AA)
