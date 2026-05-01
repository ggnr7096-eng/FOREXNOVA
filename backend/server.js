require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const transactionRoutes = require("./routes/transactions")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  })

app.get("/", (req, res) => {
  res.json({ message: "FOREXNOVA API Running" })
})

app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
