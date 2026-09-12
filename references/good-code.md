# good-code — Bentuk keputusan

Bukan katalog rule. Satu pasang per group: pola dilengkapi vs keputusan di repo ini. Agent meniru bentuk berpikir, bukan meniru snippet.

Eksemplar memakai JavaScript/React sebagai wajah. Pack tetap agnostik: pindahkan ke idiom sibling yang ada.

## Cara baca

- Kolom **pola** = completing patterns (AI-facts).
- Kolom **keputusan** = earning yang bisa ditunjuk di repo.
- Isolated tell bukan pengakuan. Kluster + bukti sibling = temuan.
- Temuan AFTER: `N. [group] <bukti 1 baris>`. Jangan mengarang `l3.code.*`.

## unnecessary

**Pola.** Pass-through dan variabel yang tidak menambah arti.

```js
function fetchUsers() {
  return api.get("/users");
}
const result = fetchUsers();
return result;
```

**Keputusan.** Panggil di tapak yang butuh. Extract hanya setelah tapak kedua nyata (bukan yang dibayangkan).

```js
return api.get("/users");
```

Kalau `settings.ts` dan `billing.ts` sudah memetakan payload user yang sama, extract *mapping itu* (bukan wrapper HTTP) ke primitive yang sibling sudah cari.

## abstraction

**Pola.** Interface dan factory untuk satu consumer.

```js
class StripeGateway extends PaymentGateway {
  charge(order) { return stripe.charges.create(order); }
}
const gateway = GatewayFactory.create("stripe");
```

**Keputusan.** Fungsi di sebelah route yang memakainya. Boundary dibeli ketika repo sudah punya dua sisi nyata (mis. Stripe *dan* invoice yang sudah ada), bukan ketika buku bilang "portability".

```js
export function chargeOrder(order) {
  return stripe.charges.create(order);
}
```

Temuan: `[abstraction] IPaymentGateway hanya dipakai di charge.ts; refund.ts tetap inline. Factory tidak membeli boundary.`

## naming

**Pola.** Nama dari tutorial, bukan dari domain repo.

```js
function processData(data) {
  return handleThing(data);
}
```

**Keputusan.** Vocab dari sibling. Kalau `invoices.ts` bilang `applyStripeTax`, jangan `processData`.

```js
function applyStripeTax(invoice) {
  return invoice.lines.map(applyLineTax);
}
```

Type lie (`as unknown as User`, `any`) adalah naming yang curang: nama bilang User, nilai belum tentu. Narrow atau `unknown`, jangan kosmetik.

## defensive

**Pola.** Guard pada state yang type/API tidak pernah kirim.

```js
if (user && user.profile && user.profile.email) {
  send(user.profile.email);
}
```

**Keputusan.** Guard di batas tempat payload memang parsial. Di dalam, setelah `parseUser`, pakai field-nya.

```js
const user = parseUser(payload); // parseUser adalah batas
send(user.email);
```

Fallback-everything ("kalau gagal, kembalikan []") hanya sah bila sibling sudah memperlakukan kosong sebagai sukses, dan task ini memang permukaan yang sama.

## pattern

**Pola.** Layer karena "begini arsitekturnya".

```js
// store + service + repository + mapper untuk satu form
usePaymentStore.getState().setLoading(true);
await PaymentService.from(PaymentRepository).submit(form);
```

**Keputusan.** Ikuti sibling terdekat. Kalau `settings-form.ts` submit lokal ke action yang sudah ada, form pembayaran yang sama ukurannya mengikuti itu.

```js
await savePaymentMethod(form);
```

Eksemplar framework (bukan rule pack): `useEffect` yang `setState` dari props/state yang sudah di scope = derived, bukan effect. Effect hanya sinkron ke sistem eksternal. Satu `useX` dengan satu caller = abstraction prematur; inline sampai caller kedua ada.

## error

**Pola.** Catch generik yang membuang konteks.

```js
try {
  await charge(order);
} catch (e) {
  console.log(e);
  toast("Something went wrong");
  throw e;
}
```

**Keputusan.** Petakan kegagalan permukaan ini. Yang tidak diketahui, label unknown. Jangan mengarang retry/idempotency.

```js
try {
  await charge(order);
} catch (e) {
  if (e instanceof CardDeclined) {
    showDecline(e.code);
    return;
  }
  throw e; // unknown: jangan dikosmetik
}
```

Temuan: `[error] catch di checkout.tsx menelan error jadi toast generik; sibling billing.tsx sudah cabang CardDeclined.`

## Comment Hygiene (pengingat)

Lihat tabel `id` di `skills/good-code/SKILL.md`. Contoh yang wajib bertahan:

```js
// Stripe may retry webhook deliveries for up to three days.
// Ignore duplicate events using the event ID.
```

Panjang adalah smell, bukan pelanggaran.

## Change Slop vs extract yang sah

Bukan temuan group di file ini. Ada di Agent boundaries core.

- Cleanup, format, refactor file yang task tidak minta = Change Slop.
- Pindah primitive ke sibling yang *sudah* jadi consumer kedua dalam blast radius task ini = keputusan. Tulis earning 1 baris, jangan samarkan sebagai "rapihin sekalian".
