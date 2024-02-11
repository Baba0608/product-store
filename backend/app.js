require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

// routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/order");
//
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);

// listen to server
const PORT = process.env.PORT || 4000;

const mongoDBURL = process.env.MONGO_URL;
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, () => {
      console.log(`SERVER LISTENING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
