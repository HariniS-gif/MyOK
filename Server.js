const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Harini:Gokul%40123@cluster0.s5dcwp7.mongodb.net/myokr", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Import User model
const User = require("./User");
const OKR = require("./OKR");


// Signup API
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Email already in use or other error." });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ message: "Login successful!", user });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Create OKR API
app.post("/create-okr", async (req, res) => {
  const { objective, keyResult, assignedTo } = req.body;

  try {
    const okr = new OKR({ objective, keyResult, assignedTo });
    await okr.save();
    res.json({ message: "OKR created successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Failed to create OKR." });
  }
});

// Get all OKRs
app.get("/get-okrs", async (req, res) => {
  console.log("🔥 /get-okrs called");
  try {
    const okrs = await OKR.find();
    res.json(okrs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch OKRs." });
  }
});

// Update OKR API
app.put("/update-okr/:id", async (req, res) => {
  const { id } = req.params;
  const { objective, keyResult, assignedTo } = req.body;

  try {
    const updatedOKR = await OKR.findByIdAndUpdate(
      id,
      { objective, keyResult, assignedTo },
      { new: true }
    );
    res.json({ message: "OKR updated successfully!", updatedOKR });
  } catch (err) {
    res.status(400).json({ error: "Failed to update OKR." });
  }
});

// Update OKR Progress
app.put("/update-progress/:id", async (req, res) => {
  const { progress } = req.body;
  try {
    await OKR.findByIdAndUpdate(req.params.id, { progress });
    res.json({ message: "Progress updated successfully!" });
  } catch (err) {
    res.status(400).json({ error: "Failed to update progress." });
  }
});


// Test route
app.get("/", (req, res) => {
  res.send("MyOKR backend is working!");
});

//Optional test route
app.get("/test", (req, res) => {
  console.log("Test route hit!");
  res.send("Test OK");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});




