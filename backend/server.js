const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  
  res.send("This is from the server.");

});

app.post("/payment", async (req, res) => {
  const instance = new Razorpay({
    key_id: "rzp_test_AsieLfVYqPqP2J",
    key_secret: "J7fiHt2fuHkANZ5zBGUl7Ueh",
  });

  const { amount } = req.body;

  try {
    const order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "order1234",
    });

    res.status(201).json({
      success: true,
      order,
      amount,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
