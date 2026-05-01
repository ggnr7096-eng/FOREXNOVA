const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false })

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 10000
  },
  transactions: {
    type: [TransactionSchema],
    default: []
  }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)
