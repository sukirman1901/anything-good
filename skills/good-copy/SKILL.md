---
name: good-copy
description: >-
  Copy skill from the anything-good pack: every sentence should earn the
  reader's attention. Decisions first (voice, specificity, does this surface
  need copy); AI detectors (empty claims, rhythm clusters, capability-inflation)
  as evidence, not a banned-word list. Use when writing or editing prose:
  headlines, CTAs, error/empty states, landing copy, "buat copy lebih bagus",
  "tulisan terasa AI", "pesan error", "teks tombol". References anything-good
  core.
---

# Good Copy (anything-good)

Part of the anything-good pack. Core (`../../SKILL.md`) holds DNA, cluster, purpose test, Delivery Gate. This skill holds copy-domain rules. Decision shapes: `../../references/good-copy.md`.

## When to use

- DURING: write/edit product copy (headline, CTA, error, empty, onboarding, body)
- AFTER: audit. Honesty uses `id` + `sev: error`. Other detectors: clusters, not isolated tells
- Copy tone / empty / error: here, not good-ui

## What good means

Good copy sounds like someone understood the product, the audience, and the moment before they wrote.

It is not made human by adding quirks. It is not made professional by removing personality.

**Every sentence should earn the reader's attention.** A test, not a license to delete until sterile.

**Professional ≠ sanitized.** A user writing sample WINS over this skill's defaults. No sample → use the defaults below; do not invent a voice.

Prefer specific truth over abstract persuasion. Say only what the reader needs on this surface.

## Two load-bearing questions

Before non-trivial writing, from product facts (not from template slots):

1. Who is reading, in what moment?
2. What **one** message must this surface deliver?

When in doubt: does this surface need copy at all? What is the smallest concrete truth? Does hiding the actor make the sentence evasive?

## Copy Purpose Test

For each sentence/block: **"What attention does this earn?"**

| Addition | Valid answer |
|---|---|
| headline | what this product is, for whom, now |
| body | a fact that changes understanding |
| CTA | click consequence the user needs to predict |
| empty | a real status; often one sentence is enough |
| error | what broke + how to continue |
| proof | a number/name that exists in a source |

Answers "to fill the slot" / "to sound professional" / "to sound human" with no content = drop. If earning is one line from this product, a shape that is not in the average is a decision.

