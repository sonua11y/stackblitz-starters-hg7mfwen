const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming a User model is defined in models/User.js

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Searching for:", email); // Debugging line
  
    const user = await User.findOne({ email });
  
    if (!user) {
      console.log("User not found in DB!");
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json({ message: "User found!" });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
