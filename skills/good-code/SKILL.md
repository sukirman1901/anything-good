---
name: good-code
description: >-
  Code that earns its place — decisions over pattern-completion. Use when
  writing or reviewing code, including "rapikan kode", "over-engineered",
  "kode terasa AI", "bersihkan komentar AI".
---

# Good Code (anything-good)

Part of the anything-good pack. Core (`../../SKILL.md`) holds mechanism (3-layer evaluator, purpose test, Delivery Gate, Change Slop in Agent boundaries). This skill holds code-domain rules. Decision shapes: `../../references/good-code.md`.

## When to use

- DURING: write/edit code and comments in the task scope.
- AFTER: audit AI slop. Comment Hygiene uses rule `id`. L3 groups use group name + repo evidence, not fake ids.
- Executable changes outside the task only via AFTER approval.

## Spine: stop completing patterns, start making decisions

AI completes patterns that show up often. An engineer chooses a shape for this problem, in this repo.

**Every line should earn its place** is a test, not a license to delete. Code exists because the problem requires it, not because good code is *supposed to look that way*.

**Do not over-sterilize.** Avoiding AI patterns is half the job. Code that is only minimal and afraid to take shape is as AI as code full of wrappers. A domain type, a named invariant, a boundary that appeared after the problem was understood: allowed, if its earning is one line from this repo.

Match sibling craft. If siblings are sloppy, raise the floor (strip L1/L2 tells) without inventing a new architecture.

## Code Purpose Test (skill DNA)

For every non-trivial addition, ask: **"What does this earn?"**

| Addition | Valid answer |
|---|---|
| comment | information the code does not already show |
| abstraction | a boundary that means something |
| dependency | a real capability |
| validation | an invalid state that actually happens |
| state | information that must persist |
| effect | sync with an external system |
| wrapper | a semantic boundary |
| configuration | actual variability |
| fallback | a failure mode you expect |
| type | an invariant the compiler should enforce |

Answers with no concrete need ("for flexibility", "best practice", "just in case", "clean architecture", "future-proofing", "more robust", "better maintainability") = **AI-slop tell**. Drop or rework, except `sev: error`.

If earning can be written in one line from *this repo*, a shape that is not in the average is a decision, not slop. If you cannot write the reason in one line, the decision is not valid yet.

## Evaluator: use the core 3-layer

Scan L1 → L2 → L3 (core mechanism). In code:

- **L1** (`det:true`): Comment Hygiene a machine can see (decorative, restate, narration, empty label, end marker, emoji).
- **L2** (`det:true|false`): over-explained comments, line-by-line, signature echo, stiff-loud.
- **L3** (`det:false`): diagnostic groups below. Prove from existing siblings/consumers/DSL. Discussion, not a linter. Cluster (core mechanism) beats isolated tell.

## Part 1: Comment Hygiene

Pattern: comments that add nothing

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l1.comment.decorative-separator` | warning | true | AS | `// =====` + ALL CAPS label, box-drawing | One plain line, or delete if the label adds nothing |
| `l1.comment.restating-obvious` | warning | true | AS | "// Initialize variable" above `let count = 0` | Delete; let the code stand |
| `l1.comment.workflow-narration` | warning | true | AS | "// Step 1: validate", "// First...", "// Finally..." | Delete; if the flow is hard to follow, that is a structure problem |
| `l1.comment.empty-label` | warning | true | AS | "// Main logic", "// Helper function", "// Important: please read" | Delete unless it carries a specific fact |
| `l1.comment.vague-todo` | warning | true | AS | "// TODO: Improve this", "// Add more validation" | Keep only if it names a specific executable task |
| `l1.comment.signature-echo` | warning | true | AS | JSDoc repeating @param/@returns already clear from names | Simplify/remove echo; keep docs that explain business rules/edge/assumption/alg/limitations/side-effects/API/security |
| `l1.comment.decorative-emoji` | warning | true | AS | `// ✅ Validation`, `// 🚀 Performance` | Plain English or delete |
| `l1.comment.end-marker` | warning | true | AS | `} // end if`, `# End of function` | Delete; the brace already ends the block |

Pattern: how it should read

| id | sev | det | src | tell | fix |
|---|---|---|---|---|---|
| `l2.comment.over-explained` | warning | false | AS | 4 lines explaining a 1-line fact (PATH stub, which release, what broke) | Cut to the useful info; drop issue numbers and reason-chains |
| `l2.comment.line-by-line` | warning | true | AS | A comment on every trivial statement | 1 comment per logical block, or none |
| `l2.comment.stiff-loud` | warning | true | AS | "responsible for validating whether the supplied credentials are valid..." / `// MAIN LOGIC` caps | Natural developer sentence: "// Validate credentials before issuing a token." |

Not a ban: keep comments that explain business logic/intent, architectural decisions, security, performance, concurrency, protocol, API contracts, workarounds, edge cases & assumptions, licensing/legal.

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Value is not length. Use the shortest comment that preserves the useful information. Length is a smell, not a violation.

## Part 2: Diagnostic groups (labels, not a linter)

A thinking frame. Do not invent `l3.code.*`. AFTER finding: `N. [group] <sibling/consumer evidence in one line>`.

| group | typical tell | evidence required before flag |
|---|---|---|
| unnecessary | redundant guard, pointless variable, pass-through, wrapper with no job | point to a real consumer/state that keeps it alive, or to its absence |
| abstraction | premature interface, one-use helper, factory with no need, architecture cosplay | at least 2 real consumers now, or a boundary that actually changes in this repo |
| naming | processData, handleThing, resultData, utils/helper dumping ground | names follow domain vocab siblings already use |
| defensive | impossible null-check, double validation, catch-and-rethrow, fallback-everything | the type/API allows that state; the failure is actually expected |
| pattern | pattern for its own sake, layer/service that does no work, framework cargo cult | the pattern exists because the problem asked, and siblings do (or do not) use it |
| error | generic error, swallowed error, console.log + rethrow, context destruction | the error carries enough context to recover on this surface |

Framework-specific (hooks, effects, type assertions, repository layer) = exemplars in `../../references/good-code.md`, not agnostic pack rules.

Change Slop (cleanup/refactor/format outside the task; unasked dependency/config) = core Agent boundaries, not a group here.

Extracting to a sibling because this task already has a second consumer = a decision, not Change Slop.

## Part 3: Engineer Judgment

Before non-trivial code, answer **two load-bearing questions** from repo evidence (read siblings, do not project maintainer psychology):

1. What does this codebase already do? (patterns from the 2–3 nearest siblings)
2. What does this task actually ask for?

The other five only when in doubt. Do not make them a liturgy on every diff:

3. What is the smallest coherent solution that still has shape?
4. Am I adding this because the problem needs it, or because it looks like "good engineering"?
5. Is there an existing primitive/pattern to use?
6. What am I assuming about future need? (a future guess ≠ earning)
7. Would this surprise an experienced maintainer who reads the same siblings?

Doubt → ask the user. Do not default to "safer to add". Change has cost. Do not default to "safer to delete shape" either.

## good-code checklist

- [ ] Decision, not pattern-completion; earning of each non-trivial addition is one line from this repo
- [ ] Not over-sterilized: earning shape remains
- [ ] Two load-bearing questions answered from siblings, not from a book
- [ ] L3 groups proven from the repo; AFTER findings use [group] + evidence, not fake ids
- [ ] Comment Hygiene clean; comments = shortest that keep the info; length = smell
- [ ] Diff scope: only what the task asked, except extract to a second consumer already in blast radius
- [ ] Delivery Gate core PASS
