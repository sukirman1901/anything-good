# good-ux — Knowledge map (not a skill)

**Not a `SKILL.md`.** Do not treat this as a rule pack, a linter, or a sin list. This file is foundation. A `good-ux` skill may be written only after this map is loadable without becoming a checklist.

Spine that must survive if a skill is written later:

```text
UX slop = a pattern with no reason from user, task, context, consequence, or evidence.
Stop completing product patterns. Start completing the task.
Every step should earn the next.
```

Modal, wizard, dashboard, onboarding, cards, chat, tabs: not slop. Slop is: "products like this usually have a dashboard."

## Boundary (do not duplicate)

| Pack | Owns | Not owned by good-ux |
|---|---|---|
| `good-ui` | space, composition, 8pt, visual clusters, earn its space | "don't use many cards" as law |
| `good-copy` | sentences, empty/error copy, honesty, earn attention | microcopy as a separate UX rule |
| `a11y` | AA, keyboard, focus, zoom, reduced-motion (Hard-forever) | COGA "clear steps / identifiable controls" softened into a suggestion |
| `good-code` | lines of code, earn its place | product flow as folder structure |
| **good-ux (later)** | task over time, mental model, load vs fake simplicity, recovery, temporal model, trust/dark patterns, evidence limits | screenshot-as-verdict |

If an existing skill already closes the finding, **do not** make it a UX rule.

## Test (draft, for a skill later)

Aligned with pack DNA. Not yet a fourth skill in core.

| Domain | Test |
|---|---|
| code | Every line should earn its place |
| copy | Every sentence should earn the reader's attention |
| ui | Every element should earn its space |
| ux | Every step should earn the next |
| a11y | Hard-forever (not an earning test) |

Two load-bearing questions (later, from task facts, not from a product template):

1. What **task** is the user trying to finish, in what context?
2. If this step goes wrong, what is the **consequence** (lost data, money, time, privacy, reputation)?

Required distinctions:

```text
user request ≠ user need
feature ≠ task
task ≠ goal
screen ≠ experience
visual simplicity ≠ cognitive simplicity
friction ≠ inherently bad
```

## Map (not 14 equal chapters)

Human-centered design is the parent, not a sibling of forms.

```text
                    GOOD UX
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │
   HUMAN            SYSTEM           EVIDENCE
     │                 │                 │
  cognition        interaction        research
  mental models    navigation         testing
  attention        forms              analytics
  expertise        recovery           observation
  trust            temporal           (AI limits)
  motivation       onboarding
     │                 │
     └──────── JUDGMENT ────────┘
                │
      context + consequence
                │
             decision
```

### HUMAN

Cognition and load: working memory, attention, recognition vs recall, decision/information/interaction/visual load. Removing labels can *raise* load (`[•••]` vs named actions).

Mental models: users bring trash/cart/back/save. The product offers a conceptual model. UX fails when system vocab (tenant, entity, resource) does not map to domain vocab (firm, case, invoice). Norman lives here: affordance, signifier, mapping, feedback, constraints, conceptual model. Not a separate cluster.

Attention: scan → orient → recognize → choose → act. Information scent, progressive disclosure, signal-to-noise. Dashboard theater and CTA competition *are born here*; the rule is not "don't use many cards".

Expertise: novice vs expert, accelerators, contextual help. An onboarding carousel is not the default; onboarding is also not forbidden.

Trust: consent, privacy, dark patterns. "This may convert better, but it is not good."

### SYSTEM

IA: where am I / what have I done / what remains. A sidebar of Dashboard / Analytics / Insights / Activity is not IA; it is pattern completion.

Interaction primitives: what you need is not "modals are bad", but what it interrupts, what context it drops, what people expect, when it fits. Pattern knowledge ≠ pattern matching.

Forms: step count ≠ perceived effort; fields the user must consider are often more expensive (Baymard). Irrelevant optional fields are not free.

Recovery: prevent costly errors, allow cheap errors, make recovery cheap, preserve work. Deliberate friction is valid when acting too fast is risky (GOV.UK).

Temporal: 100ms, 3 seconds, a 2-minute upload, a 30-minute job, async approval = different models. Spinner + toast for all of them = completing a pattern.

### EVIDENCE

Interviews, observation, task analysis, usability tests, funnels, search logs, support tickets, A/B, a11y testing.

A coding agent does **not** run think-aloud. Evidence it may hold: siblings in the repo, tickets/funnels the user provided, consequences it can point to. Imagined interviews = fabrication (`good-copy` C-5).

## Meta-rule (required before a skill)

```text
AI cannot infer user behavior merely from UI conventions.
```

Without evidence:

```text
Likely usability concern
confidence: low | medium | high
needs validation: true
owned_by: good-ux | good-ui | a11y | good-copy
```

`high` only if the consequence is costly and the mechanism is already known (delete with no undo; pay with no confirm; contrast fails AA). Do not write "This is bad UX" from a screenshot.

## Laws: tranche 1 (AI often misuses these)

Not mechanical laws. `owned_by` prevents triple-encoding.

