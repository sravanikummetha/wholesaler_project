const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const wholesalerRoutes = require("./routes/wholesalerRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const DB = "mongodb+srv://admin:8mwyl6WVykCfBcqu@test.zp0ep.mongodb.net/test";
mongoose
  .connect(DB)
  .then(() => console.log("✅ Connected to DB successfully"))
  .catch((error) => console.error("❌ DB connection error:", error));

app.get("/profile", async (req, res) => {
  try {
    console.log("Profile API hit! User:", req.user);
    res.status(200).json({ user: { name: "User" } }); // ✅ Always return JSON
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // ✅ Return JSON on errors
  }
});

app.use("/wholesaler", wholesalerRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));