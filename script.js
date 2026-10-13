const S = window.SITE;
const rp = n => "Rp" + Math.round(n).toLocaleString("id-ID");
const $ = id => document.getElementById(id);
const step = S.step || 1;
const unit = S.unit || "";
const F = S.fields || [{ id: "nama", label: "Nama", type: "text" }];
const cart = {};

document.documentElement.style.setProperty("--primary", S.theme.primary);
document.title = S.name;
$("name").textContent = S.name;
$("tagline").textContent = S.tagline;
$("address").textContent = "📍 " + S.address;
$("hours").textContent = "🕒 " + S.hours;
$("maps").href = S.mapsUrl;
$("foot").textContent = "© " + new Date().getFullYear() + " " + S.name;
$("heroWa").href = `https://wa.me/${S.wa}?text=${encodeURIComponent("Halo " + S.name + ", saya mau tanya.")}`;
if (S.instagram) { $("ig").href = S.instagram; $("ig").hidden = false; }
if (S.demo) document.body.insertAdjacentHTML("afterbegin", '<div class="demo-note">Contoh tampilan</div>');

const logo = $("logo");
if (logo) {
  logo.alt = S.name;
  logo.onload = () => { logo.hidden = false; };
  logo.onerror = () => { logo.hidden = true; };
  logo.src = "assets/logo.jpg";
}
if (S.cover) {
  const cover = document.createElement("img");
  cover.className = "cover";
  cover.alt = "";
  cover.src = S.cover;
  cover.onload = () => document.querySelector(".hero").prepend(cover);
}

$("fields").innerHTML = F.map(f => f.type === "select"
  ? `<label>${f.label}<select data-f="${f.id}">${f.options.map(o => `<option>${o}</option>`).join("")}</select></label>`
  : `<label>${f.label}<input data-f="${f.id}" type="${f.type || "text"}" placeholder="${f.placeholder || ""}"></label>`
).join("");

function card(it, i) {
  const sold = it.soldOut;
  return `<article class="card ${sold ? "sold" : ""}">
    ${it.img ? `<img src="${it.img}" alt="${it.name}" loading="lazy">` : `<div class="ph"></div>`}
    <h3>${it.name} ${it.badge ? `<span class="badge">${it.badge}</span>` : ""}</h3>
    <p class="desc">${it.desc || ""}</p>
    <div class="row">
      <strong>${rp(it.price)}${unit ? " / " + unit : ""}</strong>
      ${sold ? "<em>Habis</em>" : `<div class="qty">
        <button data-i="${i}" data-d="-1" aria-label="kurangi">−</button>
        <span>${cart[i] || 0}</span>
        <button data-i="${i}" data-d="1" aria-label="tambah">+</button>
      </div>`}
    </div>
  </article>`;
}

function render() {
  const cats = [...new Set(S.items.map(it => it.cat || ""))];
  $("items").innerHTML = cats.map(c =>
    (c ? `<h3 class="cat">${c}</h3>` : "") +
    `<div class="grid">${S.items.map((it, i) => (it.cat || "") === c ? card(it, i) : "").join("")}</div>`
  ).join("");
  updateBar();
}

const chosen = () => Object.keys(cart).filter(i => cart[i] > 0);
const totalOf = ids => ids.reduce((s, i) => s + cart[i] * S.items[i].price, 0);
const countOf = ids => ids.reduce((s, i) => s + cart[i], 0);

function updateBar() {
  const ids = chosen();
  $("cartBar").hidden = ids.length === 0;
  $("cartInfo").textContent = `${countOf(ids)} ${unit || "item"} · ${rp(totalOf(ids))}`;
}

$("items").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  const i = b.dataset.i;
  cart[i] = Math.max(0, +((cart[i] || 0) + Number(b.dataset.d) * step).toFixed(2));
  render();
});

$("sendBtn").addEventListener("click", () => {
  const ids = chosen();
  if (S.minQty && countOf(ids) < S.minQty) {
    alert(`Minimal pemesanan ${S.minQty} ${unit || "item"}.`);
    return;
  }
  const lines = ids.map(i => `- ${cart[i]} ${unit || "x"} ${S.items[i].name} (${rp(cart[i] * S.items[i].price)})`);
  const extra = F.map(f => {
    const el = document.querySelector(`[data-f="${f.id}"]`);
    return `${f.label}: ${el.value || "-"}`;
  }).join("\n");
  const msg = `Halo ${S.name}, saya mau pesan:\n${lines.join("\n")}\n\nTotal: ${rp(totalOf(ids))}\n\n${extra}`;
  window.open(`https://wa.me/${S.wa}?text=${encodeURIComponent(msg)}`, "_blank");
});

render();