## Honesty (error; one is enough, cluster does not apply)

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.copy.fabricated-specifics` | error | false | AS | Made-up but realistic numbers/testimonials/dates | No source → no numbers or quotes; labeled placeholder |
| `l2.copy.unsourced-proof` | error | false | AS | "Trusted by thousands" with nobody named | Real name or cut the claim (C-5) |
| `l2.copy.weasel` | warning | true | AS | "Experts say", "people report" with no name | Cite a source or delete |
| `l2.copy.speculative-gap` | warning | false | AS | Guessing a factual gap | Say it is undocumented, or omit |

## Detectors (evidence, not the definition)

Look for clusters (core mechanism). One word / one dash is not a conviction.

| id | sev | det | src | tell | judgment |
|---|---|---|---|---|---|
| `l2.copy.empty-claim` | warning | false | AS | unlock/elevate/empower/seamless/robust as a claim with no density | Can the reader tell what happened? "Seamless migration" is valid if there is no downtime; "seamless collaboration" is empty → write the concrete event |
| `l2.copy.significance-inflate` | warning | true | AS | "the future of X", "revolutionizing" | Drop to specific evidence |
| `l2.copy.capability-inflation` | warning | false | AS | "AI-powered workspace" for one operation (extract PDF) | Write the real capability: "Upload a PDF. We'll pull the fields you need." |
| `l2.copy.surface-overload` | warning | false | AS | Simple surface: headline + sub + helper + note saying the same thing | One message; cut what does not change understanding or action. An empty UI slot is not a reason to write |
| `l2.copy.persuasion-trope` | warning | true | AS | "at its core", "the real question is" | Plain point |
| `l2.copy.chatbot-closer` | warning | true | AS | "I hope this helps!", "Let me know if..." | Delete |
| `l2.copy.fake-candid` | warning | true | AS | "Honestly?", "Real talk" | Go to the point |
| `l2.copy.signposting` | warning | true | AS | "Let's dive in", "Here's what you need to know" | Just do it |
| `l2.copy.false-agency` | warning | false | AS | "the platform understands your business" | Fake anthropomorphism. Not a ban on inanimate subjects: "The graph shows revenue by month" is valid |
| `l2.copy.evasive-passive` | warning | false | AS | "Your account was suspended" with no who/why, when the actor exists | Test: does hiding the actor evade? `Payment failed.` and `Changes saved.` are valid |
| `l1.copy.all-caps-emphasis` | warning | true | AS | FULL CAPS sentence in a paragraph | Put emphasis in the sentence; titles are fine |
| `l2.copy.em-dash-pattern` | suggestion | true | AS | Em dash (`—`) or ` -- ` used repeatedly as the default transition | Habit, not character. One dash is not a sin. User sample wins. Rewrite only when the dash is substituting for weak sentence structure |
| `l2.copy.rule-of-three` | warning | true | AS | Forced "innovation, inspiration, insights" / "No X. No Y. No Z." | List as many as the content needs. An isolated triad is not a conviction |
| `l2.copy.negative-parallel` | warning | true | AS | "It's not just X, it's Y" | Write it straight |
| `l2.copy.aphorism` | warning | true | AS | "X is the language of Y" | Precise formulation |
| `l2.copy.staccato` | warning | true | AS | A run of short lines for punch | Join into normal sentences |
| `l2.copy.synonym-cycle` | warning | true | AS | Synonym-swapping to avoid repetition | Repeat the clearest word |
| `l2.copy.false-range` | warning | true | AS | "from onboarding to scale" | Name the concrete things |
| `l2.copy.generic-closing` | warning | true | AS | "The future looks bright" | Cut; end on a fact |
| `l2.copy.boldface-overuse` | warning | true | AS | Every key term bolded mechanically | Emphasis via structure |
| `l2.copy.quote-overuse` | warning | true | AS | Quotes for distance/irony | Quote only what is meaningful |
| `l2.copy.inline-header-lists` | warning | true | AS | "- **User Experience:** The UX..." | Plain sentences |
| `l2.copy.emoji-heading` | warning | true | AS | 🚀/💡/✅ on headings as default | Cluster. One emoji in a product that already uses them = a decision. Sample/DESIGN.md wins |
| `l2.copy.filler` | warning | true | AS | "in order to", "due to the fact that" | Tighten, unless it is voice |
| `l2.copy.hedging` | warning | true | AS | "could potentially possibly" | One qualifier |

CTA: name the click consequence if the user needs to predict (`Upload contract`, `Send invoice`). `Save`, `Close`, `Back`, `Cancel` are already clear; do not lengthen them.

## Voice calibration

1. Read the user sample: sentence length, vocab, openings, punctuation, repeated phrases.
2. Match it; do not upgrade casual words or iron out deliberate quirks.
3. The sample wins (including em dash frequency, emoji, caps).

## Loop: draft → audit → final

1. **Draft.** Answer the two load-bearing questions; write; read aloud.
2. **Audit.** "What cluster makes this obviously AI?" and "Any invented facts?" Fabrication is a defect even if it sounds human. An isolated tell is not a fail.
3. **Final.** Fix both. Do not fail a draft for one dash.

## good-copy checklist

- [ ] Two load-bearing questions answered from the product, not from UI slots
- [ ] Every sentence earns; surfaces that need no copy stay short or empty
- [ ] No fabrication; capability not upgraded through language
- [ ] Claims have information density; this is not a banned-word list
- [ ] Passive/actor: evasion test, not "every sentence has a doer"
- [ ] CTA: consequence when prediction matters; Save/Close stay short
- [ ] Rhythm/hygiene clusters handled; isolated tells not
- [ ] Voice: user sample or a clear tone, not sterile
- [ ] Delivery Gate core PASS
