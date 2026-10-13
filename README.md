Copy this folder once per client. Edit only `config.js`. Open `index.html` in a browser. There is no build step.

## Cloudflare Pages via GitHub

One repo per client. On GitHub, open this template repo, click **Use this template**, and name it like `kopisenja-demo`.

Fill `config.js` with their data and push.

In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**. Pick the repo. Leave the build command empty and the output directory as `/`. Deploy.

The project name is the subdomain (`kopisenja-demo.pages.dev`). Lowercase only. If it is taken, add a number. Every later push redeploys in about a minute. The link stays the same.

Photos go in `assets/`, compressed, under 150KB each. `assets/logo.jpg` shows in the header when that file exists. Set `cover: "assets/cover.jpg"` for a hero photo from their public business account, and tell them you used it.

## Cafe

Categories and a badge on the item customers praise. `fields` for name and pickup method. Leave `unit`, `step`, and `minQty` unset.

```js
fields: [
  { id: "nama", label: "Nama", type: "text" },
  { id: "metode", label: "Metode", type: "select", options: ["Ambil di tempat", "Dine in", "Antar (ongkir via chat)"] }
]
// items: cat: "Kopi" or "Makanan", badge: "Best seller"
```

## Katering / nasi box

```js
unit: "box",
minQty: 20,
fields: [
  { id: "nama", label: "Nama", type: "text" },
  { id: "tanggal", label: "Tanggal kirim", type: "date" },
  { id: "jam", label: "Jam kirim", type: "time" },
  { id: "alamat", label: "Alamat pengiriman", type: "text" }
]
```

## Warung makan

Mark what is out today with `soldOut: true`. Keep the list to 8–12 items. The daily update is one WhatsApp message to you (the Perawatan add-on).

## Laundry

```js
unit: "kg",
step: 0.5,
fields: [
  { id: "nama", label: "Nama", type: "text" },
  { id: "layanan", label: "Layanan", type: "select", options: ["Antar sendiri", "Jemput antar"] },
  { id: "alamat", label: "Alamat jemput", type: "text" },
  { id: "waktu", label: "Waktu jemput", type: "time" }
]
```

Use their prices. The numbers in examples are placeholders.

## Bengkel

Services, not a menu. Fields: plate number, vehicle type, preferred time. Put “mulai dari” in `desc`. Leave a hard price off anything they quote case by case.

## Demo

Set `demo: true` so the “Contoh tampilan” strip shows. Remove it at launch.

Point `wa` at your own number until they pay the deposit, then switch it to theirs. Use 3–5 real best sellers, their logo color in `theme.primary`, and a tagline taken from their reviews.
