const express = require("express");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5002;

app.use(express.json());
app.use(cors());

const mongoUrl =
  "mongodb+srv://shankarmeta2:shankarmeta2@test123.ohcscry.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const orderSchema = new mongoose.Schema({
  id: String,
  entity: String,
  amount: Number,
  amount_paid: Number,
  amount_due: Number,
  currency: String,
  receipt: String,
  offer_id: String,
  status: String,
  attempts: Number,
  notes: Array,
  created_at: Number,
});

const Order = mongoose.model("Order", orderSchema);

app.get("/", (req, res) => {
  res.send("This is from the server.");
});











app.post("/payment", async (req, res) => {
  const instance = new Razorpay({
    key_id: "rzp_test_AsieLfVYqPqP2J",
    key_secret: "J7fiHt2fuHkANZ5zBGUl7Ueh",
  });

  try {
    const { amount, notes } = req.body;

    const order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "order1234",
    });

    const newOrder = new Order({
      ...order,
      notes: notes,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      order,
      amount,
    });

    console.log("Order created:", order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
