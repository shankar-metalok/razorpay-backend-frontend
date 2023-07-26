const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3005;
const mongoUrl = "mongodb://localhost:27017/mydatabase";
app.use(express.json());




mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {console.log("Connected to MongoDB");})
        .catch((error) => {console.error("Error connecting to MongoDB:", error);});



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});



const User = mongoose.model("User", userSchema);




app.post("/api/post-example", (req, res) => {
  const requestData = req.body;
  const newUser = new User(requestData);


  newUser.save().then((savedUser) => {console.log("Saved data to MongoDB:", savedUser);
             res.status(200).json({ message: "POST request successful!", data: savedUser });})
         .catch((error) => { console.error("Error saving data to MongoDB:", error);
      res.status(500).json({ error: "Error saving data to MongoDB" });
    });
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
