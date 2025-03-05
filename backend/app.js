const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const wholesalerRoutes = require("./routes/wholesalerRoutes");
const app = express();

app.use(cors()); // Allows all origins

const DB = "mongodb+srv://admin:8mwyl6WVykCfBcqu@test.zp0ep.mongodb.net/test";
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Db successfully");
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(express.json());
app.use("/wholesaler", wholesalerRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running with ${port} port`);
});