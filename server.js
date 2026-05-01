const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "FOREXNOVA BACKEND RUNNING 🚀" })
})

app.post("/api/invest", (req, res) => {
  const { amount } = req.body

  const profit = amount * (0.1 + Math.random() * 0.05)

  res.json({
    success: true,
    invested: amount,
    profit: profit
  })
})

app.listen(5000, () => {
  console.log("Backend running on port 5000")
})