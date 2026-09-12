# anything-good

When an agent builds UI, writes copy, or edits code, it finishes the pattern it has seen most often. This pack makes it answer why that pattern belongs in this product.

A line, a sentence, or an element that cannot earn its keep does not ship. One tell is normal. A cluster with no reason is slop.

It does not choose your colors, type, or layout. You do, in `DESIGN.md`.

## Install

```bash
npx skills add sukirman1901/anything-good
```

That installs into the agents already on the machine. Every project:

```bash
npx skills add sukirman1901/anything-good -g
```

## Use

The agent asks: apply while building, or audit what already exists.

While building, it applies the rules and only hands work over when the gate passes with evidence. An audit is a numbered list. You pick the numbers. Unselected items stay.

No design direction means a labeled draft, not a deliverable.

## Layout

```
SKILL.md                 # core: what earns, cluster, gate, dials
references/              # catalogs and decision shapes
skills/                  # ui, copy, code, a11y
DESIGN.schema.md         # questions for look-and-feel
```

`references/good-ux.md` is a knowledge map. It is not a skill yet.

## License

MIT (c) 2026 heykirman.

The UI rule catalog marks origin per pattern via `src`:

**B1/B2**: *How to Design Better UI 3.0* (Adrian Kuleszo) and *50 UI Do's & Don'ts* (Pixsel Academy)
