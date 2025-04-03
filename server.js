const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this model is properly defined

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Login Endpoint with bcrypt password verification
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Searching for:", email); // Debugging line
  
    const user = await User.findOne({ email });
  
    if (!user) {
      console.log("User not found in DB!");
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Incorrect password!");
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
