const express = require("express");
const router = express.Router();

let hargaSampah = [
  { id: 1, jenis: "Plastik", harga: 3000 },
  { id: 2, jenis: "Botol", harga: 2000 },
  { id: 3, jenis: "Kertas", harga: 1500 },
  { id: 4, jenis: "Aluminium", harga: 8000 }
];

router.get("/", (req, res) => {
  res.json(hargaSampah);
});

module.exports = router;
