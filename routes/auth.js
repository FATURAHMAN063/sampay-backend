const express = require("express");
const router = express.Router();

// Dummy database
let users = [];

// REGISTER
router.post("/register", (req, res) => {
    const { nama, email, password } = req.body;

    // Cek field wajib
    if (!nama || !email || !password) {
        return res.status(400).json({ message: "Harap isi semua field!" });
    }

    // Cek apakah email sudah ada
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    // Simpan user
    const newUser = {
        id: users.length + 1,
        nama,
        email,
        password
    };
    users.push(newUser);

    res.json({
        message: "Registrasi berhasil!",
        user: { id: newUser.id, nama, email }
    });
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi!" });
    }

    // Cari user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Email atau password salah!" });
    }

    // Token palsu untuk demo
    const fakeToken = "TOKEN_" + Math.random().toString(36).substring(2);

    res.json({
        message: "Login berhasil!",
        token: fakeToken,
        user: { id: user.id, nama: user.nama, email: user.email }
    });
});

module.exports = router;
