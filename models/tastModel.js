const mongoose = require("mongoose");

// title, description, userId, status
const tastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{
  timestamps: true
});

const taskModel = new mongoose.model("Task", tastSchema);

module.exports = taskModel ;
