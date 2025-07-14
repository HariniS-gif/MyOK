const mongoose = require("mongoose");

const okrSchema = new mongoose.Schema({
  objective: String,
  keyResult: String,
  assignedTo: String,
  progress: {
    type: Number,
    default: 0
  }
  
});

module.exports = mongoose.model("OKR", okrSchema);
