window.SITE = {
  name: "Kopi Senja Dago",
  tagline: "Kopi lokal, suasana hangat. Pesan lewat WhatsApp.",
  wa: "6281234567890",              // format 62..., no + and no spaces. Demo: your number, not the owner's.
  address: "Jl. Ir. H. Juanda No. 10, Bandung",
  mapsUrl: "https://maps.google.com/?q=Kopi+Senja+Dago+Bandung",
  hours: "Setiap hari 08.00–22.00",
  instagram: "https://instagram.com/kopisenja",
  demo: true,                      // remove at launch
  // cover: "assets/cover.jpg",    // their public product photo, under 150KB
  theme: { primary: "#b45309" },
  fields: [
    { id: "nama", label: "Nama", type: "text" },
    { id: "metode", label: "Metode", type: "select", options: ["Ambil di tempat", "Dine in", "Antar (ongkir via chat)"] }
  ],
  items: [
    { name: "Kopi Susu Gula Aren", price: 18000, desc: "Signature kami", cat: "Kopi", badge: "Best seller", img: "" },
    { name: "Americano", price: 15000, desc: "Hot / iced", cat: "Kopi", img: "" },
    { name: "Roti Bakar Coklat Keju", price: 17000, desc: "Hangat, renyah", cat: "Makanan", img: "" }
  ]
};
