# good-code — Decision shapes

Not a rule catalog. One pair per group: completed pattern vs a decision in this repo. The agent copies the shape of thinking, not the snippet.

Exemplars use JavaScript/React as a face. The pack stays architecture-agnostic: map onto whatever idiom siblings already use.

## How to read

- **Pattern** column = completing patterns (AI-facts).
- **Decision** column = earning you can point to in the repo.
- An isolated tell is not a conviction. Cluster + sibling evidence = a finding.
- AFTER finding: `N. [group] <evidence in one line>`. Do not invent `l3.code.*`.

## unnecessary

**Pattern.** Pass-throughs and variables that add no meaning.

```js
function fetchUsers() {
  return api.get("/users");
}
const result = fetchUsers();
return result;
```

**Decision.** Call at the site that needs it. Extract only after a second real site exists (not an imagined one).

```js
return api.get("/users");
```

If `settings.ts` and `billing.ts` already map the same user payload, extract *that mapping* (not the HTTP wrapper) into the primitive siblings are already looking for.

## abstraction

**Pattern.** Interface and factory for one consumer.

```js
class StripeGateway extends PaymentGateway {
  charge(order) { return stripe.charges.create(order); }
}
const gateway = GatewayFactory.create("stripe");
```

**Decision.** A function next to the route that uses it. A boundary is bought when the repo already has two real sides (e.g. Stripe *and* an invoice that already exists), not when a book says "portability".

```js
export function chargeOrder(order) {
  return stripe.charges.create(order);
}
```

Finding: `[abstraction] IPaymentGateway is only used in charge.ts; refund.ts stays inline. The factory buys no boundary.`

## naming

**Pattern.** Tutorial names, not this repo's domain.

```js
function processData(data) {
  return handleThing(data);
}
```

**Decision.** Vocab from siblings. If `invoices.ts` says `applyStripeTax`, do not say `processData`.

```js
function applyStripeTax(invoice) {
  return invoice.lines.map(applyLineTax);
}
```

A type lie (`as unknown as User`, `any`) is dishonest naming: the name says User, the value may not be. Narrow or `unknown`; no cosmetics.

## defensive

**Pattern.** Guards on a state the type/API never sends.

```js
if (user && user.profile && user.profile.email) {
  send(user.profile.email);
}
```

**Decision.** Guard at the boundary where the payload is actually partial. Inside, after `parseUser`, use the field.

```js
const user = parseUser(payload); // parseUser is the boundary
send(user.email);
```

Fallback-everything ("if it fails, return []") is valid only if siblings already treat empty as success, and this task is the same surface.

## pattern

**Pattern.** Layers because "that is how architecture looks".

```js
// store + service + repository + mapper for one form
usePaymentStore.getState().setLoading(true);
await PaymentService.from(PaymentRepository).submit(form);
```

**Decision.** Follow the nearest sibling. If `settings-form.ts` submits locally to an existing action, a payment form of the same size follows that.

```js
await savePaymentMethod(form);
```

Framework exemplars (not pack rules): a `useEffect` that `setState`s from props/state already in scope = derived, not an effect. Effects only sync to external systems. One `useX` with one caller = premature abstraction; inline until a second caller exists.

## error

**Pattern.** Generic catch that destroys context.

```js
try {
  await charge(order);
} catch (e) {
  console.log(e);
  toast("Something went wrong");
  throw e;
}
```

**Decision.** Map this surface's failures. Unknown stays labeled unknown. Do not invent retry/idempotency.

```js
try {
  await charge(order);
} catch (e) {
  if (e instanceof CardDeclined) {
    showDecline(e.code);
    return;
  }
  throw e; // unknown: do not cosmeticize
}
```

Finding: `[error] catch in checkout.tsx swallows the error into a generic toast; sibling billing.tsx already branches CardDeclined.`

## Comment Hygiene (reminder)

See the `id` table in `skills/good-code/SKILL.md`. Example that must survive:

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Length is a smell, not a violation.

## Change Slop vs a valid extract

Not a group finding in this file. Lives in core Agent boundaries.

- Cleanup, format, refactor of files the task did not ask for = Change Slop.
- Moving a primitive to a sibling that is *already* a second consumer in this task's blast radius = a decision. Write a one-line earning; do not disguise it as "while we're here".
