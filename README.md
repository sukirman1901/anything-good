# anything-good

Multi-domain anti-slop skill pack for AI coding agents: **UI**, **copy**, **code**, and **a11y**. One DNA: every line, sentence, and element must earn its keep. Cluster beats isolated tell. Not a style guide.

Professional ≠ sanitized. Design direction comes from the user (via `DESIGN.md`).

## Layout

```
SKILL.md                 # core: DNA, cluster, gate, dials
references/
  anything-good-core.md  # gate, metadata, path map
  good-ui.md             # UI rule catalog
  good-copy.md           # copy decision shapes
  good-code.md           # code decision shapes
  good-ux.md             # UX knowledge map (not a skill)
skills/
  good-ui/               # UI: earn its space
  good-copy/             # copy: earn attention
  good-code/             # code: earn its place
  a11y/                  # Hard-forever; contrast.py
DESIGN.schema.md         # design-direction template
```

## Install

Works with Cursor, Claude Code, OpenCode, Codex, Copilot, and other agents the [skills CLI](https://github.com/vercel-labs/skills) supports.

```bash
npx skills add sukirman1901/anything-good
```

The CLI detects installed agents. Global (all projects):

```bash
npx skills add sukirman1901/anything-good -g
```

Skills are detected via frontmatter `description`.

## How to use

1. The agent reads core `SKILL.md` and asks usage mode (DURING / AFTER).
2. Domain skills scan L1→L2→L3. An isolated tell is not a conviction; a cluster is. L1/L2 use `id`. L3 good-code uses group name + repo evidence.
3. Close with **Delivery Gate** PASS/FAIL plus evidence (core, Blocks 1–4). Punctuation is not a Hard Gate.
4. No design direction → label "draft without direction" (dials ENERGY 1/RHYTHM 1/MOTION 1), not a deliverable.

## Attribution & license

MIT (c) 2026. Built on a public anti-slop rule scheme (MIT). The UI rule catalog marks origin per pattern via `src`:
- **B1/B2**: *How to Design Better UI 3.0* (Adrian Kuleszo) and *50 UI Do's & Don'ts* (Pixsel Academy)
- **AS**: patterns adapted from the public anti-slop scheme (MIT)
