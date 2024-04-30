require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const router = require("./router/auth.router");
const connectDB = require("./utlits/database.js");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/auth", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