| id | claim | scope / evidence | AI misuse | applicable when | counterexample | potential AG rule | owned_by |
|---|---|---|---|---|---|---|---|
| jakob | People expect a site/app to behave like ones they already use | NN/g heuristic; W3C familiar controls | Copy Shopify/Linear/Notion without the user's domain | Platform patterns already are the expectation (back, save, cart) | Legal/clinical domains have their own conventions; do not "SaaS" them | Match the user's/domain mental model, not a product-category template | ux |
| tesler | Complexity is conserved; it moves to the system or to the user | Tesler / conservation of complexity | Hide everything in `[•••]` and call it "simple" | The task is genuinely complex; the system should carry what it can | An 8-step wizard for 2 fields moves complexity onto the user for no reason | Do not dump load on the user for a minimal look | ux |
| hick | Choice time rises with the number/complexity of options | Hick-Hyman; applies to *comparable options that must be compared* | "Reduce all choices"; delete named actions | Simultaneous comparable choices, not yet chunked | 12 actions in grouped menus ≠ 12 equal actions on one screen | Chunk and hierarchy first; do not delete what the user needs | ux |
| miller-misuse | Working memory is limited; "7±2" is often misquoted | Miller 1956: recall span, not max UI items | "Max 7 nav items / 7 cards / 7 fields" | Pure recall with no on-screen cues | On-screen recognition (visible labels) holds more | Do not make 7 a law. Recognition > recall (`nielsen-ror`) | ux |
| fitts | Time to a target is a function of distance/size | Fitts; touch targets, screen edges | Every button huge; primary = 48px everywhere | Frequent targets that are costly to miss (destructive, submit, persistent nav) | Small secondary buttons are valid; tap ≥44px remains `a11y` | Size follows frequency and consequence, plus the a11y floor | ux + a11y |
| gestalt | Proximity, similarity, closure group perception | Perceptual psychology; layout heuristic | A card on every group "because grouping" | Need a group without a new object | Whitespace/divider is enough (`good-ui` cardification) | Grouping = perception, not a card | ui + ux |
| nielsen-ror | Recognition over recall; contextual help > long tutorials | NN/g 10 heuristics | Onboarding carousel + docs link as the design | User must remember state the screen does not show | Expert command palette: recall that is *chosen*, not forced | Show options in context; do not give a memory exam | ux |
| aesthetic-usability | Attractive UI is judged more usable, hiding issues | Tractinsky et al.; a bias, not proof the task succeeds | "It looks pretty so the UX is fine" | Visual audit vs task audit must stay separate | Tidy UI, delete with no undo: still bad UX | Do not trade aesthetics for task evidence | ux; visual in ui |
| doherty | Feedback under ~400ms feels like flow | Doherty threshold; HCI response time | Same skeleton + toast for an 80ms action and a 30-minute job | Real latency differs by order of magnitude | Optimistic UI for 100ms; named progress for minutes | Temporal model follows duration, not one spinner | ux |
| peak-end | Memory of an episode is shaped by the peak and the end | Kahneman et al.; episodic memory, not every click | Confetti on every save | Bounded flows (checkout, submit, recovery) | Confetti on every keystroke = noise | Invest in the peak of pain and the end of recovery, not every micro-interaction | ux |

### Parked (not tranche 1)

Zeigarnik, Goal-Gradient, Von Restorff, Parkinson, Pareto, Occam as poster stickers. Add them to inventory only if real misuse shows up in agent output. Do not complete the list "because UX-law catalogs usually do".

Nielsen's 10 heuristics: an evaluation frame for HUMAN/SYSTEM, not 10 rule `id`s. Visibility of status → temporal. Match real world → mental model. User control → recovery. Error prevention → forms/recovery. Minimalism → Tesler, not "do less until empty".

GOV.UK (start with user needs, do less, design with data, iterate, consistent not uniform): parent of HUMAN + EVIDENCE. "Do less" = do not add what the task does not buy. Not over-sterilize.

Apple forgiveness / optional onboarding: recovery + expertise.

Baymard (field count > step count; irrelevant optionals hurt): forms evidence, not "form > 5 steps = bad".

W3C COGA (important tasks findable, page structure, clear steps, identifiable controls): **`a11y` first**. Do not demote to a UX suggestion.

## Completing-pattern tells (examples, not rules)

Use as cluster smell. An isolated instance is normal.

```text
"Products like this usually have a dashboard."
"New users usually need onboarding."
"Delete usually needs a modal."
"AI products usually need chat."
"Complex forms usually need a wizard."
Sidebar: Dashboard / Analytics / Insights / Activity / Overview / Reports
Spinner then success toast for every duration
[•••] hiding the only four actions the task needs
Tenant / Entity / Resource as on-screen language
```

That cluster + no user/task/consequence/evidence = UX slop. One modal on irreversible delete with no undo = likely **high** (costly consequence), not because "modals are bad".

## Skill later (conditions)

`skills/good-ux/SKILL.md` only if:

- This file stays a map, not a catalog of 45 `id`s
- The SKILL is thin: spine, test, 2 questions, purpose test, confidence meta, cluster detectors, stop & ask without evidence
- Depth = this file
- It does not repeat `good-ui` MUST / `good-copy` honesty / `a11y` Hard

Until then, **do not** symlink a skill. Load this file only when designing UX or refusing pattern completion.
