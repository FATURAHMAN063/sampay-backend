const express = require("express");
const router = express.Router();

// Dummy database
let sampahList = [
    { id: 1, jenis: "Plastik", berat: 2, harga: 3000 },
    { id: 2, jenis: "Botol", berat: 1, harga: 2000 }
];

// GET semua sampah
router.get("/", (req, res) => {
    res.json(sampahList);
});

// GET sampah berdasarkan ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = sampahList.find(s => s.id === id);

    if (!item) {
        return res.status(404).json({ message: "Data sampah tidak ditemukan" });
    }

    res.json(item);
});

// POST tambah sampah baru
router.post("/", (req, res) => {
    const { jenis, berat, harga } = req.body;

    if (!jenis || !berat || !harga) {
        return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const newData = {
        id: sampahList.length + 1,
        jenis,
        berat,
        harga
    };

    sampahList.push(newData);

    res.json({
        message: "Data sampah berhasil ditambahkan!",
        data: newData
    });
});

// PUT update data sampah
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { jenis, berat, harga } = req.body;

    const index = sampahList.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Data sampah tidak ditemukan" });
    }

    sampahList[index] = {
        id,
        jenis: jenis ?? sampahList[index].jenis,
        berat: berat ?? sampahList[index].berat,
        harga: harga ?? sampahList[index].harga
    };

    res.json({
        message: "Data sampah berhasil diperbarui!",
        data: sampahList[index]
    });
});

// DELETE hapus data sampah
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = sampahList.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Data sampah tidak ditemukan" });
    }

    const deleted = sampahList.splice(index, 1);

    res.json({
        message: "Data sampah berhasil dihapus!",
        deleted
    });
});

module.exports = router;
