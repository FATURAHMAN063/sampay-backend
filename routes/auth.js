const express = require("express");
const router = express.Router();

// Dummy database in-memory
let users = [];

// =========================
//      REGISTER
// =========================
router.post("/register", (req, res) => {
    const { nama, email, password, role, phone, address } = req.body;

    // Validasi field wajib
    if (!nama || !email || !password || !role) {
        return res.status(400).json({ message: "Harap isi semua field wajib!" });
    }

    // Validasi role
    if (!["user", "partner"].includes(role)) {
        return res.status(400).json({ message: "Role tidak valid!" });
    }

    // Cek apakah email sudah ada
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    // Bangun objek user sesuai role
    const newUser = {
        id: users.length + 1,
        nama,              // Untuk user = name, untuk partner = businessName
        email,
        password,
        role,
        phone: phone || null,
        address: role === "partner" ? address : null
    };

    users.push(newUser);

    res.json({
        message: "Registrasi berhasil!",
        user: {
            id: newUser.id,
            nama: newUser.nama,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            address: newUser.address
        }
    });
});

// =========================
//         LOGIN
// =========================
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi!" });
    }

    // Cari user berdasarkan email & password
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Email atau password salah!" });
    }

    // Token sederhana untuk demo
    const fakeToken = "TOKEN_" + Math.random().toString(36).substring(2);

    res.json({
        message: "Login berhasil!",
        token: fakeToken,
        user: {
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address
        }
    });
});

module.exports = router;
