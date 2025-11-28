const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ROUTES
const authRoute = require("./routes/auth");
const sampahRoute = require("./routes/sampah");
const hargaRoute = require("./routes/harga");

app.use("/api/auth", authRoute);
app.use("/api/sampah", sampahRoute);
app.use("/api/harga", hargaRoute);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

