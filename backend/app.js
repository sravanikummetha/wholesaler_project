const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const wholesalerRoutes = require("./routes/wholesalerRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  const DB = "mongodb+srv://admin:8mwyl6WVykCfBcqu@test.zp0ep.mongodb.net/test";
  mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB successfully"))
    .catch((error) => console.error("DB connection error:", error));
}
app.get("/profile", async (req, res) => {
  try {
    console.log("Profile API hit! User:", req.user);
    res.status(200).json({ user: { name: "User" } }); // Always return JSON
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Return JSON on errors
  }
});

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wholesaler API",
      version: "1.0.0",
      description: "API documentation for Wholesaler Management",
    },
  },
  apis: ["./routes/*.js"], // Ensure your route files are inside the "routes" folder
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/wholesaler", wholesalerRoutes);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
